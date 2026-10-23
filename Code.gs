/**
 * Keyword n-gram counter — Google Sheets add-on.
 *
 * Counts how often 1–5 word phrases repeat in your text, so you can spot
 * over-used phrases, check keyword focus, and clean up repetitive copy.
 *
 * Input is either the cells you select in the sheet or text you paste in the
 * sidebar. Everything runs on the current spreadsheet only — the add-on makes
 * no network calls and sends no data anywhere. Minimal, non-sensitive scopes.
 */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Keyword n-grams')
    .addItem('Open analyzer', 'showSidebar')
    .addToUi();
}

function onInstall() {
  onOpen();
}

function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Keyword n-gram counter')
    .setWidth(330);
  SpreadsheetApp.getUi().showSidebar(html);
}

/* --- Stop-words (compact EN + PL list) --- */
var STOPWORDS = (function () {
  var list = (
    'the a an and or of to in on for with at by from as is are was were be been being this ' +
    'that these those it its you your we our they their he she his her not no but if then so ' +
    'than too very just can will would should could do does did have has had ' +
    'i w z ze na do nie to się że a o jak dla po co ale czy jest są być ten ta te tego tej tym ' +
    'od za przy pod nad bez przez oraz lub albo już tylko bardzo też także gdy aby więc'
  ).split(/\s+/);
  var set = {};
  list.forEach(function (w) { if (w) set[w] = true; });
  return set;
})();

function normalizeText(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^0-9a-ząćęłńóśźż\s]+/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(text, removeStop) {
  var tokens = normalizeText(text).split(' ').filter(function (t) { return t; });
  if (!removeStop) return tokens;
  return tokens.filter(function (t) { return !STOPWORDS[t]; });
}

function countNgrams(tokens, n) {
  var map = {};
  for (var i = 0; i + n <= tokens.length; i++) {
    var gram = tokens.slice(i, i + n).join(' ');
    map[gram] = (map[gram] || 0) + 1;
  }
  var total = Math.max(1, tokens.length - n + 1);
  return { map: map, total: total };
}

/* Reads the text of the cells the user has selected in the sheet. */
function getSelectionText() {
  var ranges = SpreadsheetApp.getActiveSpreadsheet().getActiveRangeList();
  if (!ranges) return '';
  var parts = [];
  ranges.getRanges().forEach(function (range) {
    range.getValues().forEach(function (rowVals) {
      rowVals.forEach(function (v) {
        if (v !== '' && v !== null) parts.push(String(v));
      });
    });
  });
  return parts.join(' \n ');
}

/* --- Main entry (called from the sidebar) --- */

function analyze(params) {
  var corpus = params.mode === 'range' ? getSelectionText() : (params.text || '');
  if (!corpus.trim()) {
    throw new Error(params.mode === 'range'
      ? 'No text found — select the cells you want to analyze first.'
      : 'Nothing to analyze — paste some text first.');
  }

  var tokens = tokenize(corpus, params.removeStop);
  var minCount = params.minCount || 2;
  var result = { totalWords: tokens.length, sizes: {} };

  params.sizes.forEach(function (n) {
    var c = countNgrams(tokens, n);
    var rows = Object.keys(c.map).map(function (g) {
      return { phrase: g, count: c.map[g], pct: c.map[g] / c.total * 100 };
    }).filter(function (r) {
      return r.count >= minCount;
    }).sort(function (a, b) {
      return b.count - a.count || a.phrase.localeCompare(b.phrase);
    });
    result.sizes[n] = rows;
  });

  if (params.write) writeResults(result, params);

  var preview = { totalWords: result.totalWords, sizes: {} };
  params.sizes.forEach(function (n) { preview.sizes[n] = result.sizes[n].slice(0, 20); });
  return preview;
}

function writeResults(result, params) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var name = 'n-grams ' + Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), 'MM-dd HH:mm:ss');
  var sheet = ss.insertSheet(name);
  var row = 1;

  sheet.getRange(row, 1).setValue('Source').setFontWeight('bold');
  sheet.getRange(row++, 2).setValue(params.mode === 'range' ? 'selected cells' : 'pasted text');
  sheet.getRange(row, 1).setValue('Total words').setFontWeight('bold');
  sheet.getRange(row++, 2).setValue(result.totalWords);
  row++;

  params.sizes.forEach(function (n) {
    sheet.getRange(row++, 1).setValue(n + '-word phrases').setFontWeight('bold').setFontSize(12);
    sheet.getRange(row, 1, 1, 3).setValues([['phrase', 'count', '%']]).setFontWeight('bold');
    row++;
    var rows = result.sizes[n];
    if (rows.length) {
      var data = rows.map(function (r) { return [r.phrase, r.count, Math.round(r.pct * 100) / 100]; });
      sheet.getRange(row, 1, data.length, 3).setValues(data);
      row += data.length;
    } else {
      sheet.getRange(row++, 1).setValue('(none above threshold)');
    }
    row++;
  });

  sheet.autoResizeColumns(1, 3);
  ss.setActiveSheet(sheet);
}

# Keyword n-gram counter — Google Sheets custom function

A spreadsheet function, `=NGRAMS()`, that counts how often **1–5 word phrases** repeat in
text or a range of cells. Useful for spotting over-used phrases, checking keyword focus,
and cleaning up repetitive copy.

```
=NGRAMS(A1:A50)                 counts 2-word phrases in A1:A50
=NGRAMS(A1:A50, 3)              counts 3-word phrases
=NGRAMS(A1:A50, 2, 3)          only phrases that repeat at least 3 times
=NGRAMS(A1:A50, 2, 2, TRUE)    ignore common stop-words (EN + PL)
=NGRAMS("some text here", 1)    works on a plain string too
```

It returns a table (phrase, count, %) that spills into the cells, most frequent first.

## Privacy & permissions

**None.** `=NGRAMS()` is a pure custom function — it only processes the values you pass to
it. It requests **no OAuth scopes**, makes **no network calls**, and stores nothing. Because
it needs no scopes, it requires **no OAuth verification**.

## Files

```
appsscript.json  — manifest (runtime only; no OAuth scopes)
Code.gs          — the NGRAMS custom function + n-gram engine
```

## Try it in ~2 minutes

1. Open a Google Sheet → **Extensions → Apps Script**.
2. Paste the contents of `Code.gs` into the default `Code.gs` file (replace what is there).
3. Click the gear (Project settings) → **Show "appsscript.json"**, then paste `appsscript.json` over it.
4. Save. Back in the sheet, type `=NGRAMS(A1:A10)` over some text cells.

## Publishing to Google Workspace Marketplace

1. Link a **Google Cloud project** to the Apps Script project.
2. Configure the **OAuth consent screen** (name, support + privacy URLs).
3. Enable the **Google Workspace Marketplace SDK**, fill the **store listing**, and submit.
4. The add-on requests **no scopes**, so no OAuth verification is required — the review
   is only the standard Marketplace listing review.

## Author

Built by [Bartosz Koplin](https://bartoszkoplin.pl) · contact: kontakt@bartoszkoplin.pl

## License

All rights reserved. See [LICENSE](LICENSE). The source is published for transparency,
not for reuse.

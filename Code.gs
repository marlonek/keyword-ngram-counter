/**
 * Keyword n-gram counter — Google Workspace Add-on (CardService).
 *
 * Shows a card where you paste text and count repeated 1–5 word phrases. It uses
 * only CardService for its UI and computes everything from the text you paste —
 * it requests no OAuth scopes, reads no spreadsheet, makes no network calls, and
 * stores nothing. With no sensitive scopes, it needs no OAuth verification.
 */

/* --- Stop-words (compact EN + PL list) --- */
var KNG_STOPWORDS = ( function () {
  var list = (
    'the a an and or of to in on for with at by from as is are was were be been being this ' +
    'that these those it its you your we our they their he she his her not no but if then so ' +
    'than too very just can will would should could do does did have has had ' +
    'i w z ze na do nie to się że a o jak dla po co ale czy jest są być ten ta te tego tej tym ' +
    'od za przy pod nad bez przez oraz lub albo już tylko bardzo też także gdy aby więc'
  ).split( /\s+/ );
  var set = {};
  list.forEach( function ( w ) { if ( w ) { set[ w ] = true; } } );
  return set;
}() );

function kngNormalize_( text ) {
  return String( text || '' )
    .toLowerCase()
    .replace( /[^0-9a-ząćęłńóśźż\s]+/gi, ' ' )
    .replace( /\s+/g, ' ' )
    .trim();
}

function kngTokenize_( text, removeStop ) {
  var tokens = kngNormalize_( text ).split( ' ' ).filter( function ( t ) { return t; } );
  if ( ! removeStop ) { return tokens; }
  return tokens.filter( function ( t ) { return ! KNG_STOPWORDS[ t ]; } );
}

function kngCountNgrams_( tokens, n ) {
  var map = {};
  for ( var i = 0; i + n <= tokens.length; i++ ) {
    var gram = tokens.slice( i, i + n ).join( ' ' );
    map[ gram ] = ( map[ gram ] || 0 ) + 1;
  }
  return { map: map, total: Math.max( 1, tokens.length - n + 1 ) };
}

/* --- Form helpers for the new common event object --- */
function kngFormString_( formInputs, name ) {
  try {
    var v = formInputs[ name ].stringInputs.value;
    return ( v && v.length ) ? v[ 0 ] : '';
  } catch ( err ) {
    return '';
  }
}

function kngFormArray_( formInputs, name ) {
  try {
    return formInputs[ name ].stringInputs.value || [];
  } catch ( err ) {
    return [];
  }
}

/* --- Card UI --- */

function onHomepage( e ) {
  return kngBuildCard_( '', 2, 2, false, null );
}

function kngBuildCard_( text, n, minCount, removeStop, result ) {
  var builder = CardService.newCardBuilder()
    .setHeader( CardService.newCardHeader().setTitle( 'Keyword n-gram counter' ) );

  var input = CardService.newCardSection();
  input.addWidget( CardService.newTextParagraph().setText(
    'Paste text to count repeated 1–5 word phrases.' ) );
  input.addWidget( CardService.newTextInput()
    .setFieldName( 'text' )
    .setTitle( 'Text' )
    .setMultiline( true )
    .setValue( text || '' ) );

  var nInput = CardService.newSelectionInput()
    .setType( CardService.SelectionInputType.DROPDOWN )
    .setTitle( 'Phrase length (words)' )
    .setFieldName( 'n' );
  for ( var i = 1; i <= 5; i++ ) {
    nInput.addItem( String( i ), String( i ), i === ( n || 2 ) );
  }
  input.addWidget( nInput );

  input.addWidget( CardService.newTextInput()
    .setFieldName( 'min' )
    .setTitle( 'Minimum count' )
    .setValue( String( minCount || 2 ) ) );

  var stop = CardService.newSelectionInput()
    .setType( CardService.SelectionInputType.CHECK_BOX )
    .setFieldName( 'stop' );
  stop.addItem( 'Ignore stop-words (EN + PL)', 'yes', true === removeStop );
  input.addWidget( stop );

  input.addWidget( CardService.newTextButton()
    .setText( 'Analyze' )
    .setTextButtonStyle( CardService.TextButtonStyle.FILLED )
    .setOnClickAction( CardService.newAction().setFunctionName( 'kngAnalyze' ) ) );
  builder.addSection( input );

  if ( result ) {
    var res = CardService.newCardSection().setHeader( 'Top phrases — total words: ' + result.totalWords );
    if ( ! result.rows.length ) {
      res.addWidget( CardService.newTextParagraph().setText( 'No phrases above the threshold.' ) );
    } else {
      var lines = result.rows.map( function ( r ) {
        return '<b>' + r.count + '</b> × ' + r.phrase + '  (' + r.pct + '%)';
      } ).join( '<br>' );
      res.addWidget( CardService.newTextParagraph().setText( lines ) );
    }
    builder.addSection( res );
  }

  return builder.build();
}

function kngAnalyze( e ) {
  var f = ( e && e.commonEventObject && e.commonEventObject.formInputs ) || {};
  var text = kngFormString_( f, 'text' );
  var n = parseInt( kngFormString_( f, 'n' ), 10 ) || 2;
  var minCount = parseInt( kngFormString_( f, 'min' ), 10 ) || 2;
  var removeStop = kngFormArray_( f, 'stop' ).indexOf( 'yes' ) !== -1;

  var tokens = kngTokenize_( text, removeStop );
  var counts = kngCountNgrams_( tokens, n );
  var rows = Object.keys( counts.map ).map( function ( g ) {
    return { phrase: g, count: counts.map[ g ], pct: Math.round( ( counts.map[ g ] / counts.total ) * 10000 ) / 100 };
  } ).filter( function ( r ) {
    return r.count >= minCount;
  } ).sort( function ( a, b ) {
    return b.count - a.count || a.phrase.localeCompare( b.phrase );
  } ).slice( 0, 30 );

  var result = { totalWords: tokens.length, rows: rows };
  var card = kngBuildCard_( text, n, minCount, removeStop, result );

  return CardService.newActionResponseBuilder()
    .setNavigation( CardService.newNavigation().updateCard( card ) )
    .build();
}

/**
 * Keyword n-gram counter — Google Sheets custom function.
 *
 * Provides the =NGRAMS() spreadsheet function, which counts how often n-word
 * phrases repeat in text or a range of cells. It runs as a pure custom function:
 * it only processes the values passed to it, requests no OAuth scopes, makes no
 * network calls, and stores nothing.
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

function kngFlatten_( input ) {
  if ( Array.isArray( input ) ) {
    var parts = [];
    input.forEach( function ( row ) {
      if ( Array.isArray( row ) ) {
        row.forEach( function ( v ) { if ( v !== '' && v !== null && v !== undefined ) { parts.push( String( v ) ); } } );
      } else if ( row !== '' && row !== null && row !== undefined ) {
        parts.push( String( row ) );
      }
    } );
    return parts.join( ' \n ' );
  }
  return ( input === null || input === undefined ) ? '' : String( input );
}

/**
 * Count repeated n-word phrases in text or a range of cells.
 *
 * @param {A1:A50} input Text, a cell, or a range of cells to analyze.
 * @param {2} n Phrase length in words, 1 to 5. Defaults to 2.
 * @param {2} min_count Minimum number of repeats to include. Defaults to 2.
 * @param {FALSE} ignore_stopwords TRUE to skip common stop-words (EN + PL). Defaults to FALSE.
 * @return A table of phrases with their count and share (%), most frequent first.
 * @customfunction
 */
function NGRAMS( input, n, min_count, ignore_stopwords ) {
  n = n ? Math.max( 1, Math.min( 5, Math.floor( n ) ) ) : 2;
  min_count = min_count ? Math.max( 1, Math.floor( min_count ) ) : 2;
  var removeStop = ( true === ignore_stopwords );

  var tokens = kngTokenize_( kngFlatten_( input ), removeStop );
  var counts = kngCountNgrams_( tokens, n );

  var rows = Object.keys( counts.map ).map( function ( g ) {
    return [ g, counts.map[ g ], Math.round( ( counts.map[ g ] / counts.total ) * 10000 ) / 100 ];
  } ).filter( function ( r ) {
    return r[ 1 ] >= min_count;
  } ).sort( function ( a, b ) {
    return b[ 1 ] - a[ 1 ] || String( a[ 0 ] ).localeCompare( String( b[ 0 ] ) );
  } );

  var out = [ [ 'phrase', 'count', '%' ] ];
  if ( ! rows.length ) {
    out.push( [ '(none above threshold)', '', '' ] );
    return out;
  }
  return out.concat( rows );
}

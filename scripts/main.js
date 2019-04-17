/**
 * @vars are stable
 */
const
  doc           = document,
  player1       = doc.querySelector( '#player1' ),
  player2       = doc.querySelector( '#player2' ),
  generateBtn   = doc.querySelector( '#generate' ),
  fillBtn       = doc.querySelector( '#fill' ),
  minMaxSection = doc.querySelector( '#minMaxSection' ),
  find          = doc.querySelector( '#find' ),
  maxS          = doc.querySelector( '#maxS' ),
  minS          = doc.querySelector( '#minS' ),
  sidlova       = doc.querySelector( '#sidlova' ),
  tableBlock1   = doc.querySelector( '#table1' ),
  tableBlock2   = doc.querySelector( '#table2' ),
  max1          = doc.querySelector( '#max1' ),
  max2          = doc.querySelector( '#max2' ),
  container1    = doc.querySelector( '#container1' ),
  container2    = doc.querySelector( '#container2' );

/**
 * @vars are dynamic
 */
let
  field    = [],
  tableP1,
  tableP2,
  sndRow   = [],
  _max     = -1000,
  _min     = 1000,
  valueSet = false,
  finished = false;

document.body.addEventListener( 'click', function ( e ) {
  if ( e.target.tagName === 'TD' && e.path[ 2 ].nodeName === 'TABLE' ) {
    if ( valueSet && !finished ) {
      e.target.classList.toggle( 'guessed' );
    }
  }
} );

generateBtn.addEventListener( 'click', function () {
  resetTable();
} );

fillBtn.addEventListener( 'click', function () {
  resetTable();
  fillTable();
  valueSet = true;
} );

find.addEventListener( 'click', function () {
  getPlayerOneStrategy();
  getPlayerTwoStrategy();
  maxS.innerText = _max;
  minS.innerText = _min;
  field.forEach( row => {
    row.forEach( ceil => {
      if ( ceil.html.classList.contains( 'guessed' ) ) {
        if ( ceil.html.classList.contains( 'checked' ) ) {
          ceil.html.classList.remove( 'checked' );
          ceil.html.classList.remove( 'guessed' );
          ceil.html.classList.add( 'correct' );
        } else {
          ceil.html.classList.remove( 'checked' );
          ceil.html.classList.remove( 'guessed' );
          ceil.html.classList.add( 'wrong' );
        }
      }
    } );
  } );
  sndRow.forEach( ceil => {
    if ( ceil.classList.contains( 'guessed' ) ) {
      if ( ceil.classList.contains( 'checked' ) ) {
        ceil.classList.remove( 'checked' );
        ceil.classList.remove( 'guessed' );
        ceil.classList.add( 'correct' );
      } else {
        ceil.classList.remove( 'checked' );
        ceil.classList.remove( 'guessed' );
        ceil.classList.add( 'wrong' );
      }
    }
  } );
  sidlova.innerText = _max === _min
                      ? _max
                      : 'Відсутня';
  finished = true;
} );
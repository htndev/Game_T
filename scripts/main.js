/**
 * @vars are stable
 */
const
  doc                    = document,
  firstPlayersStrategies = doc.querySelector( '#firstPlayersStrategies' ),
  secondPlayerStrategies = doc.querySelector( '#secondPlayerStrategies' ),
  generateBtn            = doc.querySelector( '#generate' ),
  fillBtn                = doc.querySelector( '#fill' ),
  minmaxBlockSection     = doc.querySelector( '#minmaxBlockSection' ),
  findBtn                = doc.querySelector( '#find' ),
  maxminBlock            = doc.querySelector( '#maxminBlock' ),
  minmaxBlock            = doc.querySelector( '#minmaxBlock' ),
  saddlePoint            = doc.querySelector( '#saddlePoint' ),
  tableBlock1            = doc.querySelector( '#table1' ),
  tableBlock2            = doc.querySelector( '#table2' ),
  max1                   = doc.querySelector( '#max1' ),
  max2                   = doc.querySelector( '#max2' ),
  container1             = doc.querySelector( '#container1' ),
  container2             = doc.querySelector( '#container2' );

/**
 * @vars are dynamic
 */
let
  firstPlayerTable  = [],
  tableOfFirstPlayer,
  tableOfSecondPlayer,
  secondPlayerTable = [],
  maxmin            = 1000,
  minmax            = 1000,
  valueSet          = false,
  finished          = false;

// Function that set bg to the ceil in firstPlayerTable
document.addEventListener( 'click', function ( e ) {
  // Checking if it's a playing firstPlayerTable
  if ( e.target.tagName === 'TD' && e.path[ 2 ].nodeName === 'TABLE' ) {
    // Checking if values are set and game not finished
    if ( valueSet && !finished ) {
      e.target.classList.toggle( 'guessed' );
    }
  }
} );

// Button that generate table
generateBtn.addEventListener( 'click', function () {
  if ( +firstPlayersStrategies.value > 0 && +firstPlayersStrategies.value < 11 && +secondPlayerStrategies.value > 0 && +secondPlayerStrategies.value < 11 ) {
    resetTable();
    settingGamingField();
  }
  try {
    if ( +firstPlayersStrategies.value > 0 && +firstPlayersStrategies.value < 11 && +secondPlayerStrategies.value > 0 && +secondPlayerStrategies.value < 11 ) {
      resetTable();
      settingGamingField();
    }
  } catch ( e ) {
    console.log( e.message );
  }
} );

// Button that responds for filling table's values
fillBtn.addEventListener( 'click', function () {
  resetTable();
  fillTable();
  valueSet = true;
} );

// Button that responds for finding values in table
findBtn.addEventListener( 'click', function () {
  if ( !finished ) {
    max1.innerHTML = '';
    max2.innerHTML = '';
    maxminBlock.innerHTML = '';
    minmaxBlock.innerHTML = '';
    saddlePoint.innerHTML = '';
    // Finding first player's strategies
    getPlayerOneStrategy();
    // Finding second player's strategies
    getPlayerTwoStrategy();
    minmaxBlock.innerText = minmax;
    maxminBlock.innerText = maxmin;
    // Setting correct or wrong flags of user
    firstPlayerTable.forEach( row => {
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
    secondPlayerTable.forEach( row => {
      row.forEach( ceil => {
        if ( ceil.element.classList.contains( 'guessed' ) ) {
          if ( ceil.element.classList.contains( 'checked' ) ) {
            ceil.element.classList.remove( 'checked' );
            ceil.element.classList.remove( 'guessed' );
            ceil.element.classList.add( 'correct' );
          } else {
            ceil.element.classList.remove( 'checked' );
            ceil.element.classList.remove( 'guessed' );
            ceil.element.classList.add( 'wrong' );
          }
        }
      } );
    } );
    saddlePoint.innerText = maxmin === minmax
                            ? minmax
                            : 'Відсутня';
    finished = true;
  }
} );
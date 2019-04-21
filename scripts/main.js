$( document ).ready( function () {
  $( '.tabs' ).tabs();
} );
const
  firstPlayerStrategies   = document.querySelector( '#firstPlayerStrategies' ),
  secondPlayerStrategies  = document.querySelector( '#secondPlayerStrategies' ),
  generateBtn             = document.querySelector( '#generate' ),
  generationSection       = document.querySelector( '#generationSection' ),
  fillBtn                 = document.querySelector( '#fill' ),
  functions               = document.querySelector( '#functions' ),
  minGenValue             = document.querySelector( '#minValue' ),
  maxGenValue             = document.querySelector( '#maxValue' ),
  simplifyBtn             = document.querySelector( '#simplifyGame' ),
  simplifyField           = document.querySelector( '#simplified' ),
  simplifyTab             = document.querySelector( '#sf' ),
  gameMatrixTab           = document.querySelector( '#gm' ),
  gamePriceTab            = document.querySelector( '#gp' ),
  functionReactionTab     = document.querySelector( '#fr' ),
  showSecondPlayer        = document.querySelector( '#showSecondPlayer' ),
  secondPlayerField       = document.querySelector( '#playerTwoField' ),
  findFunctionReactionBtn = document.querySelector( '#getFR' ),
  firstPlayerMaxes        = document.querySelector( '#firstPlayerMaxes' ),
  secondPlayerMaxes       = document.querySelector( '#secondPlayerMaxes' ),
  gamePricePlace          = document.querySelector( '#gamePricePlace' ),
  findPrice               = document.querySelector( '#findMinMax' );

let
  firstPlayerTableFR  = document.querySelector( '#tableFirstPlayer' ),
  mainTable           = document.querySelector( '#startTable' ),
  secondPlayerTableFR = document.querySelector( '#tableSecondPlayer' ),
  secondPlayerShown   = false,
  isFunctionReaction  = false,
  isFrFinished        = false,
  firstPlayerLength,
  secondPlayerLength,
  priceTable;

generateBtn.addEventListener( 'click', function () {
  generationSection.style.display = 'block';
  secondPlayerTableFR.innerHTML = firstPlayerTableFR.innerHTML = '';
  functions.style.display = 'block';
  firstPlayerLength = +firstPlayerStrategies.value;
  secondPlayerLength = +secondPlayerStrategies.value;
  createTable( firstPlayerLength, secondPlayerLength );
  firstPlayerTableFR.innerHTML = '';
  secondPlayerTableFR.innerHTML = '';
  gamePricePlace.innerHTML = '';
  toMatrix();
  showSecondPlayer.checked = false;
  secondPlayerShown = false;
  secondPlayerField.style.display = 'none';
  firstPlayerMaxes.children[ 1 ].innerHTML = '';
  secondPlayerMaxes.children[ 1 ].innerHTML = '';
} );

showSecondPlayer.addEventListener( 'click', function () {
  if ( !secondPlayerShown ) {
    secondPlayerShown = !secondPlayerShown;
    secondPlayerField.style.display = 'block';
    secondPlayerMaxes.style.display = 'block';
  } else {
    secondPlayerShown = !secondPlayerShown;
    secondPlayerField.style.display = 'none';
    secondPlayerMaxes.style.display = 'none';
  }
} );

findFunctionReactionBtn.addEventListener( 'click', function () {
  let playerOneTable = getInputsInTableArray( getTableInArray( firstPlayerTableFR.children[ 0 ] ) ),
      playerTwoTable = getInputsInTableArray( getTableInArray( secondPlayerTableFR.children[ 0 ] ) );
  isFrFinished = true;
  firstPlayerMaxes.children[ 1 ].innerHTML = '';
  secondPlayerMaxes.children[ 1 ].innerHTML = '';
  playerOneTable = switchArrayHeading( playerOneTable );
  for ( let row = 0; row < playerOneTable.length; row++ ) {
    findColMax( playerOneTable[ row ], row );
  }

  for ( let row = 0; row < playerTwoTable.length; row++ ) {
    findRowMax( playerTwoTable[ row ], row );
  }
  playerOneTable.forEach( row => {
    row.forEach( ceil => {
      if ( ceil.parentNode.classList.contains( 'guessed' ) ) {
        if ( ceil.parentNode.classList.contains( 'checked' ) ) {
          ceil.parentNode.classList.remove( 'checked' );
          ceil.parentNode.classList.remove( 'guessed' );
          ceil.parentNode.classList.add( 'correct' );
        } else {
          ceil.parentNode.classList.remove( 'checked' );
          ceil.parentNode.classList.remove( 'guessed' );
          ceil.parentNode.classList.add( 'wrong' );
        }
      }
    } );
  } );
  playerTwoTable.forEach( row => {
    row.forEach( ceil => {
      if ( ceil.parentNode.classList.contains( 'guessed' ) ) {
        if ( ceil.parentNode.classList.contains( 'checked' ) ) {
          ceil.parentNode.classList.remove( 'checked' );
          ceil.parentNode.classList.remove( 'guessed' );
          ceil.parentNode.classList.add( 'correct' );
        } else {
          ceil.parentNode.classList.remove( 'checked' );
          ceil.parentNode.classList.remove( 'guessed' );
          ceil.parentNode.classList.add( 'wrong' );
        }
      }
    } );
  } );
} );

gameMatrixTab.addEventListener( 'click', function () {
  isFunctionReaction = false;
  isFrFinished = false;
  firstPlayerTableFR.innerHTML = '';
  secondPlayerTableFR.innerHTML = '';
} );

gamePriceTab.addEventListener( 'click', function () {
  isFunctionReaction = false;
  isFrFinished = false;
  firstPlayerTableFR.innerHTML = '';
  secondPlayerTableFR.innerHTML = '';
  gamePricePlace.innerHTML = '';
  let table = createAliasTable( mainTable, gamePricePlace );
  fillTableFromMain( mainTable, table );
  appendAlphaBeta( table );
  priceTable = table;
} );

findPrice.addEventListener( 'click', function () {
  let table = getTableInArray( priceTable );
  table.forEach( ( element, index ) => {
    let minRowField = document.querySelector( `input[data-min-row="${ index + 1 }"]` );
    minRowField.value = findRowPrice( element );
  } );
  table = switchArrayHeading( table );
  table.forEach( ( element, index ) => {
    let maxColField = document.querySelector( `input[data-max-col="${ index + 1 }"]` );
    maxColField.value = findColPrice( element );
  } );
  let rowMax      = nodeListToArray( document.querySelectorAll( 'input[data-min-row]' ) ),
      maxRow      = rowMax[ 0 ],
      maxRowArray = [ rowMax[ 0 ] ];
  rowMax.forEach( element => {
    if ( +element.value === +maxRow.value ) {
      maxRowArray.push( element );
    } else if ( +element.value > +maxRow.value ) {
      maxRow = element;
      maxRowArray = [];
      maxRowArray.push( element );
    }
  } );
  let colMin       = nodeListToArray( document.querySelectorAll( 'input[data-max-col]' ) ),
      minCol       = colMin[ 0 ],
      minColsArray = [ colMin[ 0 ] ];
  colMin.forEach( element => {
    if ( +element.value === +minCol.value ) {
      minColsArray.push( element );
    } else if ( +element.value < +minCol.value ) {
      minCol = element;
      minColsArray = [];
      minColsArray.push( element );
    }
  } );
  minColsArray.forEach( element => {
    element.parentNode.classList.add( 'guessed' );
  } );
  maxRowArray.forEach( element => {
    element.parentNode.classList.add( 'checked' );
  } );
  let saddlePointSet = false;
  for ( let i = 0; i < maxRowArray.length; i++ ) {
    for ( let j = 0; j < minColsArray.length; j++ ) {
      if ( !saddlePointSet ) {
        if ( +maxRowArray[ i ].value === +minColsArray[ j ].value ) {
          let saddlePoint = priceTable.querySelector( `td[data-col="${ minColsArray[ j ].getAttribute( 'data-max-col' ) }"][data-row="${ maxRowArray[ i ].getAttribute( 'data-min-row' ) }"]` );
          saddlePoint.classList.add( 'correct' );
          saddlePointSet = true;
        }
      }
    }
  }
} );

simplifyTab.addEventListener( 'click', function () {
  isFunctionReaction = false;
  isFrFinished = false;
  // firstPlayerTableFR.innerHTML = '';
  // secondPlayerTableFR.innerHTML = '';
} );

fillBtn.addEventListener( 'click', function () {
  let table  = getTableInArray( mainTable ),
      inputs = getInputsInTableArray( table ),
      min    = +minGenValue.value,
      max    = +maxGenValue.value;
  inputs.forEach( row => {
    row.forEach( ceil => {
      ceil.value = generateValue( min, max );
    } );
  } );
  if ( !!gamePricePlace.innerHTML ) {
    gamePricePlace.innerHTML = '';
    let table = createAliasTable( mainTable, gamePricePlace );
    fillTableFromMain( mainTable, table );
    appendAlphaBeta( table );
    priceTable = table;
  }
  if ( firstPlayerTableFR.children[ 0 ] !== undefined && secondPlayerTableFR.children[ 0 ] !== undefined ) {
    fillTableFromMain( mainTable, firstPlayerTableFR, secondPlayerTableFR );
    getTableInArray( firstPlayerTableFR ).forEach( row => {
      row.forEach( ceil => {
        ceil.classList.remove( 'checked' );
        ceil.classList.remove( 'correct' );
        ceil.classList.remove( 'wrong' );
        ceil.classList.remove( 'guessed' );
      } );
    } );
    getTableInArray( secondPlayerTableFR ).forEach( row => {
      row.forEach( ceil => {
        ceil.classList.remove( 'checked' );
        ceil.classList.remove( 'correct' );
        ceil.classList.remove( 'wrong' );
        ceil.classList.remove( 'guessed' );
      } );
    } );
  }
  firstPlayerMaxes.children[ 1 ].innerHTML = '';
  secondPlayerMaxes.children[ 1 ].innerHTML = '';
  isFrFinished = false;
} );

document.addEventListener( 'click', function ( e ) {
  if ( isFunctionReaction ) {
    if ( e.target.hasAttribute( 'data-is-fr' ) ) {
      if ( !isFrFinished ) {
        e.target.parentNode.classList.toggle( 'guessed' );
      }
    }
  }
} );

functionReactionTab.addEventListener( 'click', function () {
  if ( !functionReactionTab.classList.contains( 'active' ) ) {
    firstPlayerTableFR.innerHTML = '';
    secondPlayerTableFR.innerHTML = '';
    isFunctionReaction = true;
    secondPlayerShown = false;
    showSecondPlayer.checked = false;
    secondPlayerField.style.display = 'none';
    secondPlayerMaxes.style.display = 'none';
    firstPlayerMaxes.children[ 1 ].innerHTML = '';
    secondPlayerMaxes.children[ 1 ].innerHTML = '';
    generateFunctionReactionTables();
    fillTableFromMain( mainTable, firstPlayerTableFR, secondPlayerTableFR );
  }
} );

simplifyBtn.addEventListener( 'click', function () {
  /**
   * Реализовать автоматическое сокращение строк
   */
} );

// Removing ads
setTimeout( function () {
  let elem   = document.querySelector( '.cumf_bt_form_wrapper' ),
      cblink = document.querySelector( '.cbalink' ),
      script = document.body.querySelector( 'script' );
  try {
    elem.parentNode.removeChild( elem );
    cblink.parentNode.removeChild( cblink );
    script.parentNode.removeChild( script );
  } catch ( e ) {}
}, 100 );
const
  functionReactionTab     = document.querySelector( '#fr' ),
  showSecondPlayer        = document.querySelector( '#showSecondPlayer' ),
  secondPlayerField       = document.querySelector( '#playerTwoField' ),
  findFunctionReactionBtn = document.querySelector( '#getFR' ),
  firstPlayerMaxes        = document.querySelector( '#firstPlayerMaxes' ),
  secondPlayerMaxes       = document.querySelector( '#secondPlayerMaxes' );

let isFunctionReaction  = false,
    isFrFinished        = false,
    secondPlayerTableFR = document.querySelector( '#tableSecondPlayer' ),
    firstPlayerTableFR  = document.querySelector( '#tableFirstPlayer' );

function generateFunctionReactionTables () {
  let firstPlayerInner,
      secondPlayerInner;
  firstPlayerInner = secondPlayerInner = mainTable.innerHTML;
  let table1 = document.createElement( 'table' ),
      table2 = document.createElement( 'table' );
  table1.innerHTML = firstPlayerInner;
  table2.innerHTML = secondPlayerInner;
  firstPlayerTableFR.appendChild( table1 );
  secondPlayerTableFR.appendChild( table2 );
}

function findColMax ( row, index ) {
  findMaxes( row, index, firstPlayerMaxes.children[ 1 ], 'B', 'A' );
}

function findRowMax ( row, index ) {
  findMaxes( row, index, secondPlayerMaxes.children[ 1 ], 'A', 'B' );
}

function findMaxes ( row, index, placeForStrategies, rowLetter, colLetter ) {
  let maxCeils   = [],
      maxIndexes = [],
      max        = -1000;
  for ( let ceil = 0; ceil < row.length; ceil++ ) {
    if ( +row[ ceil ].value === max ) {
      maxIndexes.push( ceil );
      maxCeils.push( row[ ceil ] );
    } else if ( +row[ ceil ].value > max ) {
      max = +row[ ceil ].value;
      maxCeils = [];
      maxIndexes = [];
      maxIndexes.push( ceil );
      maxCeils.push( row[ ceil ] );
    }
  }
  let str = '';
  maxIndexes.forEach( ( element, index ) => {
    str += `${ colLetter }<sub>${ element + 1 }</sub>${ index !== maxIndexes.length - 1
                                                        ? ', '
                                                        : '' }`;
  } );
  placeForStrategies.innerHTML += `<p>${ index + 1 }. š<sub>${ colLetter }</sub>(${ rowLetter }<sub>${ index + 1 }</sub>) = ${ maxIndexes.length > 1
                                                                                                                               ? `{ ${ str } }`
                                                                                                                               : str }; Û<sub>${ rowLetter }</sub>(${ colLetter }<sub>${ index + 1 }</sub>) = ${ maxCeils[ 0 ].value }</p>`;
  maxCeils.forEach( element => {
    element.parentNode.classList.add( 'checked' );
  } );
}

function findRowPrice ( row ) {
  let min = 1000;
  for ( let ceil = 0; ceil < row.length; ceil++ ) {
    if ( +row[ ceil ].children[ 0 ].value < min ) {
      min = +row[ ceil ].children[ 0 ].value;
    }
  }
  return min;
}

function findColPrice ( col ) {
  let max = -1000;
  for ( let ceil = 0; ceil < col.length; ceil++ ) {
    if ( +col[ ceil ].children[ 0 ].value > max ) {
      max = +col[ ceil ].children[ 0 ].value;
    }
  }
  return max;
}

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
    isCroppingYourself = false;
  }
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
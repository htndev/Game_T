// A Player
function findFirstPlayerColMax ( index, maxVal ) {
  let tmpArr = []; // Array, which contains ceil in current column
  for ( let i = 0; i < maxVal; i++ ) {
    tmpArr.push( firstPlayerTable[ i ][ index ] );
  }
  let max      = -1000,
      maxes    = [],
      maxIndex = 0;
  for ( let i = 0; i < tmpArr.length; i++ ) {
    if ( tmpArr[ i ].value === max ) {
      maxes.push( tmpArr[ i ] );
    } else if ( tmpArr[ i ].value > max ) {
      maxIndex = i;
      max = tmpArr[ i ].value;
      maxes = [];
      maxes.push( tmpArr[ i ] );
    }
  }
  max1.innerHTML += `<p>${ index + 1 }. Š<sub>A</sub>(B<sub>${ index + 1 }</sub>) = A<sub>${ maxIndex + 1 }</sub>; Ŭ<sub>A</sub>(B<sub>${ index + 1 }</sub>) = ${ max }</p>`;
  if(minmax > max){
    minmax = max;
  }
  maxes.forEach( ceil => {
    ceil.html.classList.add( 'checked' );
  } );
}

function getPlayerOneStrategy () {
  for ( let row = 0; row < +secondPlayerStrategies.value; row++ ) {
    findFirstPlayerColMax( row, +firstPlayersStrategies.value );
  }
}

// B Player
function findSecondPlayerRowMax ( row, index ) {
  let min        = 1000,
      minIndexes = [];
  for ( let ceil = 0; ceil < row.length; ceil++ ) {
    if ( row[ ceil ].value === min ) {
      minIndexes.push( ceil );
    } else if ( row[ ceil ].value < min ) {
      min = row[ ceil ].value;
      minIndexes = [];
      minIndexes.push( ceil );
    }
  }
  max2.innerHTML += `<p>${ index + 1 }. Š<sub>B</sub>(A<sub>${ index + 1 }</sub>) = B<sub>${ minIndexes[ 0 ] + 1 }</sub>; Ŭ<sub>B</sub>(A<sub>${ index + 1 }</sub>) = ${ min * -1 }</p>`;
  if(maxmin < min){
    maxmin = min;
  }
  minIndexes.forEach( ind => {
    index === 0
    ? secondPlayerTable[ ind ].classList.add( 'checked' )
    : secondPlayerTable[ ind + ( +secondPlayerStrategies.value * index ) ].classList.add( 'checked' );
  } );
}

function getPlayerTwoStrategy () {
  firstPlayerTable.forEach( ( row, index ) => {
    findSecondPlayerRowMax( row, index );
  } );
}
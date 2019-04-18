// A Player
function findFirstPlayerColMax ( index, maxVal ) {
  let tmpArr = []; // Array, which contains ceil in current column
  for ( let i = 0; i < maxVal; i++ ) {
    if ( firstPlayerTable[ i ][ index ] !== undefined ) {
      tmpArr.push( firstPlayerTable[ i ][ index ] );
    }
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
  if ( minmax > max ) {
    minmax = max;
  }
  maxes.forEach( ceil => {
    ceil.html.classList.add( 'checked' );
  } );
}

function getPlayerOneStrategy () {
  for ( let row = 0; row < +firstPlayersStrategies.value; row++ ) {
    findFirstPlayerColMax( row, +firstPlayersStrategies.value );
  }
}

// B Player
function findSecondPlayerRowMax ( row, index ) {
  let min        = 1000,
      minIndexes = [];
  for ( let ceil = 0; ceil < row.length; ceil++ ) {
    if ( row[ ceil ] === min ) {
      minIndexes.push( row[ ceil ] );
    } else if ( row[ ceil ].value < min ) {
      min = row[ ceil ].value;
      minIndexes = [];
      minIndexes.push( row[ ceil ] );
    }
  }
  max2.innerHTML += `<p>${ index + 1 }. Š<sub>B</sub>(A<sub>${ index + 1 }</sub>) = B<sub>${ minIndexes[ 0 ].value + 1 }</sub>; Ŭ<sub>B</sub>(A<sub>${ index + 1 }</sub>) = ${ min }</p>`;
  minIndexes.forEach( element => {
    element.element.classList.add( 'checked' );
  } );

  if ( maxmin < min ) { maxmin = min; }
}

function getPlayerTwoStrategy () {
  let tmpEvery = [];
  secondPlayerTable.forEach( ( element, index ) => {
    tmpEvery[ index ] = element;
  } );
  for ( let i = 0; i < tmpEvery.length; i++ ) {
    secondPlayerTable[ i ] = {
      element: tmpEvery[ i ],
      value  : +tmpEvery[ i ].innerText
    };
  }
  let tmp = [],
      k   = 0;
  for ( let i = 0; i < +secondPlayerStrategies.value; i++ ) {
    let arr = [];
    for ( let j = 0; j < +firstPlayersStrategies.value; j++ ) {
      arr.push( secondPlayerTable[ k ] );
      k++;
    }
    tmp.push( arr );
  }
  secondPlayerTable = tmp;
  secondPlayerTable.forEach( ( row, index ) => {
    findSecondPlayerRowMax( row, index );
  } );
}
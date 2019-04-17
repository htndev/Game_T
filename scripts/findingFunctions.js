// A Player
function findFirstPlayerColMax ( index, maxVal, len ) {
  let tmpArr = [];
  for ( let i = 0; i < maxVal; i++ ) {
    tmpArr.push( field[ i ][ index ] );
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
  if ( max < _min ) {
    _min = max;
  }
  maxes.forEach( ceil => {
    ceil.html.classList.add( 'checked' );
  } );
  max1.innerHTML += `<p></p>`;
}

function getPlayerOneStrategy () {
  for ( let row = 0; row < +player2.value; row++ ) {
    findFirstPlayerColMax( row, +player1.value, +player2.value );
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
  max2.innerHTML += `<p>${ index + 1 }. Š<sub>B</sub>(A<sub>${ index + 1 }</sub>) = B<sub>${ minIndexes[ 0 ] + 1 }</sub>; Ŭ<sub>B</sub>(A<sub>${ index + 1 }</sub>) = ${ min }</p>`;
  if ( min > _max ) {
    _max = min;
  }
  minIndexes.forEach( ind => {
    switch ( index ) {
      case 0:
        sndRow[ ind ].classList.add( 'checked' );
        break;
      case 1:
        sndRow[ ind + ( +player2.value ) ].classList.add( 'checked' );
        break;
      case 2:
        sndRow[ ind + ( +player2.value * 2 ) ].classList.add( 'checked' );
        break;
      case 3:
        sndRow[ ind + ( +player2.value * 3 ) ].classList.add( 'checked' );
        break;
      case 4:
        sndRow[ ind + ( +player2.value * 4 ) ].classList.add( 'checked' );
        break;
      case 5:
        sndRow[ ind + ( +player2.value * 5 ) ].classList.add( 'checked' );
        break;
      case 6:
        sndRow[ ind + ( +player2.value * 6 ) ].classList.add( 'checked' );
        break;
      case 7:
        sndRow[ ind + ( +player2.value * 7 ) ].classList.add( 'checked' );
        break;
      case 8:
        sndRow[ ind + ( +player2.value * 8 ) ].classList.add( 'checked' );
        break;
      case 9:
        sndRow[ ind + ( +player2.value * 9 ) ].classList.add( 'checked' );
        break;
    }
  } );
}

function getPlayerTwoStrategy () {
  field.forEach( ( row, index ) => {
    findSecondPlayerRowMax( row, index );
  } );
}
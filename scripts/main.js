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

function getRandomValue ( min, max ) {
  return Math.floor( Math.random() * ( max - min ) + min );
}

function fillTable () {
  _min = 1000;
  _max = -1000;
  let skip = 0;
  let min = +doc.getElementById( 'min' ).value,
      max = +doc.getElementById( 'max' ).value;
  for ( let row = 0; row < field.length; row++ ) {
    for ( let ceil = 0; ceil < field[ row ].length; ceil++ ) {
      field[ row ][ ceil ].value = getRandomValue( min, max );
      field[ row ][ ceil ].html.innerText = field[ row ][ ceil ].value;
      sndRow[ ceil + skip ].innerText = field[ row ][ ceil ].value * -1;
    }
    skip += +player2.value;
  }
  find.style.display = 'block';
}

function createTable ( player1, player2 ) {
  let header1 = doc.createElement( 'tr' ),
      header2 = doc.createElement( 'tr' ),
      empty1  = doc.createElement( 'th' ),
      empty2  = doc.createElement( 'th' );
  header1.appendChild( empty1 );
  header2.appendChild( empty2 );
  for ( let i = 0; i < player2; i++ ) {
    let th1 = doc.createElement( 'th' );
    th1.innerHTML = `B <sub>${ i + 1 }</sub>`;
    let th2 = doc.createElement( 'th' );
    th2.innerHTML = `B <sub>${ i + 1 }</sub>`;
    header1.appendChild( th1 );
    header2.appendChild( th2 );
  }
  tableP1.appendChild( header1 );
  tableP2.appendChild( header2 );
  for ( let i = 0; i < player1; i++ ) {
    createRow( i, tableP1, tableP2, player2 );
  }
  let h4_1 = doc.createElement( 'h4' ),
      h4_2 = doc.createElement( 'h4' );
  h4_1.innerText = 'Таблиця гравця 1';
  h4_2.innerText = 'Таблиця гравця 2';
  h4_1.classList.add( 'center-align' );
  h4_2.classList.add( 'center-align' );
  let place1 = doc.querySelector( '#table1' ),
      place2 = doc.querySelector( '#table2' );
  place1.appendChild( h4_1 );
  place1.appendChild( tableP1 );
  place2.appendChild( h4_2 );
  place2.appendChild( tableP2 );
}

function getPlayerOneStrategy () {
  for ( let row = 0; row < +player2.value; row++ ) {
    findFirstPlayerColMax( row, +player1.value, +player2.value );
  }
}

// A Plaer
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

function getPlayerTwoStrategy () {
  field.forEach( ( row, index ) => {
    findSecondPlayerRowMax( row, index );
  } );
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

function resetTable () {
  max1.innerHTML = '';
  max2.innerHTML = '';
  tableP1 = tableP2 = null;
  tableBlock1.innerHTML = '';
  tableBlock2.innerHTML = '';
  sndRow.length = field.length = 0;
  tableP1 = doc.createElement( 'table' );
  tableP2 = doc.createElement( 'table' );
  createTable( player1.value, player2.value );
  minMaxSection.style.display = 'block';
  tableBlock1.style.display = 'block';
  tableBlock2.style.display = 'block';
  container1.style.display = 'block';
  container2.style.display = 'block';
  if ( !doc.querySelector( '#showFirst' ).checked ) {
    tableBlock1.style.display = 'none';
    container1.style.display = 'none';
  }
  if ( !doc.querySelector( '#showSecond' ).checked ) {
    container2.style.display = 'none';
    tableBlock2.style.display = 'none';
  }
  maxS.innerHTML = '';
  minS.innerHTML = '';
  sidlova.innerHTML = '';
  finished = false;
  valueSet = false;
}

function createRow ( rowIndex, table1, table2, len ) {
  let th1 = doc.createElement( 'th' ),
      tr1 = doc.createElement( 'tr' );
  let th2 = doc.createElement( 'th' ),
      tr2 = doc.createElement( 'tr' );
  let row = [],
      str = `A <sub>${ rowIndex + 1 }</sub>`;
  th2.innerHTML = th1.innerHTML = str;
  tr1.appendChild( th1 );
  tr2.appendChild( th2 );
  for ( let i = 0; i < len; i++ ) {
    createCeil( tr1, tr2, row );
  }
  field.push( row );
  table1.appendChild( tr1 );
  table2.appendChild( tr2 );
}

function createCeil ( tr1, tr2, rowArray ) {
  let td1 = doc.createElement( 'td' ),
      td2 = doc.createElement( 'td' );
  rowArray.push( {
    html : td1,
    value: undefined
  } );
  sndRow.push( td2 );
  tr1.appendChild( td1 );
  tr2.appendChild( td2 );
}
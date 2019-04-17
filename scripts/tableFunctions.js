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

function getRandomValue ( min, max ) {
  return Math.floor( Math.random() * ( max - min ) + min );
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
// Setting values to the tables
function fillTable () {
  minmax = 1000;
  maxmin = -1000;
  /**
   * @var indexForSecondTable using for indexing second player's table
   * @type {number}
   */
  let min = +doc.getElementById( 'min' ).value,
      max = +doc.getElementById( 'max' ).value,
      indexForSecondTable = 0;
  for ( let row = 0; row < firstPlayerTable.length; row++ ) {
    for ( let ceil = 0; ceil < firstPlayerTable[ row ].length; ceil++ ) {
      firstPlayerTable[ row ][ ceil ].value = getRandomValue( min, max );
      firstPlayerTable[ row ][ ceil ].html.innerText = firstPlayerTable[ row ][ ceil ].value;
      secondPlayerTable[ indexForSecondTable ].innerText = firstPlayerTable[ row ][ ceil ].value * -1;
      indexForSecondTable++;
    }
  }
  findBtn.style.display = 'block';
}

// Creating gaming tables
function createTables ( firstPlayerStrategies, secondPlayerStrategies ) {
  let header1 = doc.createElement( 'tr' ),
      header2 = doc.createElement( 'tr' ),
      empty1  = doc.createElement( 'th' ),
      empty2  = doc.createElement( 'th' );
  header1.appendChild( empty1 );
  header2.appendChild( empty2 );
  for ( let i = 0; i < firstPlayerStrategies; i++ ) {
    let th1 = doc.createElement( 'th' );
    th1.innerHTML = `B <sub>${ i + 1 }</sub>`;
    let th2 = doc.createElement( 'th' );
    th2.innerHTML = `B <sub>${ i + 1 }</sub>`;
    header1.appendChild( th1 );
    header2.appendChild( th2 );
  }
  tableOfFirstPlayer.appendChild( header1 );
  tableOfSecondPlayer.appendChild( header2 );
  for ( let i = 0; i < secondPlayerStrategies; i++ ) {
    createRow( i, tableOfFirstPlayer, tableOfSecondPlayer, firstPlayerStrategies );
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
  place1.appendChild( tableOfFirstPlayer );
  place2.appendChild( h4_2 );
  place2.appendChild( tableOfSecondPlayer );
}

function getRandomValue ( min, max ) {
  return Math.floor( Math.random() * ( max - min ) + min );
}

// Cleaning gaming field, table of minmax, settings
function resetTable () {
  max1.innerHTML = '';
  max2.innerHTML = '';
  maxminBlock.innerHTML = '';
  minmaxBlock.innerHTML = '';
  saddlePoint.innerHTML = '';
  finished = false;
  valueSet = false;
  firstPlayerTable.forEach( row => {
    row.forEach( ceil => {
      ceil.html.removeAttribute( 'class' );
    } );
  } );
  secondPlayerTable.forEach( row => {
    if(row.nodeName === 'TD'){
      row.removeAttribute('class');
    }
    else {
      row.forEach( ceil => {
        ceil.element.removeAttribute( 'class' );
    } );
    }
  } );
}

// Generate user settings field
function settingGamingField () {
  tableOfFirstPlayer = tableOfSecondPlayer = null;
  tableBlock1.innerHTML = '';
  tableBlock2.innerHTML = '';
  secondPlayerTable.length = firstPlayerTable.length = 0;
  tableOfFirstPlayer = doc.createElement( 'table' );
  tableOfSecondPlayer = doc.createElement( 'table' );
  createTables( firstPlayersStrategies.value, secondPlayerStrategies.value );
  minmaxBlockSection.style.display = 'block';
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
}

// Creating a row of the tables
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
  firstPlayerTable.push( row );
  table1.appendChild( tr1 );
  table2.appendChild( tr2 );
}

// Creating a ceil in the row
function createCeil ( tr1, tr2, rowArray ) {
  let td1 = doc.createElement( 'td' ),
      td2 = doc.createElement( 'td' );
  rowArray.push( {
    html : td1,
    value: undefined
  } );
  secondPlayerTable.push( td2 );
  tr1.appendChild( td1 );
  tr2.appendChild( td2 );
}
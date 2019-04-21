function createTable ( firstPlayerStrategies, secondPlayerStrategies ) {
  mainTable.innerHTML = '';
  let thead  = document.createElement( 'thead' ),
      headTr = document.createElement( 'tr' );
  let emptyCeil = document.createElement( 'th' );
  thead.appendChild( emptyCeil );
  for ( let i = 1; i <= secondPlayerStrategies; i++ ) {
    let th = document.createElement( 'th' );
    th.dataset.cols = i;
    th.innerHTML = `B<sub>${ i }</sub>`;
    thead.appendChild( th );
  }
  let tbody = document.createElement( 'tbody' );
  for ( let i = 1; i <= firstPlayerStrategies; i++ ) {
    let th = document.createElement( 'th' ),
        tr = document.createElement( 'tr' );
    th.dataset.rows = i;
    th.innerHTML = `A<sub>${ i }</sub>`;
    tr.appendChild( th );
    for ( let ceil = 1; ceil <= secondPlayerStrategies; ceil++ ) {
      let td    = document.createElement( 'td' ),
          input = document.createElement( 'input' );
      input.type = 'text';
      input.classList.add( 'browser-default' );
      input.dataset.row = i;
      input.dataset.col = ceil;
      td.dataset.row = i;
      td.dataset.col = ceil;
      td.appendChild( input );
      tr.appendChild( td );
    }
    tbody.appendChild( tr );
  }
  mainTable.appendChild( thead );
  mainTable.appendChild( tbody );
}

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

function fillTableFromMain ( mainTable, firstTable, secondTable ) {
  if ( secondTable === undefined ) {
    let inputs = getInputsInTableArray( getTableInArray( mainTable ) ),
        table  = getInputsInTableArray( getTableInArray( firstTable ) ),
        values = getValuesFromInputArray( inputs );
    for ( let row = 0; row < values.length; row++ ) {
      for ( let ceil = 0; ceil < values[ row ].length; ceil++ ) {
        fillCeil( table[ row ][ ceil ], values[ row ][ ceil ] );
      }
    }
  } else {
    let inputs = getInputsInTableArray( getTableInArray( mainTable ) ),
        t1i    = getInputsInTableArray( getTableInArray( firstTable.children[ 0 ] ) ),
        t2i    = getInputsInTableArray( getTableInArray( secondTable.children[ 0 ] ) ),
        values = getValuesFromInputArray( inputs );
    for ( let row = 0; row < values.length; row++ ) {
      for ( let ceil = 0; ceil < values[ row ].length; ceil++ ) {
        fillCeil( t1i[ row ][ ceil ], values[ row ][ ceil ] );
        fillCeil( t2i[ row ][ ceil ], values[ row ][ ceil ] * -1 );
        t1i[ row ][ ceil ].dataset.isFr = '';
        t2i[ row ][ ceil ].dataset.isFr = '';
      }
    }
  }

  function fillCeil ( element, value ) {
    element.disabled = true;
    element.value = value;
  }
}

function appendAlphaBeta ( table ) {
  let theadTr = table.querySelector( 'thead' ).querySelector( 'tr' );
  let alpha = document.createElement( 'th' );
  alpha.innerText = 'α';
  alpha.style.color = '#ED4C67';
  theadTr.appendChild( alpha );
  let tbody = table.querySelector( 'tbody' ).querySelectorAll( 'tr' );
  tbody = nodeListToArray( tbody );
  tbody.forEach( ( element, index ) => {
    let th    = document.createElement( 'th' ),
        input = document.createElement( 'input' );
    input.dataset.minRow = index + 1;
    input.type = 'text';
    input.classList.add( 'browser-default' );
    input.disabled = true;
    th.appendChild( input );
    element.appendChild( th );
  } );
  let betaRow = document.createElement( 'tr' ),
      beta    = document.createElement( 'th' );
  beta.style.color = '#1289A7';
  beta.innerText = 'β';
  let tfoot = document.createElement( 'tfoot' );
  betaRow.appendChild( beta );
  let rowLength = tbody[ 0 ].querySelectorAll( 'td' ).length;
  for ( let i = 0; i < rowLength; i++ ) {
    let td    = document.createElement( 'td' ),
        input = document.createElement( 'input' );
    input.classList.add( 'browser-default' );
    input.type = 'text';
    input.dataset.maxCol = i + 1;
    input.disabled = true;
    td.appendChild( input );
    betaRow.appendChild( td );
  }
  let empty = document.createElement( 'td' );
  betaRow.appendChild( empty );
  tfoot.appendChild( betaRow );
  table.appendChild( tfoot );
}

function createGamePriceTable ( table, place ) {
  let gamePriceTable = document.createElement( 'table' );
  gamePriceTable.innerHTML = table.innerHTML;
}

function switchArrayHeading ( array ) {
  let tmp = [];
  for ( let row = 0; row < array[ 0 ].length; row++ ) {
    let tmpArr = [];
    for ( let ceil = 0; ceil < array.length; ceil++ ) {
      tmpArr.push( array[ ceil ][ row ] );
    }
    tmp.push( tmpArr );
  }
  return tmp;
}
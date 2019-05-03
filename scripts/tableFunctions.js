/**
 * Creating main table
 */
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
    th.setAttribute( 'onclick', 'javascript: void(0)' );
    th.dataset.cd = '';
    thead.appendChild( th );
  }
  let tbody = document.createElement( 'tbody' );
  for ( let i = 1; i <= firstPlayerStrategies; i++ ) {
    let th = document.createElement( 'th' ),
        tr = document.createElement( 'tr' );
    th.dataset.rows = i;
    th.setAttribute( 'onclick', 'javascript: void(0)' );
    th.innerHTML = `A<sub>${ i }</sub>`;
    th.dataset.cl = '';
    tr.appendChild( th );
    for ( let ceil = 1; ceil <= secondPlayerStrategies; ceil++ ) {
      let td    = document.createElement( 'td' ),
          input = document.createElement( 'input' );
      input.type = 'text';
      input.classList.add( 'browser-default' );
      td.setAttribute( 'onclick', 'javascript: void(0)' );
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

function generateValue ( min, max ) {
  return Math.floor( Math.random() * ( max - min ) + min );
}
const
  gamePricePlace = document.querySelector( '#gamePricePlace' ),
  findPrice      = document.querySelector( '#findMinMax' ),
  gamePriceTab   = document.querySelector( '#gp' );
let priceTable;

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

gamePriceTab.addEventListener( 'click', function () {
  isFunctionReaction = false;
  isFrFinished = false;
  isCroppingYourself = false;
  firstPlayerTableFR.innerHTML = '';
  secondPlayerTableFR.innerHTML = '';
  gamePricePlace.innerHTML = '';
  let table = createAliasTable( mainTable, gamePricePlace );
  fillTableFromMain( mainTable, table );
  appendAlphaBeta( table );
  priceTable = table;
} );
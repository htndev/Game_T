function generateValue ( min, max ) {
  return Math.floor( Math.random() * ( max - min ) + min );
}

function getTableInArray ( table ) {
  let arrayOfTD = [],
      tableRows = nodeListToArray( table.querySelector( 'tbody' )
                                        .querySelectorAll( 'tr' ) );
  tableRows.forEach( element => {
    let tr = [];
    for ( let i = 0; i < element.children.length; i++ ) {
      if ( element.children[ i ].nodeName === 'TD' ) {
        tr.push( element.children[ i ] );
      }
    }
    arrayOfTD.push( tr );
  } );
  return arrayOfTD;
}

function getInputsInTableArray ( table ) {
  let arrayOfInputs = [];
  table.forEach( element => {
    let inputRow = [];
    element.forEach( td => {
      inputRow.push( td.children[ 0 ] );
    } );
    arrayOfInputs.push( inputRow );
  } );
  return arrayOfInputs;
}

function getValuesFromInputArray ( inputArray ) {
  let valuesArray = [];
  inputArray.forEach( row => {
    let tmpArr = [];
    row.forEach( ceil => {
      tmpArr.push( ceil.value );
    } );
    valuesArray.push( tmpArr );
  } );
  return valuesArray;
}

function createAliasTable ( mainTable, place ) {
  let table = document.createElement( 'table' );
  table.innerHTML = mainTable.innerHTML;
  place.appendChild( table );
  return table;
}

function nodeListToArray ( nodeList ) {
  return Array.prototype.slice.call( nodeList );
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

function toMatrix () {
  let evt = document.createEvent( 'MouseEvents' );
  evt.initMouseEvent( 'click', true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null );
  gameMatrixTab.dispatchEvent( evt ); // element for click
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
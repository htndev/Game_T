// Fill table from main table. (Matrix game Tab to another in tabs)
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

/**
 * Switch rows and columns
 * Example:
 * [ 0 1 ]
 * [ 2 3 ]
 * =======
 * [ 0 2 ]
 * [ 1 3 ]
  */
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

// Convert table to array for operations
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

// Convert 'table' array to inputs array
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

// Getting values from input array
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

// Duplicating table
function createAliasTable ( mainTable, place ) {
  let table = document.createElement( 'table' );
  table.innerHTML = mainTable.innerHTML;
  place.appendChild( table );
  return table;
}

/**
 * document.querySelector('element') – will return nodeList
 * Usage: nodeListToArray(document.querySelector('element')) – will return array
 *
  */
function nodeListToArray ( nodeList ) {
  return Array.prototype.slice.call( nodeList );
}

// Creating new place for table (using in crops)
function createPlaceForNewTable ( place, table, text ) {
  let row = document.createElement( 'div' );
  row.classList.add( 'row' );
  row.classList.add( 'center-align' );
  let col     = document.createElement( 'div' ),
      colText = document.createElement( 'div' );
  col.classList.add( 'col' );
  col.classList.add( 's12' );
  colText.classList.add( 'col' );
  colText.classList.add( 's12' );
  colText.classList.add( 'flow-text' );
  colText.classList.add( 'card-panel' );
  colText.classList.add( 'light-blue' );
  colText.classList.add( 'lighten-1' );
  colText.innerHTML = text;
  col.appendChild( table );
  row.appendChild( colText );
  row.appendChild( col );
  place.appendChild( row );
  return row;
}

/**
 * Comparing arrays values
 * @param array
 * @returns {boolean}
 */
Array.prototype.equals = function ( array ) {
  if ( !array ) {
    return false;
  }
  if ( this.length !== array.length ) {
    return false;
  }
  for ( let i = 0, l = this.length; i < l; i++ ) {
    if ( this[ i ] instanceof Array && array[ i ] instanceof Array ) {
      if ( !this[ i ].equals( array[ i ] ) ) {
        return false;
      }
    } else if ( this[ i ] !== array[ i ] ) {
      return false;
    }
  }
  return true;
};
Object.defineProperty( Array.prototype, 'equals', { enumerable: false } );
const simplifyBtn       = document.querySelector( '#simplifyGame' ),
      simplifyField     = document.querySelector( '#simplified' ),
      gameMatrixTab     = document.querySelector( '#gm' ),
      generateBtn       = document.querySelector( '#generate' ),
      generationSection = document.querySelector( '#generationSection' );

let autoCropTable,
    autoCropIndex       = 1,
    firstPlayerCropped  = false,
    secondPlayerCropped = false,
    hachureFirstPlayer  = 0,
    hachureSecondPlayer = 0;

simplifyBtn.addEventListener( 'click', autoSimplifyHandler );

// Function that react on cropping
function autoSimplifyHandler () {
  autoCropIndex = 1;
  simplifyField.innerHTML = '';
  autoCrop( mainTable );
  firstPlayerCropped = false;
  secondPlayerCropped = false;
}

// Special duplicating cropping
function duplicateTable ( table, place, obj, type, subText = '' ) {
  let tmp = table.cloneNode( table );
  highlightBestWorst( tmp, obj.best, obj.worst, type );
  createPlaceForNewTable( simplifyField, tmp, `Крок ${ autoCropIndex }: ${ subText }` );
  autoCropIndex++;
}

gameMatrixTab.addEventListener( 'click', function () {
  isFunctionReaction = false;
  isFrFinished = false;
  isCroppingYourself = false;
  firstPlayerTableFR.innerHTML = '';
  secondPlayerTableFR.innerHTML = '';
} );

// Function that highlighting best headers
function highlightBestWorst ( table, best, worst, type ) {
  let headingNumGood,
      headingGood,
      headingNumBad,
      headingBad;
  switch ( type ) {
    case 'row':
      headingNumGood = best[ 0 ].parentElement.getAttribute( `data-row` );
      headingGood = table.querySelector( 'tbody' )
                         .querySelector( `th[data-rows="${ headingNumGood }"]` );
      headingNumBad = worst[ 0 ].parentElement.getAttribute( `data-row` );
      headingBad = table.querySelector( `th[data-rows="${ headingNumBad }"]` );
      break;
    case 'col':
      headingNumGood = best[ 0 ].parentElement.getAttribute( `data-col` );
      headingGood = table.querySelector( 'thead' )
                         .querySelector( `th[data-cols="${ headingNumGood }"]` );
      headingNumBad = worst[ 0 ].parentElement.getAttribute( `data-col` );
      headingBad = table.querySelector( `th[data-cols="${ headingNumBad }"]` );
      break;
  }
  headingGood.classList.add( 'good-strategy-header' );
  headingBad.classList.add( 'bad-strategy-header' );
}

/**
 * Removing rows and columns with headers (recursive)
 * @param table
 * @param number – number of row or col
 * @param type – row || col
 */
function cropAuto ( table, number, type ) {
  let heading,
      rows;
  switch ( type ) {
    case 'col':
      heading = table.querySelector( 'thead' )
                     .querySelector( `th[data-cols="${ number }"]` );
      rows = nodeListToArray( table.querySelectorAll( `td[data-col="${ number }"]` ) );
      heading.parentElement.removeChild( heading );
      rows.forEach( element => {
        element.parentElement.removeChild( element );
      } );
      break;
    case 'row':
      heading = table.querySelector( 'tbody' )
                     .querySelector( `th[data-rows="${ number }"]` );
      rows = nodeListToArray( table.querySelectorAll( `td[data-row="${ number }"]` ) );
      rows[ 0 ].parentElement.parentElement.removeChild( rows[ 0 ].parentElement );
      heading.parentElement.removeChild( heading );
      break;
  }
}

function cleanAutoCropTable ( table ) {
  let ths = nodeListToArray( table.querySelectorAll( 'th' ) ),
      tds = nodeListToArray( table.querySelectorAll( 'td' ) );
  ths.forEach( element => {
    element.classList.remove( 'good-strategy-header' );
    element.classList.remove( 'bad-strategy-header' );
  } );
  tds.forEach( element => {
    element.classList.remove( 'good-strategy-element' );
    element.classList.remove( 'bad-strategy-element' );
  } );
}

/**
 *
 * @param table
 * @param isFirst – what we need to crop
 * @returns recursive autoCrop or stop cropping
 */
function autoCrop ( table, isFirst = true ) {
  try {
    cleanAutoCropTable( table );
  } catch ( e ) {
    console.log( e );
    return;
  }
  if ( table.hasAttribute( 'id' ) ) table.removeAttribute( 'id' );
  let tbl = document.createElement( 'table' );
  tbl.innerHTML = table.innerHTML;
  fillTableFromMain( table, tbl );
  if ( isFirst ) {
    let tblHoriz = getInputsInTableArray( getTableInArray( tbl ) ),
        obj;
    for ( let row = 0; row < tblHoriz.length; row++ ) {
      obj = compareRow( tblHoriz[ row ], tblHoriz );
      if ( typeof obj === 'object' ) {
        let rowNum = +obj.worst[ 0 ].parentElement.getAttribute( 'data-row' );
        let tmpTbl = document.createElement( 'table' );
        tmpTbl.innerHTML = tbl.innerHTML;
        fillTableFromMain( tbl, tmpTbl );
        let hachersFirst = ( function ( amount ) {
          let str = '';
          if ( amount > 0 ) {
            for ( let i = 0; i < amount; i++ ) {
              str += '\'';
            }
          }
          return str;
        } )( hachureSecondPlayer );
        duplicateTable( tbl, simplifyField, obj, 'row', `u<sub>P<sub>1</sub></sub>(A<sub>${ obj.best[ 0 ].parentElement.getAttribute( 'data-row' ) }</sub>; S<sub>P<sub>2</sub></sub>${ hachersFirst }) > u<sub>P<sub>1</sub></sub>(A<sub>${ obj.worst[ 0 ].parentElement.getAttribute( 'data-row' ) }</sub>; S<sub>P<sub>2</sub></sub>${ hachersFirst })` );
        // hachureSecondPlayer++;
        hachureFirstPlayer++;
        cropAuto( tbl, rowNum, 'row' );
        autoCropTable = tbl.cloneNode( true );
        return autoCrop( autoCropTable, false );
      }
    }
    if ( obj === false ) {
      let tblVert = switchArrayHeading( tblHoriz ),
          obj;
      for ( let row = 0; row < tblVert.length; row++ ) {
        obj = compareRow( tblVert[ row ], tblVert, 'col' );
        if ( typeof obj === 'object' ) {
          let colNum = +obj.worst[ 0 ].parentElement.getAttribute( 'data-col' );
          let tmpTbl = document.createElement( 'table' );
          tmpTbl.innerHTML = tbl.innerHTML;
          fillTableFromMain( tbl, tmpTbl );
          let hachersSecond = ( function ( amount ) {
            let str = '';
            if ( amount > 0 ) {
              for ( let i = 0; i < amount; i++ ) {
                str += '\'';
              }
            }
            return str;
          } )( hachureFirstPlayer );
          duplicateTable( tbl, simplifyField, obj, 'col', `u<sub>P<sub>2</sub></sub>(B<sub>${ obj.best[ 0 ].parentElement.getAttribute( 'data-col' ) }</sub>; S<sub>P<sub>1</sub></sub>${ hachersSecond }) > u<sub>P<sub>2</sub></sub>(B<sub>${ obj.worst[ 0 ].parentElement.getAttribute( 'data-col' ) }</sub>; S<sub>P<sub>1</sub></sub>${ hachersSecond })` );
          // hachureFirstPlayer++;
          hachureSecondPlayer++;
          cropAuto( tbl, colNum, 'col' );
          autoCropTable = tbl.cloneNode( true );
          return autoCrop( autoCropTable );
        }

      }
      !obj && theEndOfAutoCrop( tbl );
    }
  } else {
    let tblVert = getInputsInTableArray( switchArrayHeading( getTableInArray( tbl ) ) ),
        obj;
    for ( let row = 0; row < tblVert.length; row++ ) {
      obj = compareRow( tblVert[ row ], tblVert, 'col' );
      if ( typeof obj === 'object' ) {
        let colNum = +obj.worst[ 0 ].parentElement.getAttribute( 'data-col' );
        let tmpTbl = document.createElement( 'table' );
        tmpTbl.innerHTML = tbl.innerHTML;
        fillTableFromMain( tbl, tmpTbl );
        let hachersSecond = ( function ( amount ) {
          let str = '';
          if ( amount > 0 ) {
            for ( let i = 0; i < amount; i++ ) {
              str += '\'';
            }
          }
          return str;
        } )( hachureFirstPlayer );
        duplicateTable( tbl, simplifyField, obj, 'col', `u<sub>P<sub>2</sub></sub>(B<sub>${ obj.best[ 0 ].parentElement.getAttribute( 'data-col' ) }</sub>; S<sub>P<sub>1</sub></sub>${ hachersSecond }) > u<sub>P<sub>2</sub></sub>(B<sub>${ obj.worst[ 0 ].parentElement.getAttribute( 'data-col' ) }</sub>; S<sub>P<sub>1</sub></sub>${ hachersSecond })` );
        // hachureFirstPlayer++;
        hachureSecondPlayer++;
        cropAuto( tbl, colNum, 'col' );
        autoCropTable = tbl.cloneNode( true );
        return autoCrop( autoCropTable );
      }
    }
    if ( obj === false ) {
      let tblHoriz = switchArrayHeading( tblVert ),
          obj;
      for ( let row = 0; row < tblHoriz.length; row++ ) {
        obj = compareRow( tblHoriz[ row ], tblHoriz );
        if ( typeof obj === 'object' ) {
          let rowNum = +obj.worst[ 0 ].parentElement.getAttribute( 'data-row' );
          let tmpTbl = document.createElement( 'table' );
          tmpTbl.innerHTML = tbl.innerHTML;
          fillTableFromMain( tbl, tmpTbl );
          let hachersFirst = ( function ( amount ) {
            let str = '';
            if ( amount > 0 ) {
              for ( let i = 0; i < amount; i++ ) {
                str += '\'';
              }
            }
            return str;
          } )( hachureSecondPlayer );
          duplicateTable( tbl, simplifyField, obj, 'row', `u<sub>P<sub>1</sub></sub>(A<sub>${ obj.best[ 0 ].parentElement.getAttribute( 'data-row' ) }</sub>; S<sub>P<sub>2</sub></sub>${ hachersFirst }) > u<sub>P<sub>1</sub></sub>(A<sub>${ obj.worst[ 0 ].parentElement.getAttribute( 'data-row' ) }</sub>; S<sub>P<sub>2</sub></sub>${ hachersFirst })` );
          // hachureSecondPlayer++;
          hachureFirstPlayer++;
          cropAuto( tbl, rowNum, 'row' );
          autoCropTable = tbl.cloneNode( true );
          return autoCrop( autoCropTable, false );
        }
      }
      !obj && theEndOfAutoCrop( tbl );
    }
  }
}

// Create card with title that crop has ended
function theEndOfAutoCrop ( table ) {
  createPlaceForNewTable( simplifyField, table, 'Спрощена таблиця' );
  hachureFirstPlayer = 0;
  hachureSecondPlayer = 0;
}

/**
 * Comparing row with all rows in array
 * @param row – current row for comparing
 * @param array – which array used for comparing
 * @param type – row || col
 * @returns if it has best and worst strategies – returns object, if nothing –
 *   false
 */
function compareRow ( row, array, type = 'row' ) {
  for ( let r = 0; r < array.length; r++ ) {
    let bigger = [];
    for ( let c = 0; c < array[ r ].length; c++ ) {
      if ( row.equals( array[ r ] ) ) {
        break;
      } else {
        if ( row[ c ] !== undefined ) {
          if ( +row[ c ].value > array[ r ][ c ].value ) {
            bigger.push( true );
          } else {
            bigger.push( false );
          }
        }
      }
    }
    if ( !bigger.includes( false ) && bigger.length > 0 ) {
      if ( type === 'row' ) {
        array[ r ].forEach( element => {
          element.parentElement.classList.add( 'bad-strategy-element' );
        } );
        row.forEach( element => {
          element.parentElement.classList.add( 'good-strategy-element' );
        } );
        return {
          best : row,
          worst: array[ r ]
        };
      } else {
        array[ r ].forEach( element => {
          element.parentElement.classList.add( 'good-strategy-element' );
        } );
        row.forEach( element => {
          element.parentElement.classList.add( 'bad-strategy-element' );
        } );
        return {
          best : array[ r ],
          worst: row
        };
      }
    }
  }
  return false;
}
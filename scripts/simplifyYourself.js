const
  cropTable        = document.querySelector( '#cropTable' ),
  restOfCrops      = document.querySelector( '#restOfCrops' ),
  cropBtn          = document.querySelector( '#crop' ),
  simplifyTab      = document.querySelector( '#sf' ),
  cleanYourselfBtn = document.querySelector( '#cleanYourSelf' );

let placeCropTable,
    isCroppingYourself     = false,
    cropArray              = [],
    cropTarget,
    cropSelectedArray      = [],
    cropSelectedTarget,
    croppableTable         = cropTable,
    simpifingYourselfIndex = 1,
    croppingArrayYS        = [],
    croppingElementYS;

/**
 * Cropping a row or col that user chose
 * @param table
 * @param number – row || col
 * @param type – row || col
 */
function crop ( table, number, type ) {
  let newTable = document.createElement( 'table' ),
      poppingArray,
      headingToRemove,
      row,
      text     = `Крок ${ simpifingYourselfIndex }: `;
  simpifingYourselfIndex++;
  newTable.innerHTML = table.innerHTML;
  fillTableFromMain( table, newTable );
  cleanTable( table );
  croppableTable = newTable;
  switch ( type ) {
    case 'row':
      headingToRemove = newTable.querySelector( `th[data-rows="${ number }"]` );
      poppingArray = nodeListToArray( newTable.querySelectorAll( `td[data-row="${ number }"]` ) );
      text += `Û<sub>P<sub>1</sub></sub>(A<sub>${ headingToRemove.getAttribute( 'data-rows' ) }</sub>; S<sub>P<sub>2</sub></sub>)`;
      row = poppingArray[ 0 ].parentElement;
      row.parentElement.removeChild( row );
      break;
    case 'col':
      headingToRemove = newTable.querySelector( `th[data-cols="${ number }"]` );
      text += `Û<sub>P<sub>2</sub></sub>(B<sub>${ headingToRemove.getAttribute( 'data-cols' ) }</sub>; S<sub>P<sub>1</sub></sub>)`;
      poppingArray = nodeListToArray( newTable.querySelectorAll( `td[data-col="${ number }"]` ) );
      break;
  }
  headingToRemove.parentElement.removeChild( headingToRemove );
  poppingArray.forEach( element => {
    element.parentElement.removeChild( element );
  } );
  if ( nodeListToArray( newTable.querySelector( 'thead' )
                                .querySelectorAll( 'th' ) ).length === 2 ) {
    nodeListToArray( newTable.querySelector( 'thead' )
                             .querySelectorAll( 'th' ) ).forEach( element => {
      element.removeAttribute( 'data-cd' );
    } );
  }
  if ( nodeListToArray( newTable.querySelector( 'tbody' )
                                .querySelectorAll( 'tr' ) ).length === 1 ) {
    nodeListToArray( newTable.querySelector( 'tbody' )
                             .querySelectorAll( 'th' ) ).forEach( element => {
      element.removeAttribute( 'data-cl' );
    } );
  }
  if ( nodeListToArray( newTable.querySelectorAll( 'td' ) ).length === 1 ) {
    newTable.dataset.ended = '';
  }
  createPlaceForNewTable( restOfCrops, newTable, text );
  croppingElementYS.classList.add( 'cropped-header' );
  croppingArrayYS.forEach( element => {
    element.classList.add( 'cropped-element' );
  } );
}

// Reset all styles and table
function cleanSimplifingYourself ( table, mainTable, place, restPlace ) {
  place.innerHTML = '';
  restPlace.innerHTML = '';
  let tmpTable = createAliasTable( mainTable, place );
  fillTableFromMain( mainTable, tmpTable );
  table.removeAttribute( 'data-ended' );
  unselectCropArea();
  croppableTable = tmpTable;
}

// Removing styles
function cleanTable ( table ) {
  let thead = nodeListToArray( table.querySelector( 'thead' ).children[ 0 ].querySelectorAll( 'th' ) ),
      tbody = table.querySelector( 'tbody' );
  thead.forEach( element => {
    element.removeAttribute( 'class' );
    element.removeAttribute( 'data-cols' );
    element.removeAttribute( 'data-cd' );
  } );
  nodeListToArray( tbody.querySelectorAll( 'th' ) ).forEach( element => {
    element.removeAttribute( 'class' );
    element.removeAttribute( 'data-rows' );
    element.removeAttribute( 'data-cl' );
  } );
  nodeListToArray( tbody.querySelectorAll( 'td' ) ).forEach( element => {
    element.removeAttribute( 'class' );
    element.removeAttribute( 'data-row' );
    element.removeAttribute( 'data-col' );
  } );
}

cropBtn.addEventListener( 'click', cropHandler );

cleanYourselfBtn.addEventListener( 'click', cleanSmpAreaHandler );

function cleanSmpAreaHandler () {
  if ( isCroppingYourself ) {
    simpifingYourselfIndex = 1;
    cleanSimplifingYourself( croppableTable, mainTable, cropTable, restOfCrops );
  }
}

// Cropping table
function cropHandler () {
  if ( isCroppingYourself ) {
    if ( cropSelectedArray.length === 0 ) return;
    let element = cropSelectedTarget;
    unselectCropArea();
    let table = croppableTable;
    if ( nodeListToArray( croppableTable.querySelectorAll( 'td' ) ).length > 0 ) {
      table.dataset.ended = '';
      let th  = nodeListToArray( table.querySelectorAll( '.cursor-crop-down, .cursor-crop-left' ) ),
          tmp = table,
          number,
          type;
      th.forEach( element => {
        element.classList.remove( 'cursor-crop-down' );
        element.classList.remove( 'cursor-crop-left' );
      } );
      if ( element.hasAttribute( 'data-cols' ) ) {
        number = +element.getAttribute( 'data-cols' );
        type = 'col';
      } else if ( element.hasAttribute( 'data-rows' ) ) {
        number = +element.getAttribute( 'data-rows' );
        type = 'row';
      }
      crop( tmp, number, type, true );
    }
  }
}

// Highlight and choose this row or col
document.addEventListener( 'click', function ( e ) {
  if ( isCroppingYourself ) {
    try {
      if ( !e.target.parentNode.parentNode.parentNode.hasAttribute( 'data-ended' ) ) {
        if ( e.target.classList.contains( 'crop-target-selected' ) ) {
          cropSelectedTarget.classList.remove( 'crop-target-selected' );
          cropSelectedTarget = undefined;
          cropSelectedArray.forEach( element => {
            element.classList.remove( 'crop-line-selected' );
          } );
          croppingElementYS = undefined;
          croppingArrayYS = [];
          cropSelectedArray = [];
        } else if ( e.target.hasAttribute( 'data-cl' ) ) {
          unselectCropArea();
          cropSelectedTarget = e.target;
          croppingElementYS = cropSelectedTarget;
          cropSelectedTarget.classList.add( 'crop-target-selected' );
          let rowId = e.target.getAttribute( 'data-rows' );
          let rows = croppableTable.querySelectorAll( `td[data-row="${ rowId }"]` );
          rows = nodeListToArray( rows );
          croppingArrayYS = [];
          rows.forEach( element => {
            element.classList.add( 'crop-line-selected' );
            croppingArrayYS.push( element );
          } );
          cropSelectedArray = rows;
        } else if ( e.target.hasAttribute( 'data-cd' ) ) {
          unselectCropArea();
          cropSelectedTarget = e.target;
          croppingElementYS = cropSelectedTarget;
          cropSelectedTarget.classList.add( 'crop-target-selected' );
          let colId = e.target.getAttribute( 'data-cols' );
          let cols = croppableTable.querySelectorAll( `td[data-col="${ colId }"]` );
          cols = nodeListToArray( cols );
          croppingArrayYS = [];
          cols.forEach( element => {
            element.classList.add( 'crop-line-selected' );
            croppingArrayYS.push( element );
          } );
          cropSelectedArray = cols;
        }
      }
    } catch ( e ) {}
  }
} );

// Highlight current section where is cursor
document.body.addEventListener( 'mouseover', function ( e ) {
  if ( isCroppingYourself ) {
    try {
      if ( e.target.parentNode.parentNode.parentNode.tagName === 'TABLE' ) {
        if ( !e.target.parentNode.parentNode.parentNode.hasAttribute( 'data-ended' ) ) {
          if ( e.target.hasAttribute( 'data-cl' ) ) {
            if ( cropTarget !== undefined ) {
              cropTarget.classList.remove( 'target' );
            }
            cropArray.forEach( element => {
              element.classList.remove( 'selected' );
            } );
            cropArray = [];
            cropTarget = e.target;
            cropTarget.classList.add( 'target' );
            let rowId = e.target.getAttribute( 'data-rows' );
            e.target.classList.add( 'cursor-crop-left' );
            let rows = croppableTable.querySelectorAll( `td[data-row="${ rowId }"]` );
            rows = nodeListToArray( rows );
            rows.forEach( element => {
              element.classList.add( 'selected' );
            } );
            cropArray = rows;
          } else if ( e.target.hasAttribute( 'data-cd' ) ) {
            if ( cropTarget !== undefined ) {
              cropTarget.classList.remove( 'target' );
            }
            cropArray.forEach( element => {
              element.classList.remove( 'selected' );
            } );
            cropTarget = e.target;
            cropArray = [];
            cropTarget.classList.add( 'target' );
            let colId = e.target.getAttribute( 'data-cols' );
            e.target.classList.add( 'cursor-crop-down' );
            let cols = croppableTable.querySelectorAll( `td[data-col="${ colId }"]` );
            cols = nodeListToArray( cols );
            cols.forEach( element => {
              element.classList.add( 'selected' );
            } );
            cropArray = cols;
          }
        }
      }
    } catch ( e ) {}
  }
} );

document.addEventListener( 'mouseout', function ( e ) {
  if ( isCroppingYourself ) {
    if ( cropTarget !== undefined ) {
      cropTarget.classList.remove( 'target' );
      cropTarget = undefined;
    }
    cropArray.forEach( element => {
      element.classList.remove( 'selected' );
    } );
    cropArray = [];
  }
} );

// Clearing table and object, that user selected
function unselectCropArea () {
  if ( isCroppingYourself ) {
    if ( cropSelectedTarget !== undefined ) {
      cropSelectedTarget.classList.remove( 'crop-target-selected' );
      cropSelectedTarget = undefined;
    }
    cropSelectedArray.forEach( element => {
      element.classList.remove( 'crop-line-selected' );
    } );
    cropSelectedArray = [];
  }
}

simplifyTab.addEventListener( 'click', function () {
  isFunctionReaction = false;
  isFrFinished = false;
  isCroppingYourself = true;
  cropTable.innerHTML = '';
  let table = createAliasTable( mainTable, cropTable );
  fillTableFromMain( mainTable, table );
  placeCropTable = table;
} );
// Material features init
try {
  $( document ).ready( function () {
    $( '.tabs' ).tabs();
  } );

  $( document ).ready( function () {
    $( '.tooltipped' ).tooltip();
  } );
} catch ( e ) {
  console.log( e );
}

const
  firstPlayerStrategies  = document.querySelector( '#firstPlayerStrategies' ),
  secondPlayerStrategies = document.querySelector( '#secondPlayerStrategies' ),
  fillBtn                = document.querySelector( '#fill' ),
  functions              = document.querySelector( '#functions' ),
  minGenValue            = document.querySelector( '#minValue' ),
  maxGenValue            = document.querySelector( '#maxValue' );

let
  mainTable         = document.querySelector( '#startTable' ),
  secondPlayerShown = false,
  firstPlayerLength,
  secondPlayerLength;

generateBtn.addEventListener( 'click', generateHandler );

// Generating field
function generateHandler () {
  generationSection.style.display = 'block';
  secondPlayerTableFR.innerHTML = firstPlayerTableFR.innerHTML = '';
  functions.style.display = 'block';
  firstPlayerLength = +firstPlayerStrategies.value;
  secondPlayerLength = +secondPlayerStrategies.value;
  createTable( firstPlayerLength, secondPlayerLength );
  firstPlayerTableFR.innerHTML = '';
  secondPlayerTableFR.innerHTML = '';
  gamePricePlace.innerHTML = '';
  cropTable.innerHTML = '';
  restOfCrops.innerHTML = '';
  toMatrix();
  showSecondPlayer.checked = false;
  secondPlayerShown = false;
  secondPlayerField.style.display = 'none';
  firstPlayerMaxes.children[ 1 ].innerHTML = '';
  secondPlayerMaxes.children[ 1 ].innerHTML = '';
}

fillBtn.addEventListener( 'click', fillHandler );

// Filling table
function fillHandler () {
  let table  = getTableInArray( mainTable ),
      inputs = getInputsInTableArray( table ),
      min    = +minGenValue.value,
      max    = +maxGenValue.value;
  inputs.forEach( row => {
    row.forEach( ceil => {
      ceil.value = generateValue( min, max );
    } );
  } );
  if ( !!croppableTable.innerHTML ) {
    croppableTable.innerHTML = '';
    let table = createAliasTable( mainTable, croppableTable );
    fillTableFromMain( mainTable, table );
    placeCropTable = table;
  }
  if ( !!gamePricePlace.innerHTML ) {
    gamePricePlace.innerHTML = '';
    let table = createAliasTable( mainTable, gamePricePlace );
    fillTableFromMain( mainTable, table );
    appendAlphaBeta( table );
    priceTable = table;
  }
  if ( firstPlayerTableFR.children[ 0 ] !== undefined && secondPlayerTableFR.children[ 0 ] !== undefined ) {
    fillTableFromMain( mainTable, firstPlayerTableFR, secondPlayerTableFR );
    getTableInArray( firstPlayerTableFR ).forEach( row => {
      row.forEach( ceil => {
        ceil.classList.remove( 'checked' );
        ceil.classList.remove( 'correct' );
        ceil.classList.remove( 'wrong' );
        ceil.classList.remove( 'guessed' );
      } );
    } );
    getTableInArray( secondPlayerTableFR ).forEach( row => {
      row.forEach( ceil => {
        ceil.classList.remove( 'checked' );
        ceil.classList.remove( 'correct' );
        ceil.classList.remove( 'wrong' );
        ceil.classList.remove( 'guessed' );
      } );
    } );
  }
  firstPlayerMaxes.children[ 1 ].innerHTML = '';
  secondPlayerMaxes.children[ 1 ].innerHTML = '';
  isFrFinished = false;
  firstPlayerCropped = false;
  secondPlayerCropped = false;
}

// Imitating clicks on tab
function toMatrix () {
  let evt = document.createEvent( 'MouseEvents' );
  evt.initMouseEvent( 'click', true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null );
  gameMatrixTab.dispatchEvent( evt ); // element for click
}

function toSimplifing () {
  let evt = document.createEvent( 'MouseEvents' );
  evt.initMouseEvent( 'click', true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null );
  simplifyTab.dispatchEvent( evt ); // element for click
}

function toFunctionReaction () {
  let evt = document.createEvent( 'MouseEvents' );
  evt.initMouseEvent( 'click', true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null );
  functionReactionTab.dispatchEvent( evt ); // element for click
}

function toGamePrice () {
  let evt = document.createEvent( 'MouseEvents' );
  evt.initMouseEvent( 'click', true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null );
  gamePriceTab.dispatchEvent( evt ); // element for click
}

function toGraphic () {
  let evt = document.createEvent( 'MouseEvents' );
  evt.initMouseEvent( 'click', true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null );
  graphicTab.dispatchEvent( evt ); // element for click
}

// Handling keyboard
document.addEventListener( 'keyup', function ( e ) {
  if ( e.code === 'Backspace' ) {
    if ( isCroppingYourself ) {
      cropHandler();
    }
  } else if ( e.code === 'KeyG' ) {
    generateHandler();
  } else if ( e.code === 'KeyR' ) {
    fillHandler();
  } else if ( e.code === 'KeyS' ) {
    autoSimplifyHandler();
  }
} );

function KeyPress ( e ) {
  let evtobj = window.event
    ? event
    : e;
  if ( evtobj.keyCode === 8 && evtobj.ctrlKey ) {
    e.preventDefault();
    cleanSmpAreaHandler();
  } else if ( evtobj.ctrlKey && evtobj.keyCode === 49 ) {
    e.preventDefault();
    toMatrix();
  } else if ( evtobj.ctrlKey && evtobj.keyCode === 50 ) {
    e.preventDefault();
    toSimplifing();
  } else if ( evtobj.ctrlKey && evtobj.keyCode === 51 ) {
    e.preventDefault();
    toFunctionReaction();
  } else if ( evtobj.ctrlKey && evtobj.keyCode === 52 ) {
    e.preventDefault();
    toGamePrice();
  } else if ( evtobj.ctrlKey && evtobj.keyCode === 53 ) {
    e.preventDefault();
    toGraphic();
  }
}

document.addEventListener( 'keydown', KeyPress );

// Removing ads
( function () {
  let elem   = document.querySelector( '.cumf_bt_form_wrapper' ),
      cblink = document.querySelector( '.cbalink' ),
      script = document.body.querySelector( 'script' );
  try {
    elem.parentNode.removeChild( elem );
    cblink.parentNode.removeChild( cblink );
    script.parentNode.removeChild( script );
  } catch ( e ) {}
} )();
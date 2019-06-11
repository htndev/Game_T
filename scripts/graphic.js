/**
 * @class Of line
 * @param valueL – value from the left side
 * @param valueR – value from the right side
 */
class Line {
  constructor ( xL, yL, xR, yR, valLeft, valRight ) {
    this.leftSide = { x: xL, y: yL };
    this.rightSide = { x: xR, y: yR };
    this.valLeft = valLeft;
    this.valRight = valRight;
  }

  drawConnection () {
    ctx.beginPath();
    ctx.strokeStyle = '#2D3436';
    ctx.moveTo( this.leftSide.x, this.leftSide.y );
    ctx.lineTo( this.rightSide.x, this.rightSide.y );
    ctx.stroke();
  }
}

const
  graphicTab       = document.querySelector( '#gc' ),
  cnv              = document.querySelector( '#graphicCanvas' ),
  ctx              = cnv.getContext( '2d' ),
  LEFT_SIDE_WIDTH  = 75,
  RIGHT_SIDE_WIDTH = 425,
  LINE_HEIGHT_MAX  = 420,
  LINE_HEIGHT_MIN  = 80,
  DRAWING_SPACE    = LINE_HEIGHT_MAX - LINE_HEIGHT_MIN;

let dotsInserted = [];

graphicTab.addEventListener( 'click', function () {
  isCroppingYourself = false;
  redraw( cnv.width, cnv.height );
} );

function redraw ( width, height ) {
  const XL_PADDING     = 75,
        MEDIUM_PADDING = 50,
        XL             = width - XL_PADDING,
        MD             = height - MEDIUM_PADDING;
  ctx.beginPath();
  ctx.rect( 0, 0, cnv.width, cnv.height );
  ctx.fillStyle = '#FFF';
  ctx.fill();
  ctx.strokeStyle = '#000';
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.moveTo( XL_PADDING, MEDIUM_PADDING );
  ctx.lineTo( XL_PADDING, MD );
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo( MEDIUM_PADDING, MD );
  ctx.lineTo( width - MEDIUM_PADDING, MD );
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo( XL, MD );
  ctx.lineTo( XL, MEDIUM_PADDING );
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo( XL_PADDING - 6, MEDIUM_PADDING + 6 );
  ctx.lineTo( XL_PADDING, MEDIUM_PADDING );
  ctx.lineTo( XL_PADDING + 6, MEDIUM_PADDING + 6 );
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo( XL - 6, MEDIUM_PADDING + 6 );
  ctx.lineTo( XL, MEDIUM_PADDING );
  ctx.lineTo( XL + 6, MEDIUM_PADDING + 6 );
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo( XL - 6 + 25, MD - 6 );
  ctx.lineTo( XL + 25, MD );
  ctx.lineTo( XL - 6 + 25, MD + 6 );
  ctx.stroke();
  ctx.font = '14px Arial';
  ctx.fillText( '0', XL_PADDING - 4, MD + 15 );
  ctx.fillText( '1', XL - 4, MD + 15 );
  ctx.fillText( 'q', XL + 25, MD + 15 );
  ctx.fillText( `${ firstPlayerStrategies.value > secondPlayerStrategies.value ? 'B₁' : 'A₁' }`, XL_PADDING + 10, MEDIUM_PADDING + 15 );
  ctx.fillText( `${ firstPlayerStrategies.value > secondPlayerStrategies.value ? 'B₂' : 'A₂' }`, XL + 10, XL_PADDING - 10 );
  ctx.beginPath();
  ctx.moveTo( RIGHT_SIDE_WIDTH, LINE_HEIGHT_MAX );
  ctx.lineTo( RIGHT_SIDE_WIDTH, LINE_HEIGHT_MIN );
  ctx.stroke();
  setCoordinates();
}

function setCoordinates () {
  let graphicTable = getTableInArray( mainTable ),
      lengthP1     = graphicTable.length,
      lengthP2     = graphicTable[ 0 ].length,
      linesArray   = [],
      space,
      topDots      = {},
      lowDots      = {},
      graphTable   = document.querySelector( '#graphTable' );
  graphTable.innerHTML = '';
  graphTable.appendChild( mainTable.cloneNode( true ) );
  if ( lengthP1 === 2 || lengthP2 === 2 ) {
    let valArr = getValuesFromInputArray( getInputsInTableArray( graphicTable ) );
    if ( lengthP1 === 2 ) {
      let tmp          = valArr,
          relationship = [];
      for ( let i = 0; i < tmp[ 0 ].length; i++ ) {
        relationship.push( {
          l: tmp[ 0 ][ i ], r: tmp[ 1 ][ i ], startIndex: i
        } );
      }
      for ( let i = 0; i < tmp.length; i++ ) {
        for ( let j = 0; j < tmp[ i ].length; j++ ) {
          tmp[ i ][ j ] = { val: tmp[ i ][ j ], index: j };
        }
      }
      tmp.forEach( arr => arr.sort( ( a, b ) => a.val - b.val ).reverse() );
      let waysArr = [];
      console.log( tmp );
      window.tmp = tmp;
      const MAX = tmp[ 0 ][ 0 ].val > tmp[ 1 ][ 0 ].val ? tmp[ 0 ][ 0 ].val : tmp[ 1 ][ 0 ].val,
            MIN = +tmp[ 0 ][ tmp[ 0 ].length - 1 ].val < +tmp[ 1 ][ tmp[ 1 ].length - 1 ].val ? +tmp[ 0 ][ tmp[ 0 ].length - 1 ].val : +tmp[ 1 ][ tmp[ 1 ].length - 1 ].val;
      console.log();
      console.log( `Max: ${ MAX }, Min: ${ MIN }` );
      for ( let i = 0; i < tmp[ 0 ].length; i++ ) {
        let y1 = getBoundaryY( MAX, MIN, tmp[ 0 ][ i ].val ),
            y2 = getBoundaryY( MAX, MIN, tmp[ 1 ][ i ].val );
        // console.log( y1, y2 );
        drawPoint( LEFT_SIDE_WIDTH, y1, tmp[ 0 ][ i ].val, 'left' );
        waysArr.push( {
          item: tmp[ 0 ][ i ], x: LEFT_SIDE_WIDTH, y: y1, val: tmp[ 0 ][ i ].val
        } );
        drawPoint( RIGHT_SIDE_WIDTH, y2, tmp[ 1 ][ i ].val, 'right' );
        waysArr.push( {
          item: tmp[ 1 ][ i ], x: RIGHT_SIDE_WIDTH, y: y2,
          val : tmp[ 1 ][ i ].val
        } );
      }
      waysArr.sort( ( a, b ) => a.item.index - b.item.index );
      for ( let i = 0; i < waysArr.length; i++ ) {
        if ( waysArr[ i + 1 ] !== undefined ) {
          if ( waysArr[ i ].item.index === waysArr[ i + 1 ].item.index ) {
            let line = new Line(
              waysArr[ i ].x,
              waysArr[ i ].y,
              waysArr[ i + 1 ].x,
              waysArr[ i + 1 ].y,
              waysArr[ i ].val,
              waysArr[ i + 1 ].val );
            linesArray.push( line );
          }
        }
      }
      linesArray.forEach( el => el.drawConnection() );
      let connections = [];
      for ( let i = 0; i < linesArray.length; i++ ) {
        connections.push( compareLineWithAllLines( linesArray[ i ], linesArray ) );
      }
      console.log( connections );
      // console.log( dotsInserted );
      // dots.forEach( elem => {
      //   elem.forEach( item => {
      //     if ( item.insertion.y < topConnection.insertion.y ) {
      //       topConnection = item;
      //     } else if ( item.insertion.y > lowConnection.insertion.y ) {
      //       lowConnection = item;
      //     }
      //   } );
      // } );
      // ctx.beginPath();
      // ctx.strokeStyle = '#00A8FF';
      // ctx.moveTo( lowDots.xL, lowDots.yL );
      // if ( lowDots.itemL.index !== lowDots.itemR.index ) {
      //   ctx.lineTo( lowConnection.insertion.x, lowConnection.insertion.y );
      // }
      // ctx.lineTo( lowDots.xR, lowDots.yR );
      // ctx.stroke();
    } else if ( lengthP2 === 2 ) {
      let tmp          = switchArrayHeading( valArr ),
          relationship = [];
      valArr.forEach( ( item, index ) => {
        relationship[ index ] = {
          l: item[ 0 ], r: item[ 1 ], startIndex: index
        };
      } );
      for ( let i = 0; i < tmp.length; i++ ) {
        for ( let j = 0; j < tmp[ i ].length; j++ ) {
          tmp[ i ][ j ] = {
            val  : tmp[ i ][ j ],
            index: j
          };
        }
      }
      tmp.forEach( arr => arr.sort( ( a, b ) => a.val - b.val ).reverse() );
      tmp.forEach( ( arr, index ) => arr.forEach( ( elem, _index ) => tmp[ index ][ _index ].sortedIndex = _index ) );
      tmp = switchArrayHeading( tmp );
      let waysArr = [];
      const MIN = tmp[ 0 ][ 0 ].val > tmp[ 0 ][ 1 ].val ? tmp[ 0 ][ 0 ].val : tmp[ 0 ][ 1 ].val,
            MAX = tmp[ tmp.length - 1 ][ 0 ] > tmp[ tmp.length - 1 ][ 1 ] ? tmp[ tmp.length - 1 ][ 0 ].val : tmp[ tmp.length - 1 ][ 1 ].val;
      for ( let i = 0; i < tmp.length; i++ ) {
        let y1 = getBoundaryY( MIN, MAX, tmp[ i ][ 0 ].val ),
            y2 = getBoundaryY( MIN, MAX, tmp[ i ][ 1 ].val );
        drawPoint( LEFT_SIDE_WIDTH, y1, tmp[ i ][ 0 ].val, 'left' );
        waysArr.push( {
          item: tmp[ i ][ 0 ], x: LEFT_SIDE_WIDTH, y: y1
        } );
        drawPoint( RIGHT_SIDE_WIDTH, y2, tmp[ i ][ 1 ].val, 'right' );
        waysArr.push( {
          item: tmp[ i ][ 1 ], x: RIGHT_SIDE_WIDTH, y: y2
        } );
      }
      topDots = {
        itemL: tmp[ 0 ][ 0 ],
        xL   : LEFT_SIDE_WIDTH,
        yL   : getBoundaryY( MIN, MAX, tmp[ 0 ][ 0 ].val ),
        itemR: tmp[ 0 ][ 1 ],
        xR   : RIGHT_SIDE_WIDTH,
        yR   : getBoundaryY( MIN, MAX, tmp[ 0 ][ 1 ].val )
      };
      waysArr.sort( ( a, b ) => a.item.index - b.item.index );
      for ( let i = 0; i < waysArr.length; i++ ) {
        if ( waysArr[ i + 1 ] !== undefined ) {
          if ( waysArr[ i ].item.index === waysArr[ i + 1 ].item.index ) {
            let line = new Line(
              waysArr[ i ].x,
              waysArr[ i ].y,
              waysArr[ i + 1 ].x,
              waysArr[ i + 1 ].y );
            linesArray.push( line );
          }
        }
      }
      linesArray.forEach( el => el.drawConnection() );
      let dots = [];
      for ( let i = 0; i < linesArray.length; i++ ) {
        dots.push( compareLineWithAllLines( linesArray[ i ], linesArray ) );
      }
      let topConnection = {
            dot: { x: 99999, y: 99999 }
          },
          lowConnection = {
            dot: { x: -99999, y: -99999 }
          };
      dots.forEach( elem => {
        elem.forEach( item => {
          if ( item.insertion.y < topConnection.insertion.y ) {
            topConnection = item;
          } else if ( item.insertion.y > lowConnection.insertion.y ) {
            lowConnection = item;
          }
        } );
      } );
      ctx.beginPath();
      ctx.strokeStyle = '#F00';
      ctx.moveTo( topDots.xL, topDots.yL );
      if ( topDots.itemL.index !== topDots.itemR.index ) {
        ctx.lineTo( topConnection.insertion.x, topConnection.insertion.y );
      }
      ctx.lineTo( topDots.xR, topDots.yR );
      ctx.stroke();
      // ctx.beginPath();
      // ctx.strokeStyle = '#00A8FF';
      // ctx.moveTo( lowDots.xL, lowDots.yL );
      // console.log( lowDots );
      // if ( lowDots.itemL.index !== lowDots.itemR.index ) {
      //   ctx.lineTo( lowConnection.insertion.x, lowConnection.insertion.y );
      // }
      // ctx.lineTo( lowDots.xR, lowDots.yR );
      // ctx.stroke();
    } else {
      return;
    }
  } else {
    toMatrix();
    return;
  }
}

class Connection {
  constructor ( xL, yL, xR, yR, children, valueLeft, valueRight ) {
    this.xL = xL;
    this.xR = xR;
    this.yL = yL;
    this.yR = yR;
    this.children = children;
    this.valueLeft = valueLeft;
    this.valueRight = valueRight;
  }
}

function compareLineWithAllLines ( line, lines ) {
  let keeper = [];
  for ( let i = 0; i < lines.length; i++ ) {
    if ( line !== lines[ i ] ) {
      let insertionInfo = checkLineIntersection( line.leftSide.x, line.leftSide.y, line.rightSide.x, line.rightSide.y, lines[ i ].leftSide.x, lines[ i ].leftSide.y, lines[ i ].rightSide.x, lines[ i ].rightSide.y, i );
      if ( insertionInfo.x > LEFT_SIDE_WIDTH && insertionInfo.x < RIGHT_SIDE_WIDTH ) {
        ctx.beginPath();
        ctx.arc( insertionInfo.x, insertionInfo.y, 5, 0, 2 * Math.PI, true );
        ctx.fill();
        let obj = {
          insertion: {
            x: insertionInfo.x, y: insertionInfo.y
          },
          line1    : line,
          line2    : lines[ i ]
        };
        keeper.push( obj );
      }
    }
  }
  return new Connection( line.leftSide.x, line.leftSide.y, line.rightSide.x, line.rightSide.y, keeper, line.valLeft, line.valRight );
}

function getBoundaryY ( minPoint, maxPoint, value ) {
  const H_TOP    = 80,
        H_BOTTOM = 420;
  return Math.floor( Math.round( ( H_BOTTOM - H_TOP ) / ( minPoint - maxPoint ) * ( minPoint - value ) + H_TOP ) );
}

function checkLineIntersection ( line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY, i ) {
  let denominator,
      a,
      b,
      numerator1,
      numerator2,
      result = {
        x      : null,
        y      : null,
        onLine1: false,
        onLine2: false
      };
  denominator = ( ( line2EndY - line2StartY ) * ( line1EndX - line1StartX ) ) - ( ( line2EndX - line2StartX ) * ( line1EndY - line1StartY ) );
  if ( denominator === 0 ) {
    return result;
  }
  a = line1StartY - line2StartY;
  b = line1StartX - line2StartX;
  numerator1 = ( ( line2EndX - line2StartX ) * a ) - ( ( line2EndY - line2StartY ) * b );
  numerator2 = ( ( line1EndX - line1StartX ) * a ) - ( ( line1EndY - line1StartY ) * b );
  a = numerator1 / denominator;
  b = numerator2 / denominator;
  result.x = Math.floor( line1StartX + ( a * ( line1EndX - line1StartX ) ) );
  result.y = Math.floor( line1StartY + ( a * ( line1EndY - line1StartY ) ) );
  result.index = i;
  if ( a > 0 && a < 1 ) {
    result.onLine1 = true;
  }
  if ( b > 0 && b < 1 ) {
    result.onLine2 = true;
  }
  return result;
};

function drawPoint ( x, y, value, side ) {
  ctx.fillRect( x - 2, y - 2, 4, 4 );
  ctx.fillText( '' + value, side === 'left' ? x - 15 : x + 15, y + 5 );
}
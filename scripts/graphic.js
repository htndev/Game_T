/**
 * @class Of line
 * @param valueL – value from the left side
 * @param valueR – value from the right side
 */
class Line {
  constructor ( xL, yL, xR, yR ) {
    this.leftSide = { x: xL, y: yL };
    this.rightSide = { x: xR, y: yR };
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
  ctx.fillText( 'B₁', XL_PADDING + 10, MEDIUM_PADDING + 15 );
  ctx.fillText( 'B₂', XL + 10, XL_PADDING - 10 );
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
      lowDots      = {};
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
      space = Math.round( DRAWING_SPACE / tmp[ 0 ].length - 1 );
      for ( let i = 0; i < tmp.length; i++ ) {
        for ( let j = 0; j < tmp[ i ].length; j++ ) {
          tmp[ i ][ j ] = { val: tmp[ i ][ j ], index: j };
        }
      }
      tmp.forEach( arr => arr.sort( ( a, b ) => a.val - b.val ).reverse() );
      let skip      = 0,
          waysArr   = [],
          prevLvlP1 = LINE_HEIGHT_MIN,
          prevLvlP2 = LINE_HEIGHT_MIN;
      for ( let i = 0; i < tmp[ 0 ].length; i++ ) {
        if ( tmp[ 0 ][ i - 1 ] !== undefined ) {
          if ( tmp[ 0 ][ i - 1 ].val !== tmp[ 0 ][ i ].val ) {
            prevLvlP1 = LINE_HEIGHT_MIN + skip;
          }
        }
        if ( tmp[ 1 ][ i - 1 ] !== undefined ) {
          if ( tmp[ 1 ][ i - 1 ].val !== tmp[ 0 ][ i ].val ) {
            prevLvlP2 = LINE_HEIGHT_MIN + skip;
          }
        }
        drawPoint( LEFT_SIDE_WIDTH, prevLvlP1, tmp[ 0 ][ i ].val, 'left' );
        waysArr.push( {
          item: tmp[ 0 ][ i ], x: LEFT_SIDE_WIDTH, y: prevLvlP1
        } );
        drawPoint( RIGHT_SIDE_WIDTH, prevLvlP2, tmp[ 1 ][ i ].val, 'right' );
        waysArr.push( {
          item: tmp[ 1 ][ i ], x: RIGHT_SIDE_WIDTH, y: prevLvlP2
        } );
        skip += space;
      }
      topDots = {
        itemL: tmp[ 0 ][ 0 ],
        xL   : LEFT_SIDE_WIDTH,
        yL   : LINE_HEIGHT_MIN,
        itemR: tmp[ 1 ][ 0 ],
        xR   : RIGHT_SIDE_WIDTH,
        yR   : LINE_HEIGHT_MIN
      };
      lowDots = {
        itemL: tmp[ 0 ][ tmp.length - 1 ],
        xL   : LEFT_SIDE_WIDTH,
        yL   : prevLvlP1,
        itemR: tmp[ 0 ][ tmp.length - 1 ],
        xR   : RIGHT_SIDE_WIDTH,
        yR   : prevLvlP2
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
          if ( item.dot.y < topConnection.dot.y ) {
            topConnection = item;
          } else if ( item.dot.y > lowConnection.dot.y ) {
            lowConnection = item;
          }
        } );
      } );
      ctx.beginPath();
      ctx.strokeStyle = '#F00';
      ctx.moveTo( topDots.xL, topDots.yL );
      if ( topDots.itemL.index !== topDots.itemR.index ) {
        ctx.lineTo( topConnection.dot.x, topConnection.dot.y );
      }
      ctx.lineTo( topDots.xR, topDots.yR );
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = '#00A8FF';
      ctx.moveTo( lowDots.xL, lowDots.yL );
      if ( lowDots.itemL.index !== lowDots.itemR.index ) {
        ctx.lineTo( lowConnection.dot.x, lowConnection.dot.y );
      }
      ctx.lineTo( lowDots.xR, lowDots.yR );
      ctx.stroke();
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
      space = Math.round( DRAWING_SPACE / ( tmp[ 0 ].length - 1 ) );
      tmp = switchArrayHeading( tmp );
      let skip      = 0,
          waysArr   = [],
          prevLvlP1 = LINE_HEIGHT_MIN,
          prevLvlP2 = LINE_HEIGHT_MIN;
      for ( let i = 0; i < tmp.length; i++ ) {
        if ( tmp[ i - 1 ] !== undefined ) {
          if ( tmp[ i - 1 ][ 0 ].val !== tmp[ i ][ 0 ].val ) {
            prevLvlP1 = LINE_HEIGHT_MIN + skip;
          }
        }
        if ( tmp[ i - 1 ] !== undefined ) {
          if ( tmp[ i - 1 ][ 1 ].val !== tmp[ i ][ 1 ].val ) {
            prevLvlP2 = LINE_HEIGHT_MIN + skip;
          }
        }
        drawPoint( LEFT_SIDE_WIDTH, prevLvlP1, tmp[ i ][ 0 ].val, 'left' );
        waysArr.push( {
          item: tmp[ i ][ 0 ], x: LEFT_SIDE_WIDTH, y: prevLvlP1
        } );
        drawPoint( RIGHT_SIDE_WIDTH, prevLvlP2, tmp[ i ][ 1 ].val, 'right' );
        waysArr.push( {
          item: tmp[ i ][ 1 ], x: RIGHT_SIDE_WIDTH, y: prevLvlP2
        } );
        skip += space;
      }
      topDots = {
        itemL: tmp[ 0 ][ 0 ],
        xL   : LEFT_SIDE_WIDTH,
        yL   : LINE_HEIGHT_MIN,
        itemR: tmp[ 0 ][ 1 ],
        xR   : RIGHT_SIDE_WIDTH,
        yR   : LINE_HEIGHT_MIN
      };
      lowDots = {
        itemL: tmp[ tmp.length - 1 ][ 0 ],
        xL   : LEFT_SIDE_WIDTH,
        yL   : prevLvlP1,
        itemR: tmp[ tmp.length - 1 ][ 1 ],
        xR   : RIGHT_SIDE_WIDTH,
        yR   : prevLvlP2
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
          if ( item.dot.y < topConnection.dot.y ) {
            topConnection = item;
          } else if ( item.dot.y > lowConnection.dot.y ) {
            lowConnection = item;
          }
        } );
      } );
      ctx.beginPath();
      ctx.strokeStyle = '#F00';
      ctx.moveTo( topDots.xL, topDots.yL );
      if ( topDots.itemL.index !== topDots.itemR.index ) {
        ctx.lineTo( topConnection.dot.x, topConnection.dot.y );
      }
      ctx.lineTo( topDots.xR, topDots.yR );
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = '#00A8FF';
      ctx.moveTo( lowDots.xL, lowDots.yL );
      if ( lowDots.itemL.index !== lowDots.itemR.index ) {
        ctx.lineTo( lowConnection.dot.x, lowConnection.dot.y );
      }
      ctx.lineTo( lowDots.xR, lowDots.yR );
      ctx.stroke();
    } else {
      return;
    }
  } else {
    toMatrix();
    return;
  }
}

function compareLineWithAllLines ( line, lines ) {
  let keeper = [];
  for ( let i = 0; i < lines.length; i++ ) {
    if ( line !== lines[ i ] ) {
      let tmp = checkLineIntersection( line.leftSide.x, line.leftSide.y, line.rightSide.x, line.rightSide.y, lines[ i ].leftSide.x, lines[ i ].leftSide.y, lines[ i ].rightSide.x, lines[ i ].rightSide.y );
      if ( tmp.x > LEFT_SIDE_WIDTH && tmp.x < RIGHT_SIDE_WIDTH ) {
        keeper.push( {
          dot      : tmp,
          line_info: line
        } );
      }
    }
  }
  return keeper;
}

function checkLineIntersection ( line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY ) {
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

  // if we cast these lines infinitely in both directions, they intersect here:
  result.x = line1StartX + ( a * ( line1EndX - line1StartX ) );
  result.y = line1StartY + ( a * ( line1EndY - line1StartY ) );
  /*
   // it is worth noting that this should be the same as:
   x = line2StartX + (b * (line2EndX - line2StartX));
   y = line2StartX + (b * (line2EndY - line2StartY));
   */
  // if line1 is a segment and line2 is infinite, they intersect if:
  if ( a > 0 && a < 1 ) {
    result.onLine1 = true;
  }
  // if line2 is a segment and line1 is infinite, they intersect if:
  if ( b > 0 && b < 1 ) {
    result.onLine2 = true;
  }
  // if line1 and line2 are segments, they intersect if both of the above are
  // true
  return result;
};

function drawPoint ( x, y, value, side ) {
  ctx.fillRect( x - 2, y - 2, 4, 4 );
  ctx.fillText( '' + value, side === 'left' ? x - 15 : x + 15, y + 5 );
}
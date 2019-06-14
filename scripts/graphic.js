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

let lineDots = [];

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
  lineDots = [];
  let graphicTable = getTableInArray( mainTable ),
      lengthP1     = graphicTable.length,
      lengthP2     = graphicTable[ 0 ].length,
      linesArray   = [],
      graphTable   = document.querySelector( '#graphTable' );
  graphTable.innerHTML = '';
  graphTable.appendChild( mainTable.cloneNode( true ) );
  if ( lengthP1 === 2 || lengthP2 === 2 ) {
    let valArr = getValuesFromInputArray( getInputsInTableArray( graphicTable ) );
    if ( lengthP1 === 2 && lengthP2 === 2 ) {
      let dotsArray    = valArr,
          relationship = [];
      for ( let i = 0; i < dotsArray[ 0 ].length; i++ ) {
        relationship.push( {
          l: dotsArray[ 0 ][ i ], r: dotsArray[ 1 ][ i ], startIndex: i
        } );
      }
      for ( let i = 0; i < dotsArray.length; i++ ) {
        for ( let j = 0; j < dotsArray[ i ].length; j++ ) {
          dotsArray[ i ][ j ] = { val: dotsArray[ i ][ j ], index: j };
        }
      }
      dotsArray.forEach( arr => arr.sort( ( a, b ) => a.val - b.val )
                                   .reverse() );
      let leftWay  = [],
          rightWay = [];
      const MAX = dotsArray[ 0 ][ 0 ].val > dotsArray[ 1 ][ 0 ].val ? dotsArray[ 0 ][ 0 ].val : dotsArray[ 1 ][ 0 ].val,
            MIN = +dotsArray[ 0 ][ dotsArray[ 0 ].length - 1 ].val < +dotsArray[ 1 ][ dotsArray[ 1 ].length - 1 ].val ? +dotsArray[ 0 ][ dotsArray[ 0 ].length - 1 ].val : +dotsArray[ 1 ][ dotsArray[ 1 ].length - 1 ].val;
      for ( let i = 0; i < dotsArray[ 0 ].length; i++ ) {
        let y1 = getBoundaryY( MAX, MIN, dotsArray[ 0 ][ i ].val ),
            y2 = getBoundaryY( MAX, MIN, dotsArray[ 1 ][ i ].val );
        drawPoint( LEFT_SIDE_WIDTH, y1, dotsArray[ 0 ][ i ].val, 'left' );
        leftWay.push( {
          x    : LEFT_SIDE_WIDTH, y: y1, val: dotsArray[ 0 ][ i ].val,
          index: dotsArray[ 0 ][ i ].index
        } );
        drawPoint( RIGHT_SIDE_WIDTH, y2, dotsArray[ 1 ][ i ].val, 'right' );
        rightWay.push( {
          x    : RIGHT_SIDE_WIDTH, y: y2, val: dotsArray[ 1 ][ i ].val,
          index: dotsArray[ 1 ][ i ].index
        } );
      }
      leftWay.sort( ( a, b ) => a.index - b.index );
      rightWay.sort( ( a, b ) => a.index - b.index );
      for ( let i = 0; i < leftWay.length; i++ ) {
        linesArray.push( new Line( leftWay[ i ].x, leftWay[ i ].y, rightWay[ i ].x, rightWay[ i ].y, leftWay[ i ].val, rightWay[ i ].val ) );
      }
      linesArray.forEach( el => el.drawConnection() );
      let connections = [];
      for ( let i = 0; i < linesArray.length; i++ ) {
        connections.push( compareLineWithAllLines( linesArray[ i ], linesArray ) );
      }
      connections.sort( ( a, b ) => a.valueLeft - b.valueLeft ).reverse();
      if ( connections[ 0 ].children.length > 0 ) {
        lineDots.push( { x: connections[ 0 ].xL, y: connections[ 0 ].yL } );
        lineDots.push( {
          x: connections[ 1 ].children[ 0 ].insertion.x,
          y: connections[ 1 ].children[ 0 ].insertion.y
        } );
        lineDots.push( { x: connections[ 1 ].xR, y: connections[ 1 ].yR } );
        drawConnection( '#3498DB' );
        lineDots = [];
        lineDots.push( { x: connections[ 1 ].xL, y: connections[ 1 ].yL } );
        lineDots.push( {
          x: connections[ 1 ].children[ 0 ].insertion.x,
          y: connections[ 1 ].children[ 0 ].insertion.y
        } );
        lineDots.push( { x: connections[ 0 ].xR, y: connections[ 0 ].yR } );
        drawConnection( '#E84118' );
      } else {
        lineDots.push( { x: connections[ 0 ].xL, y: connections[ 0 ].yL } );
        lineDots.push( { x: connections[ 0 ].xR, y: connections[ 0 ].yR } );
        drawConnection( '#3498DB' );
        lineDots = [];
        lineDots.push( { x: connections[ 1 ].xL, y: connections[ 1 ].yL } );
        lineDots.push( { x: connections[ 1 ].xR, y: connections[ 1 ].yR } );
        drawConnection( '#E84118' );
      }
    } else if ( lengthP1 === 2 ) {
      let dotsArray    = valArr,
          relationship = [];
      for ( let i = 0; i < dotsArray[ 0 ].length; i++ ) {
        relationship.push( {
          l: dotsArray[ 0 ][ i ], r: dotsArray[ 1 ][ i ], startIndex: i
        } );
      }
      for ( let i = 0; i < dotsArray.length; i++ ) {
        for ( let j = 0; j < dotsArray[ i ].length; j++ ) {
          dotsArray[ i ][ j ] = { val: dotsArray[ i ][ j ], index: j };
        }
      }
      dotsArray.forEach( arr => arr.sort( ( a, b ) => a.val - b.val )
                                   .reverse() );
      let leftWay  = [],
          rightWay = [];
      const MAX = dotsArray[ 0 ][ 0 ].val > dotsArray[ 1 ][ 0 ].val ? dotsArray[ 0 ][ 0 ].val : dotsArray[ 1 ][ 0 ].val,
            MIN = +dotsArray[ 0 ][ dotsArray[ 0 ].length - 1 ].val < +dotsArray[ 1 ][ dotsArray[ 1 ].length - 1 ].val ? +dotsArray[ 0 ][ dotsArray[ 0 ].length - 1 ].val : +dotsArray[ 1 ][ dotsArray[ 1 ].length - 1 ].val;
      for ( let i = 0; i < dotsArray[ 0 ].length; i++ ) {
        let y1 = getBoundaryY( MAX, MIN, dotsArray[ 0 ][ i ].val ),
            y2 = getBoundaryY( MAX, MIN, dotsArray[ 1 ][ i ].val );
        drawPoint( LEFT_SIDE_WIDTH, y1, dotsArray[ 0 ][ i ].val, 'left' );
        leftWay.push( {
          x    : LEFT_SIDE_WIDTH, y: y1, val: dotsArray[ 0 ][ i ].val,
          index: dotsArray[ 0 ][ i ].index
        } );
        drawPoint( RIGHT_SIDE_WIDTH, y2, dotsArray[ 1 ][ i ].val, 'right' );
        rightWay.push( {
          x    : RIGHT_SIDE_WIDTH, y: y2, val: dotsArray[ 1 ][ i ].val,
          index: dotsArray[ 1 ][ i ].index
        } );
      }
      leftWay.sort( ( a, b ) => a.index - b.index );
      rightWay.sort( ( a, b ) => a.index - b.index );
      for ( let i = 0; i < leftWay.length; i++ ) {
        linesArray.push( new Line( leftWay[ i ].x, leftWay[ i ].y, rightWay[ i ].x, rightWay[ i ].y, leftWay[ i ].val, rightWay[ i ].val ) );
      }
      linesArray.forEach( el => el.drawConnection() );
      let connections = [];
      for ( let i = 0; i < linesArray.length; i++ ) {
        connections.push( compareLineWithAllLines( linesArray[ i ], linesArray ) );
      }
      connections.sort( ( a, b ) => a.valueRight - b.valueRight );
      let min        = { value: 999, index: 0 },
          minIndexes = [];
      connections.forEach( ( element, index ) => {
        if ( min.value > +element.valueRight ) {
          minIndexes = [];
          min = {
            value: +element.valueRight, index: index
          };
          minIndexes.push( index );
        } else if ( min.value === +( element.valueRight ) ) {
          minIndexes.push( index );
        }
      } );
      minIndexes.forEach( item => connections[ item ].end = true );
      connections.sort( ( a, b ) => a.valueLeft - b.valueLeft );
      min = { value: 999, index: 0 };
      minIndexes = [];
      connections.forEach( ( element, index ) => {
        if ( min.value > +element.valueLeft ) {
          minIndexes = [];
          min = {
            value: +element.valueLeft, index: index
          };
          minIndexes.push( index );
        } else if ( min.value === +( element.valueLeft ) ) {
          minIndexes.push( index );
        }
      } );
      minIndexes.forEach( item => connections[ item ].start = true );
      lineDots.push( { x: connections[ 0 ].xL, y: connections[ 0 ].yL } );
      getConnections( connections[ 0 ], connections, 'bottom' );
    } else if ( lengthP2 === 2 ) {
      let dotsArray    = switchArrayHeading( valArr ),
          relationship = [];
      for ( let i = 0; i < dotsArray[ 0 ].length; i++ ) {
        relationship.push( {
          l: dotsArray[ 0 ][ i ], r: dotsArray[ 1 ][ i ], startIndex: i
        } );
      }
      for ( let i = 0; i < dotsArray.length; i++ ) {
        for ( let j = 0; j < dotsArray[ i ].length; j++ ) {
          dotsArray[ i ][ j ] = { val: dotsArray[ i ][ j ], index: j };
        }
      }
      dotsArray.forEach( arr => arr.sort( ( a, b ) => a.val - b.val )
                                   .reverse() );
      let leftWay  = [],
          rightWay = [];
      const MAX = dotsArray[ 0 ][ 0 ].val > dotsArray[ 1 ][ 0 ].val ? dotsArray[ 0 ][ 0 ].val : dotsArray[ 1 ][ 0 ].val,
            MIN = +dotsArray[ 0 ][ dotsArray[ 0 ].length - 1 ].val < +dotsArray[ 1 ][ dotsArray[ 1 ].length - 1 ].val ? +dotsArray[ 0 ][ dotsArray[ 0 ].length - 1 ].val : +dotsArray[ 1 ][ dotsArray[ 1 ].length - 1 ].val;
      for ( let i = 0; i < dotsArray[ 0 ].length; i++ ) {
        let y1 = getBoundaryY( MAX, MIN, dotsArray[ 0 ][ i ].val ),
            y2 = getBoundaryY( MAX, MIN, dotsArray[ 1 ][ i ].val );
        drawPoint( LEFT_SIDE_WIDTH, y1, dotsArray[ 0 ][ i ].val, 'left' );
        leftWay.push( {
          x    : LEFT_SIDE_WIDTH, y: y1, val: dotsArray[ 0 ][ i ].val,
          index: dotsArray[ 0 ][ i ].index
        } );
        drawPoint( RIGHT_SIDE_WIDTH, y2, dotsArray[ 1 ][ i ].val, 'right' );
        rightWay.push( {
          x    : RIGHT_SIDE_WIDTH, y: y2, val: dotsArray[ 1 ][ i ].val,
          index: dotsArray[ 1 ][ i ].index
        } );
      }
      leftWay.sort( ( a, b ) => a.index - b.index );
      rightWay.sort( ( a, b ) => a.index - b.index );
      for ( let i = 0; i < leftWay.length; i++ ) {
        linesArray.push( new Line( leftWay[ i ].x, leftWay[ i ].y, rightWay[ i ].x, rightWay[ i ].y, leftWay[ i ].val, rightWay[ i ].val ) );
      }
      linesArray.forEach( el => el.drawConnection() );
      let connections = [];
      for ( let i = 0; i < linesArray.length; i++ ) {
        connections.push( compareLineWithAllLines( linesArray[ i ], linesArray ) );
      }
      connections.sort( ( a, b ) => a.valueRight - b.valueRight );
      let max        = { value: -999, index: 0 },
          maxIndexes = [];
      connections.forEach( ( element, index ) => {
        if ( max.value < +element.valueRight ) {
          maxIndexes = [];
          max = {
            value: +element.valueRight, index: index
          };
          maxIndexes.push( index );
        } else if ( max.value === +( element.valueRight ) ) {
          maxIndexes.push( index );
        }
      } );
      maxIndexes.forEach( item => connections[ item ].end = true );
      connections.sort( ( a, b ) => a.valueLeft - b.valueLeft );
      max = { value: -999, index: 0 };
      maxIndexes = [];
      connections.forEach( ( element, index ) => {
        if ( max.value < +element.valueLeft ) {
          maxIndexes = [];
          max = {
            value: +element.valueLeft, index: index
          };
          maxIndexes.push( index );
        } else if ( max.value === +( element.valueLeft ) ) {
          maxIndexes.push( index );
        }
      } );
      maxIndexes.forEach( item => connections[ item ].start = true );
      connections.reverse();
      lineDots.push( { x: connections[ 0 ].xL, y: connections[ 0 ].yL } );
      getConnections( connections[ 0 ], connections, 'top' );
    }
  } else {
    return toMatrix();
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
        // ctx.beginPath();
        // ctx.arc( insertionInfo.x, insertionInfo.y, 5, 0, 2 * Math.PI, true );
        // ctx.fill();
        let obj = {
          insertion: {
            x: insertionInfo.x, y: insertionInfo.y
          },
          line1    : line,
          line2    : lines[ i ],
          checked  : false
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

function getConnections ( currentConnection, connections, side ) {
  if ( side === 'bottom' ) {
    if ( currentConnection !== undefined ) {
      if ( currentConnection.end ) {
        lineDots.push( { x: currentConnection.xR, y: currentConnection.yR } );
        drawConnection( '#E84118' );
      } else {
        if ( currentConnection.children.length > 1 ) {
          currentConnection.children.sort( ( a, b ) => a.insertion.y - b.insertion.y );
        }
        let bestItem,
            received = false,
            iter     = 0;
        currentConnection.children.sort( ( a, b ) => a.insertion.x - b.insertion.x );
        currentConnection.children.forEach( item => {
          if ( received ) {
            return;
          }
          connections.forEach( conn => {
            if ( conn.valueLeft === item.line2.valLeft && conn.valueRight === item.line2.valRight ) {
              if ( received ) {
                return;
              }
              if ( conn.end ) {
                if ( received ) {
                  return;
                }
                conn.children.sort( ( a, b ) => a.insertion.x - b.insertion.x );
                conn.children.forEach( ( ins, i ) => {
                  if ( received ) {
                    return;
                  }
                  if ( JSON.stringify( item.insertion ) === JSON.stringify( ins.insertion ) ) {
                    if ( i === conn.children.length - 1 ) {
                      bestItem = item;
                      received = true;
                      iter++;
                      return;
                    }
                  }
                } );
              }
            }
          } );
        } );
        if ( received ) {
          connections.forEach( element => {
            if ( element.xL === bestItem.line2.leftSide.x && element.xR === bestItem.line2.rightSide.x && element.yL === bestItem.line2.leftSide.y && element.yR === bestItem.line2.rightSide.y ) {
              lineDots.push( bestItem.insertion );
              return getConnections( element, connections, 'bottom' );
            }
          } );
        } else {
          let minY = currentConnection.children[ 0 ];
          currentConnection.children.forEach( item => {
            if ( item.insertion.y > minY.insertion.y && item.insertion.x > minY.insertion.x && !item.checked ) {
              minY = item;
            }
          } );
          connections.forEach( element => {
            if ( element.xL === minY.line2.leftSide.x && element.xR === minY.line2.rightSide.x && element.yL === minY.line2.leftSide.y && element.yR === minY.line2.rightSide.y ) {
              lineDots.push( minY.insertion );
              element.children.forEach( item => {
                if ( JSON.stringify( item.insertion ) === JSON.stringify( minY.insertion ) ) {
                  item.checked = true;
                }
              } );
              currentConnection.children.forEach( item => {
                if ( JSON.stringify( item.insertion ) === JSON.stringify( minY.insertion ) ) {
                  item.checked = true;
                }
              } );
              return getConnections( element, connections, 'bottom' );
            }
          } );
        }
      }
    }
  } else if ( side === 'top' ) {
    if ( currentConnection !== undefined ) {
      if ( currentConnection.end ) {
        lineDots.push( { x: currentConnection.xR, y: currentConnection.yR } );
        drawConnection( '#3498DB' );
      } else {
        if ( currentConnection.children.length > 1 ) {
          currentConnection.children.sort( ( a, b ) => a.insertion.y - b.insertion.y );
          currentConnection.children.reverse();
        }
        let bestItem,
            received = false,
            iter     = 0;
        currentConnection.children.sort( ( a, b ) => a.insertion.x - b.insertion.x );
        currentConnection.children.reverse();
        currentConnection.children.forEach( item => {
          if ( received ) {
            return;
          }
          connections.forEach( conn => {
            if ( conn.valueLeft === item.line2.valLeft && conn.valueRight === item.line2.valRight ) {
              if ( received ) {
                return;
              }
              if ( conn.end ) {
                if ( received ) {
                  return;
                }
                conn.children.sort( ( a, b ) => a.insertion.x - b.insertion.x );
                conn.children.forEach( ( ins, i ) => {
                  if ( received ) {
                    return;
                  }
                  if ( JSON.stringify( item.insertion ) === JSON.stringify( ins.insertion ) ) {
                    if ( i === conn.children.length - 1 ) {
                      bestItem = item;
                      received = true;
                      iter++;
                      return;
                    }
                  }
                } );
              }
            }
          } );
        } );
        if ( received ) {
          connections.forEach( element => {
            if ( element.xL === bestItem.line2.leftSide.x && element.xR === bestItem.line2.rightSide.x && element.yL === bestItem.line2.leftSide.y && element.yR === bestItem.line2.rightSide.y ) {
              lineDots.push( bestItem.insertion );
              return getConnections( element, connections, 'top' );
            }
          } );
        } else {
          let maxY = currentConnection.children[ 0 ];
          currentConnection.children.forEach( item => {
            if ( item.insertion.y < maxY.insertion.y && !item.checked ) {
              maxY = item;
            }
          } );
          connections.forEach( element => {
            if ( element.xL === maxY.line2.leftSide.x && element.xR === maxY.line2.rightSide.x && element.yL === maxY.line2.leftSide.y && element.yR === maxY.line2.rightSide.y ) {
              lineDots.push( maxY.insertion );
              element.children.forEach( item => {
                if ( JSON.stringify( item.insertion ) === JSON.stringify( maxY.insertion ) ) {
                  item.checked = true;
                }
              } );
              currentConnection.children.forEach( item => {
                if ( JSON.stringify( item.insertion ) === JSON.stringify( maxY.insertion ) ) {
                  item.checked = true;
                }
              } );
              return getConnections( element, connections, 'top' );
            }
          } );
        }
      }
    }
  }
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

function drawConnection ( color ) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.moveTo( lineDots[ 0 ].x, lineDots[ 0 ].y );
  ctx.lineWidth = 3;
  for ( let i = 1; i < lineDots.length; i++ ) {
    ctx.lineTo( lineDots[ i ].x, lineDots[ i ].y );
  }
  ctx.stroke();
  ctx.lineWidth = 1;
}
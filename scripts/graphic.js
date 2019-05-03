const
  graphicTab = document.querySelector( '#gc' ),
  cnv        = document.querySelector( '#graphicCanvas' );


graphicTab.addEventListener( 'click', function () {
  isCroppingYourself = false;
  drawCooridanateSystem( cnv, cnv.width, cnv.height );
} );

function drawCooridanateSystem ( canvas, width, height ) {
  let ctx = canvas.getContext( '2d' );
  const XL_PADDING     = 75,
        MEDIUM_PADDING = 50,
        XL             = width - XL_PADDING,
        MD             = height - MEDIUM_PADDING;
  ctx.fill();
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
}
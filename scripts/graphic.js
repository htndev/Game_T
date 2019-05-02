const
  graphicTab = document.querySelector( '#gc' ),
  cnv        = document.querySelector( '#graphicCanvas' );


graphicTab.addEventListener( 'click', function () {
  isCroppingYourself = false;
  drawCooridanateSystem( cnv, cnv.width, cnv.height );
} );

function drawCooridanateSystem ( canvas, width, height ) {
  let ctx = canvas.getContext( '2d' );
  console.log( canvas );
  console.log( width );
  console.log( height );
  console.log( ctx );
  ctx.beginPath();
  ctx.moveTo( 0, 0 );
  ctx.lineTo( 0, height );
  ctx.lineTo( width, height );
  ctx.lineTo( width, 0);
  ctx.stroke();
}

   let text = document.getElementsByClassName('text')
   for (var i = 0; i < text.length; i++) {
    text[i].setAttribute("y", window.innerHeight - 20);
    text[i].setAttribute("x", window.innerHeight / 10);
   }

   window.addEventListener('resize', () => {
     for (var i = 0; i < text.length; i++) {
      text[i].setAttribute("y", window.innerHeight - 20);
      text[i].setAttribute("x", window.innerHeight / 10);
     }
   });

  // var c = document.getElementById('fs')
  // console.log(c);
  // var w = c.width;
  // var h = c.height;
  // var ocanvas = document.createElement("canvas");     // create off-screen canvas
  // ocanvas.width = w<<1;                               // set offscreen canvas x2 size
  // ocanvas.height = h<<1;
  //
  // var octx = ocanvas.getContext("2d", {alpha: false});
  //   console.log(octx);
  // var idata = octx.createImageData(ocanvas.width, ocanvas.height);
  // var buffer32 = new Uint32Array(idata.data.buffer);  // get 32-bit view
  //
  // // render noise once, to the offscreen-canvas
  // noise(octx);
  //
  // // main loop draw the offscreen canvas to random offsets
  // var ctx = c.getContext("2d", {alpha: false});
  // (function loop() {
  //   var x = (w * Math.random())|0;                    // force integer values for position
  //   var y = (h * Math.random())|0;
  //
  //   ctx.drawImage(ocanvas, -x, -y);                   // draw static noise (pun intended)
  //   requestAnimationFrame(loop)
  // })()
  // function noise(ctx) {
  //   var len = buffer32.length - 1;
  //   while(len--) buffer32[len] = Math.random() < 0.5 ? 0 : -1>>0;
  //   ctx.putImageData(idata, 0, 0);
  // }

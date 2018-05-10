
   let text = document.getElementsByClassName('text')
   console.log('', text);
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

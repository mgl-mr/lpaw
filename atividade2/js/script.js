function App(){
  function quad(ctx, x, y, s, l, color, fill=false) {
    ctx.lineWidth = l;  
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, s, s);

    if(fill == false) {
      ctx.fillStyle = '#fff';
    } else {
      ctx.fillStyle = fill;
    }
    ctx.fillRect(x, y, s, s);
  }

  const canvas1 = document.querySelector('#canvas1');
  const ctx1 = canvas1.getContext('2d');

  quad(ctx1, 50, 30, 50, 5, 'magenta');
  quad(ctx1, 120, 30, 50, 5, 'blue', 'red')
}

App();
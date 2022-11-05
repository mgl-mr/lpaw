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

  function circ(ctx, x, y, r, l, color, fill=false) {
    ctx.lineWidth = l;
    ctx.beginPath();
    ctx.arc(x, y, r, (Math.PI/180)*0, (Math.PI/180)*360, true);

    if(fill == false) {
      ctx.fillStyle = '#fff';
    } else {
      ctx.fillStyle = fill;
    }

    ctx.strokeStyle = color;
    ctx.fill();
    ctx.stroke();
  }

  const canvas2 = document.querySelector('#canvas2');
  const ctx2 = canvas2.getContext('2d');

  circ(ctx2, 100, 50, 30, 5, '#f00');
  circ(ctx2, 200, 50, 40, 10, '#00f', '#0f0')

  function triEqui(ctx, x, y, l, color = '#000', rev = false) {
    h = l * (Math.sqrt(3)/2);

    if (rev == false) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + (l / 2), y + h);
      ctx.lineTo(x - (l / 2), y + h);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(x, y + h);
      ctx.lineTo(x + (l / 2), y);
      ctx.lineTo(x - (l / 2), y);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    } 
  }

  const canvas3 = document.querySelector('#canvas3');
  const ctx3 = canvas3.getContext('2d');
  
  triEqui(ctx3, 100, 10,  80, '#000');
  triEqui(ctx3, 200, 10,  80, '#0f0', true);

  function drawnStar(ctx, x, y, s, color) {
    triEqui(ctx, x, y,  s, color);
    triEqui(ctx, x, y + (s/3),  s, color, true);
  }

  const canvas4 = document.querySelector('#canvas4');
  const ctx4 = canvas4.getContext('2d');

  drawnStar(ctx4, 50, 50, 40, 'saddlebrown');
  drawnStar(ctx4, 100, 25, 40, 'gray');
  drawnStar(ctx4, 150, 50, 40, 'gold');

  function shield(ctx, x, y, size) {
    circ(ctx, x, y, size/2, size/6, 'red');
    circ(ctx, x, y, size/4, size/10, 'red', 'blue');
    drawnStar(ctx, x, y - ((size/4) - size/20), size/3, 'white'); 
  }

  const canvas5 = document.querySelector('#canvas5');
  const ctx5 = canvas5.getContext('2d');

  shield(ctx5, canvas5.width/2, canvas5.height/2, 100);

  function smile(ctx, x, y, size){
    circ(ctx, x, y, size/2, 5, 'black', 'yellow');

    circ(ctx, x + (size/6), y - (size/6), size/20, 1, 'black', 'black');
    circ(ctx, x - (size/6), y - (size/6), size/20, 1, 'black', 'black');

    ctx.lineWidth = size/30;
    ctx.beginPath();
    ctx.arc(x, y + (size/10), size/4, (Math.PI/180)*0, (Math.PI/180)*180, false);
    ctx.fillStyle = 'yellow'
    ctx.strokeStyle = 'black';
    ctx.fill();
    ctx.stroke();
  }

  const canvas6 = document.querySelector('#canvas6');
  const ctx6 = canvas6.getContext('2d');

  smile(ctx6, canvas6.width/2, canvas6.height/2, 100);

  function writeCenter(ctx, cwidth, cheight, text, color = 'black', size = 12, family = 'serif', style = 'normal', base = 'alphabetic', grad = false) {
    let textSize = 12;
    if(size != 12) {
      textSize = size;
    }
    
    let textFamily = 'serif';
    if(family != 'serif') {
      textFamily = family;
    }
    
    let textStyle = 'normal';
    if(style != 'normal') {
      textStyle = style;
    }

    ctx.font = `${textStyle} ${textSize}px ${textFamily}`;

    if(base == 'alphabetic') {
      ctx.textBaseline = 'alphabetic';
    } else {
      ctx.textBaseline = base;
    }

    let textMetric = ctx.measureText(text);

    if (grad != false) {
      ctx.fillStyle = grad;
      ctx.strokeText(text, cwidth / 2 - textMetric.width / 2, cheight / 2 - textSize);	
    }

    if(color == 'black') {
      ctx.fillStyle = 'black';
    } else {
      ctx.fillStyle = color;
    }

    ctx.fillText(text, cwidth / 2 - textMetric.width / 2, cheight / 2 - textSize)
  }

  const canvas7 = document.querySelector('#canvas7');
  const ctx7 = canvas7.getContext('2d');

  writeCenter(ctx7, canvas7.width, canvas7.height, 'CENTRALIZADO', '#00f', 24, 'sans', 'bold', 'top');

  function gradiente(ctx, canvas) {
    let textSize = 30;
    ctx.font = `bold ${textSize}px arial`;

    let texto = "TRICOLOR";
		let textMetric = ctx.measureText(texto);

    let x0 = canvas.width / 2 - textMetric.width / 2;
		let y0 = canvas.height / 2 - textSize;
		let x1 = canvas.width / 2 + textMetric.width / 2;
		let y1 = y0;

		let textGradiente = ctx.createLinearGradient(x0,y0,x1,y1);
		textGradiente.addColorStop(0,'blue');
		textGradiente.addColorStop(.5, 'white');
		textGradiente.addColorStop(1,'black');

    let quadGradiente = ctx.createLinearGradient(x0,y0,x1,y1);
		quadGradiente.addColorStop(0,'black');
		quadGradiente.addColorStop(.5, 'white');
		quadGradiente.addColorStop(1,'blue');

    quad(ctx, 0, 0, 300, 0, 'black', quadGradiente);

    writeCenter(ctx, canvas.width, canvas.height, texto, textGradiente, textSize, 'arial', 'bold', 'top', true);
  }
  
  const canvas8 = document.querySelector('#canvas8');
  const ctx8 = canvas8.getContext('2d');

  gradiente(ctx8, canvas8);

  function sol (ctx, canvas) {
    //retangulo de baixo
    ctx.fillStyle = '#0f1d35';
    ctx.fillRect(0, 150, canvas.width, canvas.height / 2);

    /****** REFLEXO ******/
    //sombra
    /* ctx.shadowColor = 'white';
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 30; */

    //gradiente
    let fundoGradiente = ctx.createRadialGradient(300, 300, 0, 300, 300, 200);
    fundoGradiente.addColorStop(.2, '#cdd9ff');
    fundoGradiente.addColorStop(.6, '#7394ff');
		fundoGradiente.addColorStop(.8, '#0f1d35');
   
    
    //meio circulo
    ctx.lineWidth = 0;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height + (canvas.height / 20), canvas.height / 1.7, (Math.PI/180)*0, (Math.PI/180)*180, true);
    ctx.fillStyle = fundoGradiente;
    ctx.fill();
    
		ctx.shadowBlur = 0;

    //retangulo de cima
    ctx.fillStyle = '#120133';
    ctx.fillRect(0, 0, canvas.width, canvas.height / 2);

    /****** SOL ******/
    let x = canvas.width/2;
		let y = canvas.height/4;

    //sombra
    ctx.shadowColor = 'yellow';
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 30;

    //gradiente
    let r1 = 60;
		let r2 = 0;

    let fundoSol = ctx.createRadialGradient(x,y,r1,x,y,r2);
    fundoSol.addColorStop(.0, 'black');
		fundoSol.addColorStop(.3, 'yellow');
		fundoSol.addColorStop(.9, 'white');
    
    //circulo
    ctx.lineWidth = 0;
    ctx.beginPath();
    ctx.arc(x, y, 50, (Math.PI/180)*0, (Math.PI/180)*360, true);
    ctx.fillStyle = fundoSol;
    ctx.fill();
    
  }

  const canvas9 = document.querySelector('#canvas9');
  const ctx9 = canvas9.getContext('2d');

  sol(ctx9, canvas9);
}

App();
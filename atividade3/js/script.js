function App(){
  function quad(ctx, x, y, s) { 
    ctx.fillRect(x, y, s, s);
  }

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

  function clearScreen(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  /******** QUESTÃO 1 ********/
  function quadMatriz (ctx, canvas) {
    let x = 0;
    let y = 0;
    let lado = 190;
    let contador = 1;

    do {
      do {
        ctx.fillStyle = 'black';

        ctx.shadowColor = "black";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 50;
  
        ctx.save();
        
        ctx.fillStyle = 'blue';
        ctx.shadowColor = "blue";
  
        if(contador & 1) {
          ctx.restore();
        }
  
        quad(ctx, x, y, lado);
  
        x += lado;
        contador ++;
      } while (x < canvas.width);

      x = 0;
      y += lado;
      if (lado > 20){
        lado /= 2;
      }
    } while (y < canvas.height);
    
  }

  const canvas1 = document.querySelector('#canvas1');
  const ctx1 = canvas1.getContext('2d');

  quadMatriz (ctx1, canvas1);

  /******** QUESTÃO 2 ********/
  function circLoop(ctx, canvas) {
    const frames = 60;
    const totalCircles = 60;
    const colors = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
    const circles = [];
    
    for (let i = 0; i < totalCircles; i++) {
      circles.push({
        x:  parseInt(Math.random() * canvas.width),
        y: parseInt(Math.random() * canvas.height),
        size: parseInt(Math.random() * 25),
        speed: parseInt(Math.random() * (20 - 1) + 1),
        color: '#'
               +colors[parseInt(Math.random() * (colors.length - 1))]
               +colors[parseInt(Math.random() * (colors.length - 1))]
               +colors[parseInt(Math.random() * (colors.length - 1))]
      })
    }

    const circlesRain = () =>  {
      setTimeout (() => {
        ctx.reset()
        for (let i = 0; i < totalCircles; i++) {
          drawCircle (
            ctx, 
            circles[i].x, 
            circles[i].y += circles[i].speed, 
            circles[i].size,
            circles[i].color
          );
          if (circles[i].y > canvas.height) {
            circles[i].y = parseInt(Math.random() * canvas.height);
            circles[i].x =  parseInt(Math.random() * canvas.width);
            circles[i].size = parseInt(Math.random() * 25);
            circles[i].speed = parseInt(Math.random() * (20 - 1) + 1);
            circles[i].color = '#'
              +colors[parseInt(Math.random() * (colors.length - 1))]
              +colors[parseInt(Math.random() * (colors.length - 1))]
              +colors[parseInt(Math.random() * (colors.length - 1))];
          }
        }
        requestAnimationFrame(circlesRain);
      }, 1000 / frames);
    }

    circlesRain();
  
    function drawCircle (ctx, x, y, radius, color) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI / 180 * 360);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.fill();
      ctx.stroke();
    }
  }

  const canvas2 = document.querySelector('#canvas2');
  const ctx2 = canvas2.getContext('2d');

  circLoop (ctx2, canvas2);

  /******** QUESTÃO 3 ********/
  function matrix(ctx, canvas) {
    var chinese = "C田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
    chinese = chinese.split("");

    var font_size = 20;
    var columns = canvas.width / font_size; //number of columns for the rain
    
    var drops = []; //an array of drops - one per column
    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for(var x = 0; x < columns; x++)
      drops[x] = 1; 

    var possui = false; // boolean to check "CSTSI" in array
    var tsi = []; // array with position X and position letter to print

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#0F0";//green text
      ctx.font = font_size + "px arial";
      

      for(var i = 0; i < drops.length; i++) {
        //random letter of "chinese" variable
        var text = chinese[Math.floor(Math.random()*chinese.length)];
        
        if (possui == true) {
          // check if the current column (position X) exists on array tsi
          let index = tsi.findIndex(val => val.posX == i*font_size);
          
          //if is change the text variable to correct letter on "CSTSI"
          if (index != -1) {
            switch (tsi[index].count) {
              case 1 :
                text = 'S';
                tsi[index].count ++;
                break;
              case 2 :
                text = 'T';
                tsi[index].count ++;
                break;
              case 3 :
                text = 'S';
                tsi[index].count ++;
                break; 
              case 4 :
                text = 'I';
                tsi.splice(index, 1); //remove object from array 
            }  
          }
        }

        if (tsi.length == 0) {
          possui = false;
        }
        
        /*** STARTING THE "CSTSI" CYCLE ***/
        //saving X position of "C" in object array when the random letter is "C"
        if (text == 'C') {
          tsi.push({'posX': i*font_size, 'count': 1});
          possui = true;
        }
        
        //white color for letters C, S, T, I
        if ('C S T S I'.includes(text)) {
          ctx.fillStyle = "#FFF";
        } else {
          ctx.fillStyle = "#0F0";
        }

        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i*font_size, drops[i]*font_size);
        
        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if(drops[i]*font_size > canvas.height  && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        //incrementing Y coordinate
        drops[i]++;
      }
    }
    setInterval(draw, 30);
  }

  const canvas3 = document.querySelector('#canvas3');
  const ctx3 = canvas3.getContext('2d');

  matrix (ctx3, canvas3);
}

App();
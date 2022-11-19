import Circle from "./geometries/Circle";
import Score from "./Score"
import Enemy from "./Enemy";
import Smile from "./Smile";
import { keyPress, key } from "./keyboard";

let CTX;
let CANVAS;
const FRAMES = 30;
const qtdEnemies = 10;
let points = 0;

let enemies = Array.from({length:qtdEnemies});
const smile = new Smile(300, 100, 20, 6, 'yellow');
const orange = new Circle(Math.random()*550 + 15, Math.random()*350 + 15, 15, 0, 'orange');
const score = new Score(`Score: ${points}`, 600);

let gameover = false;
let anime;
let boundaries;

const init = () => {
	console.log("Initialize Canvas");
	CANVAS = document.querySelector('canvas');
	CTX = CANVAS.getContext('2d');
	
	boundaries = {
		width: CANVAS.width,
		height: CANVAS.height
	}

	enemies = enemies.map(i=>new Enemy(
			Math.random()*CANVAS.width,
			Math.random()*CANVAS.height,
			10, 5, 'red'
		));
	
	keyPress(window);
	loop();
}

const loop = () => {
	setTimeout(() => {

		CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

    score.draw(CTX);

		smile.move(boundaries, key);
		smile.paint(CTX);

		enemies.forEach(e =>{
			e.move(boundaries, 0) 
			e.draw(CTX)
			 //var = teste?verdadeiro:falso;
			gameover = !gameover ? e.colide(smile) : true;
		}); 

    if(orange.colide(smile)) {
      orange.x = (Math.random()*(CANVAS.width - orange.size)) + orange.size;
      orange.y = (Math.random()*(CANVAS.height - orange.size)) + orange.size;

      points ++;
      score.text = `Score: ${points}`;
      smile.size ++;
    }

    orange.draw(CTX);

		if (gameover) {
			console.error('DEAD!!!');
      
      let textMetric = CTX.measureText(`Score: ${points}`);
      CTX.clearRect(CANVAS.width / 2 - textMetric.width / 2, 0, textMetric.width, 30);
      
      score.text += ' GAME OVER !!';
      score.color = 'red';
      
      score.draw(CTX);

			cancelAnimationFrame(anime);
		} else	anime = requestAnimationFrame(loop);

	}, 1000 / FRAMES);
}

export { init }
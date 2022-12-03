import Circle from "./geometries/Circle";
import Score from "./Score"
import Enemy from "./Enemy";
import Hero from "./Hero";
import Coin from "./Coin";
import { loadImage, loadAudio } from "./loaderAssets";
import { keyPress, key } from "./keyboard";

let CTX;
let CANVAS;
const FRAMES = 60;
const qtdEnemies = 15;
let points = 0;

let enemies = Array.from({length:qtdEnemies});
const hero = new Hero(300, 100, 20, 4, 41, 44.5, 'img/goblin.png', FRAMES);
const orange = new Coin((Math.random()*550) + 15,( Math.random()*350) + 15, 15, 0, 'img/coin.png');
const score = new Score(`Score: ${points}`, 600);

let gameover = false;
let anime;
let theme;

let boundaries;

let gameOverSound;
let scoreSound;
let background;

const init = async () => {
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
		10, 
    3, 
    'img/enemy.png',
    FRAMES
	));

  gameOverSound = await loadAudio('sounds/gameOver.mp3');
  scoreSound = await loadAudio('sounds/score.mp3');
  theme = await loadAudio('sounds/theme.mp3');
  gameOverSound.volume = .5;
  scoreSound.volume = .5;
  theme.volume = .2;
  theme.loop = true;

  background = await loadImage('img/background.jpg');
		
	keyPress(window);
	loop();
}

const loop = () => {
	setTimeout(() => {
    
		CTX.drawImage(background, 0, 0, CANVAS.width, CANVAS.height);

    score.draw(CTX);

		hero.move(boundaries, key);
		hero.draw(CTX);

		enemies.forEach(e =>{
			e.move(boundaries, 0) 
			e.draw(CTX)
			 //var = teste?verdadeiro:falso;
			gameover = !gameover ? e.colide(hero) : true;
		}); 

    if(orange.colide(hero)) {
      scoreSound.play();

      orange.x = (Math.random()*(CANVAS.width - orange.size)) + orange.size;
      orange.y = (Math.random()*(CANVAS.height - orange.size)) + orange.size;

      points ++;
      score.text = `Score: ${points}`;
    }

    orange.draw(CTX);

		if (gameover) {
			console.error('DEAD!!!');
      theme.pause();
      gameOverSound.play(); 
      
      CTX.clearRect(0, 0, CANVAS.width, 30);
      
      score.text += ' GAME OVER !!';
      score.color = 'red';
      
      score.draw(CTX);

			cancelAnimationFrame(anime);
		} else	anime = requestAnimationFrame(loop);

    if(theme.currentTime == 0 && key) {
      theme.play();
    }
	}, 1000 / FRAMES);

}

export { init }
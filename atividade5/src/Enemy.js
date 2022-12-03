import Circle from "./geometries/Circle";
import { loadImage } from "./loaderAssets";

export default class Enemy extends Circle{
	constructor(x, y, size, speed = 10, imgUrl, frames) {
		super(x,y,size,speed);
		this.line = 1;
    this.frames = frames;

    this.imgUrl = imgUrl;
    
    loadImage(imgUrl)
		.then(img=>{
      console.log(img);
			this.img = img;
			this.cellWidth = img.naturalWidth / 4;
      this.cellHeight = img.naturalHeight;
		});

    this.cellX = 0;

    this.animeSprite(frames);
	}
  

	move(limits){
		this.y +=this.speed;
		this.limits(limits);
	}

  draw(ctx) {
    

    ctx.drawImage(
			this.img,
			this.cellX * this.cellWidth,
			0,
			this.cellWidth,
			this.cellHeight,
			this.x - this.size*2,
			this.y - this.size*2,
			this.size * 4,
			this.size * 4
		);
  }

  animeSprite(FRAMES){ //Controla a animacao do sprite
		setInterval(() => {
			this.cellX = this.cellX < 2 ? this.cellX + 1 : 0;
		}, 1000 / (FRAMES/8))
	}

	limits(limits){
    const colors = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];

		if(this.y - this.size > limits.height ){
			this.y = -2*this.size;
			this.x = Math.random()*limits.width;
      this.color = '#' 
        +colors[Math.floor(Math.random() * (colors.length - 1))]
        +colors[Math.floor(Math.random() * (colors.length - 1))]
        +colors[Math.floor(Math.random() * (colors.length - 1))]; 
		}
	}
}
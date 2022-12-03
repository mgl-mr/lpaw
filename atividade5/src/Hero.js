import Circle from './geometries/Circle';
import { loadImage } from "./loaderAssets";

export default class Hero extends Circle {

	constructor(x, y, size, speed = 10, width, height, imgUrl, FRAMES) {
		super(x, y, size, speed);
    this.imgUrl = imgUrl;
    
    loadImage(imgUrl)
		.then(img=>{
      console.log(img);
			this.img = img;
			this.cellWidth = img.naturalWidth/ this.totalSpritesX + 3.5;
			this.cellHeight = img.naturalHeight / this.totalSpritesY;
		});

    this.totalSpritesX = 3;
    this.totalSpritesY = 4;

    this.spriteSpeed = 1;

    this.cellX = 0;
    this.cellY = 0;
    
    this.width = width;
		this.height = height;

		this.status = 's';

    this.hit = new Circle(this.x + size, this.y + size, this.size,	speed, "rgba(0,0,255,.5)");

    this.animeSprite(FRAMES);
	}


	draw(ctx) {
    this.setCellY();

    ctx.drawImage(
			this.img,
			this.cellX * this.cellWidth,
			this.cellY * this.cellHeight,
			this.cellWidth,
			this.cellHeight,
			this.x,
			this.y,
			this.width,
			this.height
		);
    
		//this.hit.draw(ctx);	
	}

  animeSprite(FRAMES){ //Controla a animacao do sprite
		setInterval(() => {
			this.cellX = this.cellX < this.totalSpritesX - 1 ? this.cellX + 1 : 0;
		}, 1000 / (FRAMES*this.spriteSpeed/5))
	}
  
  setCellY(){
		let sprites = {
			's': 0,
			'w': 1,
			'a': 3,
			'd':2
		}
		this.cellY = sprites[this.status]
	}

	move(limits, key) {
    
		let movements = {
			's': { x: this.x, y: this.y + this.speed },
			'w': { x: this.x, y: this.y - this.speed },
			'a': { x: this.x - this.speed, y: this.y },
			'd': { x: this.x + this.speed, y: this.y }
		}

		this.status = movements[key] ? key : this.status;

		this.x = movements[this.status].x;
		this.y = movements[this.status].y;

    this.updateHit();
		this.limits(limits);
	}

	limits(limits){
    if(this.x + this.size*2 >= limits.width) {
      this.x = limits.width - this.size*2;
      this.cellX = 0;
    }

    if(this.x < 0) {
      this.x = 0;
      this.cellX = 0;
    }
		
    if(this.y + this.size*2 > limits.height){
      this.y = limits.height - this.size*2;
      this.cellX = 0;
    }

    if(this.y < 0){
      this.y = 0;
      this.cellX = 0;
    }	
	}

  updateHit(){
		this.hit.x = this.x + this.size;
		this.hit.y = this.y + this.size;
	}
  
  
}
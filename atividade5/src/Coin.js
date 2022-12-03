import Circle from './geometries/Circle';
import { loadImage } from "./loaderAssets";

export default class Coin extends Circle {

	constructor(x, y, size, speed = 10, imgUrl) {
		super(x, y, size, speed);
    this.imgUrl = imgUrl;
    
    loadImage(imgUrl)
		.then(img=>{
      console.log(img);
			this.img = img;
			this.cellWidth = img.naturalWidth/ this.totalSpritesX + 3.5;
			this.cellHeight = img.naturalHeight / this.totalSpritesY;
		});

	}

  draw(ctx) {
    ctx.drawImage(this.img, this.x - this.size, this.y - this.size, this.size*2, this.size*2);
  }
	
}
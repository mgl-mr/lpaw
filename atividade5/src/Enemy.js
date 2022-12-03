import Circle from "./geometries/Circle";

export default class Enemy extends Circle{
	constructor(x, y, size, speed = 10, color = "#00f") {
		super(x,y,size,speed,color);
		this.line = 1;
		// console.log('enemy',this) 
	}

	move(limits){
		this.y +=this.speed;
		this.limits(limits);
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
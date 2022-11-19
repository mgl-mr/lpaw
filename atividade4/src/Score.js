export default class Score {
  constructor(text, width, color = 'blue') {
    this.text = text;
    this.color = color;
    this.width = width;
  }

  draw(ctx) {
    this.writeScore(ctx, this.text, this.color, this.width);
  }

  writeScore(ctx, text, color, width) {
    let textMetric = ctx.measureText(text);
    
    ctx.font = 'normal 24px serif';
    ctx.textBaseline = 'top';
    ctx.fillStyle = color;

    ctx.fillText(text, width / 2 - textMetric.width / 2, 5);
  }
}
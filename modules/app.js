import { MouseControls } from './mouseControls.js'
import { Layer } from './layer.js'
import { Loop } from './loop.js'

class App {
  constructor(container) {
    this.layer = new Layer(container);

    this.mouse = new MouseControls(this.layer.canvas);

    this.rect = {
      x: 0,
      y: 0,
      w: 32,
      h: 32,
      vx: 500,
      vy: 500,
      color: `orange`
    }

    new Loop(this.update.bind(this), this.display.bind(this));
  }
  update(correction) {
    this.rect.x = this.mouse.pos.x
    this.rect.y = this.mouse.pos.y

    if (this.mouse.isDown) {
      this.rect.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }
    if (!this.mouse.isPressed && this.rect.w > 32) {
      this.rect.h = this.rect.w -= 3
    }
    if (this.mouse.isPressed && this.rect.w < 200) {
      this.rect.h = this.rect.w += 3
    }

    this.mouse.update()
  }
  display() {
    this.layer.context.clearRect(0, 0, this.layer.w, this.layer.h); 
    this.layer.context.fillStyle = this.rect.color;
    this.layer.context.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h); 
  }
}

onload = () => { new App(document.body) }
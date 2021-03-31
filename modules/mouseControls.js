export class MouseControls {
  constructor( container = document.body ) {
    this.container = container
    this.isPressed = false
    this.isDown = false
    this.isUp = false
    this.pos = {x: 0, y: 0}
    
    container.addEventListener( `mouseup`,     e => this.changeState(e) )
    container.addEventListener( `mousedown`,   e => this.changeState(e) )
    container.addEventListener( `mousemove`,   e => this.changeState(e) )
    container.addEventListener( `mousewheel`,  e => this.changeState(e) )
    container.addEventListener( `mouseleave`,  e => this.changeState(e) )
    container.addEventListener( `contextmenu`, e => this.changeState(e) )
  }
  changeState(e) {
    // console.log( e.type )
    const rect = this.container.getBoundingClientRect()

    this.pos.x = e.clientX - rect.left
    this.pos.y = e.clientY - rect.top

    if (e.type === 'mousedown') {
      this.isPressed = true
      this.isDown = true
      this.isUp = false
    } else if (e.type === 'mouseup' || e.type === 'mouseleave') {
      this.isPressed = false
      this.isDown = false
      this.isUp = true
    } else if (e.type === 'contextmenu' || e.type === 'mousewheel') {
      e.preventDefault()
    }
  }
  update() {
    this.isDown = false
    this.isUp = false
  }
}
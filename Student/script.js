const circle = '<svg viewBox="0 0 67.4 67.4"><circle class="circle" cx="33.7" cy="33.7" r="33.7"/></svg>';

class Particle {

  constructor(svg, coordinates, friction) {
    this.svg = svg;
    this.steps = $(window).height() / 2;
    this.item = null;
    this.friction = friction;
    this.coordinates = coordinates;
    this.position = this.coordinates.y;
    this.dimensions = this.render();
    this.move();
    this.rotation = Math.random() > 0.5 ? "-" : "+";
    this.scale = 0.4 + Math.random() * 2;
    this.siner = $(window).width() / 2.5 * Math.random();
  }
  destroy() {
    this.item.remove();
  }

  move() {
    this.position = this.position - this.friction;
    let top = this.position;
    let left = this.coordinates.x + Math.sin(this.position * Math.PI / this.steps) * this.siner;
    this.item.css({
      transform: "translateX(" + left + "px) translateY(" + top + "px) scale(" + this.scale + ") rotate(" + this.rotation + (this.position + this.dimensions.height) + "deg)" });


    if (this.position < -this.dimensions.height) {
      this.destroy();
      return false;
    } else {
      return true;
    }
  }

  render() {
    this.item = $(this.svg, {
      css: {
        transform: "translateX(" + this.coordinates.x + "px) translateY(" + this.coordinates.y + "px)" } });


    $("#particles").append(this.item);
    return {
      width: this.item.width(),
      height: this.item.height() };

  }}



let isPaused = false;
window.onblur = function () {
  isPaused = true;
}.bind(this);
window.onfocus = function () {
  isPaused = false;
}.bind(this);

//-------------------------------
let particles = [];

setInterval(function () {
  if (!isPaused) {
    particles.push(
    new Particle(circle, {
      "x": Math.random() * $(window).width(),
      "y": $(window).height() + 100 },
    1 + Math.random()));

  }
}, 180);

function update() {
  particles = particles.filter(function (p) {
    return p.move();
  });
  requestAnimationFrame(update.bind(this));
}
update();
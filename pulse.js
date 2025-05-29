class Pulse {
  constructor(x, y, frequency) {
    this.x = x;
    this.y = y;
    this.frequency = frequency; // 0: low, 1: medium, 2: high
    this.energy = Math.random() * 50 + 50;
  }

  draw(ctx) {
    ctx.fillStyle = this.frequency === 0 ? '#ff4040' : this.frequency === 1 ? '#40c4ff' : '#40ff40';
    ctx.beginPath();
    ctx.arc(this.x + 20, this.y + 20, this.energy / 5, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.energy -= 0.35;
    return this.energy <= 0;
  }
}

module.exports = Pulse;

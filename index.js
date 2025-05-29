const { createCanvas } = require('canvas');
const Pulse = require('./pulse.js');

class AetherPulse {
  constructor() {
    this.canvas = createCanvas(400, 600);
    this.ctx = this.canvas.getContext('2d');
    this.gridSize = 40;
    this.cols = 10;
    this.rows = 15;
    this.pulses = [];
    this.score = 0;
    this.phase = 1;
    this.maxPulses = 4;
    this.spawnPulse();
  }

  spawnPulse() {
    if (this.pulses.length >= this.maxPulses) return;
    const col = Math.floor(Math.random() * this.cols);
    const row = Math.floor(Math.random() * (this.rows - 2)) + 2; // Avoid top rows for UI
    const frequency = Math.floor(Math.random() * 3); // 0: low, 1: medium, 2: high
    this.pulses.push(new Pulse(col * this.gridSize, row * this.gridSize, frequency));
  }

  drawGrid() {
    this.ctx.strokeStyle = '#3a3a3a';
    this.ctx.lineWidth = 1;
    for (let x = 0; x <= this.canvas.width; x += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }

  update() {
    this.ctx.fillStyle = '#1c1c2a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();

    for (let i = this.pulses.length - 1; i >= 0; i--) {
      this.pulses[i].draw(this.ctx);
      if (this.pulses[i].update()) {
        this.pulses.splice(i, 1);
        this.spawnPulse();
      }
    }

    this.checkHarmonics();
    this.drawUI();
  }

  checkHarmonics() {
    const toRemove = [];
    for (let i = 0; i < this.pulses.length; i++) {
      for (let j = i + 1; j < this.pulses.length; j++) {
        const p1 = this.pulses[i];
        const p2 = this.pulses[j];
        if (
          p1.frequency === p2.frequency &&
          (
            (Math.abs(p1.x - p2.x) <= this.gridSize && p1.y === p2.y) || // Horizontal
            (Math.abs(p1.y - p2.y) <= this.gridSize && p1.x === p2.x)    // Vertical
          )
        ) {
          this.ctx.strokeStyle = p1.frequency === 0 ? '#ff4040' : p1.frequency === 1 ? '#40c4ff' : '#40ff40';
          this.ctx.lineWidth = 4;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x + this.gridSize / 2, p1.y + this.gridSize / 2);
          this.ctx.lineTo(p2.x + this.gridSize / 2, p2.y + this.gridSize / 2);
          this.ctx.stroke();
          toRemove.push(i, j);
          this.score += 25 * this.phase;
        }
      }
    }

    toRemove.sort((a, b) => b - a);
    toRemove.forEach(i => this.pulses.splice(i, 1));
    if (toRemove.length > 0) {
      this.spawnPulse();
      if (this.score >= this.phase * 250) this.advancePhase();
    }
  }

  advancePhase() {
    this.phase++;
    this.maxPulses = Math.min(this.maxPulses + 1, 9);
    this.pulses.forEach(p => (p.energy = Math.min(p.energy + 10, 100)));
    this.spawnPulse();
  }

  drawUI() {
    this.ctx.fillStyle = '#00e6cc';
    this.ctx.font = '18px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 10, 20);
    this.ctx.fillText(`Phase: ${this.phase}`, 10, 45);
  }

  handleClick(x, y) {
    for (const pulse of this.pulses) {
      const d = Math.sqrt(
        Math.pow(x - (pulse.x + this.gridSize / 2), 2) +
        Math.pow(y - (pulse.y + this.gridSize / 2), 2)
      );
      if (d < this.gridSize / 2) {
        pulse.frequency = (pulse.frequency + 1) % 3;
        break;
      }
    }
  }

  reset() {
    this.pulses = [];
    this.score = 0;
    this.phase = 1;
    this.maxPulses = 4;
    this.spawnPulse();
  }
}

// Example usage (for testing in Node.js)
const game = new AetherPulse();
game.update();
console.log('Aether Pulse game initialized. Use a UI framework or save canvas to render.');
const fs = require('fs');
const out = fs.createWriteStream('output.png');
const stream = game.canvas.createPNGStream();
stream.pipe(out);

# Aether Pulse

Aether Pulse is a unique JavaScript-based rhythm strategy game where players synchronize energy pulses to harmonize aether streams. Match pulse frequencies (low, medium, high) in adjacent grid cells to create harmonic links, earning points and advancing through phases. Built with Node.js and the `canvas` library, this game is designed for developers seeking a modular, extensible project.

## Features
- **Rhythmic Gameplay**: Synchronize pulses with matching frequencies (low, medium, high) horizontally or vertically.
- **Progressive Phases**: Advance through phases as you score, increasing pulse counts and energy levels.
- **Modular JavaScript**: Clean, object-oriented code for seamless integration and extension.
- **Canvas Rendering**: Server-side rendering with the `canvas` library, suitable for desktop or web applications.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/aether-pulse.git
   ```
2. Navigate to the project directory:
   ```bash
   cd aether-pulse
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the game:
   ```bash
   npm start
   ```

## How to Play
- **Objective**: Synchronize adjacent pulses with the same frequency (low: red, medium: blue, high: green) horizontally or vertically by cycling their frequencies.
- **Scoring**: Each harmonic link earns 25 points multiplied by the current phase.
- **Phase Progression**: Reach 250 points per phase to advance, increasing pulse count and energy levels.
- **Interaction**: Use `game.handleClick(x, y)` to cycle pulse frequencies (requires UI integration).
- **Reset**: Call `game.reset()` to restart the game.

## Development
- **Tech Stack**: Node.js, JavaScript, `canvas`
- **Dependencies**: `canvas` for rendering
- **Code Structure**:
  - `index.js`: Main game logic and canvas rendering.
  - `pulse.js`: Pulse class for aether stream entities.
  - `package.json`: Project metadata and dependencies.
- **Extending**: Integrate with a UI framework (e.g., Electron for desktop or a web server) to handle input and display the canvas.

## Notes
- The current implementation outputs a PNG snapshot (`output.png`) for testing. For interactive play, integrate with a UI framework to handle mouse clicks and real-time rendering.
- Example integration: Use Electron for a desktop app or a WebSocket server for web-based play.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. For major updates, open an issue first to discuss your ideas.

## Support
If you enjoy Aether Pulse and want to support its development, consider sponsoring me on [GitHub Sponsors](https://github.com/sponsors/slycantel). Your support helps keep this project alive and growing!

## License
MIT License. See [LICENSE](LICENSE) for details.

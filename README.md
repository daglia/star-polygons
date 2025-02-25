# Star Polygons

This project is a web application that allows users to visualize star polygons. The application is built using PixiJS and PixiUI libraries for rendering and UI components.

## Features

- Interactive sliders to adjust the number of points (n) and step (k) of the star polygon.
- Real-time drawing of the star polygon based on the selected parameters.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/daglia/star-polygons.git
   cd star-polygons
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Use the sliders to adjust the number of points (n) and step (k) of the star polygon.
- The star polygon will be drawn in real-time based on the selected parameters.
- Click the "Learn more on Wikipedia" button to open the Wikipedia page for star polygons.

## Project Structure

- `src/index.js`: Main entry point of the application. Initializes the PixiJS application and sets up the layout and event handlers.
- `src/star.js`: Contains the `Star` class responsible for generating and drawing star polygons.
- `assets/fonts/Lexend.ttf`: Custom font used in the application.

## Dependencies

- [PixiJS](https://pixijs.com/): A fast 2D rendering library.
- [PixiUI](https://github.com/pixijs/ui): A UI library for PixiJS.
- [PixiSound](https://github.com/pixijs/sound): A sound library for PixiJS.
- [PixiLayout](https://github.com/pixijs/layout): A layout library for PixiJS.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

- [Alper Dağlı](https://alperdagli.me)

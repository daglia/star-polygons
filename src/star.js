import { Graphics } from "pixi.js";

class Star {
  constructor(container) {
    this.container = container;
  }

  async generateStarPoints(n, k, radius, cx, cy) {
    const points = [];
    const angleStep = (Math.PI * 2) / n; // Angle between vertices

    // Generate outer polygon vertices
    for (let i = 0; i < n; i++) {
      const angle = i * angleStep - Math.PI / 2; // Start from top
      points.push({
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
      });
    }

    // Connect points using k-step rule
    const starPoints = [];
    let index = 0;
    const visited = new Set();

    const reductionFactor = this.reductionFactor(n, k);

    for (let r = 0; r < reductionFactor; r++) {
      for (let i = 0; i < n / reductionFactor; i++) {
        index = index + r;
        if (visited.has(index)) break;
        visited.add(index);
        starPoints.push({
          x: points[index].x,
          y: points[index].y,
          r: r, // Repetition
        });
        index = (index - r + k) % n; // Jump by k steps
      }
    }
    return starPoints;
  }

  async drawStar(n, k) {
    this.container.removeChildren(); // Clear previous drawings

    const graphics = new Graphics();

    // Compute radius from side length "a" of the outer polygon
    const radius =
      (Math.min(this.container.parent.height, this.container.parent.width) ||
        360) /
        2 -
      10;

    const cx = (this.container.parent.width || 360) / 4;
    const cy = (this.container.parent.height || 360) / 4;

    const starPoints = await this.generateStarPoints(n, k, radius, cx, cy);

    const rf = this.reductionFactor(n, k);
    const repetition = starPoints.length / rf;

    for (let ri = 0; ri < rf; ri++) {
      let startingIndex = ri * repetition;
      graphics.moveTo(starPoints[startingIndex].x, starPoints[startingIndex].y);

      for (let i = 1; i < starPoints.length / rf; i++) {
        graphics.lineTo(
          starPoints[startingIndex + i].x,
          starPoints[startingIndex + i].y
        );
      }
      graphics.lineTo(starPoints[startingIndex].x, starPoints[startingIndex].y);
    }
    graphics.closePath(); // Complete the star

    graphics.position.x = cx;
    graphics.position.y = cy;
    graphics.stroke({ width: 4, color: 0x0000ff, cap: "round", join: "round" });

    this.container.addChild(graphics);
  }

  calculateStarArea(n, k, a) {
    const area =
      n *
      (a ** 2 / 4) *
      (1 / Math.tan(Math.PI / n) - Math.tan(((k - 1) * Math.PI) / n));
    return area.toFixed(2);
  }

  reductionFactor(n, k) {
    function gcd(a, b) {
      return b === 0 ? a : gcd(b, a % b);
    }

    let g = gcd(n, k);
    return g;
  }
}

export default Star;

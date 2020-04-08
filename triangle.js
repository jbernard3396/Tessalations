class Point {
  constructor(x, y) {
    if (x == null) x = 0;
    if (y == null) y = 0;
    this.vals = [x, y];
  }
  
  get x() { return this.vals[0]; }
  get y() { return this.vals[1]; }

  draw(ctx, r=2, color="black") {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, TAU);
    ctx.fill();
  }

  static midpoint(p1, p2, frac=.5) {
    let x = lerp(p1.x, p2.x, frac);
    let y = lerp(p1.y, p2.y, frac);
    return new Point(x, y);
  }
}

class Triangle {
  constructor(p1, p2, p3) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
  }

  get boundingBox() {
    let { p1, p2, p3 } = this;
    let xs = [p1.x, p2.x, p3.x];
    let ys = [p1.y, p2.y, p3.y];
    xs.sort(compareInts);
    ys.sort(compareInts);
    let x = xs[0];
    let y = ys[0];
    let w = xs[2] - xs[0];
    let h = ys[2] - ys[0];
    return { x, y, w, h };
  }

  draw(ctx, color="orange") {
    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.lineTo(this.p3.x, this.p3.y);
    ctx.fill();
  }
  
  getSubTriangles() {
    let { p1, p2, p3 } = this;
    let p4 = Point.midpoint(p1, p2, randNearHalf());
    let p5 = Point.midpoint(p1, p3, randNearHalf());
    let p6 = Point.midpoint(p2, p3, randNearHalf());
    return [
      new Triangle(p1, p4, p5),
      new Triangle(p2, p4, p6),
      new Triangle(p3, p5, p6),
      new Triangle(p4, p5, p6),
    ]
  }
}

img.addEventListener("load", () => {
  // finish setting up canvases
  let w = img.width
  let h = img.height
  canvas.width = w;
  canvas.height = h;
  imgCanvas = newOffscreenCanvas(w * imgRatio, h * imgRatio)
  imgCtx = imgCanvas.getContext("2d");
  imgCtx.drawImage(img,
    0, 0, w, h,
    0, 0, imgCanvas.width, imgCanvas.height
  );

  pieceCanvas = newOffscreenCanvas(canvas.width, canvas.height);
  pieceCtx = pieceCanvas.getContext("2d");
  
  init();
})

function boxArea(triangle) {
  return triangle.boundingBox.w * triangle.boundingBox.h;
}

function score(triangle) {
  return Math.min(triangle.boundingBox.w, triangle.boundingBox.h);
  // return Math.random();
}

function init() {
  triangles = new BinaryHeap(score); //use heap for largest-first
  // triangles = []; //use array for in-order

  //prime with first four triangles
  let tl = new Point(0,0);
  let tr = new Point(0,canvas.height);
  let bl = new Point(canvas.width,0);
  let br = new Point(canvas.width,canvas.height);
  let c = new Point(
    lerp(0, canvas.width, randNearHalf()),
    lerp(0, canvas.height, randNearHalf())
  );
  triangles.push(new Triangle(tl, tr, c))
  triangles.push(new Triangle(br, tr, c))
  triangles.push(new Triangle(bl, br, c))
  triangles.push(new Triangle(tl, bl, c))

  if (Math.random() < 0) requestAnimationFrame(tickInOrder);
  else requestAnimationFrame(tick);
}

/**
 * check if a triangle should be represented by a solid color or not
 * @param {Triangle} triangle 
 * @returns true if the triangle should be drawn as a solid color
 */
function isRenderable(triangle) {
  //TODO: maybe this should go in the Triangle class
  if (triangle.boundingBox.w < MIN_RENDERABLE_W) return false;
  if (triangle.boundingBox.h < MIN_RENDERABLE_H) return false;
  return true;
}

function getTriangleColor(triangle) {
  let box = triangle.boundingBox;
  box.x = Math.round(box.x * imgRatio);
  box.y = Math.round(box.y * imgRatio);
  box.w = Math.round(box.w * imgRatio);
  box.h = Math.round(box.h * imgRatio);
  let imgData = imgCtx.getImageData(box.x, box.y, box.w, box.h);
  return Color.fromImageData(imgData);
}

/**
 * Takes the intersection of the triangles drawn to the piece canvas and
 * the actual image and flushes them to the main canvas
 */
function flushImagePieces() {
  pieceCtx.globalCompositeOperation = "source-in";
  pieceCtx.drawImage(img, 0, 0);
  ctx.drawImage(pieceCanvas, 0, 0);
}

function tick(time) {
  let flushPieces = false; 
  let iters = 0;
  let area = 0;
  while (performance.now() - time < TICK_DUR) {
    let triangle = iterate();
    if (done) break;
    area += boxArea(triangle);
    iters++;
    if (!isRenderable(triangle)) flushPieces = true;
    if (iters >= MAX_ITERS_PER_TICK) break;
    if (area > MAX_AREA_PER_TICK) break;
  }
  
  if (flushPieces) flushImagePieces();

  if (done) {
    console.log("done!");
    ctx.drawImage(img, 0, 0)
    return;
  }

  let remaining = TICK_DUR - (performance.now() - time);
  if (remaining <= 0) requestAnimationFrame(tick) // no time to spare!
  else setTimeout(() => requestAnimationFrame(tick), Math.floor(remaining))
}

function iterate() {
  let triangle = triangles.pop()
  
  if (triangle == null) {
    done = true;
    return null;
  }

  if (isRenderable(triangle)) { 
    triangle.draw(ctx, getTriangleColor(triangle));
    let subs = triangle.getSubTriangles()
    subs.forEach(sub => triangles.push(sub)) // largest-first traversal
    // subs.forEach(sub => triangles.unshift(sub)) // in-order traversal

  } else { //dispose img-triangle intersection to piece canvas
    pieceCtx.globalCompositeOperation = "source-over";
    triangle.draw(pieceCtx);
  }
  return triangle;
}


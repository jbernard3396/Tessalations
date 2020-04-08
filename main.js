(function init() {
  img.src = srcs[MathHelp.randInt(0, srcs.length)];
  img.addEventListener("load", () => {
    // finish setting up globals with img width
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
    
    MIN_RENDERABLE_W = Math.ceil(w * .01);
    MIN_RENDERABLE_H = Math.ceil(h * .01);

    
    beginTessellation()
  })
})(); //iife

function beginTessellation() {
  if (mode == TraversalMode.RANDOM) triangles = new BinaryHeap(() => Math.random());
  else if (mode == TraversalMode.LARGEST) triangles = new BinaryHeap(score);
  else if (mode == TraversalMode.IN_ORDER) triangles = [];

  //prime with first four triangles
  let tl = new Point(0, 0);
  let tr = new Point(0,canvas.height);
  let bl = new Point(canvas.width,0);
  let br = new Point(canvas.width,canvas.height);
  let c = new Point(
    MathHelp.lerp(0, canvas.width, MathHelp.randNearHalf()),
    MathHelp.lerp(0, canvas.height, MathHelp.randNearHalf())
  );
  triangles.push(new Triangle(tl, tr, c))
  triangles.push(new Triangle(br, tr, c))
  triangles.push(new Triangle(bl, br, c))
  triangles.push(new Triangle(tl, bl, c))

  if (Math.random() < 0) requestAnimationFrame(tickInOrder);
  else requestAnimationFrame(tick);
}

function boxArea(triangle) {
  return triangle.boundingBox.w * triangle.boundingBox.h;
}

function score(triangle) {
  return Math.min(triangle.boundingBox.w, triangle.boundingBox.h);
}

/**
 * Checks if a triangle should be represented by a solid color or not
 * @param {Triangle} triangle 
 * @returns true if the triangle should be drawn as a solid color
 */
function isRenderable(triangle) {
  //TODO: maybe this should go in the Triangle class
  if (triangle.boundingBox.w < MIN_RENDERABLE_W) return false;
  if (triangle.boundingBox.h < MIN_RENDERABLE_H) return false;
  return true;
}

/**
 * Finds the color for which the given triangle should be drawn 
 * @param {Triangle} triangle 
 */
function getTriangleColor(triangle) {
  //TODO: maybe this should go in the Triangle class
  let box = triangle.boundingBox;
  let { x, y, w, h } = box;
  x = Math.floor(x * imgRatio);
  y = Math.floor(y * imgRatio);
  w = Math.ceil(w * imgRatio);
  h = Math.ceil(h * imgRatio);
  if (w < 1) w = 1;
  if (h < 1) h = 1;
  let imgData = imgCtx.getImageData(x, y, w, h);
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

/**
 * Handles iterating the correct number of times and flushing the piece canvas.
 * Also requests for itself to be run again.
 * Should be passed into requestAnimationFrame.
 */
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

  // console.log(area, iters);

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

/**
 * Processes and draws one triangle. If there are no triangles left, the done flag is set.
 */
function iterate() {
  let triangle = triangles.pop()
  
  if (triangle == null) {
    done = true;
    return null;
  }

  if (isRenderable(triangle)) { 
    triangle.draw(ctx, getTriangleColor(triangle));
    let subs = triangle.getSubTriangles()

    if (mode == TraversalMode.IN_ORDER) subs.forEach(sub => triangles.unshift(sub))
    else subs.forEach(sub => triangles.push(sub))
  } else { //dispose img-triangle intersection to piece canvas
    pieceCtx.globalCompositeOperation = "source-over";
    triangle.draw(pieceCtx);
  }
  return triangle;
}


img.addEventListener("load", () => {
  let W = img.width
  let H = img.height
  canvas.width = W;
  canvas.height = H;
  imgCanvas = newOffscreenCanvas(W * imgRatio, H * imgRatio)
  imgCtx = imgCanvas.getContext("2d");
  imgCtx.drawImage(img,
    0, 0, W, H,
    0, 0, imgCanvas.width, imgCanvas.height
  );

  pieceCanvas = newOffscreenCanvas(canvas.width, canvas.height);
  pieceCtx = pieceCanvas.getContext("2d");
  
  init();
})

function init() {
  //first four triangles
  let tl = new Point(0,0);
  let tr = new Point(0,canvas.height);
  let bl = new Point(canvas.width,0);
  let br = new Point(canvas.width,canvas.height);
  let c = new Point(
    lerp(0, canvas.width, randNearHalf()),
    lerp(0, canvas.height, randNearHalf())
  );
  triangles.push(
    new Triangle(tl, tr, c),
    new Triangle(br, tr, c),
    new Triangle(bl, br, c),
    new Triangle(tl, bl, c),
  )

  if (Math.random() < 0) requestAnimationFrame(tickInOrder);
  else requestAnimationFrame(tick);
}

function isRenderable(triangle) {
  if (triangle.boundingBox.w <= 40/imgRatio) return false;
  if (triangle.boundingBox.h <= 20/imgRatio) return false;
  return true;
}

function nextTriangle() {
  return triangles.pop();
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

function compareTriangles(t1, t2) {
  let box1 = t1.boundingBox;
  let box2 = t2.boundingBox;
  return box1.h - box2.h
}

function tick(time) {
  let dontFlush = true; 
  let iters = 0;
  while (performance.now() - time < TICK_LENGTH) {
    dontFlush = iterate() && dontFlush;
    if (++iters == MAX_ITERS_PER_TICK) break;
  }

  if (!dontFlush) { //flush pieces
    pieceCtx.globalCompositeOperation = "source-in";
    pieceCtx.drawImage(img, 0, 0);
    ctx.drawImage(pieceCanvas, 0, 0);
  }

  if (!done) requestAnimationFrame(tick)
}

function iterate() {
  let triangle = nextTriangle()
  
  if (triangle == null) {
    done = true;
    return;
  }

  let renderable = isRenderable(triangle)
  if (renderable) { 
    triangle.draw(ctx, getTriangleColor(triangle));
    
    // largest-first traversal
    triangle.getSubTriangles().forEach(sub => triangles.push(sub))
    triangles.sort(compareTriangles) //slow!
    
    // in-order traversal
    // triangle.getSubTriangles().forEach(sub => triangles.unshift(sub))
  } else { //dispose img-triangle intersection to mask canvas
    pieceCtx.globalCompositeOperation = "source-over";
    triangle.draw(pieceCtx);
  }

  return renderable;
}

/*
function fullTick(time) {
  let tempArr = [];
  while (triangles.length > 0) {
    let triangle = triangles.pop();
    if (!isRenderable(triangle)) {
      continue; //triangle is too small
    } 

    triangle.draw(ctx, getTriangleColor(triangle));

    let subs = triangle.getSubTriangles();
    subs.forEach(sub => tempArr.push(sub))
  }
  triangles = tempArr;
  
  done = triangles.length == 0;
  if (!done) requestAnimationFrame(fullTick);
  return done;
}
*/

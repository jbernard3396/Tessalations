img.addEventListener("load", () => {
  imgCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
  init();
})

function init() {
  //first four triangles
  let tl = new Point(0,0);
  let tr = new Point(0,canvas.height);
  let bl = new Point(canvas.width,0);
  let br = new Point(canvas.width,canvas.height);
  let c = new Point(canvas.width/2, canvas.height/2);
  triangles.push(
    new Triangle(tl, tr, c),
    new Triangle(br, tr, c),
    new Triangle(bl, br, c),
    new Triangle(tl, bl, c),
  )

  if (Math.random() < 0) requestAnimationFrame(tickInOrder);
  else requestAnimationFrame(tickLargestFirst);
}

function isRenderable(triangle) {
  if (triangle.boundingBox.w <= 1) return false;
  if (triangle.boundingBox.h <= 1) return false;
  return true;
}

function nextTriangle() {
  let triangle = triangles.pop();
  while (triangle != null && !isRenderable(triangle)) {
    triangle = triangles.pop();
  }
  // return a valid triangle or undefined (no more triangles)
  return triangle;
}

function getTriangleColor(triangle) {
  let box = triangle.boundingBox;
  let imgData = imgCtx.getImageData(box.x, box.y, box.w, box.h);
  return Color.fromImageData(imgData);
}

function compareTriangles(t1, t2) {
  let box1 = t1.boundingBox;
  let box2 = t2.boundingBox;
  return box1.h*box1.w - box2.h*box2.w
}

function tickLargestFirst(time) {
  let triangle = nextTriangle()
  
  if (triangle == null) {
    done = true;
    return;
  }

  triangle.draw(ctx, getTriangleColor(triangle));
  
  triangle.getSubTriangles().forEach(sub => triangles.push(sub))
  triangles.sort(compareTriangles)

  requestAnimationFrame(tickLargestFirst)
}

function tickInOrder(time) {
  let triangle = nextTriangle()

  if (triangle == null) {
    done = true;
    return;
  }
  triangle.draw(ctx, getTriangleColor(triangle));

  triangle.getSubTriangles().forEach(sub => triangles.unshift(sub))

  requestAnimationFrame(tickInOrder)
}

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

//TODO:J put each class in its own file
let shapes = [];
let globalPixelList = []; //TODO:J janky, fix
let width = 1000;
let height = 1000;
let imageList = [
'https://cdna.artstation.com/p/assets/images/images/016/753/178/large/ash-es-sunset-mountain-2.jpg?1553340774',
'data:image/jpeg;base64,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',
'data:image/jpeg;base64,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',
'https://static01.nyt.com/images/2019/06/17/science/17DOGS/17DOGS-superJumbo.jpg',
'https://image.shutterstock.com/image-photo/wonderful-tropical-beach-260nw-169622306.jpg',
'https://image.shutterstock.com/image-photo/new-york-usa-skyline-600w-762344239.jpg',
'https://image.shutterstock.com/image-vector/city-night-skyline-600w-562818472.jpg'
]
let imageDrawn = false;

class Pixel {
  constructor(x, y, color = new Color(0,0,0,0)) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.lastChecked;
  }
}

class Color {
  constructor(r, g, b, a=1){
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a
  }
  rgbaColorString = function(){
    let colorString = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    return colorString;
  }
}

class ImageHolder {
  constructor(imgPath, w=1000, h=1000, x=0, y=0){
    this.imgPath = imgPath;
    this.x = x;
    this.y = y;
    this.imgObj = new Image();
    this.imgObj.crossOrigin = "Anonymous";
    this.imgObj.src = imgPath;
    this.width = w;
    this.height = h;
    this.canvas;
    this.context;
  }
  static getPixelFromCoordinates = function(x, y, pixelList, context){
    if(pixelList && pixelList[x] && pixelList[x][y]){
      return pixelList[x][y]
    } // TODO:J proabably should check if this next thing can happen or throw an error
    var c = context.getImageData(x, y, 1, 1).data;
    let thisColor = new Color(c[0], c[1], c[2], c[3]);
    return new Pixel(x, y, thisColor);
  }
  static getNeighbors = function(pixel){
    let neighbors = [];
    if (globalPixelList[pixel.x-1] && globalPixelList[pixel.x-1][pixel.y]){
      neighbors.push(globalPixelList[pixel.x-1][pixel.y])
    }
    if (globalPixelList[pixel.x+1] && globalPixelList[pixel.x+1][pixel.y]){
      neighbors.push(globalPixelList[pixel.x+1][pixel.y])
    }
    if (globalPixelList[pixel.x] && globalPixelList[pixel.x][pixel.y-1]){
      neighbors.push(globalPixelList[pixel.x][pixel.y-1])
    }
    if (globalPixelList[pixel.x] && globalPixelList[pixel.x][pixel.y+1]){
      neighbors.push(globalPixelList[pixel.x][pixel.y+1])
    }
    return neighbors;
  }
  createImage = function(){
    let canvas = document.getElementById('canvas');
    this.canvas = canvas;
    let context = canvas.getContext('2d');
    this.context = context;
    var imgObj = this.imgObj;
    var x = this.x;
    var y = this.y;
    var w = this.width;
    var h = this.height;
    imgObj.onload = function(){
      context.drawImage(imgObj, x, y, w, h);
      imageDrawn = true;
      for (let i = x; i < w; i++){
        let newArray = []
        for (let j = y; j < h; j++){
          let newPixel = ImageHolder.getPixelFromCoordinates(i, j, null, context);
          newArray.push(newPixel);
        }
        globalPixelList.push(newArray);
      }
    }
  }
  generatePixel = function(x, y){
    if (x === undefined || x === null){
      //TODO:J plug in original numbers;
      x = Math.floor(parseInt(ImageHolder.getRandomInt(this.x, this.width), 10));
    }
    if (y === undefined || y === null){
      y = Math.floor(parseInt(ImageHolder.getRandomInt(this.y, this.height), 10));
    }
    return ImageHolder.getPixelFromCoordinates(x, y, this.pixelList, this.context);
  }
  static getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
  static getDistance = function(pixel1, pixel2){
    return Math.sqrt(Math.pow(pixel1.x - pixel2.x, 2)+Math.pow(pixel1.y-pixel2.y, 2));
  }
}

class Shape {
  constructor(vertexes, id){
    this.vertexes = vertexes;
    this.id = id;
  }

  getAverageOfPixelsInRegion = function () {
    let redAccumalator = 0;
    let greenAccumalator = 0;
    let blueAccumalator = 0;
    let alphaAccumalator = 0
    let totalPixels = 0
    let pixelsToCheck = [];
    pixelsToCheck.push(this.vertexes[0], this.vertexes[1], this.vertexes[2]);
    while(pixelsToCheck.length > 0){
      let pixelBeingChecked = pixelsToCheck.pop();
      pixelBeingChecked.lastChecked = this.id;
      //Before we get the nieghbors, lets make sure this pixel is in bounds
      if(!this.contains(pixelBeingChecked)){
        continue;
      }
      redAccumalator += pixelBeingChecked.color.r;
      greenAccumalator += pixelBeingChecked.color.g;
      blueAccumalator += pixelBeingChecked.color.b;
      alphaAccumalator += pixelBeingChecked.color.a;
      totalPixels++;
      let pixelNeigbors = ImageHolder.getNeighbors(pixelBeingChecked);
      pixelNeigbors.forEach(pixel => {
        if (pixel.lastChecked !== this.id) {
          pixelsToCheck.push(pixel);
        }
      });
    }
    return new Color(redAccumalator/totalPixels, greenAccumalator/totalPixels, blueAccumalator/totalPixels, alphaAccumalator/totalPixels);


  };

  drawShape = function() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      // let redAccumalator = 0; //TODO:J use other formula when done
      // let greenAccumalator = 0;
      // let blueAccumalator = 0;
      // let alphaAccumalator = 0
      ctx.beginPath();
      this.vertexes.forEach(vertex => {
        // redAccumalator += vertex.color.r; //TODO:J Make a way to choose this or the other?
        // greenAccumalator += vertex.color.g;
        // blueAccumalator += vertex.color.b;
        // alphaAccumalator += vertex.color.a;
        if (this.vertexes[0] === vertex){
          ctx.moveTo(vertex.x, vertex.y);
        }
        else{
          ctx.lineTo(vertex.x, vertex.y);
        }
      })    
      const shapeColor = this.getAverageOfPixelsInRegion();
      //const shapeColor = new Color(redAccumalator/this.vertexes.length, greenAccumalator/this.vertexes.length, blueAccumalator/this.vertexes.length, alphaAccumalator/this.vertexes.length);
      ctx.lineTo(this.vertexes[0].x, this.vertexes[0].y);
      ctx.fillStyle = shapeColor.rgbaColorString();
      ctx.fill();
    }
  }

  contains = function( p) 
  { 
    let n = this.vertexes.length;
    let polygon = this.vertexes;
    // There must be at least 3 vertices in polygon[] 
    if (n < 3)  return false; 
  
    // Create a point for line segment from p to infinite 
    //TODO:J should be infinity not 100000
    let extreme = new Pixel(100000, p.x); 
  
    // Count intersections of the above line with sides of polygon 
    let count = 0, i = 0; 
    do
    { 
        var next = (i+1)%n; 
  
        // Check if the line segment from 'p' to 'extreme' intersects 
        // with the line segment from 'polygon[i]' to 'polygon[next]' 
        if (Shape.doIntersect(polygon[i], polygon[next], p, extreme)) 
        { 
            // If the point 'p' is colinear with line segment 'i-next', 
            // then check if it lies on segment. If it lies, return true, 
            // otherwise false 
            if (Shape.orientation(polygon[i], p, polygon[next]) == 0) 
              return Shape.onSegment(polygon[i], p, polygon[next]); 
  
            count++; 
        } 
        i = next; 
    } while (i != 0); 
  
    // Return true if count is odd, false otherwise 
    return count&1;  // Same as (count%2 == 1) 
  } 

  static onSegment = function( p,  q,  r) { 
    if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && 
        q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y)) 
        {
          return true; 
        }
    return false; 
  } 

  static orientation = function( p,  q,  r) { 
    var val = (q.y - p.y) * (r.x - q.x) - 
              (q.x - p.x) * (r.y - q.y); 
  
    if (val === 0) return 0;  // colinear 
    return (val > 0)? 1: 2; // clock or counterclock wise 
  } 

  static doIntersect = function( p1,  q1,  p2,  q2) { 
  // Find the four orientations needed for general and 
  // special cases 
    var o1 = Shape.orientation(p1, q1, p2); 
    var o2 = Shape.orientation(p1, q1, q2); 
    var o3 = Shape.orientation(p2, q2, p1); 
    var o4 = Shape.orientation(p2, q2, q1); 
  
    // General case 
    if (o1 !== o2 && o3 !== o4) 
        return true; 
  
    // Special Cases 
    // p1, q1 and p2 are colinear and p2 lies on segment p1q1 
    if (o1 === 0 && Shape.onSegment(p1, p2, q1)) return true; 
  
    // p1, q1 and p2 are colinear and q2 lies on segment p1q1 
    if (o2 === 0 && Shape.onSegment(p1, q2, q1)) return true; 
  
    // p2, q2 and p1 are colinear and p1 lies on segment p2q2 
    if (o3 === 0 && Shape.onSegment(p2, p1, q2)) return true; 

    // p2, q2 and q1 are colinear and q1 lies on segment p2q2 
    if (o4 === 0 && Shape.onSegment(p2, q1, q2)) return true; 
  
    return false; // Doesn't fall in any of the above cases 
  } 
}

function main(){
  let image = imageList[ImageHolder.getRandomInt(0, imageList.length)]
  let imageHolder = new ImageHolder(image, width, height, 0, 0);
  let idIterator = 0;
  imageHolder.createImage();
  setTimeout(() =>{
 
    let points = [imageHolder.generatePixel(0,0), imageHolder.generatePixel(0, height), imageHolder.generatePixel(width,height), imageHolder.generatePixel(width,0)];
    let square = new Shape(points, idIterator++);
    shapes.push(square);
    let point1 = imageHolder.generatePixel();
    let triangle1 = new Shape([points[0], points[1], point1], idIterator++);
    let triangle2 = new Shape([points[1], points[2], point1], idIterator++);
    let triangle3 = new Shape([points[2], points[3], point1], idIterator++);
    let triangle4 = new Shape([points[3], points[0], point1], idIterator++);
    shapes.splice(shapes.indexOf(square), 1);
    shapes.push(triangle1)
    shapes.push(triangle2)
    shapes.push(triangle3)
    shapes.push(triangle4)
    //generate a new point

    let delay = 10;
    let numTriangles = 5000;
    let beginningDelay = 100;
    square.drawShape()
    triangle1.drawShape();
    triangle2.drawShape();
    triangle3.drawShape();
    triangle4.drawShape();
    for (let i = 0; i < numTriangles; i++){
      setTimeout(() => {
        increasedDelay = beginningDelay * (numTriangles-i)/numTriangles
        delay = subdivide(imageHolder, idIterator, delay,increasedDelay);
      }, delay);
    }
  }, 2000);
}
  

function subdivide(imageHolder, idIterator, delay, increasedDelay){ //TODO:J whole delay scheme is horrnedous
  delay += increasedDelay;
  let newPoint = imageHolder.generatePixel();
  // figure out which triangle that point is in
  let containingShape = shapes.find(shape => {
    if(shape.contains(newPoint)){
      return shape
    }
  });
  //the three least distant points correspond to the triangle that it is in
  let triangle1 = new Shape([containingShape.vertexes[0], containingShape.vertexes[1], newPoint], idIterator++); //TODO:J make this dynamic
  let triangle2 = new Shape([containingShape.vertexes[1], containingShape.vertexes[2], newPoint], idIterator++);
  let triangle3 = new Shape([containingShape.vertexes[2], containingShape.vertexes[0], newPoint], idIterator++);
  shapes.splice(shapes.indexOf(containingShape), 1);
  shapes.push(triangle1);
  shapes.push(triangle2);
  shapes.push(triangle3);
  triangle1.drawShape();
  triangle2.drawShape();
  triangle3.drawShape();
  return delay;
}

main();

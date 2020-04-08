let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const srcs = [
  "imgs/image1.jpg",
  "imgs/image2.jpg",
  "imgs/image3.jpg",
  "imgs/image4.jpg",
  // "imgs/image5.png",
]

let imgCanvas = new OffscreenCanvas(canvas.width, canvas.height)
//TODO: make smaller. use ratio for getimagedata
let imgCtx = imgCanvas.getContext("2d");

let img = new Image();
img.src = srcs[Math.floor(Math.random() * srcs.length)];


let triangles = [];
let done = false;
let canvasImgRatio = 1;

const COLOR_SKIP = 1; //higher # should improve runtime by lowering color accuracy
const TAU = 2 * Math.PI;
const MAX_TICK_LENGTH = 100; //TODO: use this.

function lerp(a, b, frac) {
  return (a * frac) + (b * (1-frac))
}

function randFloat(a, b) {
  let rng = b-a;
  return (Math.random() * rng) + a
}

function randInt(a, b) {
  let rng = b-a;
  return Math.floor(Math.random() * rng) + a
}

function compareInts(a, b) { return a-b }

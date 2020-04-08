let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const srcs = [
  "imgs/image1.jpg",
  "imgs/image2.jpg",
  "imgs/image3.jpg",
  "imgs/image4.jpg",
]

let imgRatio = 1; // img will be stored (compressed) at this side-length ratio
let imgCanvas;
let imgCtx;

let pieceCanvas;
let pieceCtx;

let img = new Image();
img.src = srcs[Math.floor(Math.random() * srcs.length)];

let triangles;
let done = false;
let canvasImgRatio = 1;

const COLOR_SKIP = 0; //higher # should improve runtime by lowering color accuracy
const TAU = 2 * Math.PI;
const TICK_DUR = 100; //in ms
const MAX_ITERS_PER_TICK = Infinity; //decrese for slower ending
const MAX_AREA_PER_TICK = 800000; //bounding box area - decrease for slower beginning
const MIN_RENDERABLE_W = 20; // maybe set these to a percentage
const MIN_RENDERABLE_H = 10; // of the img width/height?

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

function randNearHalf() {
  return randInt(4,7) / 10
}

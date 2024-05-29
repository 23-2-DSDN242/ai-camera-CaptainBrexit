

let sourceImg=null;
let maskImg=null;
let renderCounter=0;
let curLayer = 0;

// change these three lines as appropiate
let sourceFile = "pic1.png";
let maskFile   = "pic1m.png";
let outputFile = "output_4.png";

function preload() {
  sourceImg = loadImage(sourceFile);
  maskImg = loadImage(maskFile);
}

function setup () {
  let main_canvas = createCanvas(1920, 1080);
  main_canvas.parent('canvasContainer');

  imageMode(CENTER);
  noStroke();
  background(0, 0, 128);
  sourceImg.loadPixels();
  maskImg.loadPixels();
  colorMode(HSB);
}

function draw () {
  if (curLayer == 0) {
    let num_lines_to_draw = 40;
    // get one scanline
    for(let j=renderCounter; j<renderCounter+num_lines_to_draw && j<1080; j++) {
      for(let i=0; i<1920; i++) {
        colorMode(RGB);
        let pix = sourceImg.get(i, j);
        // create a color from the values (always RGB)
        let col = color(pix);
        let mask = maskImg.get(i, j);

        colorMode(HSB, 360, 100, 100);
        // draw a "dimmed" version in gray
        let h = hue(col);
        let s = saturation(col);
        let b = brightness(col);

        let new_brt = map(b, 0, 100, 30, 50);
        let new_col = color(h, 0, new_brt);
        set(i, j, new_col);
      }
    }
    renderCounter = renderCounter + num_lines_to_draw;
    updatePixels();
  }
  else {
    rectMode(CORNERS);
    for(let i=0; i<100; i++) {
      let x1 = random(0, width);
      let y1 = random(0, height);

      let ellipseWidth = 10;
      let ellipseHeight = 10;

      let x2 = x1 + 4;
      let y2 = y1 - 8;
      let x3 = x1 + 8;
      let y3 = y1;
      let x4 = x1 - 4;
      let y4 = y1 + 2;
      let x5 = x2;
      let y5 = y1 - 12;
      let x6 = x3 + 4;
      let y6 = y1 + 2;

      colorMode(RGB);
      let pix = sourceImg.get(x1, y1);
      let mask = maskImg.get(x1, y1);
      let col = color(pix);
      stroke(col);
      fill(col);

      if(mask[1] < 128) {
        fill(col);
        triangle(x1, y1, x2, y2, x3, y3);
      }
      else {
        fill(col);
        ellipse(x1, y1, ellipseWidth, ellipseHeight);
      }
    }
    renderCounter = renderCounter + 1;
    // set(i, j, new_col);
  }
  // print(renderCounter);
  if(curLayer == 0 && renderCounter > 1080) {
    curLayer = 1;
    renderCounter = 0;
  }
  else if(curLayer == 1 && renderCounter > 1000) {
    console.log("Done!")
    noLoop();
     // uncomment this to save the result
     saveArtworkImage(outputFile);
  }
}

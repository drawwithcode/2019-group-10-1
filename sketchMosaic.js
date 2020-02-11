// global variables
var cnv;
// cover pictures
var cover;
var cover_title_preload;
var cover_title;

// resized cover
var smaller;

// scale factor
var scl;

// number of tiles for every line/column
var w, h;

// all the images available
var allImages = [];
// average brighness of every image
var brgValues = [];

// array storing the image to be used for every pixel
var imageToUse = [];
// number of times that every image is used
var numberOfUses = [];
// maximum number of times that every image can be reused
var maxNumberOfUses;

// zoom levels
var zoom0;
var zoom1;
var zoom2;
var zoom3;

// buttons to navigate inside the mosaic
var zoomInButton;
var zoomOutButton;
var leftButton;
var rightButton;
var topButton;
var downButton;

// value of shifting when left/right/top/down buttons are pressed
var mosaic_shift;
var mosaic_w;

var shift_increment_x = 0;
var shift_increment_y = 0;

// loading variables
var loadingText;
var spinner;
// tracks the activity in execution
var loading = 0;

//Firebase
var database;


function preload() {
  // load cover
  cover = loadImage('assets/cover.jpg');
  cover_title_preload = loadImage('assets/cover-scritte.png');

  // start the configuration of Firebase
  firebaseConfiguration();

  //loading == 1 --> downloading the images
  loading = 1;
}


function firebaseConfiguration() {
  //Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDRzxo_AJMjYQC75jb67nC006ayqVKuB1g",
    authDomain: "photo-mosaic-a57e8.firebaseapp.com",
    databaseURL: "https://photo-mosaic-a57e8.firebaseio.com",
    projectId: "photo-mosaic-a57e8",
    storageBucket: "photo-mosaic-a57e8.appspot.com",
    messagingSenderId: "176965774377",
    appId: "1:176965774377:web:d4739cd2e523076ef28038"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();

  var ref = database.ref('photos');
  ref.once('value', gotData, errData);
}


function gotData(data) {
  var photolistings = selectAll('photolisting');

  for (let i = 0; i < photolistings.length; i++) {
    photolistings[i].remove();
  }

  var photos = data.val();
  var keys = Object.keys(photos);

  for (let j = 0; j < keys.length; j++) {
    let k = keys[j];
    let photo_img = photos[k].photo_img;
    //load tiles for the mosaic in the array
    allImages[j] = loadImage(photo_img);

    if (j == keys.length - 1) {
      findmaxNumberOfUses();
      setTimeout(findImageBrightness, keys.length);

      //if loading == 2 --> mesuring the average brightness of each image
      loading = 2;
    }
  }

  for (var l = 0; l < allImages.length; l++) {
    numberOfUses[l] = 0;
  }
}


function errData(err) {
  console.log('Error');
  console.log(err);
}

// determine the number of times that each image in the database can ba used
// according to the number of tiles that compose the cover
// and the number of images in the database
function findmaxNumberOfUses() {
  var tilesNeeded = w * h;
  var tilesAvailable = allImages.length;
  var tilesRatio = (tilesAvailable / tilesNeeded) * 100;

  if (tilesRatio <= 1) {
    maxNumberOfUses = 25;
  } else if (tilesRatio > 1 && tilesRatio <= 2.5) {
    maxNumberOfUses = 20;
  } else if (tilesRatio > 2.5 && tilesRatio <= 5) {
    maxNumberOfUses = 15;
  } else if (tilesRatio > 5 && tilesRatio <= 10) {
    maxNumberOfUses = 8;
  } else if (tilesRatio > 10 && tilesRatio <= 20) {
    maxNumberOfUses = 4;
  } else if (tilesRatio > 20 && tilesRatio <= 40) {
    maxNumberOfUses = 3;
  } else if (tilesRatio > 40 && tilesRatio <= 65) {
    maxNumberOfUses = 2;
  } else if (tilesRatio > 65) {
    maxNumberOfUses = 1;
  }
}


function setup() {
  // mosaic_w represents the width of the cover and the canvas
  if (windowHeight > windowWidth) {
    // mosaic_w value for smartphone
    mosaic_w = 0.8 * windowWidth;
  } else {
    // mosaic_w value for desktop
    mosaic_w = 0.8 * windowHeight;
  }

  // zoom changes according to the canvas dimensions
  // the value of zoom changes the scale (dimension) of the tiles
  zoom0 = mosaic_w / 80;
  zoom1 = mosaic_w / 50;
  zoom2 = mosaic_w / 20;
  zoom3 = mosaic_w / 5;

  cnv = createCanvas(mosaic_w, mosaic_w);
  cnv.class('mosaic');

  cover.width = mosaic_w;
  cover.height = mosaic_w;

  scl = zoom0;

  w = floor(cover.width / scl);
  h = floor(cover.height / scl);
  // create a smaller copy of the cover image
  smaller = createImage(w, h);
  smaller.copy(cover, 0, 0, cover.width, cover.height, 0, 0, w, h);
}


function showButtons() {
  // button object
  this.newButton = function(_name, _class, _action, _parent) {
    const button = createButton(_name);
    button.addClass(_class);
    button.parent(_parent);
    button.mousePressed(_action);
    return button;
  }

  this.openIndex = function() {
    window.open('index.html', '_self');
  }

  this.initialize = function() {
    // open homepage
    let backIcon = '<svg style="width:50px;height:50px" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg>';
    backButton = this.newButton(backIcon, "homeButton", openIndex, "goback");

    // zoomOut button
    let minus = '<svg class="plus" viewBox="0 0 24 24"> <path fill="currentColor" d="M19,13H5V11H19V13Z" /></svg>';
    zoomOutButton = this.newButton(minus, "zoomOutButton zoom zoomposition", zoomOut, "header");

    // zoomIn button
    let plus = '<svg class="plus" viewBox="0 0 24 24"> <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /> </svg>';
    zoomInButton = this.newButton(plus, "zoomInButton zoom zoomposition", zoomIn, "header");

    // arrows
    let arrow_white = '<svg class="arrow_white" viewBox="0 0 24 24"><path fill="white" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg>';
    leftButton = this.newButton(arrow_white, "leftButton arrow", left, "buttons");
    leftButton.hide();

    rightButton = this.newButton(arrow_white, "rightButton arrow", right, "buttons");
    rightButton.hide();

    topButton = this.newButton(arrow_white, "topButton arrow", up, "buttons");
    topButton.hide();

    downButton = this.newButton(arrow_white, "downButton arrow", down, "buttons");
    downButton.hide();
  }
  this.initialize();
}


function draw() {
  // take id elements
  loadingText = select('#loading_text');
  spinner = select('#spinner');

  // change the text of the message shown while loading according to the action in execution
  if (loading == 0) {
    loadingText.html('');
  } else if (loading == 1) {
    loadingText.html('Downloading all the images');
  } else if (loading == 2) {
    loadingText.html('Analyzing the brightness of each image');
  } else if (loading == 3) {
    loadingText.html('Analyzing the brightness of each pixel of the cover');
  }

}


function zoomIn() {
  mosaic_shift = w;

  rightButton.show();
  downButton.show();

  if (scl == zoom0) {
    scl = zoom1;
    mosaic_shift = w;
  } else if (scl == zoom1) {
    scl = zoom2;
    mosaic_shift = w * 2;
  } else if (scl == zoom2) {
    scl = zoom3;
    mosaic_shift = w * 3;
  }
  drawMosaic();
}

function zoomOut() {

  if (scl == zoom3) {
    scl = zoom2;
    mosaic_shift = w * 2;
  } else if (scl == zoom2) {
    scl = zoom1;
    mosaic_shift = w;
  } else if (scl == zoom1) {
    shift_increment_x = 0;
    shift_increment_y = 0;
    scl = zoom0;
    leftButton.hide();
    rightButton.hide();
    topButton.hide();
    downButton.hide();
  }
  drawMosaic();
}

function right() {
  leftButton.show();
  if (shift_increment_x <= (cnv.width - w * scl)) {
    rightButton.hide();
    shift_increment_x = (cnv.width - w * scl);
  } else {
    shift_increment_x -= mosaic_shift;
  }
  drawMosaic();
}

function left() {
  rightButton.show();
  if (shift_increment_x >= 0) {
    shift_increment_x = 0;
    leftButton.hide();
  } else {
    shift_increment_x += mosaic_shift;
  }
  drawMosaic();
}

function down() {
  topButton.show();
  if (shift_increment_y <= (cnv.height - h * scl)) {
    shift_increment_y = cnv.height - h * scl;
    downButton.hide();
  } else {
    shift_increment_y -= mosaic_shift;
  }
  drawMosaic();
}

function up() {
  downButton.show();
  if (shift_increment_y >= 0) {
    shift_increment_y = 0;
    topButton.hide();
  } else {
    shift_increment_y += mosaic_shift;
  }
  drawMosaic();
}


// determine the brightness of each pixel of the cover
function analyzeCoverPixels() {
  smaller.loadPixels();
  // for every pixel of the cover (resized)
  for (var x = 0; x < w; x++) {
    for (var y = 0; y < h; y++) {
      //index = numero del pixel della cover
      var index = x + y * w;

      //get the color of the pixel
      var tempC = smaller.get(x, y);
      var tempB = int(brightness(tempC));

      //find the fist submitted photo with brightness == to the pixel of the cover
      for (i = 0; i < allImages.length; i++) {

        if (tempB == brgValues[i]) {
          var index = x + y * w;

          if (numberOfUses[i] < maxNumberOfUses) {

            numberOfUses[i] += 1;
            imageToUse[index] = allImages[i];

            //in order not to have the same tile in many adjacent pixel with the same brightness value
            //copy the values at the end of the array
            allImages.push(allImages[i]);
            brgValues.push(brgValues[i]);
            numberOfUses.push(numberOfUses[i]);
            //and remove the used image from its original position in the arrays
            //and probably in the next cycle another matching image will be find before the one used here
            allImages.splice(i, 1);
            brgValues.splice(i, 1);
            numberOfUses.splice(i, 1);

          } else if (numberOfUses[i] == maxNumberOfUses) {
            allImages.splice(i, 1);
            brgValues.splice(i, 1);
            numberOfUses.splice(i, 1);
          }
          //end the for cycle
          //analyze the next pixel of the cover
          i = allImages.length;
        }
      }
    }
  }

  drawMosaic();
  showButtons();

  noLoop();
}

function drawMosaic() {
  // hide the spinner and the text shown while loading
  spinner.hide();
  loadingText.hide();

  // draw a black background to fill potential empty spaces
  clear();
  fill('black');
  rect(0, 0, width, height);
  //for every pixel of the cover (resized)...
  for (var x = 0; x < w; x++) {
    for (var y = 0; y < h; y++) {

      //  ...covert its coordinates in a linear value...
      let index = x + y * w;

      // ...if there is a value stored in its position of the array...
      if (imageToUse[index] != null) {
        // ...draw the image corresponding to that pixel...
        image(imageToUse[index], (x * scl) + shift_increment_x, (y * scl) + shift_increment_y, scl, scl);
      }
    }
  }
  cover_title = image(cover_title_preload, shift_increment_x, shift_increment_y, w * scl, h * scl);
}



//for each image available...
function findImageBrightness() {

  for (let i = 0; i < allImages.length; i++) {
    allImages[i].loadPixels();

    var rSum = 0;
    var gSum = 0;
    var bSum = 0;
    var r, g, b;
    var c;

    //...sum the r,g,b values of each pixel...
    for (let x = 0; x < allImages[i].width; x++) {
      for (let y = 0; y < allImages[i].height; y++) {
        c = allImages[i].get(x, y);
        rSum += c[0];
        gSum += c[1];
        bSum += c[2];
      }
    }

    //...then divide for the number of pixels that compose the image to find the average r,g,b values...
    var pixNumber = allImages[i].pixels.length / 4;
    r = floor(rSum / pixNumber);
    g = floor(gSum / pixNumber);
    b = floor(bSum / pixNumber);

    //...and find the hue ov the average color of the image...
    var avgRGB = color(r, g, b);
    push();
    colorMode(HSB, 360, 100, 100, 1);

    var avgBrg = floor(brightness(avgRGB));
    pop();

    //...and store the average brightness value of each image in an array
    brgValues[i] = avgBrg;
  }
  //if loading == 3 --> analyzing the brightness of the cover
  loading = 3;

  analyzeCoverPixels();
}

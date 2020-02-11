let cnv;
let capture;
let database;
let confirm;
let takenPhoto;

let backButton;
let takePhotoButton;
let confirmButton;
let retakePhotoButton;

function preload() {

}

function setup() {
  imageMode(CENTER);

  firebaseConfiguration();

  confirm = false;

  showCanvas();
  showCapture();
  showButtons();
}

function draw() {
  showPhoto();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function firebaseConfiguration() {
  // Your web app's Firebase configuration
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

  let ref = database.ref('photos');
  ref.on('value', errData);
}

function showCanvas() {
  // create a canvas according to the screen width
  if (windowWidth > 1024) {
    cnv = createCanvas(500, 500);
  } else if (windowWidth > 720 && windowWidth < 1024) {
    cnv = createCanvas(500, 500);
  } else {
    cnv = createCanvas(windowWidth * 0.8, windowWidth * 0.8);
  }

  //cnv.position(windowWidth / 2 - (cnv.width / 2), windowHeight / 2 - (cnv.height / 2));
  cnv.id('canvas');
  cnv.parent('canvasContainer');
}

function showCapture() {
  capture = createCapture(VIDEO);
  capture.id('capture');
  capture.hide();
}

function errData(err) {
  console.log('Error');
  console.log(err);
}

function showPhoto() {
  // when confirmButton is pressed, the image is scaled to be sent to the database
  if (confirm == true) {
    image(takenPhoto, width / 2, height / 2, 15, 15);
  } else {
    // show image according to the camera device orientation
    if (windowWidth > windowHeight) {
      image(capture, width / 2, height / 2, capture.width * 1.2, capture.height * 1.2);
    } else {
      image(capture, width / 2, height / 2, capture.width * 1, capture.height * 1);
    }
  }
}

// buttons and their functions --------------
function showButtons() {
  let self = this;

  this.newButton = function (_name, _class, _action, _parent) {
    const button = createButton(_name);
    button.addClass(_class);
    button.parent(_parent);
    button.mousePressed(_action);
    return button;
  }

  this.initialize = function () {
    // open homepage button
    let backIcon = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg>';
    backButton = self.newButton(backIcon, "homeButton", openIndex, "header");

    // take photo button
    takePhotoButton = self.newButton('Take picture', "cameraWhiteButton", takePhoto, "innerButtonsContainer");

    // confirm button button
    confirmButton = self.newButton('Confirm', "cameraWhiteButton", confirmPhoto, "innerButtonsContainer");
    confirmButton.hide();

    // retake photo button
    retakePhotoButton = self.newButton('Retake picture', "cameraButton", retakePhoto, "innerButtonsContainer");
    retakePhotoButton.hide();
  }

  this.initialize();

  //console.log(confirmButton);
}

function openIndex() {
  window.open('index.html', '_self');
}

function takePhoto() {
  confirm = false;

  confirmButton.show();
  retakePhotoButton.show();
  takePhotoButton.hide();

  takenPhoto = createImage(cnv.width, cnv.height);
  takenPhoto.copy(cnv, 0, 0, cnv.width, cnv.height, 0, 0, cnv.width, cnv.height);

  noLoop();
}

function retakePhoto() {
  confirm = false;

  confirmButton.hide();
  retakePhotoButton.hide();
  takePhotoButton.show();

  loop();
}

function confirmPhoto() {
  confirm = true;

  resizeCanvas(15, 15);
  let canvas = document.getElementById('canvas');
  let dataURL = canvas.toDataURL('image/png', 0.1);

  let data = {
    photo_img: dataURL
  }

  let ref = database.ref('photos');
  ref.push(data);
  window.open('mosaic.html', '_self');
}
let cameraPageButton;
let mosaicPageButton;
let whatsappButton;
let spotifyButton;

function setup() {
  noCanvas();

  showLogo();
  showInstruction();
  showButtons();
}

function draw() {

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function showLogo() {
  let bandLogo = createImg('assets/logo.png');
  bandLogo.parent('header');
  bandLogo.addClass('logo');
}

function showInstruction() {

  this.showText = function (_string, _id, _class) {
    let writing = createP(_string);
    writing.class(_class);
    writing.parent(_id);
  }

  this.initialize = function() {
    // title
    this.showText("IZI'S <br>NEW STUDIO ALBUM <br>IS COMING!", 'text', 'title');

    // instruction
    this.showText("Join the movement taking a picture to discover the new cover. <br>Share with friends to complete it faster!", 'text');
  }

  this.initialize();
}

function showButtons() {

  this.newButton = function (_name, _class, _action, _parent) {
    const button = createButton(_name);
    button.addClass(_class);
    button.parent(_parent);
    button.mousePressed(_action);
    return button;
  }

  this.openCameraPage = function () {
    window.open('camera.html', '_self');
  }

  this.openMosaicPage = function () {
    window.open('mosaic.html', '_self');
  }

  this.openWhatsapp = function () {
    window.location.href = 'whatsapp://send?text=Partecipa alla creazione del mosaico %0Ahttps://drawwithcode.github.io/2019-group-10-1/';
  }

  this.openSpotify = function () {
    window.location.href = 'https://open.spotify.com/artist/6289Bbkkk3gaCbh1K7Rv8F?si=IS1vz4bUQ8-u6j0yimCgvA';
  }

  this.initialize = function () {
    // open camera page
    cameraPageButton = this.newButton('Take a picture', "whiteButton", openCameraPage, "buttons");

    // open photo mosaic page
    mosaicPageButton = this.newButton('Watch the mosaic', "button", openMosaicPage, "buttons");

    // open Whatsapp
    let whatsappIcon = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.34 8.7 7.33 8.53 7.33Z" /></svg>'
    whatsappButton = this.newButton(whatsappIcon, "iconButton", openWhatsapp, "iconsContainer");

    // open Spotify
    let spotifyIcon = '<svg viewBox="0 0 24 24"> <path fill="currentColor" d="M17.9,10.9C14.7,9 9.35,8.8 6.3,9.75C5.8,9.9 5.3,9.6 5.15,9.15C5,8.65 5.3,8.15 5.75,8C9.3,6.95 15.15,7.15 18.85,9.35C19.3,9.6 19.45,10.2 19.2,10.65C18.95,11 18.35,11.15 17.9,10.9M17.8,13.7C17.55,14.05 17.1,14.2 16.75,13.95C14.05,12.3 9.95,11.8 6.8,12.8C6.4,12.9 5.95,12.7 5.85,12.3C5.75,11.9 5.95,11.45 6.35,11.35C10,10.25 14.5,10.8 17.6,12.7C17.9,12.85 18.05,13.35 17.8,13.7M16.6,16.45C16.4,16.75 16.05,16.85 15.75,16.65C13.4,15.2 10.45,14.9 6.95,15.7C6.6,15.8 6.3,15.55 6.2,15.25C6.1,14.9 6.35,14.6 6.65,14.5C10.45,13.65 13.75,14 16.35,15.6C16.7,15.75 16.75,16.15 16.6,16.45M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>';
    spotifyButton = this.newButton(spotifyIcon, "iconButton", openSpotify, "iconsContainer");
  }

  this.initialize();
}
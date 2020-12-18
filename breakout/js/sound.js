
var Sound = function(src) {
    this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

var Sounds = {
    bong: new Sound("assets/tom.WAV"),
    tom: new Sound("assets/midtom.wav"),
    tomhi: new Sound("assets/tomhi.wav")
}
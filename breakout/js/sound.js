
var Sound = function(src, instances = 1) {
  this.instance = 0
  this.instances = instances
  this.sounds = []
  this.source = src
  for(let i = 0; i < instances; i++) {    
    this.sounds.push(document.createElement("audio"))
    this.sounds[i].src = src
    this.sounds[i].setAttribute("preload", "auto")
    this.sounds[i].setAttribute("controls", "none")
    this.sounds[i].style.display = "none"
    
    document.body.appendChild(this.sounds[i])
  } 
  this.play = function(){       
    this.sounds[this.instance].play()
    this.instance = (this.instance+1) % this.instances    
  }
  this.stop = function(){
    this.sounds[this.instance].pause()
  }
}

var Sounds = {
    title: new Sound("assets/title.ogg"),
    bounce: new Sound("assets/bounce.wav", 3),
    bong: new Sound("assets/flump.WAV"),
    tom: new Sound("assets/flump.wav"),
    tomhi: new Sound("assets/tomhi.wav"),
    explosion: new Sound("assets/explosion.wav", 5),
    fail: new Sound("assets/fail.wav"),
    newBall: new Sound("assets/Powerup.wav"),
    win: new Sound("assets/win.wav"),
    loose: new Sound("assets/loose.wav"),
    music: new Sound("assets/music.mp3")
}
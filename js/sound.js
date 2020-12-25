// sounds.js
// Sound management

// Define a sound (SFX or music)
var Sound = function(src, instances = 1) {
  // How many sounds plays silmutaneous
  this.instance = 0
  this.instances = instances
  // Sound elements
  this.sounds = []
  // Source file url
  this.source = src
  // Create all instances
  for(let i = 0; i < instances; i++) {    
    this.sounds.push(document.createElement("audio"))
    this.sounds[i].src = src
    this.sounds[i].setAttribute("preload", "auto")
    this.sounds[i].setAttribute("controls", "none")
    this.sounds[i].style.display = "none"
    
    document.body.appendChild(this.sounds[i])
  } 
  this.play = function(){
    // Play the sound on turning instance
    this.sounds[this.instance].play()
    this.instance = (this.instance+1) % this.instances    
  }
  this.stop = function(){
    this.sounds[this.instance].pause()
  }
}

// Declares all game SFX and music
var Sounds = {
    title: new Sound("assets/sounds/title.ogg"),
    bounce: new Sound("assets/sounds/bounce.wav", 3),   
    explosion: new Sound("assets/sounds/explosion.wav", 5),
    fail: new Sound("assets/sounds/fail.wav"),
    newBall: new Sound("assets/sounds/Powerup.wav"),
    win: new Sound("assets/sounds/win.wav"),
    loose: new Sound("assets/sounds/loose.wav"),
    music: new Sound("assets/sounds/music01.mp3")
}
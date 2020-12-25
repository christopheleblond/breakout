var sceneManager = new SceneManager([Scenes.Title, Scenes.Game, Scenes.Victory, Scenes.GameOver])

// Game Loop
function mainLoop() {
    // Compute timer
    Timer.update()

    // Display scene
    sceneManager.update(Timer.deltaTime)    
    sceneManager.draw()   

    // Looping
    window.requestAnimFrame(mainLoop)
}

// Start the game after loading assets
loadAssets().then(() => {
    console.log('All assets are loaded')    
    console.log('Game started')
    mainLoop()
})
import Ball from './Ball.js'
import Paddle from './Paddle.js'

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")
let lastTime
function update(time){

    if (lastTime!=null) {
        const delta = time - lastTime
        //Update lopp
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        // movement in game is known
        computerPaddle.update(delta, ball.y)

        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
      
        document.documentElement.style.setProperty("--hue", hue + delta * 0.01)

        if(isLose()) handleLose()
    }
    
    lastTime = time
    window.requestAnimationFrame(update)
    //loop
}
function isLose() {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}
  
function handleLose() {
    const rect = ball.rect()
    //ball meets right screen player wins
    if (rect.right >= window.innerWidth) {
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    } 
    else {
        //ball meets left screen computer wins  
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    }
    ball.reset()
    computerPaddle.reset()
}

document.addEventListener("mousemove", e=>{
    playerPaddle.position= (e.y /window.innerHeight) * 100
})

document.addEventListener("ontouchmove", e=>{
    playerPaddle.position= (e.y /window.innerHeight) * 100
})

window.requestAnimationFrame(update)
// Get the boy character element from the DOM
var boy = document.getElementById("boy");

// Variables for idle animation
var idleImageNumber = 1;
var idleAnimationNumbers = 0;

// Variables for running animation
var runImageNumber = 1;
var runAnimationNumber = 0;

// Function to play idle animation
function idleAnimation() {
    idleImageNumber = idleImageNumber + 1;

    if (idleImageNumber == 11) {
        idleImageNumber = 1;
    }

    boy.src = "resources/idle (" + idleImageNumber + ").png";
}

// Function to start idle animation at intervals
function idleAnimationStart() {
    idleAnimationNumbers = setInterval(idleAnimation, 200);
}

// Function to play running animation
function runAnimation() {
    runImageNumber = runImageNumber + 1;

    if (runImageNumber == 11) {
        runImageNumber = 1;
    }

    boy.src = "resources/run (" + runImageNumber + ").png";
}

// Function to start running animation and stop idle animation
function runAnimationStart() {
    runAnimationNumber = setInterval(runAnimation, 100);
    clearInterval(idleAnimationNumbers);
}

// Variables for jump animation
var jumpImageNumber = 1;
var jumpAnimationNumber = 0;
var boyMarginTop = 500;

// Function to play jump animation
function jumpAnimation() {
    jumpImageNumber = jumpImageNumber + 1;

    // Move up for first 6 frames
    if (jumpImageNumber <= 6) {
        boyMarginTop = boyMarginTop - 35;
        boy.style.marginTop = boyMarginTop + "px";
    }

    // Move down for last frames
    if (jumpImageNumber >= 7) {
        boyMarginTop = boyMarginTop + 35;
        boy.style.marginTop = boyMarginTop + "px";
    }

    // Reset jump animation and return to running animation
    if (jumpImageNumber == 11) {
        jumpImageNumber = 1;
        clearInterval(jumpAnimationNumber);
        jumpAnimationNumber = 0;
        runImageNumber = 0;
        runAnimationStart();
    }

    boy.src = "resources/jump (" + jumpImageNumber + ").png";
}

// Function to start jump animation and stop idle/running animations
function jumpAnimationStart() {
    clearInterval(idleAnimationNumbers);
    runImageNumber = 0;
    clearInterval(runAnimationNumber);
    jumpAnimationNumber = setInterval(jumpAnimation, 100);
}

// Function to handle key press events
function keyCheck(event) {
    var keyCode = event.which;

    // If Enter key (13) is pressed, start running and background movement
    if (keyCode == 13) {
        if (runAnimationNumber == 0) {
            runAnimationStart();
        }
        if (moveBackgroundAnimationId == 0) {
            moveBackgroundAnimationId = setInterval(moveBackground, 100);
        }
        if (boxAnimationId == 0) {
            boxAnimationId = setInterval(boxAnimation, 100);
        }
    }

    // If Space key (32) is pressed, start jump animation
    if (keyCode == 32) {
        if (jumpAnimationNumber == 0) {
            jumpAnimationStart();
        }
        if (moveBackgroundAnimationId == 0) {
            moveBackgroundAnimationId = setInterval(moveBackground, 100);
        }
        if (boxAnimationId == 0) {
            boxAnimationId = setInterval(boxAnimation, 100);
        }
    }
}

// Variables for background movement
backgroundImagesPositionX = 0;
var moveBackgroundAnimationId = 0;
var score = 0;

// Function to move background and increase score
function moveBackground() {
    backgroundImagesPositionX = backgroundImagesPositionX - 20;
    document.getElementById("background").style.backgroundPositionX = backgroundImagesPositionX + "px";

    score = score + 1;
    document.getElementById("score").innerHTML = score;
}

// Variable to track box position
boxMarginLeft = 1540;

// Function to create obstacle boxes in the game
function createBoxes() {
    for (var i = 0; i < 10; i++) {
        var box = document.createElement("div");
        box.className = "box";
        document.getElementById("background").appendChild(box);
        box.style.marginLeft = boxMarginLeft + "px";
        box.id = "box" + i;

        // Set spacing between boxes
        if (i < 5) {
            boxMarginLeft = boxMarginLeft + 2000;
        }

        if (i >= 5) {
            boxMarginLeft = boxMarginLeft + 1000;
        }
    }
}

// Variable for box animation
var boxAnimationId = 0;

// Function to animate moving boxes
function boxAnimation() {
    for (var i = 0; i < 10; i++) {
        var box = document.getElementById("box" + i);
        var currentMarginLeft = getComputedStyle(box).marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 35;
        box.style.marginLeft = newMarginLeft + "px";

        // Check if the box is in the collision range
        if (newMarginLeft >= -110 && newMarginLeft <= 100) {
            if (boyMarginTop > 480) {
                // Stop all animations when collision happens
                clearInterval(boxAnimationId);
                clearInterval(runAnimationNumber);
                runAnimationNumber = -1;

                clearInterval(jumpAnimationNumber);
                jumpAnimationNumber = -1;

                clearInterval(moveBackgroundAnimationId);
                moveBackgroundAnimationId = -1;

                // Start dead animation
                deadAnimationNumber = setInterval(boyDeadAnimation, 100);
            }
        }
    }
}

// Variables for dead animation
var deadImageNumber = 1;
var deadAnimationNumber = 0;

// Function to play dead animation
function boyDeadAnimation() {
    deadImageNumber = deadImageNumber + 1;

    if (deadImageNumber == 11) {
        deadImageNumber = 10;

        // Show game over screen
        document.getElementById("end").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = score;
        document.getElementById("box").style.display = "none";
    }

    boy.src = "resources/Dead (" + deadImageNumber + ").png";
}

// Function to reload the game
function reload() {
    location.reload();
}

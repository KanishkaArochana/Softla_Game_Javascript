# Softla Game Script Documentation

This documentation describes the purpose and functionality of all the methods and functions in the `script.js` file of the Softla Game.

## Functions

### 1. Idle Animation

#### `idleAnimation()`

This function cycles through images for the idle animation of the character (boy).

**Logic:**

- Increments `idleImageNumber`.
- Resets `idleImageNumber` to 1 if it exceeds 10.
- Updates the `src` of the boy's image to the next idle frame.

**Code:**

```javascript
function idleAnimation() {
    idleImageNumber = idleImageNumber + 1;

    if (idleImageNumber == 11) {
        idleImageNumber = 1;
    }

    boy.src = "resources/idle (" + idleImageNumber + ").png";
}
```

#### `idleAnimationStart()`

Starts the idle animation by repeatedly calling `idleAnimation` every 200ms using `setInterval`.

**Code:**

```javascript
function idleAnimationStart() {
    idleAnimationNumbers = setInterval(idleAnimation, 200);
}
```

### 2. Run Animation

#### `runAnimation()`

This function cycles through images for the run animation.

**Logic:**

- Increments `runImageNumber`.
- Resets `runImageNumber` to 1 if it exceeds 10.
- Updates the `src` of the boy's image to the next running frame.

**Code:**

```javascript
function runAnimation() {
    runImageNumber = runImageNumber + 1;

    if (runImageNumber == 11) {
        runImageNumber = 1;
    }

    boy.src = "resources/run (" + runImageNumber + ").png";
}
```

#### `runAnimationStart()`

Starts the run animation by repeatedly calling `runAnimation` every 100ms. Stops the idle animation.

**Code:**

```javascript
function runAnimationStart() {
    runAnimationNumber = setInterval(runAnimation, 100);
    clearInterval(idleAnimationNumbers);
}
```

### 3. Jump Animation

#### `jumpAnimation()`

This function handles the jump mechanics of the character.

**Logic:**

- Moves the boy upwards for the first 6 frames, then downwards for the next 5 frames.
- Resets `jumpImageNumber` to 1 after 10 frames.
- Restarts the run animation once the jump is complete.

**Code:**

```javascript
function jumpAnimation() {
    jumpImageNumber = jumpImageNumber + 1;

    if (jumpImageNumber <= 6) {
        boyMarginTop = boyMarginTop - 35;
        boy.style.marginTop = boyMarginTop + "px";
    }

    if (jumpImageNumber >= 7) {
        boyMarginTop = boyMarginTop + 35;
        boy.style.marginTop = boyMarginTop + "px";
    }

    if (jumpImageNumber == 11) {
        jumpImageNumber = 1;
        clearInterval(jumpAnimationNumber);
        jumpAnimationNumber = 0;
        runImageNumber = 0;
        runAnimationStart();
    }

    boy.src = "resources/jump (" + jumpImageNumber + ").png";
}
```

#### `jumpAnimationStart()`

Starts the jump animation and stops the idle and run animations.

**Code:**

```javascript
function jumpAnimationStart() {
    clearInterval(idleAnimationNumbers);
    runImageNumber = 0;
    clearInterval(runAnimationNumber);
    jumpAnimationNumber = setInterval(jumpAnimation, 100);
}
```

### 4. Key Input Handling

#### `keyCheck(event)`

Handles keyboard input to start animations or background movement.

**Logic:**

- Pressing Enter (keyCode 13) starts the run animation and background movement.
- Pressing Space (keyCode 32) starts the jump animation.

**Code:**

```javascript
function keyCheck(event) {
    var keyCode = event.which;

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
```

### 5. Background Movement

#### `moveBackground()`

Creates the illusion of movement by scrolling the background.

**Logic:**

- Decreases `backgroundImagesPositionX` to move the background.
- Increments and displays the player's score.

**Code:**

```javascript
function moveBackground() {
    backgroundImagesPositionX = backgroundImagesPositionX - 20;
    document.getElementById("background").style.backgroundPositionX = backgroundImagesPositionX + "px";

    score = score + 1;
    document.getElementById("score").innerHTML = score;
}
```

### 6. Obstacle Management

#### `createBoxes()`

Generates obstacles dynamically and positions them.

**Logic:**

- Creates 10 `div` elements with the class `box`.
- Positions them at intervals.

**Code:**

```javascript
function createBoxes() {
    for (var i = 0; i < 10; i++) {
        var box = document.createElement("div");
        box.className = "box";
        document.getElementById("background").appendChild(box);
        box.style.marginLeft = boxMarginLeft + "px";
        box.id = "box" + i;

        if (i < 5) {
            boxMarginLeft = boxMarginLeft + 2000;
        } else {
            boxMarginLeft = boxMarginLeft + 1000;
        }
    }
}
```

#### `boxAnimation()`

Moves obstacles toward the character and checks for collisions.

**Logic:**

- Decreases the left margin of each box.
- Stops the game if a collision occurs.

**Code:**

```javascript
function boxAnimation() {
    for (var i = 0; i < 10; i++) {
        var box = document.getElementById("box" + i);
        var currentMarginLeft = getComputedStyle(box).marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 35;
        box.style.marginLeft = newMarginLeft + "px";

        if (newMarginLeft >= -110 && newMarginLeft <= 100) {
            if (boyMarginTop > 180) {
                clearInterval(boxAnimationId);
                clearInterval(runAnimationNumber);
                runAnimationNumber = -1;
                clearInterval(jumpAnimationNumber);
                jumpAnimationNumber = -1;
                clearInterval(moveBackgroundAnimationId);
                moveBackgroundAnimationId = -1;

                deadAnimationNumber = setInterval(boyDeadAnimation, 100);
            }
        }
    }
}
```

### 7. Game Over

#### `boyDeadAnimation()`

Handles the death animation and displays the game-over screen.

**Logic:**

- Cycles through death images.
- Displays the game-over screen when the animation ends.

**Code:**

```javascript
function boyDeadAnimation() {
    deadImageNumber = deadImageNumber + 1;

    if (deadImageNumber == 11) {
        deadImageNumber = 10;
        document.getElementById("end").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = score;
    }

    boy.src = "resources/Dead (" + deadImageNumber + ").png";
}
```

#### `reload()`

Restarts the game by reloading the page.

**Code:**

```javascript
function reload() {
    location.reload();
}
```


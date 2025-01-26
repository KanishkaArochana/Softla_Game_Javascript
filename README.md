
# Softla Game Documentation

This documentation describes the purpose and functionality of the files in the Softla Game: `index.html`, `style.css`, and `script.js`. Each section explains the structure and methods in detail.

## Index.html

This file defines the structure of the game using HTML.

### Elements and Attributes

#### HTML Boilerplate:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SoftlaGame</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
</body>
</html>
```

- Declares the document as HTML5.
- Sets the page title and links the stylesheet `style.css`.

### Game Structure:

The `body` tag includes:

- `onload` for starting animations and initializing the game.
- `onkeypress` to listen for user inputs.

```html
<body class="body" onload="idleAnimationStart(); createBoxes();" onkeypress="keyCheck(event);">
```

### Main Components:

- `background` div: Serves as the game stage.
- `boy` image: Represents the main character.
- `score` div: Displays the player's current score.
- `end` div: Appears when the game ends, showing the final score and a retry button.

```html
<div class="background" id="background">
    <img src="resources/Idle (1).png" class="boy" id="boy">
    <div class="score" id="score"></div>
    <div class="end" id="end">
        <div style="color: rgb(251,255,11);">Game Over</div>
        <div style="color: rgb(145,189,0);">Your Score</div>
        <div style="color: rgb(54,200,223);" id="endScore">0</div>
        <button class="btn" onclick="reload();">Try Again</button>
    </div>
</div>
```

### Script:

Links the JavaScript file `script.js`.

```html
<script src="script.js"></script>
```

## Style.css

Defines the visual styling of the game.

### Key Classes

#### body:

Removes default margins and padding.

```css
body {
    margin: 0;
    padding: 0;
}
```

#### background:

Sets the game background image and properties.

```css
.background {
    background-image: url(resources/background.jpg);
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-repeat: repeat-x;
    overflow-x: hidden;
    position: absolute;
}
```

#### boy:

Styles the main character.

```css
.boy {
    height: 150px;
    margin-top: 200px;
    position: absolute;
}
```

#### box:

Styles obstacles with images and positioning.

```css
.box {
    width: 150px;
    height: 150px;
    position: absolute;
    margin-top: 230px;
    background-image: url(resources/267226234dragon-animated-gif-17.gif);
    background-size: contain;
    background-repeat: no-repeat;
}
```

#### score:

Formats the score display.

```css
.score {
    font-size: 50px;
    font-weight: bold;
    margin-left: 30px;
    margin-top: 20px;
    position: absolute;
}
```

#### end:

Styles the game-over screen.

```css
.end {
    width: 100%;
    height: 100vh;
    position: absolute;
    background-image: linear-gradient(90deg, #8E0E00 0%, #1F1C18 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 90px;
    font-weight: bold;
    color: white;
}
```

## Script.js

Handles the game's interactivity and logic.

### Functions and Methods

#### Idle Animation:

Cycles through images for an idle animation.

```javascript
function idleAnimation() { /* ... */ }
function idleAnimationStart() { /* ... */ }
```

#### Run Animation:

Starts running animation.

```javascript
function runAnimation() { /* ... */ }
function runAnimationStart() { /* ... */ }
```

#### Jump Animation:

Handles jumping mechanics.

```javascript
function jumpAnimation() { /* ... */ }
function jumpAnimationStart() { /* ... */ }
```

#### Key Input:

Detects user input for running or jumping.

```javascript
function keyCheck(event) { /* ... */ }
```

#### Background Movement:

Simulates movement by scrolling the background.

```javascript
function moveBackground() { /* ... */ }
```

#### Obstacle Creation:

Generates obstacles dynamically.

```javascript
function createBoxes() { /* ... */ }
```

#### Collision Detection:

Checks collisions between the character and obstacles.

```javascript
function boxAnimation() { /* ... */ }
```

#### Death and Restart:

Manages the game-over state.

```javascript
function boyDeadAnimation() { /* ... */ }
function reload() { /* ... */ }
```

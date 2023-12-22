/*jslint devel: true*/
/*eslint-env browser*/
/*eslint no-console: ["error", {allow:["warn", "error", log]}]*/
/*global $, Audio, bomb, createShips: false */

var gameBoard = createShips();

//plays a sound when an empty box is clicked
function missSound() {
    "use strict";
    
    new Audio('miss.mp3').play();
}

//plays a sound when a box is clicked with a ship in it
function hitSound() {
    "use strict";
    
    new Audio('hit.mp3').play();
}

//plays a sound when a ship is sunk
function sunkSound() {
    "use strict";
    
    new Audio('explosion.mp3').play();
}

//sets the style of the boxes differently when a whole ship is sunk
function shipSunk(listID, alert) {
    "use strict";
    
    var node;
    
    node = $("#" + listID);
    $(node).css("text-decoration", "line-through");
    $(node).css("color", "darkgray");
    
    $("#alerts").empty();
    $("#alerts").append(alert);
}

//this stores in the DOM the amount of hits left before a ship is sunk
function updateShipValue(listID, shipValue) {
    "use strict";
    
    var node;
    
    node = $("#" + listID);
    $(node).attr("value", shipValue);
}

//this retrieves the amount of hits left before a ship is sunk
function getShipValue(listID) {
    "use strict";
    
    var node, value;
    
    node = $("#" + listID);
    value = $(node).attr("value");
    value = Number(value);
    return value;
}

//this function uses a switch to check which ship was hit, and alerts the user if it is sunk
function sunkCheck(ArrayID, coordinates) {
    "use strict";
    
    var alert, listID, node, LCarrier, Carrier, BattleshipA, BattleshipB, Cruiser, Submarine, DestroyerA, DestroyerB;
    
    switch (ArrayID) {
            
    case 1:
        listID = "LCarrier";
        LCarrier = getShipValue(listID);
        LCarrier -= 1;
        updateShipValue(listID, LCarrier);
        
        node = $("#" + coordinates);
        $(node).attr('class', 'sunk' + ArrayID);
        
           
        if (LCarrier === 0) {
            alert = "You sunk the Large Carrier!";
            $('.sunk' + ArrayID).css({"background": "#720000"});
            sunkSound();
            shipSunk(listID, alert);
        }
        break;
            
    case 2:
        listID = "Carrier";
        Carrier = getShipValue(listID);
        Carrier -= 1;
        updateShipValue(listID, Carrier);
            
        node = $("#" + coordinates);
        $(node).attr('class', 'sunk' + ArrayID);
        
        if (Carrier === 0) {
            alert = "You sunk the Carrier!";
            $('.sunk' + ArrayID).css({"background": "#720000"});
            sunkSound();
            shipSunk(listID, alert);
        }
        break;
            
    case 3:
        listID = "BattleshipA";
        BattleshipA = getShipValue(listID);
        BattleshipA -= 1;
        updateShipValue(listID, BattleshipA);
            
        node = $("#" + coordinates);
        $(node).attr('class', 'sunk' + ArrayID);
            
        if (BattleshipA === 0) {
            alert = "You sunk a Battleship!";
            $('.sunk' + ArrayID).css({"background": "#720000"});
            sunkSound();
            shipSunk(listID, alert);
        }
        break;
            
    case 4:
        listID = "BattleshipB";
        BattleshipB = getShipValue(listID);
        BattleshipB -= 1;
        updateShipValue(listID, BattleshipB);
            
        node = $("#" + coordinates);
        $(node).attr('class', 'sunk' + ArrayID);
        
        if (BattleshipB === 0) {
            alert = "You sunk a Battleship!";
            $('.sunk' + ArrayID).css({"background": "#720000"});
            sunkSound();
            shipSunk(listID, alert);
        }
        break;
            
    case 5:
        listID = "Cruiser";
        Cruiser = getShipValue(listID);
        Cruiser -= 1;
        updateShipValue(listID, Cruiser);
            
        node = $("#" + coordinates);
        $(node).attr('class', 'sunk' + ArrayID);
        
        if (Cruiser === 0) {
            alert = "You sunk the Cruiser!";
            $('.sunk' + ArrayID).css({"background": "#720000"});
            sunkSound();
            shipSunk(listID, alert);
        }
        break;
            
    case 6:
        listID = "Submarine";
        Submarine = getShipValue(listID);
        Submarine -= 1;
        updateShipValue(listID, Submarine);
            
        node = $("#" + coordinates);
        $(node).attr('class', 'sunk' + ArrayID);
        
        if (Submarine === 0) {
            alert = "You sunk the Submarine!";
            $('.sunk' + ArrayID).css({"background": "#720000"});
            sunkSound();
            shipSunk(listID, alert);
        }
        break;
            
    case 7:
        listID = "DestroyerA";
        DestroyerA = getShipValue(listID);
        DestroyerA -= 1;
        updateShipValue(listID, DestroyerA);
            
        node = $("#" + coordinates);
        $(node).attr('class', 'sunk' + ArrayID);
        
        if (DestroyerA === 0) {
            alert = "You sunk a Destroyer!";
            $('.sunk' + ArrayID).css({"background": "#720000"});
            sunkSound();
            shipSunk(listID, alert);
        }
        break;
            
    case 8:
        listID = "DestroyerB";
        DestroyerB = getShipValue(listID);
        DestroyerB -= 1;
        updateShipValue(listID, DestroyerB);
            
        node = $("#" + coordinates);
        $(node).attr('class', 'sunk' + ArrayID);
        
        if (DestroyerB === 0) {
            alert = "You sunk a Destroyer!";
            $('.sunk' + ArrayID).css({"background": "#720000"});
            sunkSound();
            shipSunk(listID, alert);
        }
        break;
    default:
        return;
    }
    
    return;
}

//this adds a ship to the array using parameters of how long the ship is, and what number represents that ship
function createOneShip(boardArray, ship, id) {
    "use strict";

    var startx, starty, i, j, orientation, fits;

    //generate a number 0 or 1 that decides if the ship will be written vertically or horizontally in the array
    orientation = Math.floor(Math.random() * 2);
    
    //if orientation is 1, the ship will be vertical. The y axis will be incrimented.
    if (orientation === 1) {

        //generate random coordinates to start building a ship
        startx = Math.floor(Math.random() * 9);
        starty = Math.floor(Math.random() * (9 - ship));
        
        //console.log(typeof(startx));
        //console.log(typeof(starty));

        //this makes sure the ships don't overlap. If fits doesn't become false, 
        //it will recursively call the function to try again until fits becomes true
        fits = true;
        
        for (j = 0; j < ship; j += 1) {
            if (boardArray[starty + j][startx] !== 0) {
                fits = false;
            }
        }

        //if fits is true, it means the ship won't overlap with another, so it writes it to the array
        if (fits) {

            for (i = 0; i < ship; i += 1) {
                boardArray[starty][startx] = id;
                starty += 1;
            }

        } else {
            createOneShip(boardArray, ship, id);
        }
        
        //if orientation is 0, the ship will be horizontal. The rest is the same, just on the x axis.
    } else {

        startx = Math.floor(Math.random() * (9 - ship));
        starty = Math.floor(Math.random() * 9);
        
        fits = true;
        
        for (j = 0; j < ship; j += 1) {
            if (boardArray[starty][startx + j] !== 0) {
                fits = false;
            }
        }

        if (fits) {

            for (i = 0; i < ship; i += 1) {
                boardArray[starty][startx] = id;
                startx += 1;
            }

        } else {
            createOneShip(boardArray, ship, id);
        }
    }


    return boardArray;
    
}

//this function calls the "createOneShip" function for all of the 8 ships, adding them all to the array.
function createShips() {
    "use strict";
    
    console.log("test");

    //window.location.reload(true);
    
    //start with a blank 2D array
    var boardArray = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    //add all of the ships to the array one by one, using unique numbers (1-8) to represent each ship.
    boardArray = createOneShip(boardArray, 6, 1);
    boardArray = createOneShip(boardArray, 5, 2);
    boardArray = createOneShip(boardArray, 4, 3);
    boardArray = createOneShip(boardArray, 4, 4);
    boardArray = createOneShip(boardArray, 3, 5);
    boardArray = createOneShip(boardArray, 3, 6);
    boardArray = createOneShip(boardArray, 2, 7);
    boardArray = createOneShip(boardArray, 2, 8);

    //console.log(boardArray);
    return boardArray;
}

//A simple function to remove the event listener to disable the game when the user sinks all of the ships
function disableGame() {
    "use strict";

    var gameboardChildren, i, item;

    gameboardChildren = document.getElementById("gameboard").childNodes;

    for (i = 0; i < gameboardChildren.length; i += 1) {
        item = gameboardChildren[i];
        item.removeEventListener("click", bomb, false);
    }
}

//by default the form to add your score to the scoresheet is hidden using CSS,
//this function ssets the CSS to show the form and is called when the user sinks all of the ships
function showForm(node) {
    "use strict";
    
    var x = document.getElementById(node);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

//This function changes the CSS of the boxes on the page to create the game gui as the user clicks
//x represents the data stored in the mouse click
function bomb(x) {
    "use strict";

    var row, col, alert, listID, misses, missesID, wonID, wonCheck, coordinates, missNode, scoreNode;

    //get the coordinates from the mouse click
    row = x.target.id.substring(1, 2);
    col = x.target.id.substring(2, 3);


    //if a box is clicked that is a "0" according to the array, set it's background color to dark gray,
    //play the miss sound, remove it's event listener (so it can't be clicked again) and update the DOM with the amount of misses
    if (gameBoard[row][col] === 0 || gameBoard[row][col] === 9) {
        x.target.style.transition = "all .2s";
        x.target.style.background = '#878787';
        
        missSound();

        x.target.removeEventListener("click", bomb, false);

        //add to the total of clicks
        missesID = "misses";
        misses = getShipValue(missesID);
        misses = misses += 1;
        updateShipValue(missesID, misses);
        
        //display misses value on page
        misses = getShipValue(missesID);
        $("#misses").empty();
        $("#misses").append("Misses: " + misses);
        
        


    //if a box is clicked that is a "1" according to the array, set it's background color to red,
    //play the hit sound, remove it's event listener (so it can't be clicked again)
    } else if (gameBoard[row][col] !== 0 && gameBoard[row][col] !== 9) {
        
        x.target.style.transition = "all .2s";
        x.target.style.background = 'red';
        
        hitSound();
        
        coordinates = "s" + row + col;
        
        //check if the ship is sunk or not, pass the ship coordinates into the sunkCheck function
        sunkCheck(gameBoard[row][col], coordinates);

        x.target.removeEventListener("click", bomb, false);

        //Update HTML with amount of hits
        wonID = "wonCheck";
        wonCheck = getShipValue(wonID);
        wonCheck = wonCheck += 1;
        updateShipValue(wonID, wonCheck);

        //Check if all of the ships are sunk. If so, create text in the DOM to tell the user they sunk the ship
        if (wonCheck === 29) {
            
            alert = "You won! All the ships are sunk!";
            listID = "LCarrier";
            shipSunk(listID, alert);
            
            showForm("scoreForm");
            
            missNode = $("#misses");
            misses = missNode.attr("value");
            
            //console.log(misses);
            
            scoreNode = $("#score");
            $(scoreNode).attr("value", misses);

            disableGame();
        }

    }
}

//This creates 10 div tags that serve as the game board
//the function is called using a button in the HTML, so that's why there is an error
function createBoard() {
    "use strict";

    var rows, cols, gameBoardContainer, box, i, a, xpos, ypos;
    
    $(".title").empty();
    
    showForm("reveal");

    //the board could potentially be created to be bigger if we set these numbers higher,
    //but the CSS for the board would have to increase in width as well.
    rows = 10;
    cols = 10;
    gameBoardContainer = document.getElementById("gameboard");

    //create the div tags and give them an id with a number 0-100
    for (i = 0; i < rows; i += 1) {
        for (a = 0; a < cols; a += 1) {

            box = document.createElement("div");
            gameBoardContainer.appendChild(box);

            box.id = 's' + i + a;

            xpos = i * 50;
            ypos = a * 50;

            // use CSS absolute positioning to place each grid square on the page
            box.style.top = ypos + 'px';
            box.style.left = xpos + 'px';

            box.addEventListener("click", bomb, false);

        }
    }
}

var piratesTheme = document.getElementById("piratesTheme");
var playButton = document.getElementById("playPause");
var isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        piratesTheme.pause();
        playButton.setAttribute("src", "paused.png");
    } else {
        piratesTheme.play();
        playButton.setAttribute("src", "playing.png");
    }
}

piratesTheme.onplaying = function () {
    isPlaying = true;
};
piratesTheme.onpause = function () {
    isPlaying = false;
};
/*jslint devel: true*/
/*eslint-env browser*/
/*eslint no-console: ["error", {allow:["warn", "error", log]}]*/


//create a global diceArray
var diceArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var rollCount = 0;

function getInput() {
    "use strict";
    
    var removeNode, rollButton, innerRollButton;
    
    do {
        window.curVal = parseInt(window.prompt("Please enter a number from 1 to 6"), 10);
    } while (isNaN(curVal) || curVal > 6 || curVal < 1);
    
    curValCheck();
    
    removeNode = document.getElementById("enterNumber");
    while (removeNode.firstChild) {
        removeNode.removeChild(removeNode.firstChild);
    }
    
    document.getElementById("targetNumber").textContent = "Target number: " + curVal;
    
    
    rollButton = document.createElement("div");
    document.getElementById("rollButton").appendChild(rollButton);
    rollButton.id = 'innerRollButton';
    rollButton.addEventListener("click", twoFunctions, false);
    
    innerRollButton = document.createTextNode("Roll Dice");
    document.getElementById("innerRollButton").appendChild(innerRollButton);
}

function twoFunctions() {
    'use strict';
    
    createDiceElems();
    play();
}

function createDiceElems() {
    "use strict";
    
    var gameBoardContainer, box, winText, removeNode;
    
    rollCount += 1;
    
    document.getElementById("rolls").textContent = "Roll Count: " + rollCount;
    
    resetDice();
    
    gameBoardContainer = document.getElementById("diceRow");

    //create the div tags and give them an id with a number 0-9
    diceArray.forEach(function (element, index, diceArray) {
        
        
        if (element != curVal) {
            //diceArray.roll(element);
            element = Math.floor(Math.random() * 6) + 1;
            //console.log(element);
            
            diceArray.splice(index, 1, element);
            //console.log("index: " + index);
            //console.log("element: " + element);
            
        }
        

        box = document.createElement("div");
        gameBoardContainer.appendChild(box);

        box.className = 'd' + element;

    });
    
    //console.log(diceArray);
    if (valCheck.toString() == diceArray.toString()) {
        winText = document.createTextNode("You Won! ");
        document.getElementById("winText").appendChild(winText);

        removeNode = document.getElementById("rollButton");
        while (removeNode.firstChild) {
            removeNode.removeChild(removeNode.firstChild);
        }

        document.body.style.background = "url('firework.gif')";
        document.body.style.backgroundSize = "cover";
        
    }

}


function firstDice() {
    "use strict";
    
    var gameBoardContainer, box;
    
    document.getElementById("rolls").textContent = "Roll Count: " + rollCount;
    
    gameBoardContainer = document.getElementById("diceRow");

    //create the div tags and give them an id with a number 0-9
    diceArray.forEach(function (element, index, diceArray) {
        
        element = Math.floor(Math.random() * 6) + 1;

            
        diceArray.splice(index, 1, element);

        box = document.createElement("div");
        gameBoardContainer.appendChild(box);

        box.className = 'd' + element;
    });
    
    //console.log(diceArray);
}

function resetDice() {
    "use strict";
    
    var removeNode, diceID;
    
    removeNode = document.getElementById("remove");
    while (removeNode.firstChild) {
        removeNode.removeChild(removeNode.firstChild);
        
    }

    diceID = document.createElement("div");
    document.getElementById("remove").appendChild(diceID);
    diceID.setAttribute("id", "diceRow");
}

function play() {
    'use strict';
    
    var playSound = new Audio('RollDice.mp3');
    playSound.play();
}

function curValCheck() {
    'use strict';
    
    var valArray, i;
    
    valArray = [];
    
    for (i = 0; i < 10; i += 1) {
        valArray.push(curVal);
    }
    
    window.valCheck = valArray;
    //console.log(valCheck);  
}

firstDice();
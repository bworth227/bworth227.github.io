/*jslint devel: true*/
/*eslint-env browser*/
/*eslint no-console: ["error", {allow:["warn", "error", log]}]*/
/*global $: false */

//writes the text file to the html
function showScoreBoard() {
    "use strict";

    //window.location.reload(true);
    
    $("#currentScores").load("scores.txt");
}

//sorts the scores in order of score, lowest to highest
function scoreOrder() {
    "use strict";
    
    var scores, scoresSplit, scoresPairs, i, indexSplit, sorted, format, formatted;
    
    scores = document.getElementById("currentScores").innerText;
    
    scoresSplit = scores.split("\n");
    
    scoresPairs = [];
    
    for (i = 1; i < scoresSplit.length; i += 1) {
        indexSplit = scoresSplit[i].split(":");
        scoresPairs.push(indexSplit);
    }

    function sortFunction(a, b) {
        
        if (a[1] === b[1]) {
            return 0;
        } else {
            return (a[1] < b[1]) ? -1 : 1;
        }
    }
    
    sorted = scoresPairs.sort(sortFunction);
    
    $("#currentScores").empty();
    for (i = 0; i < sorted.length; i += 1) {
        $("#currentScores").append(sorted[i] + "\n");
    }
    
    format = document.getElementById("currentScores").innerText;
    formatted = format.replace(/,/g, ":");
    
    $("#currentScores").empty();
    $("#currentScores").append(formatted);
    
    $(".scoreBoardButton").remove();
}

showScoreBoard();
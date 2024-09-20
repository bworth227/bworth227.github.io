const defaultSettings = {
    rows: 10,
    players: [
        { name: "Player 1", color: "#171717", scores: [] },
        { name: "Player 2", color: "#171717", scores: [] },
        { name: "Player 3", color: "#171717", scores: [] },
        { name: "Player 4", color: "#171717", scores: [] }
    ]
}

const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

var sheetSettings = localStorage.getItem("sheetSettings");
if (!sheetSettings) {
    sheetSettings = defaultSettings;
} else {
    sheetSettings = JSON.parse(sheetSettings);
}

function createTable(settings, action) {
    changeZoom(false);

    if (settings) {
        sheetSettings = settings;
    }
    var table = document.getElementById("mainTable");

    /** Animation **/
    if (action) {
        if (action == "addPlayer") {
            addPlayerJsonAnimation(sheetSettings);
        }
    }
    /* /Animation */

    createBaseRows(sheetSettings.rows, table);
    createBaseColumns(sheetSettings.players, table, sheetSettings.rows, action);
    createTotalsRow(action);
    updateSheetScores();
    calculateScores();
    updateLastRowDelete();

    saveSettings();

    noHoverOnMobile();

    //checkForCustomCSS();
}

function changeZoom(allowZoom) {
    removeZoomElement();

    // Create a new meta element
    var meta = document.createElement('meta');

    // Set the name attribute to "viewport"
    meta.setAttribute('name', 'viewport');

    // Set the content attribute with the appropriate viewport settings
    meta.setAttribute('content', `
        user-scalable=${allowZoom ? '1' : '0'};
        width=device-width;
        initial-scale=0.5;
        maximum-scale=${allowZoom ? '12' : '0.5'};
        minimum-scale=0
    `);

    // Add the meta tag to the head of the document
    document.head.appendChild(meta);
}

function removeZoomElement() {
    // Get all meta tags in the document
    var els = document.getElementsByTagName('meta');

    // Loop through the meta tags in reverse order since we're removing elements
    for (var i = els.length - 1; i >= 0; i--) {
        var meta = els[i];
        
        // Check if the meta tag is related to the viewport
        if (meta.getAttribute('name') === 'viewport') {
            // Remove the meta tag from the DOM
            meta.parentNode.removeChild(meta);
        }
    }
}


function createBaseRows(rows, table) {
    for (let i = 0; i < rows; i++) {
        let row = document.createElement("tr");
        row.id = i;
        let td = document.createElement("td");
        td.id = `BaseRow-${i}`;
        td.innerText = i + 1;
        row.appendChild(td);
        table.getElementsByTagName("tbody")[0].appendChild(row);
    }
}

function createBaseColumns(players, table, rows, action) {
    let row = document.createElement("tr");
    row.id = 0;
    for (let i = 0; i < players.length + 1; i++) {
        let th = document.createElement("th");
        th.id = `BaseCol-${i-1}`;
        if (i == 0) {
            th.id = "Base-Corner";
            th.setAttribute("style", "border-top-left-radius: 30px;");
        }
        if (i != 0) {
            //create the player name header input rows
            let input = document.createElement("input");
            input.value = players[i - 1].name;
            input.setAttribute("style", `background-color: ${players[i - 1].color};`);
            input.id = `PlayerInput-${i-1}`
            input.setAttribute("onClick","this.setSelectionRange(0, this.value.length)");
            addOnblurForSettings(input);

            input.setAttribute("data-jscolor", `{ value: '${players[i - 1].color}' }`);

            th.appendChild(input);

            //if animation is set, add it to the element
            if (players[i-1].animation == "addPlayer") {
                th.setAttribute("animation", players[i-1].animation);
                //th.addEventListener("animationend", function() {this.removeAttribute("animation")}, false);
                document.getElementById("addColBar").setAttribute("animation",players[i-1].animation);
                document.getElementById("addColBar").addEventListener("animationend", function() {this.removeAttribute("animation")}, false);
            }

            //add all the rest of the input cells
            for (let j = 0; j < rows; j++) {
                td = createScoreInput(i, j, players);

                //if animation is set, add it to the element
                if (players[i-1].animation == "addPlayer") {
                    td.setAttribute("animation", players[i-1].animation);
                    td.addEventListener("animationend", function() {this.removeAttribute("animation")}, false);
                }
                table.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[j].appendChild(td);
            }
            if (action == "addRow") {
                if (!row.getElementsByTagName("th")[0]) {
                    row.setAttribute("animation", "addRow");
                    row.addEventListener("animationend", function() {this.removeAttribute("animation")}, false);
                }
            }
        }
        row.appendChild(th);
    }
    table.getElementsByTagName("thead")[0].appendChild(row);
    jscolor.install();
    fixHeaderColors();
}

//this is here to resolve the header colors that are overwritten when "jscolor.install()" is ran
function fixHeaderColors() {
    let players = sheetSettings.players;
    //console.log(players)
    for (let i = 0; i < players.length; i++) {
        let input = document.getElementById(`PlayerInput-${i}`);
        input.style = `background-color: ${sheetSettings.players[i].color}`;
        input.setAttribute("data-current-color", sheetSettings.players[i].color);
    }

}

function createScoreInput(i, j, players) {
    let td = document.createElement("td");
    td.id = `${i-1}-${j}`;
    let input1 = document.createElement("input");
    input1.id = `input-${i-1}-${j}`;
    input1.setAttribute("style", `background-color: ${players[i - 1].color};`);
    input1.setAttribute("inputmode","decimal");

    addOnblurForSettings(input1);
    td.appendChild(input1);
    return td
}

function createTotalsRow(action) {
    let players = sheetSettings.players;
    let tbody = document.getElementById("mainTable").getElementsByTagName("tbody")[0];
    let tr = document.createElement("tr");
    tr.id = "totals_row";

    for (let i = 0; i < players.length+1; i++) {
        let td = document.createElement("td");
        if (i == 0) {
            td.id = `Total-Corner`
            td.innerText = "+";
            td.setAttribute("onclick", "addRow();")
        } else {
            let input = createTotalInput(i, td, players);
            td.appendChild(input);
        }
        tr.appendChild(td);
    }
    if (action == "addRow") {
        tr.setAttribute("animation", "addRow");
        tr.addEventListener("animationend", function() {this.removeAttribute("animation")}, false);
    }
    tbody.appendChild(tr);  
}

function createTotalInput(i, td, players) {
    td.id = `Total-${i-1}`;

    //if animation is set, add it to the element
    if (players[i-1].animation) {
        td.setAttribute("animation", players[i-1].animation);
        td.addEventListener("animationend", function() {this.removeAttribute("animation")}, false);
    }

    let input = document.createElement("input");
    input.id = `TotalInput-${i-1}`;
    input.className = "total_score";
    input.setAttribute("player", players[i-1].name);
    input.setAttribute("style", "background-color: #171717;");
    input.setAttribute("readonly", "");
    return input
}

function updateSheetScores() {
    var players = sheetSettings.players;
    for (let i = 0; i < players.length; i++) {
        if (players[i].scores != []) {
            let scores = players[i].scores;
            for (let j = 0; j < scores.length; j++) {
                //console.log(scores[j].id);
                var curInput = document.getElementById(scores[j].id).getElementsByTagName("input")[0];
                if (!curInput.value) {
                    curInput.value = scores[j].val;
                    curInput.setAttribute("style", `background-color: ${scores[j].color};`)
                }
            }
        }
    }
}

function clearSheet() {
    if (confirm("Are you sure you want to clear the scores?")) {
        var values = document.getElementById("mainTable").getElementsByTagName("td");
        for (let i = 0; i < values.length; i++) {
            curInput = values[i].getElementsByTagName("input")[0];
            if (curInput) {
                if (curInput.value) {
                    curInput.value = "";
                }
            }
        }
        calculateScores();
    }
}

function saveSettings() {
    var set = {}
    set.rows = document.getElementById("mainTable").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length - 1; //-1 to account for the extra totals row

    var players = [];
    let ths = document.getElementsByTagName("th")
    for (let i = 0; i < ths.length; i++) {
        let input = ths[i].getElementsByTagName("input")[0];
        if (input) {
            let hexColor = rgb2hex(input.style.backgroundColor);
            players.push( { name: input.value, color: hexColor, scores: [] } )
        }
    }

    for (let i = 0; i < players.length; i++) {
        let trs = document.getElementById("mainTable").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
        for (let j = 0; j < trs.length - 1; j++) {
            let td = trs[j].getElementsByTagName("td")[i + 1];
            let input = td.getElementsByTagName("input")[0];
            if (input) {
                let hexColor = rgb2hex(input.style.backgroundColor);
                players[i].scores.push( { id: td.id, val: input.value, color: hexColor } )
            }
        }
    }
    set.players = players;

    sheetSettings = set;
    localStorage.setItem("sheetSettings", JSON.stringify(set));
}

function resetSheetToDefault() {
    if (confirm("Are you sure you want to reset the sheet?")) {
        sheetSettings = JSON.parse(JSON.stringify(defaultSettings)); //this is super weird, but if I don't stringify and parse, the defaultSettings const somehow changes
        localStorage.setItem("sheetSettings", JSON.stringify(sheetSettings));
        document.getElementById("mainTable").getElementsByTagName("thead")[0].textContent = "";
        document.getElementById("mainTable").getElementsByTagName("tbody")[0].textContent = "";
        createTable();
    }
}

function resetToSheetSettings(settings, action) {
    document.getElementById("mainTable").getElementsByTagName("thead")[0].textContent = "";
    document.getElementById("mainTable").getElementsByTagName("tbody")[0].textContent = "";

    createTable(settings, action);
}

function addOnblurForSettings(node) {
    node.onblur = function(e) {
        saveSettings();
        updateLastRowDelete();
        calculateScores();
    };
}

//find the last Base td to add the delete controls
function updateLastRowDelete() {
    var lastTd = document.getElementById("mainTable").getElementsByTagName("tbody")[0].lastChild.previousSibling.firstChild;
    if (lastTd.innerText != "1") {
        lastTd.innerHTML = `<div style="position: relative;left: 0;margin: 0 auto -40 auto;text-align: center;padding-top: 13px;height: 70px;width: 90px;font-size: 25px">${lastTd.innerText}<img src="images/trash.svg" style="position: absolute; top: -13; left: 9; width: 80%; height: 80%;"></div>`
        lastTd.setAttribute("onclick", "confirmDeleteRow();");
        lastTd.className = "last_base_td";
    }
}

function calculateScores() {
    var columnCount = document.getElementById("mainTable").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td").length - 1;
    var score = 0;
    for (let j = 0; j < columnCount; j++) {
        var trs = document.getElementById("mainTable").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
        for (let i = 0; i < trs.length - 1; i++) {
            //console.log(`input-${j}-${i}`);
            let curInput = document.getElementById(`input-${j}-${i}`);
            if (curInput.value) {
                score = score + Number(curInput.value);
                //console.log(score);
            }
        }
        let totalInput = document.getElementById(`TotalInput-${j}`);
        //console.log(`TotalInput-${j}`);
        totalInput.value = score;
        score = 0;
        //console.log("reset count");

        if (totalInput.value == 'NaN') {
            totalInput.value = "#error"
        }
    }

}

function addPlayer() {
    let numPlayers = sheetSettings.players.length;
    let newPlayer = { name: `Player ${numPlayers + 1}`, color: "#171717", scores: [] };
    sheetSettings.players.push(newPlayer);
    localStorage.setItem("sheetSettings", JSON.stringify(sheetSettings));
    resetToSheetSettings(sheetSettings, "addPlayer");
    document.getElementById("addColBar").scrollIntoView({ inline: 'start',  behavior: 'smooth' });
}

function addRow() {
    sheetSettings.rows++
    localStorage.setItem("sheetSettings", JSON.stringify(sheetSettings));
    resetToSheetSettings(sheetSettings, "addRow");
    document.getElementById("Total-Corner").scrollIntoView({ block: 'start',  behavior: 'smooth' });

}

function deletePlayer(element) {
    let player = element.value;
    //console.log(player);
    sheetSettings.players = sheetSettings.players.filter(function( obj ) {
        return obj.name !== player;
    });
    sheetSettings = fixPlayerScoreIds(sheetSettings);
    localStorage.setItem("sheetSettings", JSON.stringify(sheetSettings));
    resetToSheetSettings(sheetSettings, "deletePlayer");
}

function deleteRow() {
    document.getElementById("mainTable").getElementsByTagName("tbody")[0].lastChild.previousSibling.remove(); //delete last tr
    saveSettings();
    updateLastRowDelete();
    calculateScores();
    document.getElementById("Total-Corner").scrollIntoView({ block: 'start',  behavior: 'smooth' });
}

function confirmDeleteRow() {
    var lastTd = document.getElementById("mainTable").getElementsByTagName("tbody")[0].lastChild.previousSibling.firstChild;
    var html = lastTd.innerHTML;
    lastTd.innerText = "delete?";
    lastTd.setAttribute("onclick", "deleteRow();");
    setTimeout(function() {
        lastTd.innerHTML = html;
        lastTd.setAttribute("onclick", "confirmDeleteRow();");
    }, 1500);
}

//this adjusts player score id's in the settings json for when a player is removed
function fixPlayerScoreIds(settings) {
    let players = settings.players;
    for (let i = 0; i < players.length; i++) {
        let scores = players[i].scores;
        for (let j = 0; j < scores.length; j++) {
            scores[j].id = scores[j].id.replace(/^\d+/, i);
        }
    }
    return settings
}

function sortScores(lowOrHigh) {
    saveSettings();
    resetToSheetSettings(sheetSettings);

    var inputs = document.getElementsByClassName("total_score");
    let players = [];
    for (let i = 0; i < inputs.length; i++) {
        players.push({"player": inputs[i].getAttribute("player"), score: Number(inputs[i].value), color: sheetSettings.players[i].color });
    }
    
    if (lowOrHigh == "LowHigh") {
        players.sort(sortLowHigh);
    } else {
        players.sort(sortHighLow);
    }

    //console.log(players);
    createSortedScoresModal(players);
}

function sortLowHigh( a, b ) {
    if ( a.score < b.score ){
        return -1;
    }
    if ( a.score > b.score ){
        return 1;
    }
    return 0;
}

function sortHighLow( a, b ) {
    if ( a.score < b.score ){
        return 1;
    }
    if ( a.score > b.score ){
        return -1;
    }
    return 0;
}

function createSortedScoresModal(players) {
    let modal = document.getElementById("sortedScoresModal");
    modal.innerText = "";

    let sortInputsEl = document.createElement("div");
    sortInputsEl.id = "SortInputs";

    for (let i = 0; i < players.length; i++) {
        let div = document.createElement("div");
        div.style = "display: flex;";
        let inputName = document.createElement("input");
        inputName.className = "SortedPlayerName";
        inputName.value = players[i].player;
        inputName.setAttribute("readonly", "");
        inputName.style.backgroundColor = players[i].color;
        div.appendChild(inputName);
        let sortedScoreInput = document.createElement("input");
        sortedScoreInput.className = "sortedScoreInput";
        console.log(players[i].score)
        //check for invalid "NaN" values
        if (players[i].score.toString() == 'NaN') {
            sortedScoreInput.value = "Not a number";
        } else {
            sortedScoreInput.value = players[i].score;
        }
        sortedScoreInput. setAttribute("readonly", "");
        sortedScoreInput.style.backgroundColor = players[i].color;
        div.appendChild(sortedScoreInput);
        sortInputsEl.appendChild(div);
    }

    modal.appendChild(sortInputsEl);

    let highLowHTML = `<button id="SortLowHigh" onclick="sortScores('LowHigh')" style="padding: 33px;"><img src="images/sort_low_high.png" height="90px"></button>`;
    modal.insertAdjacentHTML( 'beforeend', highLowHTML );

    let button = document.createElement("button");
    button.id = "CloseModal";
    button.setAttribute("onclick", "hideSortedScoresModal()");
    button.innerText = "Close";
    modal.appendChild(button);

    let lowHighHTML = `<button id="SortHighLow" onclick="sortScores('HighLow')" style="padding: 33px;"><img src="images/sort_high_low.png" height="90px"/></button>`;
    modal.insertAdjacentHTML( 'beforeend', lowHighHTML );

    document.getElementById("modalBackdrop").style = "display: block;";
    document.getElementById("tableContainer").style = "overflow: hidden;"

    if (players.length <= 7) {
        modal.style = "display: block; /*zoom: 1.2;*/"
    } else {
        modal.style = "display: block; /*zoom: 1;*/"
    }

    document.body.style = "overflow: hidden; height: 100%;";
}

function hideSortedScoresModal(players) {
    //hide everything
    document.getElementById("modalBackdrop").style = "display: none;";
    document.getElementById("sortedScoresModal").style = "display: none;";
    document.body.style = "overflow: visible; height: auto;";
    document.getElementById("tableContainer").style = "overflow: visible;"
    //remove the content
    let modal = document.getElementById("sortedScoresModal");
    modal.innerText = "";
}

function expandContract() {
    const el = document.getElementById("expand-contract");
    el.classList.toggle('expanded');
    el.classList.toggle('collapsed');
    const arrow = document.getElementById("arrow");
    arrow.classList.toggle('expanded');
    arrow.classList.toggle('collapsed');
}

//this function is called from the jscolor-mod.js library that I modified
function applyPlayerColor(playerElement, color) {
    playerElement.blur(); //kick user out of input so that the .value is set correctly
    let playerName = playerElement.value;
    let inputId = playerElement.id;
    //console.log(color);
    if (!color) {
        color = playerElement.getAttribute("data-current-color");
    }
    let playerJsonIndex = Number(inputId.split('-').pop());

    sheetSettings.players[playerJsonIndex].color = color;
    let playerScores = sheetSettings.players[playerJsonIndex].scores;

    for (let i = 0; i < playerScores.length; i++) {
        playerScores[i].color = color;
    }

    resetToSheetSettings(sheetSettings);
}

//todo: fix phone dark mode colors (not yet working)
function checkForCustomCSS() {
    var currentBGColor = getComputedStyle(document.body)["background-color"];
    if (currentBGColor != 'rgb(62, 62, 62)') {
        alert("custom css is being injected");
        //document.body.style.backgroundColor = "white !important"
    }
}

//todo: apply colors to player name?

function addPlayerJsonAnimation(sheetSettings) {
    let lastPlayer = sheetSettings.players[sheetSettings.players.length-1];
    lastPlayer.animation = "addPlayer";
}

//determine if touch is enabled for hover effects
function is_touch_enabled() {
    return ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0);
}

function noHoverOnMobile() {
    let css = `#quickActions button:hover {
        background-color: #4f4f4f !important;
    }`

    if (!is_touch_enabled) {
        var style = document.createElement("style");
        style.innerText = css;
        document.head.appendChild(style);
    }
}
const defaultSettings = {
    rows: 10,
    players: [
        { name: "Player 1", color: '#171717', scores: [] },
        { name: "Player 2", color: '#171717', scores: [] },
        { name: "Player 3", color: '#171717', scores: [] },
        { name: "Player 4", color: '#171717', scores: [] }
    ]
}

const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

var sheetSettings = localStorage.getItem("sheetSettings");
if (!sheetSettings) {
    sheetSettings = defaultSettings;
} else {
    sheetSettings = JSON.parse(sheetSettings);
}

var darkModeString = localStorage.getItem('darkMode');
var darkMode = darkModeString === null ? true : darkModeString === 'true';

var activeInput = null;

// Constants
const NAVIGATION_DELAY = 10; // ms - delay for blur handlers to complete
const PICKER_CLOSE_DELAY = 50; // ms - delay after picker closes before navigation
const SELECTION_DELAY = 0; // ms - delay before setting selection range

// Check if color picker is open for an input
function isColorPickerOpen(input) {
    return input.jscolor && typeof jsc !== 'undefined' && jsc.picker && jsc.picker.owner === input.jscolor;
}

// Focus and select all text in an input
function focusAndSelectInput(input) {
    if (input) {
        input.focus();
        setTimeout(function() {
            input.setSelectionRange(0, input.value.length);
        }, SELECTION_DELAY);
    }
}

// Extract color from element (with fallbacks)
function getColorFromElement(element) {
    // Try jscolor instance first (most reliable)
    if (element.jscolor) {
        let color = element.jscolor.toHEXString();
        if (!color.startsWith('#')) {
            color = '#' + color;
        }
        if (color) return color;
    }
    
    // Try stored attribute
    const attrColor = element.getAttribute("data-current-color");
    if (attrColor) return attrColor;
    
    // Try computed background color
    const bgColor = getComputedStyle(element).backgroundColor;
    if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
        const rgb = bgColor.match(/\d+/g);
        if (rgb && rgb.length >= 3) {
            return '#' + rgb.map(x => {
                const hex = parseInt(x).toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            }).join('');
        }
    }
    
    return null;
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

    setDarkMode();

    saveSettings();
    
    // Load game name after table is created
    loadGameName();

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
    // Use commas instead of semicolons as separators
    meta.setAttribute('content',
        `user-scalable=${allowZoom ? '1' : '0'}, ` +
        `width=device-width, ` +
        `initial-scale=0.5, ` +
        `maximum-scale=${allowZoom ? '12' : '0.5'}, ` +
        `minimum-scale=0`
    );

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
        th.id = `BaseCol-${i - 1}`;
        if (i == 0) {
            th.id = "Base-Corner";
            th.setAttribute("style", "border-top-left-radius: 30px;");
            th.setAttribute('onclick', 'toggleDarkMode();');
            toggleDarkModeIcon(th);
        }
        if (i != 0) {
            //create the player name header input rows
            let input = document.createElement("input");
            input.value = players[i - 1].name;
            input.setAttribute("style", `background-color: ${players[i - 1].color};`);
            input.id = `PlayerInput-${i - 1}`
            input.setAttribute("onFocus", "this.setSelectionRange(0, this.value.length)");
            input.addEventListener("keydown", function (e) {
                // Handle Enter, Tab, Shift+Enter, and Shift+Tab
                if (e.key == "Enter" || e.key == "Tab") {
                    const isBackward = e.shiftKey;

                    // Determine target input index (current index is i-1, so next is i, previous is i-2)
                    const currentPlayerIndex = i - 1;
                    let targetIndex;
                    if (isBackward) {
                        targetIndex = currentPlayerIndex - 1;
                        // If going backward from first player, don't navigate
                        if (targetIndex < 0) {
                            return;
                        }
                    } else {
                        targetIndex = i; // Next player index
                    }
                    const targetInputId = `PlayerInput-${targetIndex}`;

                    // Check if color picker is open
                    if (isColorPickerOpen(input)) {
                        // If picker is open, close it and navigate after it closes
                        input._navigateOnKey = true;
                        input._nextInputId = targetInputId;
                        if (input.jscolor && input.jscolor.hide) {
                            input.jscolor.hide();
                        }
                    } else {
                        // Picker not open, handle navigation immediately
                        e.preventDefault();
                        e.stopPropagation();
                        navigateToPlayerInput(input, targetInputId);
                    }
                }
            });

            // Listen for when color picker closes to handle navigation
            input.addEventListener("blur", function (e) {
                if (input._navigateOnKey && !e.relatedTarget) {
                    // Small delay to let applyPlayerColor complete
                    setTimeout(function () {
                        if (input._navigateOnKey) {
                            const nextInputId = input._nextInputId;
                            delete input._navigateOnKey;
                            delete input._nextInputId;
                            navigateToPlayerInput(input, nextInputId);
                        }
                    }, PICKER_CLOSE_DELAY);
                }
            });
            addOnblurForSettings(input);

            // Set up jscolor with onChange callback for real-time color updates
            input.setAttribute("data-jscolor", `{ 
                value: '${players[i - 1].color}',
                onChange: function() {
                    // Apply color in real-time as user adjusts slider
                    if (this.targetElement && this.targetElement.id && this.targetElement.id.startsWith('PlayerInput-')) {
                        // toHEXString() already returns a string with # prefix
                        let currentColor = this.toHEXString();
                        // Ensure it starts with # (in case it doesn't)
                        if (!currentColor.startsWith('#')) {
                            currentColor = '#' + currentColor;
                        }
                        applyPlayerColorRealTime(this.targetElement, currentColor);
                    }
                }
            }`);

            th.appendChild(input);

            //if animation is set, add it to the element
            if (players[i - 1].animation == "addPlayer") {
                th.setAttribute("animation", players[i - 1].animation);
                //th.addEventListener("animationend", function() {this.removeAttribute("animation")}, false);
                document.getElementById("addColBar").setAttribute("animation", players[i - 1].animation);
                document.getElementById("addColBar").addEventListener("animationend", function () { this.removeAttribute("animation") }, false);
            }

            //add all the rest of the input cells
            for (let j = 0; j < rows; j++) {
                td = createScoreInput(i, j, players);

                //if animation is set, add it to the element
                if (players[i - 1].animation == "addPlayer") {
                    td.setAttribute("animation", players[i - 1].animation);
                    td.addEventListener("animationend", function () { this.removeAttribute("animation") }, false);
                }
                table.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[j].appendChild(td);
            }
            if (action == "addRow") {
                if (!row.getElementsByTagName("th")[0]) {
                    row.setAttribute("animation", "addRow");
                    row.addEventListener("animationend", function () { this.removeAttribute("animation") }, false);
                }
            }
        }
        row.appendChild(th);
    }
    table.getElementsByTagName("thead")[0].appendChild(row);
    jscolor.install();
    fixHeaderColors();
}

// Helper function to navigate to a player input (forward or backward)
function navigateToPlayerInput(currentInput, targetInputId) {
    const targetInput = document.getElementById(targetInputId);

    if (targetInput) {
        // Use a small timeout to ensure blur handlers complete
        setTimeout(function () {
            const targetInput = document.getElementById(targetInputId);
            if (targetInput) {
                focusAndSelectInput(targetInput);

                // Open jscolor picker if available (like clicking does)
                if (targetInput.jscolor && targetInput.jscolor.showOnClick && !targetInput.disabled) {
                    targetInput.jscolor.show();
                }
            }
        }, NAVIGATION_DELAY);
    } else {
        // Only add player if navigating forward (not backward) and target doesn't exist
        const currentIndex = parseInt(currentInput.id.split('-').pop());
        const targetIndex = parseInt(targetInputId.split('-').pop());
        if (targetIndex > currentIndex) {
            addPlayer();
        }
    }
}

//this is here to resolve the header colors that are overwritten when "jscolor.install()" is ran
function fixHeaderColors() {
    let players = sheetSettings.players;
    for (let i = 0; i < players.length; i++) {
        let input = document.getElementById(`PlayerInput-${i}`);
        input.style = `background-color: ${sheetSettings.players[i].color}`;
        input.setAttribute("data-current-color", sheetSettings.players[i].color);
    }
}

function createScoreInput(i, j, players) {
    let td = document.createElement("td");
    td.id = `${i - 1}-${j}`;
    let input1 = document.createElement("input");
    input1.id = `input-${i - 1}-${j}`;
    input1.setAttribute("style", `background-color: ${players[i - 1].color};`);
    input1.setAttribute("inputmode", "decimal");

    // Add Enter/Tab key handler for navigation (forward and backward)
    input1.addEventListener("keydown", function (e) {
        if (e.key == "Enter" || e.key == "Tab") {
            const isBackward = e.shiftKey;
            input1.blur();
            
            let targetInputId;
            const currentPlayerIndex = i - 1; // Convert to 0-based
            const currentRowIndex = j;
            
            if (isBackward) {
                // Backward navigation
                if (currentPlayerIndex > 0) {
                    // Move to previous column in the same row
                    targetInputId = `input-${currentPlayerIndex - 1}-${currentRowIndex}`;
                } else {
                    // At first column, move to last column of previous row
                    const lastPlayerIndex = players.length - 1;
                    const prevRowIndex = currentRowIndex - 1;
                    if (prevRowIndex >= 0) {
                        targetInputId = `input-${lastPlayerIndex}-${prevRowIndex}`;
                    } else {
                        // At first row and first column, don't navigate
                        return;
                    }
                }
            } else {
                // Forward navigation
                const nextPlayerIndex = i; // Next player index (1-based)
                targetInputId = `input-${nextPlayerIndex}-${currentRowIndex}`;
                let targetInput = document.getElementById(targetInputId);
                
                if (targetInput) {
                    focusAndSelectInput(targetInput);
                    return;
                } else {
                    // If no next column, move to first input in the next row
                    const nextRowIndex = currentRowIndex + 1;
                    targetInputId = `input-0-${nextRowIndex}`;
                }
            }
            
            const targetInput = document.getElementById(targetInputId);
            if (targetInput) {
                focusAndSelectInput(targetInput);
            } else {
                input1.blur();
            }
        }
    });

    addOnblurForSettings(input1);
    td.appendChild(input1);
    return td
}

function createTotalsRow(action) {
    let players = sheetSettings.players;
    let tbody = document.getElementById("mainTable").getElementsByTagName("tbody")[0];
    let tr = document.createElement("tr");
    tr.id = "totals_row";

    for (let i = 0; i < players.length + 1; i++) {
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
        tr.addEventListener("animationend", function () { this.removeAttribute("animation") }, false);
    }
    tbody.appendChild(tr);
}

function createTotalInput(i, td, players) {
    td.id = `Total-${i - 1}`;

    //if animation is set, add it to the element
    if (players[i - 1].animation) {
        td.setAttribute("animation", players[i - 1].animation);
        td.addEventListener("animationend", function () { this.removeAttribute("animation") }, false);
    }

    let input = document.createElement("input");
    input.id = `TotalInput-${i - 1}`;
    input.className = "total_score";
    input.setAttribute("player", players[i - 1].name);
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
            players.push({ name: input.value, color: hexColor, scores: [] })
        }
    }

    for (let i = 0; i < players.length; i++) {
        let trs = document.getElementById("mainTable").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
        for (let j = 0; j < trs.length - 1; j++) {
            let td = trs[j].getElementsByTagName("td")[i + 1];
            let input = td.getElementsByTagName("input")[0];
            if (input) {
                let hexColor = rgb2hex(input.style.backgroundColor);
                players[i].scores.push({ id: td.id, val: input.value, color: hexColor })
            }
        }
    }
    set.players = players;
    
    // Save game name if input exists and has a value
    const gameNameInput = document.getElementById('gameNameInput');
    if (gameNameInput && gameNameInput.value) {
        set.gameName = gameNameInput.value;
    } else if (sheetSettings && sheetSettings.gameName) {
        // Preserve gameName from existing settings if input is empty (e.g., on page load before loadGameName runs)
        set.gameName = sheetSettings.gameName;
    } else {
        set.gameName = '';
    }
    
    // Preserve gameId from existing settings (important for tracking which game is currently open)
    if (sheetSettings && sheetSettings.gameId) {
        set.gameId = sheetSettings.gameId;
    }

    sheetSettings = set;
    localStorage.setItem("sheetSettings", JSON.stringify(set));
}

// Load game name from settings
function loadGameName() {
    const gameNameInput = document.getElementById('gameNameInput');
    
    // Re-read from localStorage to get the latest value (in case it was updated)
    const currentSettings = JSON.parse(localStorage.getItem('sheetSettings') || '{}');
    
    if (gameNameInput && currentSettings && currentSettings.gameName) {
        gameNameInput.value = currentSettings.gameName;
    } else if (gameNameInput) {
        // Clear the input if there's no game name
        gameNameInput.value = '';
    }
}

// Update game name in settings
function updateGameName() {
    saveSettings();
}

async function resetSheetToDefault() {
    const isSignedIn = window.currentUser !== null;
    if (confirm(`Are you sure you want to reset the sheet? ${isSignedIn ? 'Your current game will be saved to history.' : ''}`)) {
        // Save current game to history before resetting
        // First, save current settings to ensure we have the latest data
        saveSettings();

        // Wait for save to complete before resetting
        if (window.saveGameHistory && isSignedIn) {
            try {
                await window.saveGameHistory();
            } catch (err) {
                console.error('Error in saveGameHistory promise:', err);
            }
        }

        sheetSettings = JSON.parse(JSON.stringify(defaultSettings)); //this is super weird, but if I don't stringify and parse, the defaultSettings const somehow changes
        // Clear gameId when resetting so it doesn't try to update an old game
        delete sheetSettings.gameId;
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

// Make resetToSheetSettings available globally for firebase-auth.js
window.resetToSheetSettings = resetToSheetSettings;

function addOnblurForSettings(node) {
    node.onblur = function (e) {
        //console.log('onblur fired for:', node.id, 'relatedTarget:', e.relatedTarget ? e.relatedTarget.id : 'none');
        saveSettings();
        updateLastRowDelete();
        calculateScores();
        //console.log('onblur completed for:', node.id, 'activeElement now:', document.activeElement ? document.activeElement.id : 'none');
    };
}

//find the last Base td to add the delete controls
function updateLastRowDelete() {
    var lastTd = document.getElementById("mainTable").getElementsByTagName("tbody")[0].lastChild.previousSibling.firstChild;
    if (lastTd.innerText != "1") {
        lastTd.innerHTML = `<div style="position: relative;left: 0;margin: 0 auto -40 auto;text-align: center;padding-top: 13px;height: 70px;width: 90px;font-size: 25px">${lastTd.innerText}<img src="images/trash.svg" id="trashIcon" style="position: absolute; top: -13; left: 9; width: 80%; height: 80%;"></div>`
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
    let newPlayer = { name: `Player ${numPlayers + 1}`, color: `${darkMode ? '#171717' : '#c3c3c3'}`, scores: [] };
    sheetSettings.players.push(newPlayer);
    localStorage.setItem("sheetSettings", JSON.stringify(sheetSettings));
    resetToSheetSettings(sheetSettings, "addPlayer");
    window.scrollTo({ left: document.body.scrollWidth, behavior: 'smooth' });
    let inputElement = document.getElementById(`PlayerInput-${numPlayers}`);
    inputElement.focus();
    inputElement.setSelectionRange(0, inputElement.value.length);
}

function addRow() {
    sheetSettings.rows++
    localStorage.setItem("sheetSettings", JSON.stringify(sheetSettings));
    resetToSheetSettings(sheetSettings, "addRow");
    document.getElementById("Total-Corner").scrollIntoView({ block: 'start', behavior: 'smooth' });

}

function deletePlayer(element) {
    let player = element.value;
    //console.log(player);
    sheetSettings.players = sheetSettings.players.filter(function (obj) {
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
    document.getElementById("Total-Corner").scrollIntoView({ block: 'start', behavior: 'smooth' });
}

function confirmDeleteRow() {
    var lastTd = document.getElementById("mainTable").getElementsByTagName("tbody")[0].lastChild.previousSibling.firstChild;
    var html = lastTd.innerHTML;
    lastTd.innerText = "delete?";
    lastTd.setAttribute("onclick", "deleteRow();");
    setTimeout(function () {
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
        players.push({ "player": inputs[i].getAttribute("player"), score: Number(inputs[i].value), color: sheetSettings.players[i].color });
    }

    if (lowOrHigh == "LowHigh") {
        players.sort(sortLowHigh);
    } else {
        players.sort(sortHighLow);
    }

    //console.log(players);
    createSortedScoresModal(players);
}

function sortLowHigh(a, b) {
    if (a.score < b.score) {
        return -1;
    }
    if (a.score > b.score) {
        return 1;
    }
    return 0;
}

function sortHighLow(a, b) {
    if (a.score < b.score) {
        return 1;
    }
    if (a.score > b.score) {
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
        //console.log(players[i].score)
        //check for invalid "NaN" values
        if (players[i].score.toString() == 'NaN') {
            sortedScoreInput.value = "Not a number";
        } else {
            sortedScoreInput.value = players[i].score;
        }
        sortedScoreInput.setAttribute("readonly", "");
        sortedScoreInput.style.backgroundColor = players[i].color;
        div.appendChild(sortedScoreInput);
        sortInputsEl.appendChild(div);
    }

    modal.appendChild(sortInputsEl);

    let highLowHTML = `<button id="SortLowHigh" onclick="sortScores('LowHigh')" style="padding: 33px;"><img src="images/sort_low_high.png" height="90px"></button>`;
    modal.insertAdjacentHTML('beforeend', highLowHTML);

    let button = document.createElement("button");
    button.id = "CloseModal";
    button.setAttribute("onclick", "hideSortedScoresModal()");
    button.innerText = "Close";
    modal.appendChild(button);

    let lowHighHTML = `<button id="SortHighLow" onclick="sortScores('HighLow')" style="padding: 33px;"><img src="images/sort_high_low.png" height="90px"/></button>`;
    modal.insertAdjacentHTML('beforeend', lowHighHTML);

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

// Real-time color update function (doesn't reset table, just updates DOM)
function applyPlayerColorRealTime(playerElement, color) {
    let inputId = playerElement.id;
    let playerJsonIndex = Number(inputId.split('-').pop());

    // Update the color in settings
    sheetSettings.players[playerJsonIndex].color = color;
    let playerScores = sheetSettings.players[playerJsonIndex].scores;

    for (let i = 0; i < playerScores.length; i++) {
        playerScores[i].color = color;
    }

    // Update the DOM directly without resetting the table
    // This allows real-time updates while using the slider
    updatePlayerColorInDOM(playerJsonIndex, color);
}

// Update player color in DOM without resetting the entire table
function updatePlayerColorInDOM(playerIndex, color) {
    // Update the player name input background
    const playerInput = document.getElementById(`PlayerInput-${playerIndex}`);
    if (playerInput) {
        playerInput.style.backgroundColor = color;
    }

    // Update all score inputs for this player
    const tbody = document.getElementById("mainTable").getElementsByTagName("tbody")[0];
    if (tbody) {
        const rows = tbody.getElementsByTagName("tr");
        let updatedCount = 0;
        for (let j = 0; j < rows.length - 1; j++) { // -1 to exclude totals row
            const td = rows[j].getElementsByTagName("td")[playerIndex + 1];
            if (td) {
                const scoreInput = td.getElementsByTagName("input")[0];
                if (scoreInput) {
                    scoreInput.style.backgroundColor = color;
                    updatedCount++;
                }
            }
        }
    }
}

//this function is called from the jscolor-mod.js library that I modified
function applyPlayerColor(playerElement, color) {
    playerElement.blur(); //kick user out of input so that the .value is set correctly
    let inputId = playerElement.id;

    // Get color from element if not provided
    if (!color) {
        color = getColorFromElement(playerElement);
    }

    if (!color) return;

    let playerJsonIndex = Number(inputId.split('-').pop());

    sheetSettings.players[playerJsonIndex].color = color;
    let playerScores = sheetSettings.players[playerJsonIndex].scores;

    for (let i = 0; i < playerScores.length; i++) {
        playerScores[i].color = color;
    }

    // Save to localStorage
    localStorage.setItem("sheetSettings", JSON.stringify(sheetSettings));

    resetToSheetSettings(sheetSettings);
}

function fixInputColors() {
    const inputs = document.querySelectorAll('#tableContainer input');
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        const currentColor = getComputedStyle(input).backgroundColor;
        if (currentColor === 'rgb(23, 23, 23)' || currentColor === 'rgb(195, 195, 195)') {
            input.style.backgroundColor = `${darkMode ? '#171717' : '#c3c3c3'}`;
        }
    }
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
    let lastPlayer = sheetSettings.players[sheetSettings.players.length - 1];
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

function toggleDarkMode() {
    darkMode = !darkMode;
    localStorage.setItem('darkMode', darkMode);
    setDarkMode();
}

function setDarkMode() {
    fixInputColors();
    let trashIcon = document.getElementById("trashIcon");
    let currentStyle = trashIcon.getAttribute("style");
    trashIcon.setAttribute("style", `${currentStyle} filter: ${!darkMode ? "invert(100%)" : "none"};`);
    toggleDarkModeIcon(document.getElementById('Base-Corner'));
    document.body.className = darkMode ? "" : "lightMode";
}

function toggleDarkModeIcon(element) {
    let img = element.getElementsByTagName('img')[0];
    if (!img) img = document.createElement("img");
    img.src = !darkMode ? "images/moon.svg" : "images/sun.svg";
    img.id = "darkModeButton";
    element.appendChild(img);
}

// Detect iOS devices
function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

// Adjust button positions for iOS keyboard
// Account for iOS viewport quirks with body height and padding
function adjustButtonsForIOSKeyboard() {
    if (!isIOS()) return;

    const negativeButton = document.getElementById('negativeButton');
    const quickActions = document.getElementById('quickActions');

    if (!negativeButton || !quickActions) return;

    const padding = 15; // 15px padding from keyboard
    const root = document.documentElement;

    // Use Visual Viewport API if available
    if (window.visualViewport) {
        function updateButtonPositions() {
            const viewport = window.visualViewport;
            const viewportHeight = viewport.height;
            const windowHeight = window.innerHeight;

            // Calculate keyboard height
            const keyboardHeight = windowHeight - viewportHeight;

            if (keyboardHeight > 150) {
                // Keyboard is visible
                // Use the visual viewport's actual position
                // offsetTop tells us where the visual viewport is relative to layout viewport
                // The bottom of visual viewport from layout bottom: windowHeight - (offsetTop + viewportHeight)
                const visualViewportBottom = windowHeight - (viewport.offsetTop + viewportHeight);

                // Position buttons above keyboard
                // If calculation gives negative or very small value, use keyboard height directly
                let bottomOffset;
                if (visualViewportBottom < 0 || visualViewportBottom < keyboardHeight * 0.5) {
                    // Calculation seems off (likely at bottom of page with extra iOS space)
                    // Use keyboard height directly
                    bottomOffset = keyboardHeight + padding;
                } else {
                    // Normal case - use visual viewport calculation
                    bottomOffset = visualViewportBottom + padding;
                }

                root.style.setProperty('--ios-keyboard-offset', bottomOffset + 'px');
            } else {
                // Keyboard is hidden - reset to default
                root.style.setProperty('--ios-keyboard-offset', padding + 'px');
            }
        }

        // Update on resize (keyboard show/hide) and scroll (viewport movement)
        window.visualViewport.addEventListener('resize', updateButtonPositions);
        window.visualViewport.addEventListener('scroll', updateButtonPositions);

        // Initial update
        updateButtonPositions();
    } else {
        // Fallback: detect input focus/blur and estimate keyboard height
        let keyboardVisible = false;
        const estimatedKeyboardHeight = 350;

        document.addEventListener('focusin', function (e) {
            if (e.target.tagName === 'INPUT' && !e.target.hasAttribute('readonly')) {
                if (!keyboardVisible) {
                    keyboardVisible = true;
                    root.style.setProperty('--ios-keyboard-offset', (estimatedKeyboardHeight + padding) + 'px');
                }
            }
        }, true);

        document.addEventListener('focusout', function (e) {
            if (e.target.tagName === 'INPUT') {
                // Delay to check if focus moved to another input
                setTimeout(function () {
                    const focusedElement = document.activeElement;
                    if (focusedElement.tagName !== 'INPUT' || focusedElement.hasAttribute('readonly')) {
                        if (keyboardVisible) {
                            keyboardVisible = false;
                            root.style.setProperty('--ios-keyboard-offset', padding + 'px');
                        }
                    }
                }, 300);
            }
        }, true);
    }
}

// Set up negative button once when page loads
function setupNegativeButton() {
    // Use event delegation on tableContainer to handle all inputs (including dynamically created ones)
    const tableContainer = document.getElementById('tableContainer');
    const negativeButton = document.getElementById('negativeButton');

    if (!tableContainer || !negativeButton) {
        // If elements don't exist yet, try again after a short delay
        setTimeout(setupNegativeButton, 100);
        return;
    }

    // Focus event delegation - only set up once
    if (!tableContainer.hasAttribute('data-negative-button-setup')) {
        tableContainer.setAttribute('data-negative-button-setup', 'true');

        tableContainer.addEventListener('focusin', function (e) {
            const input = e.target;
            // Only handle input elements that are not readonly
            if (input.tagName === 'INPUT' && !input.hasAttribute('readonly')) {
                //console.log('focusin fired for:', input.id);
                activeInput = input;
                negativeButton.style.display = 'flex';
            }
        }, true); // Use capture phase

        // Blur event delegation
        tableContainer.addEventListener('focusout', function (e) {
            const input = e.target;
            if (input.tagName === 'INPUT' && !input.hasAttribute('readonly')) {
                //console.log('focusout fired for:', input.id, 'relatedTarget:', e.relatedTarget ? e.relatedTarget.id : 'none');
                // Use setTimeout to allow click event on button to fire before hiding
                setTimeout(function () {
                    // Check if focus moved to another input
                    const focusedElement = document.activeElement;
                    //console.log('focusout timeout, activeElement:', focusedElement ? focusedElement.id : 'none');
                    if (focusedElement.tagName !== 'INPUT' || !focusedElement.closest('#tableContainer') || focusedElement.hasAttribute('readonly')) {
                        negativeButton.style.display = 'none';
                        activeInput = null;
                    } else {
                        // Update activeInput if focus moved to another input
                        activeInput = focusedElement;
                    }
                }, 150);
            }
        }, true); // Use capture phase
    }

    // Set up iOS keyboard handling
    adjustButtonsForIOSKeyboard();
}

// Initialize negative button setup when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupNegativeButton);
} else {
    // DOM is already ready
    setupNegativeButton();
}

function insertNegative() {
    if (activeInput) {
        const input = activeInput;
        const start = input.selectionStart;
        const end = input.selectionEnd;
        const value = input.value;

        // Insert "-" at cursor position
        const newValue = value.substring(0, start) + '-' + value.substring(end);
        input.value = newValue;

        // Set cursor position after the inserted "-"
        input.setSelectionRange(start + 1, start + 1);

        // Trigger input event to ensure any listeners are notified
        input.dispatchEvent(new Event('input', { bubbles: true }));

        // Refocus the input
        input.focus();
    }
}
// Firebase Authentication and Game History Functions

import { 
    signInWithPopup, 
    GoogleAuthProvider, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { 
    collection,
    addDoc, 
    query, 
    where, 
    getDocs, 
    orderBy, 
    limit,
    doc,
    getDoc,
    deleteDoc
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

let currentUser = null;

// Show sign in modal
function showSignInModal() {
    const authContainer = document.getElementById('authContainer');
    if (authContainer) {
        authContainer.style.display = 'flex';
        document.getElementById('emailInput').value = '';
        document.getElementById('passwordInput').value = '';
        document.getElementById('authStatus').textContent = '';
    }
}

// Check if error is a quota/limit error
function isQuotaError(error) {
    const quotaErrorCodes = ['resource-exhausted', 'quota-exceeded', 'permission-denied'];
    return quotaErrorCodes.includes(error.code) || 
           error.message.toLowerCase().includes('quota') ||
           error.message.toLowerCase().includes('limit') ||
           error.message.toLowerCase().includes('exceeded');
}

// Show quota warning (only if user is signed in)
function showQuotaWarning() {
    if (currentUser) {
        const quotaWarning = document.getElementById('quotaWarning');
        if (quotaWarning) {
            quotaWarning.style.display = 'block';
        }
    }
}

// Hide quota warning
function hideQuotaWarning() {
    const quotaWarning = document.getElementById('quotaWarning');
    if (quotaWarning) {
        quotaWarning.style.display = 'none';
    }
}

// Initialize auth state listener
function initAuthListener() {
    if (window.firebaseAuth) {
        onAuthStateChanged(window.firebaseAuth, (user) => {
            currentUser = user;
            if (user) {
                const authContainer = document.getElementById('authContainer');
                const historyButton = document.getElementById('gameHistoryButton');
                const signInButton = document.getElementById('signInButton');
                if (authContainer) authContainer.style.display = 'none';
                if (historyButton) historyButton.style.display = 'block';
                if (signInButton) signInButton.style.display = 'none';
            } else {
                const historyButton = document.getElementById('gameHistoryButton');
                const signInButton = document.getElementById('signInButton');
                if (historyButton) historyButton.style.display = 'none';
                if (signInButton) signInButton.style.display = 'block';
                hideQuotaWarning();
            }
        });
    } else {
        setTimeout(initAuthListener, 100);
    }
}

// Start listening when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthListener);
} else {
    initAuthListener();
}

// Sign in with Google
async function signInWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(window.firebaseAuth, provider);
        document.getElementById('authStatus').textContent = 'Signed in successfully!';
    } catch (error) {
        document.getElementById('authStatus').textContent = 'Error: ' + error.message;
    }
}

// Sign in with email
async function signInWithEmail() {
    try {
        const email = document.getElementById('emailInput').value.trim();
        const password = document.getElementById('passwordInput').value;
        
        if (!email) {
            document.getElementById('authStatus').textContent = 'Please enter an email address.';
            return;
        }
        if (!password) {
            document.getElementById('authStatus').textContent = 'Please enter a password.';
            return;
        }
        
        document.getElementById('authStatus').textContent = 'Signing in...';
        await signInWithEmailAndPassword(window.firebaseAuth, email, password);
        document.getElementById('authStatus').textContent = 'Signed in successfully!';
    } catch (error) {
        let errorMessage = 'Error: ' + error.message;
        if (error.code === 'auth/user-not-found') {
            errorMessage = 'No account found with this email. Try creating an account instead.';
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'Incorrect password. Please try again.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Please enter a valid email address.';
        } else if (error.code === 'auth/invalid-credential') {
            errorMessage = 'Invalid email or password. Please try again.';
        }
        document.getElementById('authStatus').textContent = errorMessage;
    }
}

// Sign up with email
async function signUpWithEmail() {
    try {
        const email = document.getElementById('emailInput').value.trim();
        const password = document.getElementById('passwordInput').value;
        
        if (!email) {
            document.getElementById('authStatus').textContent = 'Please enter an email address.';
            return;
        }
        if (!password || password.length < 6) {
            document.getElementById('authStatus').textContent = 'Password must be at least 6 characters.';
            return;
        }
        
        document.getElementById('authStatus').textContent = 'Creating account...';
        await createUserWithEmailAndPassword(window.firebaseAuth, email, password);
        document.getElementById('authStatus').textContent = 'Account created! Signed in.';
    } catch (error) {
        let errorMessage = 'Error: ' + error.message;
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'This email is already registered. Try signing in instead.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Please enter a valid email address.';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'Password is too weak. Please use at least 6 characters.';
        }
        document.getElementById('authStatus').textContent = errorMessage;
    }
}

// Calculate player total score
function calculatePlayerTotal(player) {
    let total = 0;
    if (player.scores && Array.isArray(player.scores)) {
        for (let i = 0; i < player.scores.length; i++) {
            const val = parseFloat(player.scores[i].val);
            if (!isNaN(val)) {
                total += val;
            }
        }
    }
    return total;
}

// Save game history to Firestore
async function saveGameHistory() {
    if (!currentUser) {
        document.getElementById('authContainer').style.display = 'flex';
        return false;
    }
    
    try {
        const currentSettings = JSON.parse(localStorage.getItem("sheetSettings") || JSON.stringify(sheetSettings));
        const { Timestamp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        
        const gameData = {
            userId: currentUser.uid,
            timestamp: Timestamp.now(),
            sheetSettings: currentSettings,
            players: currentSettings.players.map(p => ({
                name: p.name,
                color: p.color,
                totalScore: calculatePlayerTotal(p)
            }))
        };
        
        await addDoc(collection(window.firebaseDb, 'gameHistory'), gameData);
        hideQuotaWarning();
        return true;
    } catch (error) {
        if (isQuotaError(error)) {
            showQuotaWarning();
        }
        return false;
    }
}

// Load game history from Firestore
async function loadGameHistory() {
    if (!currentUser) {
        document.getElementById('authContainer').style.display = 'flex';
        return;
    }
    
    try {
        const q = query(
            collection(window.firebaseDb, 'gameHistory'),
            where('userId', '==', currentUser.uid),
            orderBy('timestamp', 'desc'),
            limit(50)
        );
        
        const querySnapshot = await getDocs(q);
        const games = [];
        
        querySnapshot.forEach((doc) => {
            games.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        hideQuotaWarning();
        return games;
    } catch (error) {
        if (isQuotaError(error)) {
            showQuotaWarning();
        }
        return [];
    }
}

// Show game history modal
async function showGameHistory() {
    const games = await loadGameHistory();
    const historyList = document.getElementById('gameHistoryList');
    
    historyList.innerHTML = '';
    
    if (games.length === 0) {
        const noGames = document.createElement('p');
        noGames.textContent = 'No game history found.';
        historyList.appendChild(noGames);
    } else {
        const container = document.createElement('div');
        container.className = 'game-history-container';
        
        games.forEach((game) => {
            // Handle Firestore timestamp
            let gameDate;
            if (game.timestamp && game.timestamp.seconds) {
                gameDate = new Date(game.timestamp.seconds * 1000);
            } else if (game.timestamp && game.timestamp.toDate) {
                gameDate = game.timestamp.toDate();
            } else {
                gameDate = new Date(game.timestamp);
            }
            
            // Format date: "today", "yesterday", or formatted date
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const gameDateOnly = new Date(gameDate);
            gameDateOnly.setHours(0, 0, 0, 0);
            
            let dateLabel;
            if (gameDateOnly.getTime() === today.getTime()) {
                dateLabel = 'Today';
            } else if (gameDateOnly.getTime() === yesterday.getTime()) {
                dateLabel = 'Yesterday';
            } else {
                dateLabel = gameDate.toLocaleDateString();
            }
            
            // Get time only for display (no date)
            const timestamp = gameDate.toLocaleTimeString();
            
            // Get player data
            let playersToDisplay = [];
            if (game.players && Array.isArray(game.players) && game.players.length > 0) {
                playersToDisplay = game.players;
            } else if (game.sheetSettings && game.sheetSettings.players && Array.isArray(game.sheetSettings.players)) {
                playersToDisplay = game.sheetSettings.players.map(p => {
                    let total = 0;
                    if (p.scores && Array.isArray(p.scores)) {
                        p.scores.forEach(score => {
                            const val = parseFloat(score.val);
                            if (!isNaN(val)) {
                                total += val;
                            }
                        });
                    }
                    return {
                        name: p.name || 'Unknown',
                        color: p.color || '#171717',
                        totalScore: total
                    };
                });
            }
            
            // Create game card
            const card = document.createElement('div');
            card.className = 'game-history-card';
            
            // Top row: date and buttons
            const topRow = document.createElement('div');
            topRow.className = 'game-history-top-row';
            
            const dateDiv = document.createElement('div');
            dateDiv.className = 'game-history-date';
            dateDiv.textContent = `${dateLabel} • ${timestamp}`;
            topRow.appendChild(dateDiv);
            
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'game-history-buttons';
            
            const restoreBtn = document.createElement('button');
            restoreBtn.className = 'game-history-btn-restore';
            restoreBtn.textContent = 'Restore';
            restoreBtn.onclick = () => restoreGame(game.id);
            buttonContainer.appendChild(restoreBtn);
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'game-history-btn-delete';
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => deleteGameFromHistory(game.id);
            buttonContainer.appendChild(deleteBtn);
            
            topRow.appendChild(buttonContainer);
            card.appendChild(topRow);
            
            // Player display
            const playerContainer = document.createElement('div');
            playerContainer.className = 'game-history-players';
            
            playersToDisplay.forEach(p => {
                const playerSpan = document.createElement('span');
                playerSpan.className = 'game-history-player';
                const nameText = document.createTextNode((p.name || 'Unknown') + ': ');
                const scoreStrong = document.createElement('strong');
                scoreStrong.textContent = (p.totalScore !== undefined ? p.totalScore : 0).toString();
                playerSpan.appendChild(nameText);
                playerSpan.appendChild(scoreStrong);
                playerContainer.appendChild(playerSpan);
            });
            
            card.appendChild(playerContainer);
            container.appendChild(card);
        });
        
        historyList.appendChild(container);
    }
    
    document.getElementById('gameHistoryModal').style.display = 'flex';
}

// Restore a game from history
async function restoreGame(gameId) {
    try {
        const gameDoc = await getDoc(doc(window.firebaseDb, 'gameHistory', gameId));
        if (gameDoc.exists()) {
            const gameData = gameDoc.data();
            if (gameData.sheetSettings) {
                sheetSettings = gameData.sheetSettings;
                localStorage.setItem("sheetSettings", JSON.stringify(sheetSettings));
                document.getElementById("mainTable").getElementsByTagName("thead")[0].textContent = "";
                document.getElementById("mainTable").getElementsByTagName("tbody")[0].textContent = "";
                createTable();
                document.getElementById('gameHistoryModal').style.display = 'none';
            }
        }
    } catch (error) {
        alert('Error restoring game: ' + error.message);
    }
}

// Delete a game from history
async function deleteGameFromHistory(gameId) {
    if (!currentUser) {
        alert('You must be signed in to delete games.');
        return;
    }
    
    if (!confirm('Are you sure you want to delete this game from history? This cannot be undone.')) {
        return;
    }
    
    try {
        const gameDoc = await getDoc(doc(window.firebaseDb, 'gameHistory', gameId));
        if (gameDoc.exists()) {
            const gameData = gameDoc.data();
            if (gameData.userId !== currentUser.uid) {
                alert('You can only delete your own games.');
                return;
            }
            
            await deleteDoc(doc(window.firebaseDb, 'gameHistory', gameId));
            await showGameHistory();
        } else {
            alert('Game not found.');
        }
    } catch (error) {
        alert('Error deleting game: ' + error.message);
    }
}

// Sign out user
async function signOutUser() {
    try {
        await signOut(window.firebaseAuth);
        document.getElementById('gameHistoryModal').style.display = 'none';
    } catch (error) {
        alert('Error signing out: ' + error.message);
    }
}

// Make functions globally available
window.signInWithGoogle = signInWithGoogle;
window.signInWithEmail = signInWithEmail;
window.signUpWithEmail = signUpWithEmail;
window.showGameHistory = showGameHistory;
window.restoreGame = restoreGame;
window.deleteGameFromHistory = deleteGameFromHistory;
window.showSignInModal = showSignInModal;
window.saveGameHistory = saveGameHistory;
window.signOutUser = signOutUser;

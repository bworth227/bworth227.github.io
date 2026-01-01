// Firebase Authentication and Game History Functions

import { 
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
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
// Make currentUser accessible globally for index.js
window.currentUser = null;

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

// Track if this is the initial auth state check (to avoid opening modal on page load)
let isInitialAuthCheck = true;

// Initialize auth state listener
function initAuthListener() {
    if (window.firebaseAuth) {
        onAuthStateChanged(window.firebaseAuth, (user) => {
            const wasSignedIn = currentUser !== null;
            currentUser = user;
            window.currentUser = user; // Update global reference
            const isNowSignedIn = user !== null;
            
            if (user) {
                const authContainer = document.getElementById('authContainer');
                const historyButton = document.getElementById('gameHistoryButton');
                const signInButton = document.getElementById('signInButton');
                if (authContainer) authContainer.style.display = 'none';
                if (historyButton) historyButton.style.display = 'block';
                if (signInButton) signInButton.style.display = 'none';
                
                // Update Reset Sheet button text
                updateResetButtonText();
                
                // Only open game history modal if this is a new sign-in (not a page reload)
                // Check if user just signed in (wasn't signed in before, but is now)
                if (!wasSignedIn && isNowSignedIn && !isInitialAuthCheck) {
                    // Use setTimeout to ensure UI is ready
                    setTimeout(() => {
                        if (window.showGameHistory) {
                            window.showGameHistory();
                        }
                    }, 100);
                }
            } else {
                const historyButton = document.getElementById('gameHistoryButton');
                const signInButton = document.getElementById('signInButton');
                if (historyButton) historyButton.style.display = 'none';
                if (signInButton) signInButton.style.display = 'block';
                hideQuotaWarning();
                
                // Update Reset Sheet button text
                updateResetButtonText();
            }
            
            // Mark that we've completed the initial auth check
            isInitialAuthCheck = false;
        });
    } else {
        setTimeout(initAuthListener, 100);
    }
}

// Update Reset Sheet button text based on sign-in status
function updateResetButtonText() {
    const resetButton = document.getElementById('ResetSheet');
    if (resetButton) {
        if (currentUser) {
            resetButton.textContent = 'New Game';
        } else {
            resetButton.textContent = 'Reset Sheet';
        }
    }
}

// Set initial button states (before auth listener fires)
function setInitialButtonStates() {
    const historyButton = document.getElementById('gameHistoryButton');
    const signInButton = document.getElementById('signInButton');
    // Start with sign-in button visible, history button hidden
    if (historyButton) historyButton.style.display = 'none';
    if (signInButton) signInButton.style.display = 'block';
    // Set initial button text
    updateResetButtonText();
}

// Start listening when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async function() {
        setInitialButtonStates();
        await handleRedirectResult();
        initAuthListener();
    });
} else {
    setInitialButtonStates();
    handleRedirectResult().then(() => {
        initAuthListener();
    });
}

// Detect if we're on a local/private IP (redirect won't work, use popup instead)
function isLocalIP() {
    const hostname = window.location.hostname;
    return hostname === 'localhost' || 
           hostname === '127.0.0.1' ||
           /^192\.168\./.test(hostname) ||
           /^10\./.test(hostname) ||
           /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname);
}

// Sign in with Google
async function signInWithGoogle() {
    const googleButton = document.getElementById('signInGoogle');
    if (googleButton) {
        googleButton.disabled = true;
        googleButton.textContent = 'Loading...';
    }
    
    const authStatus = document.getElementById('authStatus');
    
    if (!window.firebaseAuth) {
        const errorMsg = 'Firebase Auth not initialized. Please refresh the page.';
        if (authStatus) {
            authStatus.textContent = errorMsg;
            authStatus.style.color = '#da3737';
        }
        if (googleButton) {
            googleButton.disabled = false;
            googleButton.textContent = 'Sign in with Google';
        }
        return;
    }
    
    if (!authStatus) {
        if (googleButton) {
            googleButton.disabled = false;
            googleButton.textContent = 'Sign in with Google';
        }
        return;
    }
    
    try {
        const provider = new GoogleAuthProvider();
        const isLocal = isLocalIP();
        
        // Try popup for both desktop and mobile (it works on desktop, let's try it on mobile too)
        // Only use redirect if popup fails or is blocked
        if (isLocal) {
            // Local IP: always use popup (redirect won't work)
            authStatus.textContent = 'Opening sign-in window...';
            authStatus.style.color = '#ffffff';
            await signInWithPopup(window.firebaseAuth, provider);
            authStatus.textContent = 'Signed in successfully!';
            authStatus.style.color = '#00CF48';
            if (googleButton) {
                googleButton.disabled = false;
                googleButton.textContent = 'Sign in with Google';
            }
        } else {
            // Public domain: try popup first (works on desktop, might work on mobile too)
            try {
                authStatus.textContent = 'Opening sign-in window...';
                authStatus.style.color = '#ffffff';
                await signInWithPopup(window.firebaseAuth, provider);
                authStatus.textContent = 'Signed in successfully!';
                authStatus.style.color = '#00CF48';
                if (googleButton) {
                    googleButton.disabled = false;
                    googleButton.textContent = 'Sign in with Google';
                }
            } catch (popupError) {
                // If popup fails (blocked or not supported), fall back to redirect
                if (popupError.code === 'auth/popup-blocked' || popupError.code === 'auth/popup-closed-by-user') {
                    authStatus.textContent = 'Redirecting to Google sign-in...';
                    authStatus.style.color = '#ffffff';
                    await signInWithRedirect(window.firebaseAuth, provider);
                } else {
                    // Re-throw other errors
                    throw popupError;
                }
            }
        }
    } catch (error) {
        let errorMessage = 'Error: ' + error.message;
        if (error.code === 'auth/popup-closed-by-user') {
            errorMessage = 'Sign-in was cancelled.';
        } else if (error.code === 'auth/popup-blocked') {
            errorMessage = 'Popup was blocked. Please allow popups for this site.';
        } else if (error.code === 'auth/unauthorized-domain') {
            errorMessage = 'Unauthorized domain. Please add this domain to Firebase Console → Authentication → Settings → Authorized domains.';
        } else if (error.code === 'auth/operation-not-allowed') {
            errorMessage = 'Google sign-in is not enabled. Please enable it in Firebase Console.';
        }
        
        if (authStatus) {
            authStatus.textContent = errorMessage;
            authStatus.style.color = '#da3737';
        }
        
        if (googleButton) {
            googleButton.disabled = false;
            googleButton.textContent = 'Sign in with Google';
        }
    }
}

// Handle redirect result when page loads (fallback for when popup falls back to redirect)
async function handleRedirectResult() {
    // Wait for Firebase Auth to be ready
    let retries = 0;
    const maxRetries = 20;
    while (!window.firebaseAuth && retries < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 100));
        retries++;
    }
    
    if (!window.firebaseAuth) {
        return;
    }
    
    try {
        const result = await getRedirectResult(window.firebaseAuth);
        
        if (result && result.user) {
            currentUser = result.user;
            window.currentUser = result.user; // Update global reference
            const authStatus = document.getElementById('authStatus');
            if (authStatus) {
                authStatus.textContent = 'Signed in successfully!';
                authStatus.style.color = '#00CF48';
            }
            
            // Update UI immediately
            const authContainer = document.getElementById('authContainer');
            const historyButton = document.getElementById('gameHistoryButton');
            const signInButton = document.getElementById('signInButton');
            
            if (authContainer) authContainer.style.display = 'none';
            if (historyButton) historyButton.style.display = 'block';
            if (signInButton) signInButton.style.display = 'none';
        }
    } catch (error) {
        if (error.code === 'auth/unauthorized-domain') {
            const authStatus = document.getElementById('authStatus');
            if (authStatus) {
                authStatus.textContent = 'Unauthorized domain. Please add this domain to Firebase authorized domains.';
                authStatus.style.color = '#da3737';
            }
        }
    }
}

// Sign in with email and password
async function signInWithEmail() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const authStatus = document.getElementById('authStatus');
    
    if (!email || !password) {
        if (authStatus) {
            authStatus.textContent = 'Please enter both email and password.';
            authStatus.style.color = '#da3737';
        }
        return;
    }
    
    if (password.length < 6) {
        if (authStatus) {
            authStatus.textContent = 'Password must be at least 6 characters.';
            authStatus.style.color = '#da3737';
        }
        return;
    }
    
    try {
        await signInWithEmailAndPassword(window.firebaseAuth, email, password);
        if (authStatus) {
            authStatus.textContent = 'Signed in successfully!';
            authStatus.style.color = '#00CF48';
        }
    } catch (error) {
        let errorMessage = 'Error: ' + error.message;
        if (error.code === 'auth/user-not-found') {
            errorMessage = 'No account found with this email.';
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'Incorrect password.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Invalid email address.';
        }
        
        if (authStatus) {
            authStatus.textContent = errorMessage;
            authStatus.style.color = '#da3737';
        }
    }
}

// Create account with email and password
async function signUpWithEmail() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const authStatus = document.getElementById('authStatus');
    
    if (!email || !password) {
        if (authStatus) {
            authStatus.textContent = 'Please enter both email and password.';
            authStatus.style.color = '#da3737';
        }
        return;
    }
    
    if (password.length < 6) {
        if (authStatus) {
            authStatus.textContent = 'Password must be at least 6 characters.';
            authStatus.style.color = '#da3737';
        }
        return;
    }
    
    try {
        await createUserWithEmailAndPassword(window.firebaseAuth, email, password);
        if (authStatus) {
            authStatus.textContent = 'Account created successfully!';
            authStatus.style.color = '#00CF48';
        }
    } catch (error) {
        let errorMessage = 'Error: ' + error.message;
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'An account with this email already exists.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Invalid email address.';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'Password is too weak.';
        }
        
        if (authStatus) {
            authStatus.textContent = errorMessage;
            authStatus.style.color = '#da3737';
        }
    }
}

async function signOutUser() {
    try {
        await signOut(window.firebaseAuth);
        // Close the game history modal after signing out
        const modal = document.getElementById('gameHistoryModal');
        if (modal) {
            modal.style.display = 'none';
        }
    } catch (error) {
        console.error('Sign out error:', error);
    }
}

// Save game history to Firestore
async function saveGameHistory() {
    if (!currentUser) {
        return false;
    }
    
    try {
        const sheetSettings = JSON.parse(localStorage.getItem('sheetSettings') || '{}');
        // Players are stored inside sheetSettings.players, not as a separate key
        const players = sheetSettings.players || [];
        
        const gameData = {
            userId: currentUser.uid,
            timestamp: new Date(),
            sheetSettings: sheetSettings,
            players: players
        };
        
        await addDoc(collection(window.firebaseDb, 'gameHistory'), gameData);
        return true;
    } catch (error) {
        if (isQuotaError(error)) {
            showQuotaWarning();
        }
        console.error('Error saving game history:', error);
        return false;
    }
}

// Load game history from Firestore
async function loadGameHistory() {
    if (!currentUser) {
        return [];
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
        
        return games;
    } catch (error) {
        if (isQuotaError(error)) {
            showQuotaWarning();
        }
        console.error('Error loading game history:', error);
        return [];
    }
}

// Check if current sheet settings are default (no data entered)
function isDefaultSheetSettings() {
    try {
        const sheetSettings = JSON.parse(localStorage.getItem('sheetSettings') || '{}');
        
        // Check if rows is 10 (default)
        if (sheetSettings.rows !== 10) {
            return false;
        }
        
        // Check if we have exactly 4 players (default)
        if (!sheetSettings.players || sheetSettings.players.length !== 4) {
            return false;
        }
        
        // Check if all player names are default and all scores are empty
        const defaultPlayerNames = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];
        for (let i = 0; i < 4; i++) {
            const player = sheetSettings.players[i];
            if (!player) return false;
            
            // Check if player name matches default
            if (player.name !== defaultPlayerNames[i]) {
                return false;
            }
            
            // Check if player has any scores with values
            if (player.scores && player.scores.length > 0) {
                // Check if any score has a non-empty value
                const hasNonEmptyScore = player.scores.some(score => {
                    const val = score.val || score.value || '';
                    return val.toString().trim() !== '';
                });
                if (hasNonEmptyScore) {
                    return false;
                }
            }
        }
        
        return true;
    } catch (error) {
        // If we can't parse or check, assume it's not default to be safe
        return false;
    }
}

// Restore a game from history
async function restoreGame(gameId) {
    if (!currentUser) {
        return;
    }
    
    // Close the modal immediately
    const modal = document.getElementById('gameHistoryModal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    try {
        const gameDoc = await getDoc(doc(window.firebaseDb, 'gameHistory', gameId));
        if (gameDoc.exists()) {
            const gameData = gameDoc.data();
            if (gameData.userId === currentUser.uid) {
                if (gameData.sheetSettings) {
                    // Players are stored inside sheetSettings.players
                    // If we have separate players data (from old saves), merge it into sheetSettings
                    if (gameData.players && (!gameData.sheetSettings.players || gameData.sheetSettings.players.length === 0)) {
                        gameData.sheetSettings.players = gameData.players;
                    }
                    localStorage.setItem('sheetSettings', JSON.stringify(gameData.sheetSettings));
                }
                location.reload();
            }
        }
    } catch (error) {
        console.error('Error restoring game:', error);
    }
}

// Delete a game from history
async function deleteGameFromHistory(gameId) {
    if (!currentUser) {
        return;
    }
    
    try {
        await deleteDoc(doc(window.firebaseDb, 'gameHistory', gameId));
    } catch (error) {
        console.error('Error deleting game:', error);
    }
}

// Save current game to history (manual save from modal)
async function saveCurrentGameToHistory() {
    if (!currentUser) {
        alert('You must be signed in to save games.');
        return;
    }
    
    // First, save current settings to ensure we have the latest data
    // Check if saveSettings exists (it's in index.js)
    if (typeof saveSettings === 'function') {
        saveSettings();
    } else if (window.saveSettings) {
        window.saveSettings();
    }
    
    const saved = await saveGameHistory();
    if (saved) {
        // Refresh the game history list
        await showGameHistory();
    } else {
        alert('Failed to save game. Please try again.');
    }
}

// Show game history modal
async function showGameHistory() {
    const modal = document.getElementById('gameHistoryModal');
    const list = document.getElementById('gameHistoryList');
    const userEmailDiv = document.getElementById('gameHistoryUserEmail');
    
    if (!modal || !list) {
        return;
    }
    
    // Update user email display
    if (userEmailDiv && currentUser && currentUser.email) {
        userEmailDiv.textContent = `Signed in as: ${currentUser.email}`;
    } else if (userEmailDiv) {
        userEmailDiv.textContent = '';
    }
    
    modal.style.display = 'flex';
    list.innerHTML = '<div style="color: white; text-align: center; padding: 20px;">Loading...</div>';
    
    const games = await loadGameHistory();
    
    if (games.length === 0) {
        list.innerHTML = '<div style="color: white; text-align: center; padding: 20px;">No game history yet. Games will be saved here when you click "New Game".</div>';
        return;
    }
    
    list.innerHTML = '';
    
    games.forEach((game) => {
        const gameDate = game.timestamp.toDate();
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const gameDateOnly = new Date(gameDate.getFullYear(), gameDate.getMonth(), gameDate.getDate());
        
        let dateText;
        if (gameDateOnly.getTime() === today.getTime()) {
            dateText = 'Today';
        } else if (gameDateOnly.getTime() === yesterday.getTime()) {
            dateText = 'Yesterday';
        } else {
            dateText = gameDate.toLocaleDateString();
        }
        
        const timeText = gameDate.toLocaleTimeString();
        const dateTimeText = `${dateText} • ${timeText}`;
        
        const gameCard = document.createElement('div');
        gameCard.className = 'game-history-card';
        
        const header = document.createElement('div');
        header.className = 'game-history-item-header';
        header.innerHTML = `<div class="game-history-date">${dateTimeText}</div>`;
        
        const buttons = document.createElement('div');
        buttons.className = 'game-history-buttons';
        
        const restoreBtn = document.createElement('button');
        restoreBtn.className = 'game-history-btn-restore';
        restoreBtn.textContent = 'Restore';
        restoreBtn.onclick = () => {
            // Only show confirmation if current sheet has data (not default)
            const isDefault = isDefaultSheetSettings();
            if (isDefault || confirm('Are you sure you want to restore this game? Your current game will be replaced.')) {
                restoreGame(game.id);
            }
        };
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'game-history-btn-delete';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = async () => {
            if (confirm('Are you sure you want to delete this game from history? This action cannot be undone.')) {
                await deleteGameFromHistory(game.id);
                showGameHistory();
            }
        };
        
        buttons.appendChild(restoreBtn);
        buttons.appendChild(deleteBtn);
        header.appendChild(buttons);
        
        const playersList = document.createElement('div');
        playersList.className = 'game-history-players';
        
        if (game.players && game.players.length > 0) {
            game.players.forEach((player) => {
                const playerDiv = document.createElement('div');
                playerDiv.className = 'game-history-player';
                playerDiv.innerHTML = `<strong>${player.name || 'Unnamed'}:</strong> ${player.score || 0}`;
                playersList.appendChild(playerDiv);
            });
        }
        
        gameCard.appendChild(header);
        gameCard.appendChild(playersList);
        list.appendChild(gameCard);
    });
}

// Close game history modal
function closeGameHistory() {
    const modal = document.getElementById('gameHistoryModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close game history modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('gameHistoryModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Make functions globally accessible for onclick handlers
window.showSignInModal = showSignInModal;
window.signInWithGoogle = signInWithGoogle;
window.signInWithEmail = signInWithEmail;
window.signUpWithEmail = signUpWithEmail;
window.signOutUser = signOutUser;
window.showGameHistory = showGameHistory;
window.closeGameHistory = closeGameHistory;
window.saveGameHistory = saveGameHistory;
window.updateResetButtonText = updateResetButtonText;
window.saveCurrentGameToHistory = saveCurrentGameToHistory;

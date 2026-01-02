// Firebase Authentication and Game History Functions

import { 
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
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
    deleteDoc,
    updateDoc
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

// Send password reset email
async function resetPassword() {
    const email = document.getElementById('emailInput').value;
    const authStatus = document.getElementById('authStatus');
    
    if (!email) {
        if (authStatus) {
            authStatus.textContent = 'Please enter your email address.';
            authStatus.style.color = '#da3737';
        }
        return;
    }
    
    try {
        await sendPasswordResetEmail(window.firebaseAuth, email);
        if (authStatus) {
            authStatus.textContent = 'Password reset email sent! Check your inbox.';
            authStatus.style.color = '#00CF48';
        }
    } catch (error) {
        let errorMessage = 'Error: ' + error.message;
        if (error.code === 'auth/user-not-found') {
            errorMessage = 'No account found with this email.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Invalid email address.';
        }
        
        if (authStatus) {
            authStatus.textContent = errorMessage;
            authStatus.style.color = '#da3737';
        }
    }
}

// Sign in or create account (automatically determines which)
async function signInOrCreateAccount() {
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
    
    // Try to sign in first
    try {
        await signInWithEmailAndPassword(window.firebaseAuth, email, password);
        if (authStatus) {
            authStatus.textContent = 'Signed in successfully!';
            authStatus.style.color = '#00CF48';
        }
    } catch (signInError) {
        // If user doesn't exist, create account
        if (signInError.code === 'auth/user-not-found') {
            try {
                await createUserWithEmailAndPassword(window.firebaseAuth, email, password);
                if (authStatus) {
                    authStatus.textContent = 'Account created and signed in!';
                    authStatus.style.color = '#00CF48';
                }
            } catch (createError) {
                let errorMessage = 'Error: ' + createError.message;
                if (createError.code === 'auth/email-already-in-use') {
                    // This shouldn't happen, but if it does, try sign in again
                    try {
                        await signInWithEmailAndPassword(window.firebaseAuth, email, password);
                        if (authStatus) {
                            authStatus.textContent = 'Signed in successfully!';
                            authStatus.style.color = '#00CF48';
                        }
                    } catch (retryError) {
                        errorMessage = 'Incorrect password.';
                        if (authStatus) {
                            authStatus.textContent = errorMessage;
                            authStatus.style.color = '#da3737';
                        }
                    }
                } else if (createError.code === 'auth/invalid-email') {
                    errorMessage = 'Invalid email address.';
                    if (authStatus) {
                        authStatus.textContent = errorMessage;
                        authStatus.style.color = '#da3737';
                    }
                } else if (createError.code === 'auth/weak-password') {
                    errorMessage = 'Password is too weak.';
                    if (authStatus) {
                        authStatus.textContent = errorMessage;
                        authStatus.style.color = '#da3737';
                    }
                } else {
                    if (authStatus) {
                        authStatus.textContent = errorMessage;
                        authStatus.style.color = '#da3737';
                    }
                }
            }
        } else if (signInError.code === 'auth/wrong-password') {
            // Wrong password - don't create account
            if (authStatus) {
                authStatus.textContent = 'Incorrect password.';
                authStatus.style.color = '#da3737';
            }
        } else if (signInError.code === 'auth/invalid-email') {
            if (authStatus) {
                authStatus.textContent = 'Invalid email address.';
                authStatus.style.color = '#da3737';
            }
        } else {
            // Other sign-in errors
            if (authStatus) {
                authStatus.textContent = 'Error: ' + signInError.message;
                authStatus.style.color = '#da3737';
            }
        }
    }
}

// Sign in with email and password (kept for backwards compatibility if needed)
async function signInWithEmail() {
    await signInOrCreateAccount();
}

// Create account with email and password (kept for backwards compatibility if needed)
async function signUpWithEmail() {
    await signInOrCreateAccount();
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
        
        // Check if this is an update to an existing game
        const existingGameId = sheetSettings.gameId;
        
        const gameData = {
            userId: currentUser.uid,
            timestamp: new Date(),
            sheetSettings: sheetSettings,
            players: players
        };
        
        if (existingGameId) {
            // Update existing game: delete old one and create new one (moves to top)
            try {
                await deleteDoc(doc(window.firebaseDb, 'gameHistory', existingGameId));
            } catch (deleteError) {
                // If delete fails, continue anyway (game might not exist)
                console.warn('Could not delete old game entry:', deleteError);
            }
        }
        
        // Create new entry (or recreate after delete, which moves it to top)
        const docRef = await addDoc(collection(window.firebaseDb, 'gameHistory'), gameData);
        
        // Store the new game ID in settings so future saves will update this game
        sheetSettings.gameId = docRef.id;
        localStorage.setItem('sheetSettings', JSON.stringify(sheetSettings));
        
        // Store a snapshot of the saved state for comparison
        const savedStateSnapshot = JSON.stringify({
            gameId: docRef.id,
            players: players,
            rows: sheetSettings.rows,
            gameName: sheetSettings.gameName || ''
        });
        localStorage.setItem('lastSavedGameState', savedStateSnapshot);
        
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
        
        // Get current game ID from localStorage
        const currentSheetSettings = JSON.parse(localStorage.getItem('sheetSettings') || '{}');
        const currentGameId = currentSheetSettings.gameId;
        
        querySnapshot.forEach((doc) => {
            const isCurrent = doc.id === currentGameId;
            games.push({
                id: doc.id,
                isCurrentGame: isCurrent,
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

// Check if current game state matches the last saved state
function isCurrentGameUnchanged() {
    try {
        const currentSheetSettings = JSON.parse(localStorage.getItem('sheetSettings') || '{}');
        const lastSavedState = localStorage.getItem('lastSavedGameState');
        
        // If no saved state exists, game has been changed
        if (!lastSavedState) {
            return false;
        }
        
        // If no gameId, game hasn't been saved
        if (!currentSheetSettings.gameId) {
            return false;
        }
        
        // Parse the saved state
        const savedState = JSON.parse(lastSavedState);
        
        // Check if gameId matches
        if (savedState.gameId !== currentSheetSettings.gameId) {
            return false;
        }
        
        // Compare current state with saved state
        const currentState = {
            gameId: currentSheetSettings.gameId,
            players: currentSheetSettings.players || [],
            rows: currentSheetSettings.rows,
            gameName: currentSheetSettings.gameName || ''
        };
        
        // Compare players (name, color, and scores)
        if (currentState.players.length !== savedState.players.length) {
            return false;
        }
        
        for (let i = 0; i < currentState.players.length; i++) {
            const currentPlayer = currentState.players[i];
            const savedPlayer = savedState.players[i];
            
            if (currentPlayer.name !== savedPlayer.name ||
                currentPlayer.color !== savedPlayer.color) {
                return false;
            }
            
            // Compare scores
            const currentScores = currentPlayer.scores || [];
            const savedScores = savedPlayer.scores || [];
            
            if (currentScores.length !== savedScores.length) {
                return false;
            }
            
            for (let j = 0; j < currentScores.length; j++) {
                if (currentScores[j].val !== savedScores[j].val ||
                    currentScores[j].color !== savedScores[j].color) {
                    return false;
                }
            }
        }
        
        // Compare rows and gameName
        if (currentState.rows !== savedState.rows ||
            currentState.gameName !== savedState.gameName) {
            return false;
        }
        
        return true;
    } catch (error) {
        // If comparison fails, assume game has been changed
        return false;
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

// Open a game from history (applies it and stores gameId for future updates)
async function openGame(gameId) {
    if (!currentUser) {
        return;
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
                    // Store the game ID so "Save Current Game" will update this entry
                    gameData.sheetSettings.gameId = gameId;
                    localStorage.setItem('sheetSettings', JSON.stringify(gameData.sheetSettings));
                    
                    // Store a snapshot of the opened state for comparison
                    const openedStateSnapshot = JSON.stringify({
                        gameId: gameId,
                        players: gameData.players || gameData.sheetSettings.players || [],
                        rows: gameData.sheetSettings.rows,
                        gameName: gameData.sheetSettings.gameName || ''
                    });
                    localStorage.setItem('lastSavedGameState', openedStateSnapshot);
                    
                    // Apply the settings to the current page without reloading
                    if (typeof resetToSheetSettings === 'function') {
                        resetToSheetSettings(gameData.sheetSettings);
                    } else if (window.resetToSheetSettings) {
                        window.resetToSheetSettings(gameData.sheetSettings);
                    }
                    
                    // Update highlighting in the history list without re-querying Firebase
                    updateGameHistoryHighlighting(gameId);
                }
            }
        }
    } catch (error) {
        console.error('Error opening game:', error);
    }
}

// Duplicate a game (creates a new entry with same data but new ID)
async function duplicateGame(gameId) {
    if (!currentUser) {
        return;
    }
    
    try {
        const gameDoc = await getDoc(doc(window.firebaseDb, 'gameHistory', gameId));
        if (gameDoc.exists()) {
            const gameData = gameDoc.data();
            if (gameData.userId === currentUser.uid) {
                // Create new game data with current timestamp
                const newGameData = {
                    userId: currentUser.uid,
                    timestamp: new Date(),
                    sheetSettings: gameData.sheetSettings ? { ...gameData.sheetSettings } : {},
                    players: gameData.players || []
                };
                
                // Remove gameId from duplicated settings so it's treated as a new game
                if (newGameData.sheetSettings.gameId) {
                    delete newGameData.sheetSettings.gameId;
                }
                
                // Add the new game (will appear at top due to timestamp)
                await addDoc(collection(window.firebaseDb, 'gameHistory'), newGameData);
                
                // Refresh the history list
                await showGameHistory();
            }
        }
    } catch (error) {
        console.error('Error duplicating game:', error);
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
    
    // Get current game ID from localStorage (fresh read)
    const currentSheetSettings = JSON.parse(localStorage.getItem('sheetSettings') || '{}');
    const currentGameId = currentSheetSettings.gameId;
    
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
        // Add class to highlight current game (check again with fresh currentGameId)
        const isCurrent = game.id === currentGameId;
        gameCard.className = isCurrent ? 'game-history-card current-game' : 'game-history-card';
        // Store gameId as data attribute for easy lookup
        gameCard.setAttribute('data-game-id', game.id);
        
        // Make the entire card clickable to open the game
        const handleCardClick = () => {
            // Check if current game is default (no data) or unchanged from saved version
            const isDefault = isDefaultSheetSettings();
            const isUnchanged = isCurrentGameUnchanged();
            
            // Skip confirmation if current game is default (no data) or unchanged from saved version
            if (isDefault || isUnchanged) {
                openGame(game.id);
            } else {
                // Show confirmation if current game has unsaved changes
                if (confirm('Are you sure you want to open this game? Your current game will be replaced.')) {
                    openGame(game.id);
                }
            }
        };
        gameCard.onclick = handleCardClick;
        
        // Title row (top, with game name on left and timestamp on right)
        const titleRow = document.createElement('div');
        titleRow.className = 'game-history-title-row';
        
        // Get game name from sheetSettings if it exists
        const gameName = game.sheetSettings && game.sheetSettings.gameName ? game.sheetSettings.gameName : '';
        
        const gameNameDiv = document.createElement('div');
        gameNameDiv.className = 'game-history-game-name';
        gameNameDiv.innerHTML = `<b style="font-size: 25px;">${gameName}</b>`;
        titleRow.appendChild(gameNameDiv);
        
        const timestampDiv = document.createElement('div');
        timestampDiv.className = 'game-history-timestamp';
        timestampDiv.textContent = dateTimeText;
        titleRow.appendChild(timestampDiv);
        
        // Players list (below title)
        const playersList = document.createElement('div');
        playersList.className = 'game-history-players';
        
        if (game.players && game.players.length > 0) {
            game.players.forEach((player) => {
                // Calculate total score from scores array
                let totalScore = 0;
                if (player.scores && Array.isArray(player.scores)) {
                    player.scores.forEach((scoreEntry) => {
                        const scoreValue = parseFloat(scoreEntry.val) || 0;
                        totalScore += scoreValue;
                    });
                } else if (player.score !== undefined) {
                    // Fallback to score property if it exists (for backwards compatibility)
                    totalScore = parseFloat(player.score) || 0;
                }
                
                const playerDiv = document.createElement('div');
                playerDiv.className = 'game-history-player';
                playerDiv.innerHTML = `<strong>${player.name || 'Unnamed'}:</strong> ${totalScore}`;
                playersList.appendChild(playerDiv);
            });
        }
        
        // Buttons (below players, horizontal layout)
        const buttons = document.createElement('div');
        buttons.className = 'game-history-buttons';
        
        const openBtn = document.createElement('button');
        openBtn.className = 'game-history-btn-open';
        openBtn.textContent = 'Open';
        openBtn.onclick = (e) => {
            e.stopPropagation(); // Prevent card click
            handleCardClick();
        };
        
        const duplicateBtn = document.createElement('button');
        duplicateBtn.className = 'game-history-btn-duplicate';
        duplicateBtn.textContent = 'Duplicate';
        duplicateBtn.onclick = (e) => {
            e.stopPropagation(); // Prevent card click
            duplicateGame(game.id);
        };
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'game-history-btn-delete';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = async (e) => {
            e.stopPropagation(); // Prevent card click
            if (confirm('Are you sure you want to delete this game from history? This action cannot be undone.')) {
                await deleteGameFromHistory(game.id);
                showGameHistory();
            }
        };
        
        buttons.appendChild(openBtn);
        buttons.appendChild(duplicateBtn);
        buttons.appendChild(deleteBtn);
        
        // Assemble the card
        gameCard.appendChild(titleRow);
        gameCard.appendChild(playersList);
        gameCard.appendChild(buttons);
        list.appendChild(gameCard);
    });
}

// Update game history highlighting without re-querying Firebase
function updateGameHistoryHighlighting(currentGameId) {
    const list = document.getElementById('gameHistoryList');
    if (!list) {
        return;
    }
    
    // Remove current-game class from all cards
    const allCards = list.querySelectorAll('.game-history-card');
    allCards.forEach((card) => {
        card.classList.remove('current-game');
    });
    
    // Add current-game class to the card with matching gameId
    if (currentGameId) {
        const currentCard = list.querySelector(`[data-game-id="${currentGameId}"]`);
        if (currentCard) {
            currentCard.classList.add('current-game');
        }
    }
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

// Toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('passwordInput');
    const eyeIcon = document.getElementById('eyeIcon');
    const eyeOffIcon = document.getElementById('eyeOffIcon');
    
    if (passwordInput && eyeIcon && eyeOffIcon) {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.style.display = 'none';
            eyeOffIcon.style.display = 'block';
        } else {
            passwordInput.type = 'password';
            eyeIcon.style.display = 'block';
            eyeOffIcon.style.display = 'none';
        }
    }
}

// Make functions globally accessible for onclick handlers
window.showSignInModal = showSignInModal;
window.signInWithGoogle = signInWithGoogle;
window.signInOrCreateAccount = signInOrCreateAccount;
window.signInWithEmail = signInWithEmail;
window.signUpWithEmail = signUpWithEmail;
window.resetPassword = resetPassword;
window.togglePasswordVisibility = togglePasswordVisibility;
window.signOutUser = signOutUser;
window.showGameHistory = showGameHistory;
window.closeGameHistory = closeGameHistory;
window.saveGameHistory = saveGameHistory;
window.updateResetButtonText = updateResetButtonText;
window.isCurrentGameUnchanged = isCurrentGameUnchanged;
window.saveCurrentGameToHistory = saveCurrentGameToHistory;

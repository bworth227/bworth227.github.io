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
// This is the PRIMARY way to detect sign-in (including redirects)
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

// Set initial button states (before auth listener fires)
function setInitialButtonStates() {
    const historyButton = document.getElementById('gameHistoryButton');
    const signInButton = document.getElementById('signInButton');
    // Start with sign-in button visible, history button hidden
    if (historyButton) historyButton.style.display = 'none';
    if (signInButton) signInButton.style.display = 'block';
}

// Start listening when DOM is ready
// The auth state listener will automatically detect redirect sign-ins
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setInitialButtonStates();
        // Initialize auth listener - it will handle redirects automatically
        initAuthListener();
        // Also check for redirect result as a fallback (but don't rely on it)
        handleRedirectResult();
    });
} else {
    setInitialButtonStates();
    // Initialize auth listener - it will handle redirects automatically
    initAuthListener();
    // Also check for redirect result as a fallback (but don't rely on it)
    handleRedirectResult();
}

// Detect if we're on a mobile device
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.innerWidth <= 768 && 'ontouchstart' in window);
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
        const isMobile = isMobileDevice();
        const isLocal = isLocalIP();
        
        // Use popup for local IPs (redirect won't work) or desktop, redirect for mobile on public domains
        if (isLocal || !isMobile) {
            // Local IP or desktop: use popup flow
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
            // Mobile on public domain: use redirect flow
            authStatus.textContent = 'Redirecting to Google sign-in...';
            authStatus.style.color = '#ffffff';
            await signInWithRedirect(window.firebaseAuth, provider);
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

// Handle redirect result when page loads (secondary check - auth listener is primary)
// This is called as a fallback, but onAuthStateChanged should handle redirects automatically
async function handleRedirectResult() {
    // Wait for Firebase Auth to be ready
    let retries = 0;
    const maxRetries = 20;
    while (!window.firebaseAuth && retries < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 50));
        retries++;
    }
    
    if (!window.firebaseAuth) {
        return;
    }
    
    try {
        // Try to get redirect result (may return null if already processed by auth listener)
        const result = await getRedirectResult(window.firebaseAuth);
        
        if (result && result.user) {
            // Redirect result found - update status message
            const authStatus = document.getElementById('authStatus');
            if (authStatus) {
                authStatus.textContent = 'Signed in successfully!';
                authStatus.style.color = '#00CF48';
            }
        }
    } catch (error) {
        // Handle redirect errors
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
    } catch (error) {
        console.error('Sign out error:', error);
    }
}

// Save game history to Firestore
async function saveGameHistory() {
    if (!currentUser) {
        return;
    }
    
    try {
        const sheetSettings = JSON.parse(localStorage.getItem('sheetSettings') || '{}');
        const players = JSON.parse(localStorage.getItem('players') || '[]');
        
        const gameData = {
            userId: currentUser.uid,
            timestamp: new Date(),
            sheetSettings: sheetSettings,
            players: players
        };
        
        await addDoc(collection(window.firebaseDb, 'gameHistory'), gameData);
    } catch (error) {
        if (isQuotaError(error)) {
            showQuotaWarning();
        }
        console.error('Error saving game history:', error);
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

// Restore a game from history
async function restoreGame(gameId) {
    if (!currentUser) {
        return;
    }
    
    try {
        const gameDoc = await getDoc(doc(window.firebaseDb, 'gameHistory', gameId));
        if (gameDoc.exists()) {
            const gameData = gameDoc.data();
            if (gameData.userId === currentUser.uid) {
                if (gameData.sheetSettings) {
                    localStorage.setItem('sheetSettings', JSON.stringify(gameData.sheetSettings));
                }
                if (gameData.players) {
                    localStorage.setItem('players', JSON.stringify(gameData.players));
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

// Show game history modal
async function showGameHistory() {
    const modal = document.getElementById('gameHistoryModal');
    const list = document.getElementById('gameHistoryList');
    
    if (!modal || !list) {
        return;
    }
    
    modal.style.display = 'flex';
    list.innerHTML = '<div style="color: white; text-align: center; padding: 20px;">Loading...</div>';
    
    const games = await loadGameHistory();
    
    if (games.length === 0) {
        list.innerHTML = '<div style="color: white; text-align: center; padding: 20px;">No game history found.</div>';
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
        header.className = 'game-history-header';
        header.innerHTML = `<div class="game-history-date">${dateTimeText}</div>`;
        
        const buttons = document.createElement('div');
        buttons.className = 'game-history-buttons';
        
        const restoreBtn = document.createElement('button');
        restoreBtn.className = 'game-history-btn-restore';
        restoreBtn.textContent = 'Restore';
        restoreBtn.onclick = () => {
            restoreGame(game.id);
            modal.style.display = 'none';
        };
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'game-history-btn-delete';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = async () => {
            await deleteGameFromHistory(game.id);
            showGameHistory();
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

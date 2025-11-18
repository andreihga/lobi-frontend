// Shared constants and state
const DEFAULT_GAMES = [
    { id: 1, title: "Counter-Strike 2", genre: "fps", image: null },
    { id: 2, title: "Civilization VI", genre: "strategy", image: null },
    { id: 3, title: "The Witcher 3", genre: "rpg", image: null },
    { id: 4, title: "Fall Guys", genre: "action", image: null },
    { id: 5, title: "Stardew Valley", genre: "indie", image: null },
    { id: 6, title: "Valorant", genre: "fps", image: null },
    { id: 7, title: "Age of Empires IV", genre: "strategy", image: null },
    { id: 8, title: "Hollow Knight", genre: "indie", image: null }
];

const DEFAULT_LOBBIES = [
    {
        id: 1,
        name: "Friday Night Gaming",
        privacy: "public",
        members: ["You", "Alex", "Sam", "Jordan"],
        description: "Weekly gaming session"
    },
    {
        id: 2,
        name: "Strategy Squad",
        privacy: "private", 
        members: ["You", "Mike", "Sarah"],
        description: "For strategy game lovers"
    },
    {
        id: 3,
        name: "Casual Gamers",
        privacy: "friends",
        members: ["You", "Chris", "Taylor", "Morgan", "Casey"],
        description: "Relaxed gaming environment"
    }
];

// Local Storage Functions
function getGames() {
    try {
        const data = localStorage.getItem('lobiAppData');
        if (data) {
            const parsed = JSON.parse(data);
            return parsed.games || DEFAULT_GAMES;
        }
    } catch (error) {
        console.error('Failed to load games:', error);
    }
    return DEFAULT_GAMES;
}

function saveGames(games) {
    try {
        const existingData = JSON.parse(localStorage.getItem('lobiAppData') || '{}');
        existingData.games = games;
        existingData.timestamp = Date.now();
        localStorage.setItem('lobiAppData', JSON.stringify(existingData));
        toggleResetCacheButton();
    } catch (error) {
        console.error('Failed to save games:', error);
    }
}

function getLobbies() {
    try {
        const data = localStorage.getItem('lobiAppData');
        if (data) {
            const parsed = JSON.parse(data);
            return parsed.lobbies || DEFAULT_LOBBIES;
        }
    } catch (error) {
        console.error('Failed to load lobbies:', error);
    }
    return DEFAULT_LOBBIES;
}

function saveLobbies(lobbies) {
    try {
        const existingData = JSON.parse(localStorage.getItem('lobiAppData') || '{}');
        existingData.lobbies = lobbies;
        existingData.timestamp = Date.now();
        localStorage.setItem('lobiAppData', JSON.stringify(existingData));
        toggleResetCacheButton();
    } catch (error) {
        console.error('Failed to save lobbies:', error);
    }
}

function getBlacklistedGames() {
    try {
        const data = localStorage.getItem('lobiAppData');
        if (data) {
            const parsed = JSON.parse(data);
            return parsed.blacklistedGames || [];
        }
    } catch (error) {
        console.error('Failed to load blacklisted games:', error);
    }
    return [];
}

function saveBlacklistedGames(blacklistedGames) {
    try {
        const existingData = JSON.parse(localStorage.getItem('lobiAppData') || '{}');
        existingData.blacklistedGames = blacklistedGames;
        existingData.timestamp = Date.now();
        localStorage.setItem('lobiAppData', JSON.stringify(existingData));
        toggleResetCacheButton();
    } catch (error) {
        console.error('Failed to save blacklisted games:', error);
    }
}

// Utility Functions
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    const toastId = 'toast_' + Date.now();
    const iconMap = {
        success: 'bi-check-circle-fill text-success',
        warning: 'bi-exclamation-triangle-fill text-warning',
        error: 'bi-x-circle-fill text-danger',
        info: 'bi-info-circle-fill text-info'
    };
    
    const toastHTML = `
        <div id="${toastId}" class="toast" role="alert">
            <div class="toast-header">
                <i class="bi ${iconMap[type]} me-2"></i>
                <strong class="me-auto">Lobi</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">${message}</div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { autohide: true, delay: 3000 });
    toast.show();
    
    toastElement.addEventListener('hidden.bs.toast', () => toastElement.remove());
}

// Reset Cache Functions
function toggleResetCacheButton() {
    const resetBtn = document.getElementById('reset-cache-btn');
    const hasCache = localStorage.getItem('lobiAppData') !== null;
    
    if (resetBtn) {
        resetBtn.style.display = hasCache ? 'block' : 'none';
    }
}

function resetCache() {
    if (confirm('⚠️ This will reset all your data to defaults.\n\nYou will lose:\n• Your added games\n• Created lobbies\n• Blacklisted games\n• All settings\n\nAre you sure?')) {
        localStorage.removeItem('lobiAppData');
        localStorage.removeItem('lobiWelcomeShown');
        localStorage.removeItem('lobiTheme');
        
        toggleResetCacheButton();
        showToast('Cache reset successfully! Refreshing page...', 'success');
        
        // Reload page to reset everything
        setTimeout(() => window.location.reload(), 1000);
    }
}

// Debounce function for search and other features
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Genre emoji helper
function getGenreEmoji(genre) {
    const emojis = {
        action: '⚔️',
        strategy: '🧠',
        fps: '🎯',
        rpg: '🗡️',
        indie: '🎨'
    };
    return emojis[genre] || '🎮';
}

// Initialize common functionality
document.addEventListener('DOMContentLoaded', function() {
    toggleResetCacheButton();
    
    // Show welcome message for first-time users
    if (!localStorage.getItem('lobiWelcomeShown')) {
        setTimeout(() => {
            showToast('Welcome to Lobi! Start by adding games to your library.', 'info');
            localStorage.setItem('lobiWelcomeShown', 'true');
        }, 1000);
    }
    
    console.log('🎮 Lobi Common utilities loaded');
});

// ---- Reusable UI helpers (add to common.js) ----
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    const onScroll = () => {
        if (window.scrollY > 50) navbar.classList.add('navbar-scrolled');
        else navbar.classList.remove('navbar-scrolled');
    };
    window.addEventListener('scroll', onScroll);
    onScroll(); // run once
}

function getUserDisplayName() {
    return localStorage.getItem('lobiUserName') || 'Gamer';
}

function hydrateUserBadge() {
    const name = getUserDisplayName();
    const avatar = document.querySelector('.user-avatar');
    const welcome = document.querySelector('.navbar-text .fw-semibold');
    if (avatar) avatar.textContent = name.charAt(0).toUpperCase();
    if (welcome) welcome.textContent = name;
}

// Optional: simple guard for private pages (set to true when you wire auth)
const ENABLE_AUTH_GUARD = false;
function guardPrivatePage() {
    if (!ENABLE_AUTH_GUARD) return;
    const privatePages = ['dashboard.html','library.html','lobbies.html','lobby.html','account.html'];
    const path = (location.pathname || '').toLowerCase();
    const isPrivate = privatePages.some(p => path.endsWith(p));
    const isLoggedIn = !!localStorage.getItem('lobiUserToken');
    if (isPrivate && !isLoggedIn) {
        location.href = 'login.html';
    }
}

// Common bootstrapping
document.addEventListener('DOMContentLoaded', () => {
    initNavbarScrollEffect();
    hydrateUserBadge();
    guardPrivatePage();
    toggleResetCacheButton();
});
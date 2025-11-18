// Dashboard specific functionality

// Update dashboard statistics
function updateStats() {
    const games = getGames();
    const lobbies = getLobbies();
    
    // Update game count
    const gamesCount = document.getElementById('games-count');
    if (gamesCount) {
        gamesCount.textContent = games.length;
    }
    
    // Update lobby count
    const lobbiesCount = document.getElementById('lobbies-count');
    if (lobbiesCount) {
        lobbiesCount.textContent = lobbies.length;
    }
}

// Make stat cards clickable
function setupStatCardNavigation() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            switch(index) {
                case 0: // Games card
                    window.location.href = 'library.html';
                    break;
                case 1: // Lobbies card
                    window.location.href = 'lobbies.html';
                    break;
                case 2: // Games played card
                    showToast('Dayum u unpatiend, working on it, Games played history coming soon!', 'info');
                    break;
                case 3: // Time card
                    showToast('You really pusshing my buttons 🫦, Time tracking coming soon!', 'info');
                    break;
            }
        });
    });
}

// Quick action analytics
function trackQuickAction(action) {
    console.log(`Quick action clicked: ${action}`);
    // Analytics tracking placeholder
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    setupStatCardNavigation();
    
    // Add click tracking to quick action buttons
    document.querySelectorAll('a[href="library.html"], a[href="lobbies.html"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = btn.textContent.trim();
            trackQuickAction(action);
        });
    });
    
    console.log('📊 Dashboard loaded successfully');
});

// Export functions for other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateStats,
        setupStatCardNavigation,
        trackQuickAction
    };
}

// ---- Dashboard page helpers (replace/extend dashboard.js) ----

// Already present in your common.js
// getGames(), getLobbies()

function capFirst(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

function genreBadge(genre) {
    return `<span class="badge badge-soft">${capFirst(genre)}</span>`;
}

function gameTileHTML(game) {
    const hasImg = game.image && game.image.startsWith('http');
    const iconHTML = hasImg
        ? `<img src="${game.image}" class="card-img-top" alt="${game.title}" style="height:120px;object-fit:cover;">`
        : `<div class="game-icon icon-${game.genre}">
             <div class="symbol"></div>
             <div class="genre-text">${(game.genre || '').toUpperCase()}</div>
           </div>`;
    return `
    <div class="col-6 col-md-4">
        <div class="card game-tile h-100">
            ${iconHTML}
            <div class="card-body py-2">
                <div class="small fw-semibold">${game.title}</div>
                ${genreBadge(game.genre)}
            </div>
        </div>
    </div>`;
}

function populateLibraryPreview() {
    const wrap = document.getElementById('library-preview');
    if (!wrap) return;
    const games = getGames();
    const latest = games.slice(-3); // last 3 added
    if (!latest.length) {
        wrap.innerHTML = `<div class="text-secondary small">No games yet. Add your first game from Library.</div>`;
        return;
    }
    wrap.innerHTML = latest.map(gameTileHTML).join('');
}

function lobbyItemHTML(lobby) {
    const count = lobby.members ? lobby.members.length : 0;
    const privacy = lobby.privacy || 'public';
    return `
    <li class="mini-item">
        <div>
            <div class="mini-title">${lobby.name}</div>
            <div class="mini-sub text-secondary">
                <i class="bi bi-people me-1"></i>${count} members • ${privacy}
            </div>
        </div>
        <a href="lobby.html?lobby=${encodeURIComponent(lobby.id)}" class="btn btn-sm btn-primary">Enter</a>
    </li>`;
}

function populateLobbiesPreview() {
    const list = document.getElementById('lobbies-preview');
    if (!list) return;
    const lobbies = getLobbies();
    const top = lobbies.slice(0, 5);
    if (!top.length) {
        list.innerHTML = `<li class="mini-item">
            <div class="mini-title">No lobbies yet</div>
            <div class="mini-sub text-secondary">Create your first lobby to get started.</div>
        </li>`;
        return;
    }
    list.innerHTML = top.map(lobbyItemHTML).join('');
}

function updateStats() {
    const games = getGames();
    const lobbies = getLobbies();
    const gamesCount = document.getElementById('games-count');
    const lobbiesCount = document.getElementById('lobbies-count');
    if (gamesCount) gamesCount.textContent = games.length;
    if (lobbiesCount) lobbiesCount.textContent = lobbies.length;
}

function setupStatCardNavigation() {
    document.querySelectorAll('.stat-card').forEach((card, idx) => {
        card.addEventListener('click', () => {
            if (idx === 0) location.href = 'library.html';
            else if (idx === 1) location.href = 'lobbies.html';
            else if (idx === 2) showToast('Games played history coming soon!', 'info');
            else if (idx === 3) showToast('Time tracking coming soon!', 'info');
        });
    });
}

function setupDashboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            location.href = 'library.html';
        }
    });
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    populateLobbiesPreview();
    populateLibraryPreview();
    setupStatCardNavigation();
    setupDashboardShortcuts();
    console.log('📊 Dashboard initialized');
});
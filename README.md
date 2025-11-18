# lobi-frontend
This is the frontend repository for Lobi gaming platform - a community hub where gamers can manage their libraries, create lobbies, and discover games together.

## 🎮 Project Overview

Lobi is a gaming platform that allows users to:
- **Manage Game Libraries** - Add, organize, and search personal game collections
- **Create & Join Lobbies** - Set up gaming sessions with friends
- **Vote on Games** - Democratic game selection with timed voting
- **Discover Games** - Tinder-style game recommendations based on preferences
- **Blacklist Management** - Filter out unwanted games from suggestions

## 🏗️ Architecture

**Multi-Page Application** built with vanilla HTML, CSS, and JavaScript for easier debugging and development.

### File Structure
```text
/lobi-frontend/
├── index.html # Landing page (with basic modern gaming design with presentation and a Login & Register button)
├── login.html # Login interface
├── register.html # Register interface
├── dashboard.html # Dashboard (replacing the old index.html)
├── library.html # Game library management
├── lobbies.html # Lobby list/management
├── lobby.html # Individual lobby interior
├── account.html # Account management
├── styles.css # Shared styles for all pages
├── sw.js # Service worker (PWA)
├── assets/
│ ├── images/ # Image assets
│ └── fonts/ # Custom fonts (if needed)
├── js/
│ ├── common.js # Shared utilities (localStorage, toast, etc.)
│ ├── dashboard.js # Dashboard specific logic
│ ├── landing.js # Landing page logic
│ ├── library.js # Library page logic
│ ├── lobbies.js # Lobbies page logic
│ └── lobby.js # Lobby interior logic
├── manifest.json # Web app manifest (PWA)
└── README.md # Read me
```

## 🛠️ Tech Stack

- **HTML5** - Semantic markup structure
- **CSS3** - Custom styling with CSS Grid/Flexbox
- **Bootstrap 5** - UI component library
- **Vanilla JavaScript (ES6+)** - Core functionality
- **LocalStorage** - Client-side data persistence
## 📱 Features

### Dashboard (`index.html`)
- Game library statistics
- Active lobby count
- Quick action buttons
- Welcome experience for new users

### Game Library (`library.html`)
- Add/edit/remove games
- Search functionality (Ctrl+K shortcut)
- Genre-based filtering
- Custom game icons for each genre

### Lobbies (`lobbies.html`)
- Create/edit lobbies with privacy settings
- View lobby member counts
- Share lobby links
- Join existing lobbies

### Lobby Interior (`lobby.html`)
- **Common Games** - View shared games across members
- **Voting System** - 5-minute timed voting on up to 3 games
- **Game Pitching** - Tinder-style game discovery with preferences
- **Blacklist** - Manage unwanted games

## 🔧 Development Tools

### Reset Cache Button
A temporary development tool that appears when cached data exists:
- Resets all localStorage data to defaults
- Requires confirmation before reset
- Useful for testing clean states

### Keyboard Shortcuts
- `Ctrl+K` - Focus search bar (Library page)
- `Escape` - Close modals
- `←/→ Arrow Keys` - Navigate game pitching cards

## 💾 Data Persistence

Uses browser localStorage to persist:
- User's game library
- Created lobbies
- Blacklisted games
- User preferences

## 🎨 UI/UX Features

- **Dark Gaming Theme** - Custom dark color scheme
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Card hovers, transitions, loading states
- **Toast Notifications** - User feedback system
- **Accessibility** - Keyboard navigation and screen reader support

## 🔮 Future Integrations (Ready for Implementation)

- **Steam API** - Sync user's Steam library
- **IGDB API** - Game database integration
- **WebSocket** - Real-time lobby updates
- **User Authentication** - Login/registration system
- **PWA Features** - Offline support, installable app

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- 
# Branch Naming Convention

To maintain consistency and clarity in our repository, all feature, bugfix, or task branches must follow this naming convention:

**Pattern:** `LOBI-<ticket_number>_<description>`  
**Example:** 
`LOBI-12_bug-fix`

---

## 🔹 Format Breakdown

| Part | Description | Example |
|------|-------------|---------|
| `LOBI-` | Literal prefix identifying the project | `LOBI-` |
| `<ticket_number>` | The number of the task or ticket in the issue tracker (one or more digits) | `12`, `42` |
| `_` | Underscore separating the ticket number from the description | `_` |
| `<description>` | Short, lowercase description of the branch. Words may be separated by hyphens (`-`). **Underscores are not allowed** in the description | `bug-fix`, `add-login-feature` |

---

# Dublin Sports Hub - Squash Coaching and Ladder Rankings App

This is a Progressive Web App (PWA) for Dublin Sports Hub that includes a squash coaching booking system and ladder rankings. The app can be installed on mobile devices and works offline.

## App Structure

### Main Files

- `index.html` - Main page with coaching booking system
- `ladder.html` - Ladder rankings page for men's and women's ladders
- `styles.css` - Main stylesheet
- `ladder-styles.css` - Styles specific to the ladder rankings
- `mobile.css` - Mobile-specific styles for responsive design
- `script.js` - JavaScript for the booking functionality
- `ladder.js` - JavaScript for the ladder rankings functionality
- `db.js` - Database functionality using IndexedDB for offline capabilities
- `pwa.js` - PWA functionality for installation and offline mode
- `service-worker.js` - Service worker for caching and offline access
- `manifest.json` - Web app manifest for installability
- `icons/` - Directory containing app icons in various sizes

## Features

1. **Squash Coaching Booking System**
   - Coach profile with WSF Level 1 Coach qualification
   - Date and time selection for 60-minute sessions
   - Contact form for collecting visitor information
   - Booking confirmation

2. **Ladder Rankings System**
   - Separate men's and women's ladders
   - Add new players to either ladder
   - Record challenge results
   - Automatic ranking updates based on match results

3. **Progressive Web App Features**
   - Installable on mobile devices
   - Works offline
   - Data synchronization when back online
   - Mobile-optimized interface

## How to Modify

### Changing the Coach Information

Edit the coach information in `index.html` around line 35:

```html
<div class="card">
    <h2>Your Coach</h2>
    <div class="coach-badge">
        World Squash Federation Level 1 Coach
    </div>
    <p>Welcome to Dublin Sports Hub's squash coaching program...</p>
</div>
```

### Modifying Time Slots

Edit the time slots in `index.html` around line 55:

```html
<div class="time-slots">
    <button class="time-slot" data-time="9:00 AM">9:00 AM</button>
    <button class="time-slot" data-time="10:00 AM">10:00 AM</button>
    <!-- Add or remove time slots as needed -->
</div>
```

### Changing Ladder Rules

Edit the ladder rules in `ladder.html` around line 80:

```html
<div class="card">
    <h2>Ladder Rules</h2>
    <ol>
        <li>Players can challenge others ranked up to 2 positions above them.</li>
        <!-- Modify rules as needed -->
    </ol>
</div>
```

### Updating Colors and Styling

The main color scheme is defined in `styles.css`. To change the primary blue color, look for instances of `#1e90ff` and replace with your preferred color.

### Adding New Features

To add new features, you may need to modify multiple files:

1. Add HTML markup to `index.html` or `ladder.html`
2. Add styles to the appropriate CSS file
3. Add JavaScript functionality to `script.js` or `ladder.js`
4. Update the database schema in `db.js` if storing new data types

## Deployment

This app is currently running on a temporary server. For permanent deployment:

1. Host the files on a service like Netlify, Vercel, or GitHub Pages
2. Set up a backend database (Firebase recommended)
3. Register a custom domain
4. Update the service worker and manifest for the new domain

## Support

For any questions or modifications, please contact the developer who provided this code package.

# 🗂️ Kanban Ticket Board

A minimal Kanban-style ticket management application built with HTML, CSS, and JavaScript. Users can add, edit, prioritize, and delete tickets, with persistent state using LocalStorage.

## 🚀 Features

🎫 Add New Tickets with task descriptions and a selected priority color.

🎨 Priority Tagging with selectable color indicators.

✏️ Editable Tickets with lock/unlock toggling.

🔄 Color Cycling by clicking on the color bar of a ticket.

🗑️ Delete Mode to remove unwanted tickets.

🎯 Filter by Priority Color (single-click to filter, double-click to reset).

💾 LocalStorage Persistence to save tasks across sessions.

## 📁 Project Structure

bash

```Copy
├── index.html # Main HTML file
├── styles.css # Styling for layout and UI elements
└── script.js # Core JavaScript logic
```

## 🛠️ Tech Stack

- Vanilla JavaScript – Logic & state management
- HTML5 – Markup and structure
- CSS3 – Styling and layout
- Font Awesome – Icons (lock, unlock, plus, remove)

## Action Description

➕ Add Ticket Click the + icon, type your task, select priority color, press Shift to save.

❌ Remove Mode Click the x icon to activate delete mode (shows alert and red icon), then click any ticket to delete.

🔓 Edit Task Click the lock icon to unlock, edit task, click again to save.

🎨 Change Priority Click ticket's top color bar to cycle through priorities.

🎯 Filter Click a color box in the top bar to filter by that color, double-click to reset.

## 🧠 How It Works

- Tickets are stored as objects in an array and saved in localStorage.
- Tickets can be locked/unlocked for editing.
- Ticket color and content are both editable.
- Filters use the .color classes to show/hide matching tickets.

## 🧩 Local Development

1. Clone or download this repository.
2. Open index.html in a browser.

### Interact with the ticket board – no server setup required!

### 📌 Customization Tips

You can add more colors by editing the colors array in script.js and updating styles in styles.css.
To change the layout or responsiveness, modify main-content and ticket-content styles.

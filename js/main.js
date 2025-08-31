import { initialize } from './ui.js';

// Add a listener to ensure the DOM is fully loaded before initializing the UI
document.addEventListener('DOMContentLoaded', () => {
    console.log("KeyMesh UI Initializing...");
    initialize();
});

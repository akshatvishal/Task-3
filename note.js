const creatbtn = document.querySelector('.creatbtn');
const colorOptions = document.querySelectorAll('.color-option');
const list = document.querySelector('#list');
const pop = document.querySelector('.popup');
const form2 = document.querySelector('form');
let currentnote = null;
let color;
let notes = JSON.parse(localStorage.getItem('notes')) || []; // Load from localStorage or start with an empty array

// Load notes from localStorage on page load
window.onload = function () {
    list.innerHTML = '';  // Clear the list
    notes.forEach((noteData, index) => {
        createNoteElement(noteData, index);
    });
};

// Update welcome message
const obj = JSON.parse(localStorage.getItem('form'));
if (obj) {
    const nameelement = document.querySelector('.welcome');
    nameelement.innerHTML = `<h1 class="welcome">Welcome ${obj.Username}</h1>`;
}

// Handle color selection
colorOptions.forEach(option => {
    option.addEventListener('click', (event) => {
        color = event.target.getAttribute('data-color');
        pop.style.backgroundColor = color;
    });
});

// Show the popup when "Create" is clicked
creatbtn.addEventListener('click', () => {
    pop.style.display = 'block';
    currentnote = null; // Reset for new note
    form2.reset(); // Clear form
});

// Handle note creation or editing
form2.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission
    const title = form2.title.value;
    const content = form2.content.value;
    const category = form2.category.value;
    const currentDate = new Date();
    
    if (currentnote !== null) {
        // Update existing note
        const noteIndex = currentnote.dataset.index;
        notes[noteIndex] = {
            title, content, category, color,
            lastEdited: currentDate, created: notes[noteIndex].created
        };

        // Update the note element visually
        updateNoteElement(currentnote, notes[noteIndex]);
    } else {
        // Create new note
        const newNoteData = {
            title, content, category, color,
            created: currentDate, lastEdited: currentDate
        };
        notes.push(newNoteData);
        createNoteElement(newNoteData, notes.length - 1);
    }

    // Save notes array to localStorage
    localStorage.setItem('notes', JSON.stringify(notes));

    form2.reset(); // Clear the form
    pop.style.display = 'none'; // Hide the popup
});

// Function to create and append a note element
function createNoteElement(noteData, index) {
    const newnote = document.createElement('div');
    newnote.classList.add('note');
    newnote.dataset.index = index; // Store index for editing

    newnote.innerHTML = `
        <h2>${noteData.title}</h2>
        <p>${noteData.category}</p>
        <span class="edit">Edit</span>
        <span class="close">x</span>
        <textarea rows="10" cols="30">${noteData.content}</textarea>
        <h3 class="time">Last Edited: ${formatDate(noteData.lastEdited)} ${formatTime(noteData.lastEdited)}</h3>
        <h3 class="created">Created: ${formatDate(noteData.created)}</h3>
    `;
    
    newnote.style.backgroundColor = noteData.color;
    list.appendChild(newnote);
}

// Function to update an existing note element
function updateNoteElement(noteElement, noteData) {
    noteElement.querySelector('h2').textContent = noteData.title;
    noteElement.querySelector('p').textContent = noteData.category;
    noteElement.querySelector('textarea').value = noteData.content;
    noteElement.querySelector('.time').textContent = `Last Edited: ${formatDate(noteData.lastEdited)} ${formatTime(noteData.lastEdited)}`;
    noteElement.style.backgroundColor = noteData.color;
}

// Handle edit and delete
list.addEventListener('click', (e) => {
    if (e.target.classList.contains('close')) {
        // Delete note
        const noteElement = e.target.parentElement;
        const index = noteElement.dataset.index;
        notes.splice(index, 1); // Remove from array
        localStorage.setItem('notes', JSON.stringify(notes)); // Update localStorage
        noteElement.remove(); // Remove from DOM
        refreshNoteIndices(); // Refresh indices
    } else if (e.target.classList.contains('edit')) {
        // Edit note
        currentnote = e.target.parentElement;
        const noteIndex = currentnote.dataset.index;
        const noteData = notes[noteIndex];
        
        form2.title.value = noteData.title;
        form2.content.value = noteData.content;
        form2.category.value = noteData.category;
        pop.style.backgroundColor = noteData.color;
        pop.style.display = 'block';
    }
});

// Helper function to refresh note indices after deletion
function refreshNoteIndices() {
    const noteElements = list.querySelectorAll('.note');
    noteElements.forEach((noteElement, index) => {
        noteElement.dataset.index = index;
    });
}

// Helper functions to format date and time
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

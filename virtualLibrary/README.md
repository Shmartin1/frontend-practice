# Virtual Library Component

## Overview

This project implements a virtual library management system using vanilla JavaScript. The component provides an interface for managing books, handling borrowing operations, and tracking book status, demonstrating key concepts in state management and object-oriented programming.

## Features

- Book catalog management
- Status tracking (Available/Borrowed)
- Borrower management
- Filter system for book status
- Dynamic book list rendering
- Book addition interface
- Modular and object-oriented design

## Key Takeaways for Developers

1. **State Management**: The project demonstrates effective state management through the Library class:
   ```javascript
   export class Library {
       constructor() {
           this.books = [];
           this.borrowers = new Map();
       }
   }
   ```
   - Centralized book collection management
   - Map usage for efficient borrower tracking
   - Status synchronization across components

2. **Object-Oriented Design**: 
   ```javascript
   export class Book {
       constructor(id, title, author, publicationYear, genre) {
           this.id = id;
           this.title = title;
           this.author = author;
           this.publicationYear = publicationYear;
           this.genre = genre;
           this.status = "Available";
           this.borrower = null;
       }
   }
   ```
   - Clean separation between Book and Library classes
   - Proper encapsulation of book properties
   - Status management through dedicated methods

3. **Filter System Implementation**:
   ```javascript
   getBooks(filter = "All") {
       if (filter === "Available") {
           return this.books.filter(book => book.status === 'Available');
       } else if (filter === "Borrowed") {
           return this.books.filter(book => book.status === 'Borrowed');
       } else if (filter === "All") {
           return this.books;
       }
   }
   ```
   - Efficient filtering mechanism
   - Clean implementation of filter logic
   - Flexible filter options

4. **Event Handling**: The UIManager implements robust event handling:
   ```javascript
   bindEventHandlers() {
       this.filterOptions.addEventListener("change", (e) => {
           const filter = e.target.value;
           this.renderBookList(this.library.getBooks(filter));
       });
   }
   ```
   - Event delegation for efficiency
   - Form submission handling
   - Filter change management

5. **Form Management**:
   - Input validation
   - Form clearing after submission
   - Error handling for incomplete submissions

## Using the UIManager

The UIManager serves as the main controller for the library interface:

```javascript
// Initialize the library
const uiManager = new UIManager();
```

The UIManager automatically:
- Initializes the library system
- Sets up event listeners
- Manages book list rendering
- Handles form submissions
- Manages filter operations

Key methods:
- `renderBookList()`: Updates the book display
- `bindEventHandlers()`: Sets up event listeners
- `clearForm()`: Resets the book addition form

## Component Architecture

```
├── Book.js         # Book class definition
├── Library.js      # Library management system
├── UIManager.js    # Main controller
└── index.js        # Application entry point
```

## Implementation Insights

1. **Book Management System**:
   ```javascript
   addBook(title, author, publicationYear, genre) {
       const newBook = new Book(
           this.books.length + 1,
           title, 
           author, 
           publicationYear, 
           genre
       );
       this.books.push(newBook);
       return newBook;
   }
   ```
   - Automated ID generation
   - Clean book creation process
   - Proper data validation

2. **Status Management**:
   ```javascript
   updateStatus(bookId, status, borrower) {
       const book = this.books.find(book => book.id === bookId);
       if (book) {
           this.borrowers.set(book, borrower);
           book.setStatus(status, borrower);
       }
   }
   ```
   - Efficient book lookup
   - Status update mechanism
   - Borrower tracking

3. **UI Rendering**:
   ```javascript
   renderBookList(books) {
       this.libraryContainer.innerHTML = "";
       books.forEach(book => {
           const bookItem = document.createElement("div");
           bookItem.className = "book-item";
           bookItem.innerHTML = `
               <h3>${book.title} - By: ${book.author}</h3>
               <p>Published: ${book.publicationYear}</p>
               <p>Genre: ${book.genre}</p>
               <p>Status: ${book.status}</p>
           `;
           this.libraryContainer.appendChild(bookItem);
       });
   }
   ```
   - Efficient DOM updates
   - Clean template generation
   - Proper data display

4. **Form Handling**:
   - Input validation
   - Date conversion
   - Error messaging
   - Form reset functionality

This virtual library component serves as an excellent example of:
- State management patterns
- Object-oriented programming principles
- Event handling techniques
- Form processing
- Dynamic UI updates
- Filter system implementation

The implementation provides valuable insights into creating maintainable and scalable web applications while maintaining clean code architecture and user experience.
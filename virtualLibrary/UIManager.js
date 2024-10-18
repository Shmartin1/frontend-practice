import { Library } from './Library.js';

export class UIManager {
    constructor() {
        this.library = new Library();
        this.filterOptions = document.querySelector("#filter-options");
        this.libraryContainer = document.querySelector("#book-list");
        this.bookForm = document.querySelector("#book-form");
    
        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.filterOptions.addEventListener("change", (e) => {
            const filter = e.target.value;
            this.renderBookList(this.library.getBooks(filter));
        });

        this.bookForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = e.target.elements['book-title']?.value;
            const author = e.target.elements['book-author']?.value;
            const publicationDate = e.target.elements['book-pub-date']?.value;
            const genre = e.target.elements['book-genre']?.value;
            if (title && author && publicationDate && genre) {
                const publicationYear = new Date(publicationDate).getFullYear();
                this.library.addBook(title, author, publicationYear, genre);
                this.renderBookList(this.library.getBooks());
                this.clearForm();
            } else {
                console.error('All fields are required');
            }
        });
    }

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

    clearForm() {
        this.bookForm.reset();
    }
}
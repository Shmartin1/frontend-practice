import { Book } from "./Book.js";

export class Library {
    constructor() {
        this.books = [];
        this.borrowers = new Map();
    }

    addBook(title, author, publicationYear, genre) {
        const newBook = new Book(this.books.length + 1, title, author, publicationYear, genre);
        this.books.push(newBook);
        return newBook;
    }

    updateStatus(bookId, status, borrower) {
        const book = this.books.find(book => book.id === bookId);
        if (book) {
            this.borrowers.set(book, borrower);
            book.setStatus(status, borrower);
        }
    }

    getBooks(filter = "All") {
        if (filter === "Available") {
            return this.books.filter(book => book.status === 'Available');
        } else if (filter === "Borrowed") {
            return this.books.filter(book => book.status === 'Borrowed');
        } else if (filter === "All") {
            return this.books;
        }
    }
}
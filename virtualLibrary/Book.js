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

    setStatus(status, borrower = null) {
        this.status = status;
        this.borrower = borrower;
    }
}
class Book {
    constructor(name, author, year, status=false) {
        this.name = name;
        this.author = author;
        this.year = year;
        this.status = status;
    }
}

// Store Class: Handles Storage
class Storer {
// getBook
    static getBook() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }

    // addBook
    static addBook(book) {
        const buk = Storer.getBook();
        buk.push(book);
        localStorage.setItem("buk", JSON.stringify(buk));
    }
}

class Library {
    static displayBooks() {
        const books = Storer.getBook();
        books.forEach((book) => { Library.addBooksToLibrary(book); });
    }

    static addBooksToLibrary(book) {
        const readStat = document.createElement("input");
        const list = document.getElementById("library-books");
        let bookStatus = book.status;
        const row = document.createElement("tr");
        row.innerHTML = `
          <a href='#' class='btn btn-danger btn-sm delete'>X</a>
          <td>${book.name}</td>
          <td>${book.author}</td>
         <td>${book.year}</td>
          `;

        row.appendChild(readStat);
        readStat.setAttribute("type", "button");
        readStat.classList.add("btn", "btn-primary");


        if (bookStatus) {
            readStat.classList.add("btn", "btn-success");
            readStat.value = "Finished";
        } else {
            readStat.classList.add("btn", "btn-primary");
            readStat.value = "Unread";
        }

        readStat.addEventListener("click", () => {

            if (bookStatus) {
                readStat.classList.remove("btn", "btn-success");
                readStat.classList.add("btn", "btn-primary");
                bookStatus = false;
                readStat.value = "Unread";
            } else {
                bookStatus = true;
                readStat.classList.remove("btn", "btn-promary");
                readStat.classList.add("btn", "btn-success");
                readStat.value = "Finished";
            }
          });

        list.appendChild(row);
    }

    static deleteBook(el) {
      if (el.classList.contains("delete")) {
          el.parentElement.remove();
      }
    }

    static clearFields() {
        document.querySelector("#name").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#year").value = "";
    }
}
// event: add a book 
document.querySelector("#book-form").addEventListener("submit", (e) => {
    // prevent actual submission
    e.preventDefault();

    // get form values
    const name = document.querySelector("#name").value;
    const author = document.querySelector("#author").value;
    const year = document.querySelector("#year").value;

    // instantiate a book
    const newBook = new Book(name, author, year);

    Library.addBooksToLibrary(newBook);

    // Add Book to store
    Storer.addBook(newBook);

    // Clear form fields
    Library.clearFields();

});

document.querySelector("#library-books").addEventListener("click", (e) => {
    Library.deleteBook(e.target);
});


document.addEventListener("DOMContentLoaded", Library.displayBooks);

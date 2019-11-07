class Book {
  constructor (name, author, year, status) {
    this.name = name
    this.author = author
    this.year = year
    this.status = status
  }
}

class Library {
  static displayBooks () {
    // const myLibrary = [
    //   {
    //     name: 'A Study in Scarlet',
    //     author: 'Arthur Conan Doyle',
    //     year: '1887',
    //     status: true
    //   }
    // ]

    const books = Storer.getBook()
    // const library = myLibrary
    books.forEach((book) => Library.addBooksToLibrary(book))
  }

  static addBooksToLibrary (book) {
    const readStat = document.createElement('input')
    const list = document.getElementById('library-books')

    const row = document.createElement('tr')
    row.innerHTML = `
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.year}</td>
        `
    list.appendChild(row)
    row.appendChild(readStat)
    // readStat.setAttribute("type", "button");
    readStat.classList.add('btn', 'btn-primary', 'read')
    list.appendChild(row)

    if (book.status) {
      readStat.classList.add('btn', 'btn-success')
      readStat.value = 'Finished'
    } else {
      readStat.classList.add('btn', 'btn-primary')
      readStat.value = 'Unread'
    }

    readStat.addEventListener('click', (e) => {
      if (book.status) {
        readStat.classList.remove('btn', 'btn-success')
        readStat.classList.add('btn', 'btn-primary')
        book.status = false
        readStat.value = 'Unread'
      } else {
        book.status = true
        readStat.classList.remove('btn', 'btn-promary')
        readStat.classList.add('btn', 'btn-success')
        readStat.value = 'Finished'
      }
    })
  }

  static clearFields () {
    document.querySelector('#name').value = ''
    document.querySelector('#author').value = ''
    document.querySelector('#year').value = ''
  }
}

// Store Class: Handles Storage
class Storer {
  // getBook
  static getBook () {
    let books

    if (localStorage.getItem('books') === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }

    return books
  }

  // addBook
  static addBook (book) {
    const buk = Storer.getBook()

    buk.push(book)

    localStorage.setItem('buk', JSON.stringify(buk))
  }
}

document.addEventListener('DOMContentLoaded', Library.displayBooks())

// event: add a book

document.querySelector('#book-form').addEventListener('submit', (e) => {
  // prevent actual submission
  e.preventDefault()

  // get form values
  const name = document.querySelector('#name').value
  const author = document.querySelector('#author').value
  const year = document.querySelector('#year').value

  // validations

  // if (name === '' || author === '' || year === '') {
  //   Library.showAlerts('Please fill in all fields', 'danger')
  // } else {
  // instantiate a book
  const newBook = new Book(name, author, year)

  const lib = new Library()

  const store = new Storer()
  // Add Book to Library
  lib.addBooksToLibrary(newBook)

  // Add Book to store
  store.addBook(newBook)

  // success message
  // UI.showAlerts('Book added', 'success')
  // Clear form fields
  lib.clearFields()
  // }
})

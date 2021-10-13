//  BOOK CLASS: REPRESENTS A BOOK

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI CLASS: HANDLES STORAGE

class UI {
  static displayBooks() {
    const StoreBooks = [
      {
        title: "Book One",
        author: "John Doe",
        isbn: "3434434",
      },
      {
        title: "Book Two",
        author: "John Doe",
        isbn: "45545",
      },
    ];
    const books = StoreBooks;

    books.forEach((book) => UI.addBookToList(book));
  }
  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete"> X</a></td>
        
        `;
    list.appendChild(row);
  }
  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

// EVENT : DISPLAY BOOKS

document.addEventListener("DOMContentLoaded", UI.displayBooks);

// EVENT : Add a Book

document.querySelector("#book-form").addEventListener("submit", (e) => {
  //   PREVENT ACTUAL SUBMIT-->
  e.preventDefault();

  // Get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //   VALIDATION
  if (title === "" || author === "" || isbn === "") {
    alert("Please fill in all fields");
  } else {
    // Instatiate Book
    const book = new Book(title, author, isbn);
    console.log(book);

    // ADD BOOK TO UI
    UI.addBookToList(book);

    //   CLEAR FIELDS-->
    UI.clearFields();
  }
});

document.querySelector("#book-list").addEventListener("click", (e) => {
  //   console.log(e.target);
  UI.deleteBook(e.target);
});

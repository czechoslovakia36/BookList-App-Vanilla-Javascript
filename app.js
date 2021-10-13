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

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = ` alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");

    const form = document.querySelector("#book-form");

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);

    container.insertBefore(div, form);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

// STORE CLASS: HANDLES STORAGE
class Store {
  // static means we don't have to intentiate store class and we can call static method directly
  static getBooks() {
      let books;
      if(localStorage.getItem('books')===null){
          books=[]

      }
      else {
          books= JSON.parse(localStorage.getItem('books'));
      }
      return books;
  }

 static addBook(book) {
     const books = Store.getBooks();
     books.push(book)
     localStorage.setItem('books',JSON.stringify(books));
 }
 static removeBook(isbn) {
     const books= Store.getBooks();
     books.forEach((book,index)=>{
         if(book.isbn===isbn){
             books.splice(index,1)
         }
     });
     localStorage.setItem('books',JSON.stringify(books))
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
    // alert("Please fill in all fields");
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // Instatiate Book
    const book = new Book(title, author, isbn);
    console.log(book);

    // ADD BOOK TO UI
    UI.addBookToList(book);

    // SHOW SUCCESS MESSAGE
    UI.showAlert("Book Added", "success");

    //   CLEAR FIELDS-->
    UI.clearFields();
  }
});

document.querySelector("#book-list").addEventListener("click", (e) => {
  //   console.log(e.target);
  UI.deleteBook(e.target);
  // SHOW SUCCESS MESSAGE
  UI.showAlert("Book Removed", "success");
});

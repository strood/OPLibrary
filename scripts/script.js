// ============== Variables ======================
// Basic array as library to hold our Book objects
// Will make this populate from local storage or db on page load
// once integrated
const myLibrary = [];


// ======== Book Setup ============
// Constructor function to make a new book
function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

// Add function to book tpototype to display info about book.
Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${(this.read) ? ' has been read' : 'not read yet'}`
};


// ============= Functionality ===================

// Grab and add listener to Add Book Button, brings up dialg box w/ form
const dialog = document.querySelector('.dialog-overview');
const newBookButton = document.getElementById('newBookButton');
newBookButton.addEventListener('click', () => dialog.show());

// Add listener to form that grabs info and creates a new book when form submitted
let newBookForm = document.querySelector('.newBookForm');

newBookForm.addEventListener('slSubmit', event => {
  const formData = event.detail.formData;
  addBookToLibrary(formData.get('title'), formData.get('author'), formData.get('pages'), formData.get('read'))
});

// Function to add book to library
// Prompt user for input, build new book object, add object to library
function addBookToLibrary(title, author, pages, read) {
  // Gather book info from user
  // Will replace lower prompts with a form popup
  // let title = prompt("Enter Title:")
  // let author = prompt("Enter Author:")
  // let pages = prompt("Enter Number of pages:")
  // let read = prompt("Complete book?:")
  // Creates now book, and adds to library
  let newBook = new Book(title, author, pages, read)
  myLibrary.push(newBook)
  console.log(newBook)
  console.log(myLibrary)
  // Re-render books on page with new addition
  // NOTE: Change this to just render an individual book instead of all.
  renderBooks()
}

// Loop through myLbrary and display the books on the page
function renderBooks() {
  // Grab book box where books are displayed
  let bookBox = document.querySelector('.bookBox')
  // Build card for each book and add it to the display
  for (let i of myLibrary) {
    let bookCard = makeBookCard(i)
    bookBox.appendChild(bookCard)
  }
}

// Build book card with shoelace components and return that card.
// NOTE: seperate this to style and import when refactoring
function makeBookCard(book) {
  let cardBody = document.createElement('sl-card')
  let cardHeader = document.createElement('div')
  cardHeader.setAttribute('slot', 'header')
  cardHeader.textContent = `${book.title}`
  let cardFooter = document.createElement('div')
  cardFooter.setAttribute('slot', 'footer')
  let removeButton = document.createElement('sl-button')
  removeButton.textContent = 'Remove Book'
  let readButton = document.createElement('sl-button')
  readButton.textContent = `${(book.read) ? 'Unread' : 'Read'}`
  let authorName = document.createElement('h3')
  authorName.textContent = `${book.author}`
  let pages = document.createElement('h4')
  pages.textContent = `${book.pages}`

  cardBody.appendChild(cardHeader)
  cardBody.appendChild(authorName)
  cardBody.appendChild(pages)
  let p = document.createElement('p')
  p.textContent = book.info()
  cardBody.appendChild(p)

  cardFooter.appendChild(readButton)
  cardFooter.appendChild(removeButton)
  cardBody.appendChild(cardFooter)
  return cardBody
}

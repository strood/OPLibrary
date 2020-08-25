// ============== Variables ======================
// Basic array as library to hold our Book objects
// Will make this populate from local storage or db on page load
// once integrated, and render full list of books on pg
// Dummy book added at end of file atm

const myLibrary = [];

// Render books on document load
document.onload = () => {
  renderBooks(myLibrary)

}


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

// ======== New Book Form/Dialog =============

// Grab and add listener to Add Book Button, brings up dialg box w/ form
const dialog = document.querySelector('.dialog-overview');
const newBookButton = document.querySelector('.newBookButton');
newBookButton.addEventListener('click', () => dialog.show());

// Add listener to form that grabs info and creates a new book when form submitted
const newBookForm = document.querySelector('.newBookForm');

newBookForm.addEventListener('slSubmit', event => {
  // Convert submit event from custom element into form data and
  // check checkbox status. From these extract new book parameters
  const formData = event.detail.formData;
  let readStatus = event.detail.formControls[3].checked
  addBookToLibrary(formData.get('title'), formData.get('author'), formData.get('pages'), readStatus)
  // close display and wipe inputs so we can add new books
  clearInputs()
  hideDialog()

});

// Hide new book dialog box
function hideDialog() {
  let dialog = document.querySelector('.dialog-overview')
  dialog.hide()
}

// Clear inputs on addBook dialog box
function clearInputs() {
  let inputs = document.getElementsByClassName('bookInput')
  let check = document.querySelector('sl-checkbox')
  // reset values for inputsw and checkbox
  for (let i of inputs) {
    i.value = "";
  }
  check.checked = false
}


// ========== Adding and Rendering Books ========

// Function to add book to library
// build new book object, add object to library, render on page
function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read)
  myLibrary.push(newBook)
  renderBook(newBook)
}

// Loop through myLbrary and display the books on the page
// Used on initial page load
function renderBooks(myLibrary) {
  // Build card for each book and add it to the display
  for (let i of myLibrary) {
    renderBook(i)
  }
}

// Render individual book, used on creation or update of book
function renderBook(book) {
  // Grab book box where books are displayed
  let bookBox = document.querySelector('.bookBox')
  let bookCard = makeBookCard(book)
  bookBox.appendChild(bookCard)
}


// ==== Book Card Constructor ===========

// Build book card with shoelace components and return that card.
// NOTE: seperate this to style and import when refactoring
function makeBookCard(book) {

  // Make card body, set data attr to be the index it will take on myLibrary
  let cardBody = document.createElement('sl-card')
  cardBody.setAttribute('data', myLibrary.indexOf(book))

  // Card Header for title
  let cardHeader = document.createElement('div')
  cardHeader.setAttribute('slot', 'header')
  cardHeader.textContent = `${book.title}`
  // let cardTitle = document.createElement('h1')
  // cardTitle.textContent = `${book.title}`
  // cardHeader.appendChild(cardTitle)

  // Book author on card
  let authorName = document.createElement('h2')
  authorName.textContent = `${book.author}`

  // Book pages on card
  let pages = document.createElement('h4')
  pages.textContent = `Pages: ${book.pages}`

  // Book 'status'/info on card
  let p = document.createElement('p')
  p.textContent = book.info()

  // Card footer for buttons
  let cardFooter = document.createElement('div')
  cardFooter.setAttribute('slot', 'footer')

  // Remove button w/ event listener
  let removeButton = document.createElement('sl-button')
  removeButton.textContent = 'Remove Book'
  removeButton.setAttribute('type', 'danger')
  removeButton.addEventListener('click', () => {
    // remove book from library array, and delete from page
    let pos = myLibrary.indexOf(book)
    myLibrary.splice(pos, 1)
    removeButton.parentNode.parentNode.remove()
  })

  // Read/Unread button with event listener to toggle status in lbrary and on card
  let readButton = document.createElement('sl-button')
  readButton.textContent = `${(book.read) ? 'Mark as Unread' : 'Mark as Read'}`
  readButton.setAttribute('type', 'primary')
  readButton.addEventListener('click', () => {
    // mark book as read/unread and change text in card
    book.read = !book.read
    readButton.textContent = `${(book.read) ? 'Mark as Unread' : 'Mark as Read'}`
    p.textContent = book.info()
  })

  // Append parts together to build body structure
  cardBody.appendChild(cardHeader)
  cardBody.appendChild(authorName)
  cardBody.appendChild(pages)
  cardBody.appendChild(p)

  cardFooter.appendChild(readButton)
  cardFooter.appendChild(removeButton)
  cardBody.appendChild(cardFooter)

  return cardBody
}

// Add a dummy book to library for texting purpopses
addBookToLibrary('The BFG', 'Rohl Dahl', 255, true)

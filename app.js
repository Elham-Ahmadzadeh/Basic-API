
/* Hämta en group (API-nyckel).
Spara en boktitel som användaren kan skriv in i ett inputfält
Hämta alla böcker och visa för användaren.
Kunna rensa biblioteket från alla böcker. */


let groupKey = 'cFwcw';  /*  after I consoled log the data  on the Network menu onder the name we save the key in here */

//Request a group by a GET REQUEST 
const baseUrl = 'https://www.forverkliga.se/JavaScript/api/';

 async function getKey() {
   

    const url = baseUrl + 'api-db.php?requestGroup';

    let response = await fetch(url);    // response must not have const

    let data = await response.json();  // we get data  output will be json object if promise is successful

    groupKey = await data.key ;  // we need the key to save // if we dont save key. it gives us an object in console like this:
    /* status: "success"  
    key: "ifhwT"
    __proto__: Object */
    console.log(groupKey); // we use key for all calls we create a key. whichh it gives us randomly.
 }



 //Querry string parameters are op = set/ key - name attribute to save/ the group name

 
 async function  setBook(title) { // this function brings books which we have already read.

    const url = baseUrl + `api-db.php?op=set&key=title&value=${title}&group=${groupKey}`// at the end I added title of the book

    console.log('Url is : ' ,url);

    let response = await fetch(url);

    let data = await response.json();

    console.log(data);

    showMessage();

    getBooks();
    console.log(data);
  

}


 function showMessage() {

    document.querySelector('#showMessage').innerHTML = 'Bock titel har sparat.';

    setTimeout(removeMessage, 2000);

 }



function removeMessage() {

    document.querySelector('#showMessage').innerHTML = '';  
}

let booksElem = document.querySelector('#books');
function displayBooks(books) {
  
    // console.log(books);   
    //get elements with ID books
    // loop through variable loops
   //create ptg for each book and add the book tiitle to the p-tag
   //append p-tag to parent element
  
  booksElem.innerHTML = ''  // ta bort p taggar innan vi skapar dem

   for (book of books.data ) {

      let elem = document.createElement('p');

      elem.innerHTML = book.value;

      booksElem.append(elem); 

   }
        
    }



async function getBooks() {

    //get all bookks with key title

    const url = baseUrl +  `api-db.php?op=get&group=${groupKey}&key=title`;

    let response =  await fetch(url);

   let data = await response.json();

   displayBooks(data);

}
 
async function removeBooks() {

    //remove all books with key title
    const url = baseUrl +  `api-db.php?op=remove&group=${groupKey}&key=title`;    
     let response =  await fetch(url);

     let data = await response.json();

     console.log(data);

}
 function removeText() {

  while(booksElem.firstChild) booksElem.removeChild(booksElem.firstChild)

 }

document.querySelector('.addBook').addEventListener('click', () => { // add click in here
    //lägg till bok


  let bookTitle = document.querySelector('#searchInput').value; // search input in HTml
 
  removeMessage(); 

  setBook(bookTitle); // it is important to pur set book function under book title variable. Otherwise it doesnt work.

});

document.querySelector('.getAllbooks').addEventListener( 'click', () => {
    //hämtar alla böcker
  getBooks();
 

});

document.querySelector('.removeAllBooks').addEventListener( 'click', () => {

removeBooks();

removeText();

});

// we made this function inactive after we took a group key from console.
//getKey(); 



function getDataFromApi(query){
    let keyWord = encodeURIComponent(query)
    const URL = `https://www.googleapis.com/books/v1/volumes?q=${keyWord}`;
    const XHR = new XMLHttpRequest();
    XHR.addEventListener("load", display);
    XHR.open("GET", URL);
    XHR.send();
}

getDataFromApi('software development')



let itemsContainer = document.querySelector(".itemsContainer .container")

function display() {

    let data = JSON.parse(this.responseText);
    let {items} = data;

    // console.log(items)
    itemsContainer.innerHTML =""
    items.forEach(element => {
        let item = document.createElement('div');
        item.classList.add("item");
        let description = element.volumeInfo.description;
        // console.log(description)

        let img = document.createElement('img');
        img.src = element.volumeInfo.imageLinks.thumbnail;
        let itemText = document.createElement('div');
        itemText.classList.add('itemText');

        let bookName = document.createElement('h4');
        bookName.classList.add('bookName');
        bookName.innerText = element.volumeInfo.title;
        if (bookName.innerText.length >= 30) {
            bookName.style.fontSize = '.9rem';
        }


        let shortDes = document.createElement('p');
        shortDes.classList.add('shortDes');
        shortDes.innerText = element.volumeInfo.description;


        let authorName = document.createElement('p');
        authorName.classList.add('authorName');
        authorName.innerText = element.volumeInfo.authors;

        let btnContainer = document.createElement('div');
        btnContainer.classList.add('btnContainer');

        let detailsBtn = document.createElement('button');
        detailsBtn.classList.add('btn')
        detailsBtn.innerText = "view Details"

        let addToCartBtn = document.createElement('button');
        addToCartBtn.classList.add('btn')
        addToCartBtn.classList.add('addToCartBtn')
        addToCartBtn.innerText = "add to cart"

        btnContainer.append(detailsBtn,addToCartBtn);
        itemText.append(bookName, shortDes, authorName, btnContainer);
        item.append(img , itemText);
        itemsContainer.append(item);

        detailsBtn.addEventListener("click",(e)=>{
            e.preventDefault();
            addDetailsToLocalStorage(element);
        })
        addToCartBtn.addEventListener("click",(e)=>{
            e.preventDefault();
            addItems();
        })
    });

}

let searchInput = document.querySelector("#searchBar")
let searchBtn = document.querySelector("#searchBtn")

searchBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    if(searchInput.value != "") {
        getDataFromApi(searchInput.value)
    } else {
        console.error("There's no result for search.")
    }
})

function addDetailsToLocalStorage(element) {
    localStorage.setItem("details",JSON.stringify(element))
    window.location.href = "details.html"
}


//=====================================================================

let cart = document.querySelector("#cart")
let cartItems = document.querySelector("#cartItems")


function displayCart(){
    cartItems.classList.toggle("hide")
}


let addToCartBtn = document.querySelector("#addToCartBtn")
let cartCount = document.querySelector(".cartCount");
cartCount.innerHTML = 0;




function addItems(){
    cartItems.innerHTML += displayCartItems();
    cartCount.innerHTML = parseInt(cartCount.innerHTML) + 1;
}



function displayCartItems() {
    let data = { items: [] };
    let item = document.createElement("div");

data.items.forEach((element) => {
    let itemElement = document.createElement("div");
    itemElement.innerHTML = `
    <img src="${element.volumeInfo.imageLinks.thumbnail}" class="thumbnail">
    <h4 class="bookName">${element.volumeInfo.imageLinks.title}</h4>
    `;
    item.appendChild(itemElement);
});

return item.innerHTML;
}


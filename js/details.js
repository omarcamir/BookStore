let detail = JSON.parse(localStorage.getItem("details"))

let container = document.querySelector("#DetailsSection .container");

container.innerHTML = `
<img src="${detail.volumeInfo.imageLinks.thumbnail}" alt="" class="thumbnail">
<div class="itemText">
    <h4 class="bookName">${detail.volumeInfo.title}</h4>
    <p class="fullDes">
    ${detail.volumeInfo.description}
    </p>
    <div class="anotherDetails">
        <div class="author">
                <p>Author:</p>
                <h3 class="authorName"> ${detail.volumeInfo.authors}<h3>
            </div>
            <div class="publisher">
                <p>publisher : <span>${detail.volumeInfo.publisher}</span></p>
                <p>publish date : <span class="publisherDate">${detail.volumeInfo.publishedDate}</span></p>
            </div>
        </div>
    </div>
</div>
`
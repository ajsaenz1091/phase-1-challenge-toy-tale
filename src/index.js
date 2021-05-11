let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys(); // Call to the fetch function
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//URL FOR FETCH
const toysUrl = 'http://localhost:3000/toys'


//* This function handles the form submission and passed as the second parameter of an event handler
function submitDataHandler(){
  let formName = form.elements.namedItem("name").value;
  let formSrc = form.elements.namedItem("image").value;
  let formLikes = form.elements.namedItem("submit").value
  formData = {
    name: formName,
    image: formSrc,
    likes: formLikes 
  }
}

//* DATA RETRIEVED FROM THE FORM
let form = document.querySelector(".add-toy-form")
form.addEventListener('submit', submitDataHandler);

let formData = {
  name: "",
  image: "",
  likes: 0
};

//* CONFIGURATION OBJECT FOR THE POST REQUEST
const configObject = {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(formData)
}




function fetchToys(){
  return fetch(toysUrl, configObject)
  .then(res => res.json())
  .then(toysData => createCards(toysData))
}


//* This function is passed the toy data and uses it to create the cards.
function createCards(toysObjsArr){
  toysObjsArr.forEach((toy) => {
    let name = toy.name
    let srcUrl = toy.image
    let likes = toy.likes
    let id = toy.id
    let toyCollection = document.querySelector('#toy-collection')
    let cardContainer = document.createElement('div')
    cardContainer.setAttribute('class', 'card')
    let hTag = document.createElement('h2');
    hTag.innerHTML = name;
    let img = document.createElement('img');
    img.setAttribute('class','toy-avatar')
    img.src = srcUrl;
    let p = document.createElement('p');
    p.innerHTML = likes;
    let likeButton = document.createElement('button');
    likeButton.setAttribute('class', 'like-btn')
    likeButton.setAttribute('id', id)

    cardContainer.append(hTag,img,p,likeButton)
    toyCollection.appendChild(cardContainer);
  })
}

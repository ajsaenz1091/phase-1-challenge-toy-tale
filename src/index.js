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


// //* This function handles the form submission and passed as the second argument of an event handler
function submitDataHandler(){
  let formName = form.elements.namedItem("name").value;
  let formSrc = form.elements.namedItem("image").value;
  let formData = {
    "name": formName,
    "image": formSrc,
    "likes": 0
  };
  const configObject = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }
  console.log(formName, formSrc)
  formData.name = formName;
  postToys(configObject);
}
// // //* DATA RETRIEVED FROM THE FORM

// let formData = {
//   "name": formName,
//   "image": formSrc,
//   "likes": 10000
// };

// //* CONFIGURATION OBJECT FOR THE POST REQUEST
// const configObject = {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json"
//   },
//   body: JSON.stringify(formData)
// }

// const consfigObj = {
//   "name": "Jessie",
//   "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
//   "likes": 0
// }

let form = document.querySelector(".add-toy-form")
form.addEventListener('submit', submitDataHandler);

function postToys(configObject){
  fetch(toysUrl, configObject)
  .then(res => res.json())
  .then(newToy => addToCollection(newToy))
}


function addToCollection(toy){
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
}


function fetchToys(){
   fetch(toysUrl)
  .then(res => res.json())
  .then(toysData => createCards(toysData))
}

function handleLikes(event){

  let id = event.target.id;

  let likesField = event.target.parentElement.querySelector('p');//*grabs the p tag of the clicked card

  let cardLikes = parseInt(likesField.innerHTML); //*grabs the inner html of the p tag of the clicked card
  console.log(cardLikes)


  //* BUILD DATA OBJECT TO PASS ON TO CONFIG OBJECt
  likesData = {
      "likes": cardLikes + 1  //* we are changing the "likes" value to one more evry click
  }
  //* BUILD CONFIGURATION OBJECT FOR PATCH REQUEST
  const patchObj = { // note we are going to 
    method: "PATCH",
    headers: {
        "Content-Type" : "application/json"
      },
    body: JSON.stringify(likesData)
  }
  fetch(`http://localhost:3000/toys/${id}`,patchObj)
  .then(res => res.json())
  .then(toyObj => likesField.innerHTML = toyObj.likes)//* updates likes in DOM before patching the change to the database
  
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
    likeButton.addEventListener('click', handleLikes)

    cardContainer.append(hTag,img,p,likeButton)
    toyCollection.appendChild(cardContainer);
  })
}

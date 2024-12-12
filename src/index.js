console.log('%c HI', 'color: firebrick')


//API urls
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
let myDogBreed = []
// ensure that your JavaScript doesn't run until after the HTML has loaded
document.addEventListener('DOMContentLoaded', ()=>{
   //function to display  dog images 
   /*The displayDogImages function fetches the images from the URL and appends
    them as image elements inside the dog-image-container.*/   
function displayDogImages(){
    fetch(imgUrl)
    .then(response => response.json())
    .then(myBreeds =>{
        myBreeds.message.forEach(function(image){
            const dogImage = document.createElement('img')
            dogImage.src = image;
        const dogImageContainer = document.getElementById('dog-image-container')
        dogImageContainer.appendChild(dogImage)
            //console.log(dogImageCOntainer)
        })
    })
}
displayDogImages()

//function to display dog breeds(name)
/*The displayDogBreed function fetches the breeds, processes the response, 
and adds each breed as a <li> inside the dog-breeds list.*/
function displayDogBreed(){
    
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(dogBreed =>{
        myDogBreed = Object.keys(dogBreed.message)
        myDogBreed.forEach(function(breed){
            addBreed(breed)
            filterDogBreed()

        })
    })
}
displayDogBreed()
function filterDogBreed() {
    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', function (e) {
       filterDog(e.target.value)

    });
}
//function that filters the dog according to the letters they start with e.g a,b
function filterDog(text){
    updateBreeds(myDogBreed.filter(breed => breed.startsWith(text)))
}
function updateBreeds(dogs){
    const ul = document.querySelector('#dog-breeds')
    let updateChild = ul.lastElementChild;
    // Remove all existing list items before adding the filtered breeds
       while(updateChild){
            ul.removeChild(updateChild);
            updateChild = ul.lastElementChild;
       }
    dogs.forEach(dog=>addBreed(dog))
}
/*Inside the addBreed function, an event listener is added to each <li>,
which changes the font color to green when clicked.*/
function addBreed(breed){
    const ul = document.querySelector('#dog-breeds')
    const li = document.createElement('li')
    li.innerText = breed;
    ul.appendChild(li);
    li.style.cursor = 'pointer'
    li.addEventListener('click', ()=>{
        //add style color to the list of dog breeds changing the font color on click to green
        li.style.color  = 'green'
    })
}
});


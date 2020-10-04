const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API Setup
let initialLoad = true;
let initialCount = 5;
const apiKey = 'N63UqnWFg0jnz7mdNpZmYT3-oBh-tPUVu01sIcVZvC0';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;


// Updated api URL with new count

function updateApiCount(imgCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imgCount}`;
}

// check if all images were loaded

function imgLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        // count = 30;
        // apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}

//helper function
function setAttributes(element, attributes) {
   for (const key in attributes){
       element.setAttribute(key, attributes[key]);
   } 
}
// Create elements for links & photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    //run function for each object in photosArray
    photosArray.forEach((photo) =>{
        //create <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event listner, check when each is finished loading
        img.addEventListener('load', imgLoaded)
        //Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        // console.log(photosArray)   
        displayPhotos();
        if (initialLoad) {
            updateApiCount(30)
            initialLoad = false
        }     
    } catch (error) {
        console.log(error)
    }
}

// Check to see user scroll near bottom of page then load more photos

window.addEventListener('scroll', ()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {       
      ready = false;
        getPhotos();
        
    }
});

getPhotos();
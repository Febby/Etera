const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let photosArray = [];
//Unsplash API Setup
const count = 10;
const apiKey = 'N63UqnWFg0jnz7mdNpZmYT3-oBh-tPUVu01sIcVZvC0';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//helper function
function setAttributes(element, attributes) {
   for (const key in attributes){
       element.setAttribute(key, attributes[key]);
   } 
}
// Create elements for links & photos, add to DOM
function displayPhotos() {
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
    } catch (error) {
        console.log(error)
    }
}

getPhotos();
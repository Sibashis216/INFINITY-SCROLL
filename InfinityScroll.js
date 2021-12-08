const imagecontainer = document.getElementById('image-container')
const loader = document.getElementById('loader')
let ready = false;
let imagesloaded =0;
let totalimages =0;
let photosarray = [];
let count = 5;
const apikey = `DetjLDgkZMvi3JvId9-DJpWLTXUmQPUcXpjqPwc1KOA`;
let apiurl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

// check if all images were loaded
function imageloaded(){
    imagesloaded++;
    if(imagesloaded === totalimages){
        ready = true;
        loader.hidden =true;  
        count =15;
        apiurl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;
    }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// create photos for linmks and photos, add to dom
function displayphotos(){
    imagesloaded = 0;
    totalimages = photosarray.length;
    
    // Run function for each object in photosarray
    photosarray.forEach((photo) => {
    //   create <a> to link to unsplash
     const item = document.createElement('a');
    setAttributes(item, {
    href:photo.links.html,
    target: '_blank',
    });         

    //   create <img> for photo
    const img = document.createElement('img');
     setAttributes(img, {
         src: photo.urls.regular,
         alt:photo.alt_description,
         title:photo.alt_description,
     })       
    //  Event Listener , check when each is finished loading
    img.addEventListener('load',imageloaded);                   
    // put <img> inside <a> , then put both inside imagecontainer element                        
    item.appendChild(img);
    imagecontainer.appendChild(item);
    });
}

//get photoss from unssplaassh aapi
async function getphotos(){
    try{
        const response = await fetch(apiurl);
        photosarray = await response.json();
        displayphotos();
    } catch{ 
        // catch error here

    }
}
// check to see if scrolling near bottom of pageXOffset, load more photos
window.addEventListener('scroll' ,()=> {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
       ready = false;
      
        getphotos();
    }
})

// on load
getphotos();

import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const searchForm = document.querySelector(".search-form")
const searchInput = document.querySelector(".search-form input[name='searchQuery']")
const searchButton = document.querySelector(".search-form button")
const gallery = document.querySelector(".gallery")
const loadMoreBtn = document.querySelector(".load-more")

const API_KEY = "38123861-5044a45b99316196e4506c2b7";
const lightBox = new SimpleLightbox(".gallery a", {
  captionType: "alt",
  captionsData: "alt",
  captionPosition: "bottom",
  captionDelay: 250,
});

let page = 1;


const fetchPictures = async () => {
    const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(searchInput.value)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
    if(response.data.totalHits === 0){
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
       }
    const imgs = await response.data
    return imgs 
}

searchForm.addEventListener("submit", (e) => {
 e.preventDefault()
 
 if(searchInput.value === ""){
    Notiflix.Notify.failure("Fill in the input")
    return
 }
 page= 1
gallery.innerHTML = ""
 fetchPictures()
 .then(imgs => {
    
    console.log(imgs)
    page += 1;
     renderImgList(imgs)
     lightBox.refresh()})
    .catch(error => console.error(error))
 
    loadMoreBtn.style["visibility"] = "visible"
   
  
})
loadMoreBtn.addEventListener("click", () => {
   
    fetchPictures()
 .then(imgs => {
    if(page > imgs.totalHits/40){
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
        return
    }
    console.log(imgs)
    page += 1;
     renderImgList(imgs)
     lightBox.refresh()})
    .catch(error => console.error(error))
   
})

function renderImgList(imgs) {
   const markup = imgs.hits
      .map((img) => {
        return `<div class="photo-card">
        <a class="gallery__link" href="${img.largeImageURL}">
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes:${img.likes}</b>
          </p>
          <p class="info-item">
            <b>Views:${img.views}</b>
          </p>
          <p class="info-item">
            <b>Comments:${img.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads:${img.downloads}</b>
          </p>
        </div>
      </div>`;
      })
      .join("");
    gallery.insertAdjacentHTML("beforeend", markup);
  }

  
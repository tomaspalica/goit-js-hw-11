import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_G9FX9sbB8zLBZkWaWRv5bUzcXbwrSosEEWTL4iIasUttjgo8dqJz6pjhjQKhuVqA";
import {fetchBreeds, fetchCatByBreed } from "./cat-api";
const loader = document.querySelector(".loader")
const btn = document.querySelector(".button")
const er = document.querySelector(".error")
const select = document.querySelector(".breed-select")
const catInfo = document.querySelector(".cat-info")

let catImg = document.createElement("img");




function renderCats(users){
    

    const markup = users
    .map((user) => {
        
        return `<option value='${user.reference_image_id}'>${user.name}</option>`
        
    })
    .join("");
    
    select.innerHTML = markup
  }

  fetchBreeds()
    .then((users) => renderCats(users))
    .catch((error) => console.log(error));

    select.addEventListener("change", () => {
        fetchCatByBreed(select.value).then((user) => renderCatsInfo(user))
    .catch((error)=> console.log(error))
    })

    function renderCatsInfo(user){
        
        catInfo.innerHTML = ""
        loader.style["display"] = "block"
  
        console.log(user)

    setTimeout(() => {
        const markup = `<div class ="box-div"><h2 class ="cat-Name">${user.breeds[0].name}</h2><p class = "cat-description">${user.breeds[0].description}</p><p>Temperament: ${user.breeds[0].temperament}</p></div>`
        loader.style["display"] = "none"
        
        
     catImg = document.createElement("img")
    catImg.src = user.url
catImg.style.width = "500px"
catImg.style.height = "400px"
   

    catInfo.appendChild(catImg)
    catInfo.innerHTML += markup
    
    }, 2000);

        }
    
   
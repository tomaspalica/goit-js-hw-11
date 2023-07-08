import axios from "axios";
import Notiflix from 'notiflix';
const searchForm = document.querySelector(".search-form")
const searchInput = document.querySelector(".search-form input[name='searchQuery']")
const searchButton = document.querySelector(".search-form button")
const gallery = document.querySelector(".gallery")
const loadMoreBtn = document.querySelector(".load-more")

const myKey = "example";
let q = searchInput.value
let page = 1;
searchInput.addEventListener("input", () => {
    console.log(searchInput.value)
})
searchForm.addEventListener("submit", (event) => {
    event.preventDefault()
    console.log(searchInput.value)
})
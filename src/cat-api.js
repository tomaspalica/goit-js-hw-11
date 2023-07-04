function fetchBreeds() {
    return fetch("https://api.thecatapi.com/v1/breeds").then(
      (response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
      
        return response.json();
       
      }
    );
  }
  

function fetchCatByBreed(breedId) {
    const url = `https://api.thecatapi.com/v1/images/${breedId}`;
    
  

    return fetch(url)
      .then(response => {
        
        if (!response.ok) {
          throw new Error('Request failed');
        }
        console.log(response)
        return response.json();
      })
      .then(data => {
        if (data.length === 0) {
          throw new Error('No cat data available');
        }
        
        return data;
      });
  }


  export {fetchBreeds, fetchCatByBreed}
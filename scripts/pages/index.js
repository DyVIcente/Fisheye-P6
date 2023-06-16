function getPhotographers() {
    // FETCH
    return fetch(('data/photographers.json'))
    .then(response => response.json());
}

function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Ouvre les liens avec le keyboard
    function openLink(event) {
        if (event.keyCode === 13) {
          window.location.href = "index.html";
        }
      }
      
      const homeLink = document.getElementById("homeLink");
      homeLink.addEventListener("keydown", openLink);
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};
    
    init();
    

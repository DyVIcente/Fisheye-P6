function getPhotographers() {
    return fetch('data/photographers.json')
        .then(response => response.json());
}

function displayPhotographerData(photographer) {
    const photographersHeader = document.querySelector(".photograph-header");
    const contactButton = document.querySelector(".contact_button");
    const pricePerDay = document.querySelector(".pricePerDay");


    const photographerModel = photographerFactory(photographer);
    const userProfile = photographerModel.getUserProfilDOM();
    const userPicture = photographerModel.getUserPictureDOM();
    const userPrice = document.createTextNode(photographerModel.price);

    photographersHeader.insertBefore(userProfile,photographersHeader.firstChild);
    photographersHeader.appendChild(userPicture);

    pricePerDay.insertBefore(userPrice, pricePerDay.firstChild);
}

function displayWorkData(medias) {
    const photographerWork = document.querySelector(".photograph-work");
    

    
    const works = medias.filter( media => media.photographerId == getPhotographerId() )

    works.forEach((media) => {
        const photographerWorkModel = mediaFactory(media);
        const userWorkDOM = photographerWorkModel.getUserMedia();
        photographerWork.appendChild(userWorkDOM);
    });
}

function getPhotographerId() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params.photographer;
}

function like(event) {
    const target = event.currentTarget;

    if ( !target.hasAttribute('liked') ) {
        target.setAttribute('liked','');
        target.querySelector(".number-likes").textContent = parseInt(target.textContent)+1;
        updateTotalLikes();
    }
}

function updateTotalLikes() {
    const pictures = document.querySelector(".photograph-work");
    const likes = pictures.querySelectorAll(".number-likes");
    const totalLikesNumber = document.querySelector(".totalLikesNumber");

    let totalLikes = 0;
    likes.forEach( like => totalLikes += parseInt(like.textContent) )

    totalLikesNumber.textContent = totalLikes;
}

function dropdown(event) {
    const button = event.currentTarget;
    const dropdown = button.parentNode;
    dropdown.classList.toggle('dropdown-open');
    if (dropdown.classList.contains('dropdown-open')) {
        button.setAttribute('aria-expanded', true);
    } else {
        button.setAttribute('aria-expanded', false);
    }
    setTimeout( () => button.focus() , 50);
    }

function selectDropdownOption(event) {
    const target = event.currentTarget;
    const option = target.dataset.value;
    const dropdownList = target.parentNode;
    const dropdown = target.parentNode.parentNode;
    const button = dropdown.querySelector("button");

    const currentDropdown = dropdown.querySelectorAll(".dropdown-hide");
    for (let i = 0; i < currentDropdown.length; i++) {
        currentDropdown[i].classList.remove("dropdown-hide");
        currentDropdown[i].setAttribute("aria-selected","false");
    }
    
    target.classList.add("dropdown-hide");
    target.setAttribute("aria-selected","true");

    dropdown.dataset.value = option;
    dropdown.querySelector('button').textContent = dropdown.querySelector(`[data-value=${option}]`).textContent;

    dropdown.classList.toggle('dropdown-open');
    if (dropdown.classList.contains('dropdown-open')) {
        button.setAttribute('aria-expanded', true);
    } else {
        button.setAttribute('aria-expanded', false);
    }
    dropdownList.setAttribute("aria-activedescendant",target.id);

    orderWork();
    setTimeout( () => dropdown.querySelector('button').focus() , 50);
}

function orderWork() {
    const photographWork = document.querySelector(".photograph-work");
    let contentNodes = document.querySelectorAll('.thumb-imgfull');
    const order = document.querySelector(".dropdown").dataset.value;
    let content = Array.prototype.slice.call(contentNodes);
    
    switch (order) {
        case "popularity":
            content.sort(
                function(item, nextItem){
                    let firstNumber = parseInt(item.querySelector(".number-likes").textContent);
                    let secondNumber = parseInt(nextItem.querySelector(".number-likes").textContent);
                    return secondNumber - firstNumber;
                }
            )
            break;
        case "date":
            content.sort(
                function(item, nextItem){
                    let firstString = item.querySelector("[data-date]").dataset.date;
                    let secondString = nextItem.querySelector("[data-date]").dataset.date;
                    return secondString.localeCompare(firstString);
                }
            )
            break;
        case "title":
            content.sort(
                function(item, nextItem){
                    let firstString = item.querySelector(".thumb-imgfull>:nth-child(2)").textContent.toLowerCase();
                    let secondString = nextItem.querySelector(".thumb-imgfull>:nth-child(2)").textContent.toLowerCase();
                    return firstString.localeCompare(secondString);
                }
            )
            break;
        default:
            break;
    }

    photographWork.innerHTML = "";
    content.forEach(item => photographWork.appendChild(item));
}

async function init() {
    // header
    const fisheyeHomePage = document.querySelector('a[aria-label="Fisheye Home page"]');
    fisheyeHomePage.addEventListener("keydown", openlink);


    // modal 
    const contactButton = document.querySelector(".contact_button");
    contactButton.addEventListener("click", displayModal);

    // dropdown
    const dropdownButton = document.querySelector(".dropdown button");
    dropdownButton.addEventListener("click", dropdown);

    const dropdownOptions = document.querySelectorAll(".dropdown [data-value]");
    dropdownOptions.forEach(option => {
        option.addEventListener("click", selectDropdownOption);
    });

    const popularityDropdown = document.getElementById("popularityDropdown");
    popularityDropdown.addEventListener("click", selectDropdownOption);
    popularityDropdown.addEventListener("keydown", handleKeyDown);

    // img lightbox
    const previousImage = document.querySelector('img.previous');
    previousImage.addEventListener("click", lightboxControl);
    previousImage.addEventListener("keydown", handleKeyDown);

    // close lightbox
    const closeButton = document.querySelector('img[role="button"]');
    closeButton.addEventListener("click", closeLightbox);
    closeButton.addEventListener("keydown", handleKeyDown);

    // form 
    const myForm = document.querySelector("#myForm");

    myForm.addEventListener("submit", function(event) {
        event.preventDefault(); 
    
    // Récupérer les valeurs des champs de saisie
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const email = document.querySelector("#email").value;
    const message = document.querySelector("#yourMessage").value;
    
    // Afficher les valeurs dans la console
    console.log("Prénom:", firstName);
    console.log("Nom:", lastName);
    console.log("Email:", email);
    console.log("Message:", message);
    
    // Réinitialiser le formulaire
    myForm.reset();
});





    const { photographers, media } = await getPhotographers();

    const photographer = photographers.find( photographe => photographe.id == getPhotographerId() );

    document.querySelector(".modal header>h2").textContent = photographer.name;
    document.querySelector(".modal header>h1").setAttribute("arial-label",`Contact me ${photographer.name}`)

    displayPhotographerData(photographer);
    displayWorkData(media);

    orderWork();
    updateTotalLikes();
};
    
init();
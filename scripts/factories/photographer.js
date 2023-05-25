function photographerFactory(data) {
    const { name, portrait, id, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.className = 'photographer-article';

        const link = document.createElement('a');
        link.href = `photographer.html?photographer=${id}`
        link.ariaLabel = name;
        link.setAttribute("onkeydown", "openlink(event)");

        const img = getUserPictureDOM();

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const location = document.createElement('p');
        location.textContent = `${city}, ${country}`;

        const tag = document.createElement('p');
        tag.textContent = tagline;

        const prices = document.createElement('p');
        prices.textContent = `${price}€/jour`;
        
        
        article.appendChild( link);
        link.appendChild( img );
        link.appendChild( h2 );
        article.appendChild( location );
        article.appendChild( tag );
        article.appendChild( prices );

        return (article);
    }

    function getUserPictureDOM() {
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', name);
        img.setAttribute('loading', 'lazy');
        img.className = 'user'

        return (img);
    }

    function getUserProfilDOM() {
        const profil = document.createElement('div');
        profil.className = 'photographer-profile';

        const title = document.createElement('h1');
        title.textContent = name;

        const location = document.createElement('h2');
        location.textContent = `${city}, ${country}`;

        const tag = document.createElement('p');
        tag.textContent = tagline;

        profil.appendChild(title);
        profil.appendChild(location);
        profil.appendChild(tag);

        return (profil);
    }





    return { getUserPictureDOM, getUserProfilDOM, getUserCardDOM  }
}
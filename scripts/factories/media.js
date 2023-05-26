function mediaFactory(data) {
    
    const { title, image, video, likes, date, altText } = data;
    const picture = `assets/images/${image}`;
    const videoMedia = `assets/images/${video}`;

    function getMediaDOM() {
        var media = undefined;

        if( image != undefined ) {media
            media = document.createElement('img');
            media.src = picture;
            media.alt = title;
            media.setAttribute("loading", "lazy");
        } else if( video != undefined ) {
            media = document.createElement('video');
            media.src = videoMedia;
            media.title = title;
            media.setAttribute("preload", "metadata");
        }

        media.setAttribute("onclick", "lightbox(event)");
        media.setAttribute("onkeydown", "handleKeyDown(event)?lightbox(event):undefined");
        media.setAttribute("aria-haspopup", "dialog");
        media.setAttribute("aria-label", altText);
        media.setAttribute("tabindex", 0);
        media.dataset.date = date;
        media.className = 'thumb-img';

        return media
    }

    function getUserMedia() {
        const figure = document.createElement('figure');
        figure.className = 'thumb-imgfull';
        
        var media = getMediaDOM();

        const figcaption = document.createElement('figcaption');

        const mediaTitle = document.createElement('h2');
        mediaTitle.textContent = title;

        const Likes = document.createElement('div');
        Likes.setAttribute("onclick", 'like(event)');
        Likes.setAttribute("role", "button");
        Likes.className = 'likes';
        Likes.ariaLabel = 'likes';

        const mediaLikes = document.createElement('span');
        mediaLikes.className = 'number-likes';
        mediaLikes.textContent = likes;
        
        const imgLikes = document.createElement('img');
        imgLikes.src = 'assets/icons/heart.svg';
        imgLikes.alt = 'likes';

        figcaption.appendChild(mediaTitle);
        figcaption.appendChild(Likes);

        figure.appendChild(media);
        figure.appendChild(figcaption);

        Likes.appendChild(mediaLikes);
        Likes.appendChild(imgLikes);

        return figure;
    }

    return { getUserMedia }
}
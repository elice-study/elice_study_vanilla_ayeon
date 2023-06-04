function movieLoad() {
    return fetch('../db/movieData.json')
        .then((Response) => Response.json())
        .then((json) => json.movies);
}

movieLoad().then((movies) => {
    console.log(movies);
    movieList(movies);
});

function movieList(movies) {
    let movieImgLoad = document.querySelector('.contents-box');

    for (let i = 0; i < 32; i += 4) {
        let imgBoxDiv = document.createElement('div');
        imgBoxDiv.setAttribute('class', 'img-box');

        imgBoxDiv.innerHTML = `
            <img src='${movies[i].posterImageFileName}' alt="" />
            <img src='${movies[i + 1].posterImageFileName}' alt="" />
            <img src='${movies[i + 2].posterImageFileName}' alt="" />
            <img src='${movies[i + 3].posterImageFileName}' alt="" />
            `;

        movieImgLoad.appendChild(imgBoxDiv);
    }
}

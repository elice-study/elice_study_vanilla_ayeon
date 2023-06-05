function movieLoad() {
    // fetch 를 통해 해당하는 파일의 경로를 통해서 movieData.json 접근
    return (
        fetch('../db/movieData.json')
            // then 을 통해 성공적으로 받아오면 response 획득 -> json 형태로 변환하기 위해 response.json
            .then((Response) => Response.json())
            // json 에 있는 movies 만 받아오기 위해 json.movies
            .then((json) => json.movies)
    );
}

// Main Movie-Img List Display
movieLoad().then((movies) => {
    // 제대로 받아와지는지 확인
    // console.log(movies);
    movieList(movies);
});

let movieImgLoad = document.querySelector('.contents-box');

function movieList(movies) {
    for (let i = 0; i < 32; i++) {
        let imgBoxDiv = document.createElement('div');
        imgBoxDiv.setAttribute('class', 'img-box');

        imgBoxDiv.innerHTML = `<img src='${movies[i].posterImageFileName}' alt="" id='${i}' />`;

        movieImgLoad.appendChild(imgBoxDiv);
    }

    // Modal Open
    let openModalBtn = document.querySelectorAll('.img-box > img');

    openModalBtn.forEach((btn) => {
        // img tag console check
        // console.log(btn, 'img tag');

        btn.addEventListener('click', () => {
            // img id=${i} 값을 변수로 지정
            let imgId = btn.id;

            // img id 값을 매개변수로 넘겨줌
            modalOpenClose(imgId);

            // 스크롤 제거
            document.body.style.overflow = 'hidden';
        });
    });
}

// Modal Close
// imgId 값을 받아와서 movies[imgId] = json data 배열에서 [imgId]번째 가져오기
function modalOpenClose(imgId) {
    movieLoad().then((movies) => {
        // 제대로 넘어오는지 확인
        // console.log(num, typeof num, 'modal');
        let div = document.createElement('div');

        div.setAttribute('id', 'modal');
        div.innerHTML = `
        <div class='modal-content'>
            <div id="close-box">
                <i class="fa-solid fa-xmark close-modal"></i>
            </div>

            <div class="movieMain-box">
                <div class="movie-box">
                    <div class="movieTitle-box">
                        <span>${movies[imgId].title}</span>
                        <p>${movies[imgId].permissibleAge}세 | ${movies[imgId].runningTimeMinutes}분</p>
                    </div>

                    <div class="movieContents-box">
                        <div class="creator-box">
                            <span>Creator</span>
                            <p>${movies[imgId].creator}</p>
                        </div>

                        <div class="actor-box">
                            <span>Actor</span>
                            <p>${movies[imgId].castMembers}</p>
                        </div>

                        <div class="summary-box">
                            <p>
                            ${movies[imgId].description}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="detailImg-box">
                    <img src="${movies[imgId].posterImageFileName}" alt="" />
                </div>
            </div>
        </div>`;

        // div body 시작 부분에 삽입
        document.body.prepend(div);

        let closeModalBtn = document.querySelector('.close-modal');

        closeModalBtn.addEventListener('click', (event) => {
            // 가장 가까이 있는 #modal 찾기
            const modal = event.target.closest('#modal');

            //모달 요소의 부모 노드에서 모달을 제거
            modal.parentNode.removeChild(modal);

            // 스크롤 등장
            document.body.style.overflow = 'unset';
        });
    });
}

function movieLoad() {
    return fetch('../db/movieData.json')
        .then((Response) => Response.json())
        .then((json) => json.movies);
}

movieLoad().then((movies) => {
    console.log(movies);
    movieList(movies);
});

// Main Movie-Img List
let movieImgLoad = document.querySelector('.contents-box');

function movieList(movies) {
    for (let i = 0; i < 32; i++) {
        let imgBoxDiv = document.createElement('div');
        imgBoxDiv.setAttribute('class', 'img-box');

        imgBoxDiv.innerHTML = `<img src='${movies[i].posterImageFileName}' alt="" />`;

        movieImgLoad.appendChild(imgBoxDiv);
    }

    // Modal Open
    let openModalBtn = document.querySelectorAll('.img-box > img');

    openModalBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            modalOpenClose();

            // 스크롤 제거
            document.body.style.overflow = 'hidden';
        });
    });
}

const modal = `
<div class='modal-content'>
    <div id="close-box">
        <i class="fa-solid fa-xmark close-modal"></i>
    </div>

    <div class="movieMain-box">
        <div class="movie-box">
            <div class="movieTitle-box">
                <p>유령</p>
                <p>15세 | 132분</p>
            </div>

            <div class="movieContents-box">
                <div class="creator-box">
                    <p>Director</p>
                    <p>이해영</p>
                </div>

                <div class="actor-box">
                    <p>Actor</p>
                    <p>설경구, 이하늬, 박소담, 박해수, 서현우</p>
                </div>

                <div class="summary-box">
                    <p>
                                    “유령에게 고함. 작전을 시작한다” 1933년, 일제강점기 경성. 항일조직 ‘흑색단’의 스파이인
                                    ‘유령’이 비밀리에 활약하고 있다. 새로 부임한 경호대장 카이토는 ‘흑색단’의 총독 암살
                                    시도를 막기 위해 조선총독부 내의 ‘유령’을 잡으려는 덫을 친다. 영문도 모른 채, ‘유령’으로
                                    의심받고 벼랑 끝 외딴 호텔에 갇힌 용의자들. 총독부 통신과 감독관 쥰지, 암호문 기록 담당
                                    차경, 정무총감 비서 유리코, 암호 해독 담당 천계장, 통신과 직원 백호. 이들에게 주어진
                                    시간은 단 하루 뿐. 기필코 살아나가 동지들을 구하고 총독 암살 작전을 성공시켜야 하는
                                    ‘유령’과 무사히 집으로 돌아가고 싶은 이들 사이, 의심과 경계는 점점 짙어지는데… 과연
                                    ‘유령’은 작전에 성공할 수 있을 것인가? “성공할 때까지 멈춰서는 안 된다”
                    </p>
                </div>
            </div>
        </div>
                    
        <div class="detailImg-box">
            <img src="/assets/img/movie-img/movie_1.jpg" alt="" />
        </div>
    </div>
</div>`;

// Modal Close
function modalOpenClose() {
    let div = document.createElement('div');

    div.setAttribute('id', 'modal');
    div.innerHTML = modal;

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
}

document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    const slideCount = slides.length;
    const slideWidth = slides[0].clientWidth;

    // 슬라이더를 첫 번째 이미지 위치로 설정
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    // 다음 버튼 클릭 이벤트
    nextBtn.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex >= slideCount) {
            currentIndex = 0; // 마지막 슬라이드에서 첫 슬라이드로
        }
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    });

    // 이전 버튼 클릭 이벤트
    prevBtn.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = slideCount - 1; // 첫 슬라이드에서 마지막 슬라이드로
        }
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    });

    // 창 크기 변경 시 슬라이드 너비 재계산 (반응형 대응)
    window.addEventListener('resize', () => {
        const newSlideWidth = slides[0].clientWidth;
        slider.style.transform = `translateX(-${currentIndex * newSlideWidth}px)`;
    });
});

// script.js 파일의 기존 슬라이더 코드 아래에 추가하세요.

document.addEventListener('DOMContentLoaded', function () {
    // ... 기존 이미지 슬라이더 코드 ...

    // 👇 스크롤 이벤트 리스너 추가 👇
    const header = document.querySelector('header'); // 대상을 header로 변경

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('navbar-scrolled'); // header에 클래스 추가
        } else {
            header.classList.remove('navbar-scrolled'); // header에서 클래스 제거
        }
    });
});


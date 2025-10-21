document.addEventListener('DOMContentLoaded', () => {
    // 50개의 포트폴리오 더미 데이터 생성
    const dummyData = Array.from({ length: 10 }, (_, i) => {
        const id = 50 - i;
        const hasImage = Math.random() > 0.1; // 90% 확률로 이미지 있음
        return {
            id: id,
            title: `여의도 불꽃축제 하이라이트 영상 (${id})`,
            author: `관리자`,
            date: `2025-10-${String(20 - (i % 20)).padStart(2, '0')}`,
            views: Math.floor(Math.random() * 5000) + 100,
            likes: Math.floor(Math.random() * 1000),
            comments: Math.floor(Math.random() * 100),
            imageUrl: hasImage ? `https://via.placeholder.com/400x225/FF5733/FFFFFF?text=Portfolio+${id}` : null
        };
    });

    let currentPage = 1;
    const itemsPerPage = 9; // 3x3 그리드를 위해 9개로 설정
    let filteredData = [...dummyData];

    const gridContainer = document.getElementById('portfolio-grid');
    const paginationContainer = document.querySelector('.pagination');
    const sortOption = document.getElementById('sort-option');

    // 카드 렌더링 함수
    function renderPortfolio() {
        gridContainer.innerHTML = '';
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageItems = filteredData.slice(startIndex, endIndex);

        if (pageItems.length === 0) {
            gridContainer.innerHTML = '<p>게시물이 없습니다.</p>';
            return;
        }

        pageItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'portfolio-card';

            const thumbnail = item.imageUrl
                ? `<img src="${item.imageUrl}" alt="${item.title}">`
                : '<span>No Image</span>';

            card.innerHTML = `
                <div class="card-thumbnail">
                    ${thumbnail}
                </div>
                <div class="card-content">
                    <h3>${item.title}</h3>
                    <div class="card-meta">
                        <span>조회수 ${item.views.toLocaleString()}</span>
                        <span>추천 ${item.likes.toLocaleString()}</span>
                        <span>댓글 ${item.comments.toLocaleString()}</span>
                    </div>
                </div>
            `;
            gridContainer.appendChild(card);
        });
    }

    // 정렬 기능 함수
    function handleSort() {
        const sortBy = sortOption.value;
        filteredData.sort((a, b) => {
            switch (sortBy) {
                case 'likes':
                    return b.likes - a.likes;
                case 'comments':
                    return b.comments - a.comments;
                case 'latest':
                default:
                    return new Date(b.date) - new Date(a.date);
            }
        });
        currentPage = 1; // 정렬 후 첫 페이지로
        renderAll();
    }

    // 페이징 렌더링 함수 (기존과 동일)
    function renderPagination() {
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);

        const prevBtn = document.createElement('button');
        prevBtn.textContent = '«';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => { if (currentPage > 1) { currentPage--; renderAll(); }});
        paginationContainer.appendChild(prevBtn);

        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            if (i === currentPage) pageBtn.classList.add('active');
            pageBtn.addEventListener('click', () => { currentPage = i; renderAll(); });
            paginationContainer.appendChild(pageBtn);
        }

        const nextBtn = document.createElement('button');
        nextBtn.textContent = '»';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => { if (currentPage < totalPages) { currentPage++; renderAll(); }});
        paginationContainer.appendChild(nextBtn);
    }

    // 전체 렌더링 함수
    function renderAll() {
        renderPortfolio();
        renderPagination();
    }

    // 정렬 옵션 변경 시 이벤트 리스너
    sortOption.addEventListener('change', handleSort);

    // 초기 렌더링 (최신순으로 먼저 정렬 후 렌더링)
    handleSort();
});
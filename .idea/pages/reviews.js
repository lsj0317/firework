document.addEventListener('DOMContentLoaded', () => {
    // 30개의 더미 데이터 생성
    const dummyData = Array.from({ length: 30 }, (_, i) => {
        const id = i + 1;
        const authors = ['김민준', '이서연', '박도윤', '최지우', '정하은'];
        return {
            id: id,
            title: `정말 멋진 경험이었어요! (${id})`,
            author: authors[i % authors.length],
            date: `2025-10-${String(15 - (i % 15)).padStart(2, '0')}`,
            recommendations: Math.floor(Math.random() * 100)
        };
    });

    let currentPage = 1;
    const itemsPerPage = 10;
    let filteredData = [...dummyData];

    const tbody = document.getElementById('reviews-tbody');
    const paginationContainer = document.querySelector('.pagination');
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const searchOption = document.getElementById('search-option');

    // 테이블 렌더링 함수
    function renderTable() {
        tbody.innerHTML = '';
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageItems = filteredData.slice(startIndex, endIndex);

        if (pageItems.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4">검색 결과가 없습니다.</td></tr>';
            return;
        }

        pageItems.forEach(item => {
            const row = `
                <tr>
                    <td>${item.title}</td>
                    <td>${item.author}</td>
                    <td>${item.date}</td>
                    <td>${item.recommendations}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    }

    // 페이징 렌더링 함수
    function renderPagination() {
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);

        // 이전 버튼
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '«';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable();
                renderPagination();
            }
        });
        paginationContainer.appendChild(prevBtn);

        // 페이지 번호 버튼
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            if (i === currentPage) {
                pageBtn.classList.add('active');
            }
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderTable();
                renderPagination();
            });
            paginationContainer.appendChild(pageBtn);
        }

        // 다음 버튼
        const nextBtn = document.createElement('button');
        nextBtn.textContent = '»';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderTable();
                renderPagination();
            }
        });
        paginationContainer.appendChild(nextBtn);
    }

    // 검색 기능 함수
    function handleSearch() {
        const searchTerm = searchInput.value.trim();
        const option = searchOption.value;

        if (!searchTerm) {
            alert('내용을 입력해주세요.');
            return;
        }

        filteredData = dummyData.filter(item => {
            if (option === 'all') {
                return item.title.includes(searchTerm) || item.author.includes(searchTerm);
            } else if (option === 'title') {
                return item.title.includes(searchTerm);
            } else if (option === 'author') {
                return item.author.includes(searchTerm);
            }
            return false;
        });

        currentPage = 1; // 검색 후 첫 페이지로 리셋
        renderTable();
        renderPagination();
    }

    // 검색 버튼 클릭 이벤트
    searchBtn.addEventListener('click', handleSearch);

    // 엔터 키로 검색
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    // 초기 렌더링
    renderTable();
    renderPagination();
});
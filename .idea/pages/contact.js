document.addEventListener('DOMContentLoaded', () => {
    // 50개의 더미 데이터 생성
    const dummyData = Array.from({ length: 50 }, (_, i) => {
        const id = i + 1;
        const authors = ['김민준', '이서연', '박도윤', '최지우', '정하은', '조수민', '윤지후'];
        const isPrivate = Math.random() < 0.3; // 약 30% 확률로 비공개 글
        const status = ['답변대기', '답변완료'];
        return {
            id: id,
            title: `상품 배송 관련 문의입니다. (${id})`,
            author: authors[i % authors.length],
            date: `2025-10-${String(17 - (i % 17)).padStart(2, '0')}`,
            status: status[i % status.length],
            private: isPrivate,
        };
    });

    let currentPage = 1;
    const itemsPerPage = 10;
    let filteredData = [...dummyData];

    const tbody = document.getElementById('board-tbody');
    const paginationContainer = document.querySelector('.pagination');
    const modal = document.getElementById('login-modal');

    // 이름 마스킹 함수
    function maskName(name) {
        if (name.length > 1) {
            return name[0] + '*'.repeat(name.length - 1);
        }
        return name;
    }

    // 테이블 렌더링 함수
    function renderTable() {
        tbody.innerHTML = '';
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageItems = filteredData.slice(startIndex, endIndex);

        pageItems.forEach(item => {
            const row = document.createElement('tr');
            row.dataset.private = item.private; // 비공개 여부를 데이터 속성으로 저장

            const titleCell = item.private
                ? `<td>${item.title} <span class="lock-icon">🔒</span></td>`
                : `<td>${item.title}</td>`;

            const authorCell = `<td>${maskName(item.author)}</td>`;

            row.innerHTML = `
                ${titleCell}
                ${authorCell}
                <td>${item.date}</td>
                <td>${item.status}</td>
            `;
            tbody.appendChild(row);
        });
    }

    // 페이징 렌더링 함수 (reviews.js와 거의 동일)
    function renderPagination() {
        // ... (이전 프로젝트의 renderPagination 함수를 그대로 붙여넣으세요) ...
        // 여기서는 생략하겠습니다.
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);

        const prevBtn = document.createElement('button');
        prevBtn.textContent = '«';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) { currentPage--; renderAll(); }
        });
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
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) { currentPage++; renderAll(); }
        });
        paginationContainer.appendChild(nextBtn);
    }

    // 모달 제어 함수
    function showModal() { modal.classList.add('show'); }
    function hideModal() { modal.classList.remove('show'); }

    // 게시글 클릭 이벤트 (이벤트 위임 사용)
    tbody.addEventListener('click', (event) => {
        const row = event.target.closest('tr');
        if (row && row.dataset.private === 'true') {
            showModal();
        } else if (row) {
            // 공개글 클릭 시 상세 페이지로 이동하는 로직 (지금은 비워둠)
            console.log('공개 게시물을 클릭했습니다.');
        }
    });

    // 모달 버튼 이벤트
    document.getElementById('modal-cancel-btn').addEventListener('click', hideModal);
    document.getElementById('modal-confirm-btn').addEventListener('click', () => {
        // 로그인 페이지로 이동하는 로직
        alert('로그인 페이지로 이동합니다.');
        hideModal();
    });

    // 전체 렌더링 함수
    function renderAll() {
        renderTable();
        renderPagination();
    }

    // 초기 렌더링
    renderAll();

    // 글쓰기
    const writeBtn = document.getElementById('write-btn');
    writeBtn.addEventListener('click', () => {
        window.location.href = 'write.html';
    })
});
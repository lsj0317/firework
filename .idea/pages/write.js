// write.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('write-form');
    const submitBtn = document.getElementById('submit-btn');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // 폼의 기본 제출 동작을 막음

        // 폼 데이터 가져오기
        const name = document.getElementById('write-name').value;
        const phone = document.getElementById('write-phone').value;
        const category = document.getElementById('write-category').value;
        const title = document.getElementById('write-title').value;
        const content = document.getElementById('write-content').value;
        const password = document.getElementById('write-password').value;

        // 간단한 유효성 검사
        if (!name || !phone || !category || !title || !content || !password) {
            alert('모든 필수 항목을 입력해주세요.');
            return;
        }

        // 비밀번호 유효성 검사
        if (!/^\d{4}$/.test(password)) {
            alert('비밀번호는 숫자 4자리로 입력해주세요.');
            return;
        }

        const inquiryData = {
            name,
            phone,
            category,
            title,
            content,
            createdAt: new Date().toISOString() // 저장 시간
        };

        submitBtn.disabled = true;
        submitBtn.textContent = '제출 중...';

        try {
            // 3단계에서 만들 백엔드(Cloud Function) URL을 여기에 넣기
            const response = await fetch('YOUR_CLOUD_FUNCTION_URL_HERE', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inquiryData),
            });

            if (response.ok) {
                alert('문의가 성공적으로 제출되었습니다.');
                window.location.href = 'contact.html'; // 제출 후 문의 목록 페이지로 이동
            } else {
                throw new Error('서버 응답에 문제가 있습니다.');
            }
        } catch (error) {
            console.error('제출 중 오류 발생:', error);
            alert('제출에 실패했습니다. 나중에 다시 시도해주세요.');
            submitBtn.disabled = false;
            submitBtn.textContent = '제출하기';
        }
    });

    // 취소 버튼
    document.getElementById('cancel-btn').addEventListener('click', () => {
        if (confirm('작성을 취소하시겠습니까?')) {
            window.history.back(); // 뒤로 가기
        }
    });
});
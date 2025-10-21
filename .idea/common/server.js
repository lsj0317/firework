const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore();
const cors = require('cors')({ origin: true }); // CORS 라이브러리
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
    collection,
    addDoc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Functions 요청 컨텍스트.
 * @param {Object} res Cloud Functions 응답 컨텍스트.
 */
exports.submitInquiry = async (req, res) => {
    // 1. CORS 처리
    // 내 웹사이트에서 오는 요청을 허용합니다. (보안을 위해 '*' 대신 실제 도메인을 쓰세요)
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    // OPTIONS 메서드(preflight) 요청은 바로 204 응답
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    // 2. POST 메서드가 아니면 거부
    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
    }

    try {
        // 3. 프론트엔드에서 보낸 데이터(body)를 가져옵니다.
        const data = req.body;

        // 4. 데이터 유효성 검사 (서버에서도 한 번 더)
        if (!data.name || !data.phone || !data.category || !data.title) {
            res.status(400).send('Missing required fields.');
            return;
        }

        // 5. Firestore 'inquiries' 컬렉션에 데이터 추가
        const docRef = await firestore.collection('inquiries').add({
            name: data.name,
            phone: data.phone,
            category: data.category,
            title: data.title,
            content: data.content,
            password: data.password,
            createdAt: data.createdAt,
            status: 'pending' // 처리 상태 (기본값)
        });

        // 6. 성공 응답
        res.status(200).send({ message: 'Success', docId: docRef.id });

    } catch (error) {
        // 7. 오류 처리
        console.error('Error adding document: ', error);
        res.status(500).send('Internal Server Error');
    }
};
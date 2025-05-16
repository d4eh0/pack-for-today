// 기상청 대신 데이터를 응답하는 나만의 api서버 만들기
// 브라우저에서 만약 /api/weather?lat=xxx&lon=yyy로 요청하면 json으로 응답하는 것.

export default async function handler(req, res) {
    // async : 비동기함수, await 사용가능.
    // req : 클라이언트 요청 객체, res : 응답 객체
    const { lat, lon } = req.query; // latitude 위도, longitude 경도
    // 클라이언트가 API 요청시 사용하는 주소가 URL, 그 URL에 붙은 쿼리스트링을( lat,lon을) 가져옴.
    
    // ***추후에 여기서 기상청 API를 호출할 예정
    // ***지금은 임시로 더미데이터를 보냄.
    const dummy = {
        rain: 80,
        dust: 55,
        uv: 6,
        tempDiff :12,
    };
    
    res.status(200).json(dummy);
    // 더미 날씨 데이터를 json형식으로 응답. 응답코드(200)사용
}   
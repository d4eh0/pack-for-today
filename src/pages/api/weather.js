export default async function handler(req, res) {
    const { nx, ny, base_date, base_time } = req.query;

    const key = process.env.WEATHER_API_KEY;
    const url =
        `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?` +
        `serviceKey=${key}&base_date=${base_date}&base_time=${base_time}` +
        `&nx=${nx}&ny=${ny}&dataType=JSON&numOfRows=500`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (e) {
        console.error("🔥 API 요청 실패", e);
        res.status(500).json({ error: '기상청 데이터 요청 실패' });
    }
}
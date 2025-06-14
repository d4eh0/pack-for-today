const sidoMap = {
    "경산시": "경북",
    "대구시": "대구",
    "서울특별시": "서울"
};

export default async function handler(req, res) {
    const { sido = "경산시" } = req.query;
    const key = process.env.DUST_API_KEY;
    const sidoName = sidoMap[sido];

    if (!sidoName) {
        return res.status(400).json({ error: "지원하지 않는 시도명입니다." });
    }

    const url = `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?` +
        `serviceKey=${key}&returnType=json&sidoName=${encodeURIComponent(sidoName)}&ver=1.0`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (e) {
        console.error("🔥 미세먼지 API 호출 실패:", e);
        res.status(500).json({ error: "미세먼지 데이터 요청 실패" });
    }
}
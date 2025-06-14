const areaCodeMap = {
    "경산시": "2900000000",
    "서울특별시": "1100000000",
    "대구시": "2700000000",
    // 필요시 추가
};

export default async function handler(req, res) {
    const { area = "경산시", base_date, base_time } = req.query;

    try {
        const areaNo = areaCodeMap[area];
        if (!areaNo) {
            console.error("❌ UV API 호출 실패: 해당 지역의 areaNo가 존재하지 않음");
            return res.status(400).json({ error: "해당 지역의 areaNo가 존재하지 않음" });
        }

        const key = process.env.UV_API_KEY;

        const date = base_date || new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const hour = base_time ? base_time.slice(0, 2) : new Date().getHours().toString().padStart(2, '0');
        const time = `${date}${hour}`;

        const url = `https://apis.data.go.kr/1360000/LivingWthrIdxServiceV4/getUVIdxV4?` +
            `serviceKey=${key}&areaNo=${areaNo}&time=${time}&dataType=JSON`;

        const response = await fetch(url);
        const data = await response.json();

        res.status(200).json(data);

    } catch (e) {
        console.error("🔥 UV API 호출 실패 (uv.js):", e);
        res.status(500).json({ error: "UV 데이터를 불러오지 못했어요." });
    }
}
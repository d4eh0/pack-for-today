export default async function handler(req, res) {
    const { nx, ny, base_date, base_time } = req.query;

    const key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${key}&dataType=JSON&pageNo=1&numOfRows=1000&base_date=${base_date}&base_time=${base_time}&nx=${nx}&ny=${ny}`;
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
}
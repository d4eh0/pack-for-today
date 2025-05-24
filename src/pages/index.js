import { useState, useEffect } from "react";
import Home from "@/components/Home";

export default function IndexPage() {

    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    // base_date, base_time 자동 계산 함수
    function getBaseDateTime() {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();

        const base = [
            { h: 2, m: 10, v: '0200' },
            { h: 5, m: 10, v: '0500' },
            { h: 8, m: 10, v: '0800' },
            { h: 11, m: 10, v: '1100' },
            { h: 14, m: 10, v: '1400' },
            { h: 17, m: 10, v: '1700' },
            { h: 20, m: 10, v: '2000' },
            { h: 23, m: 10, v: '2300' },
        ];

        let baseTime = '0200';
        for (let i = base.length - 1; i >= 0; i--) {
            const { h, m, v } = base[i];
            if (hour > h || (hour === h && minute >= m)) {
                baseTime = v;
                break;
            }
        }

        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const baseDate = `${yyyy}${mm}${dd}`;

        return { baseDate, baseTime };
    }
    {/*
    // 위치 정보 조회
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                const res = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
                const data = await res.json();
                setWeather(data);
            },
            (err) => {
                setError("위치 권한이 거부되었습니다. 위치 정보를 허용해주세요.");
            }
        );
    }, []);
*/}
    // 날씨 받아오기
    /***************************************************
     * <API 응답구조>
     * data.response.body.items.item = [
     *   { category: "POP", fcstValue: "30", ... },
     *   { category: "TMX", fcstValue: "26", ... },
     *   { category: "TMN", fcstValue: "14", ... },
     *   ... ]
     ***************************************************/
    useEffect(() => {
        async function getWeather() {
            const { baseDate, baseTime } = getBaseDateTime();

            try {
                const res = await fetch(`/api/weather?nx=55&ny=127&base_date=${baseDate}&base_time=${baseTime}`);
                const data = await res.json();

                const items = data.response.body.items.item;
                const extracted = {
                    curTemp: items.find((e) => e.category === "TMP")?.fcstValue,
                    rain: items.find((e) => e.category === "POP")?.fcstValue,
                    maxTemp: items.find((e) => e.category === "TMX")?.fcstValue,
                    minTemp: items.find((e) => e.category === "TMN")?.fcstValue,
                    sky: items.find((e) => e.category === "SKY")?.fcstValue,
                    pty: items.find((e) => e.category === "PTY")?.fcstValue,
                    uv: "-",
                    dust: "-",
                };

                setWeather(extracted);
            } catch (err) {
                console.error("❌ 날씨 API 요청 실패", err);
                setError("날씨 데이터를 불러오지 못했어요.");
            }
        }

        getWeather();
    }, []);

    // if (error) return <div className="p-8 text-red-500">{error}</div>;
    // if (!weather) return <div className="p-8">로딩 중...</div>;

    return <Home weather={weather} />;
}
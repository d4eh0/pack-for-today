import { useState, useEffect } from "react";
import Home from "@/components/Home";

export default function IndexPage() {

    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const dummyWeather = {
        curTemp: 55,
        maxTemp: 99,
        minTemp: 11,
        rain: 30,
        uv: 6,
        dust: 45,
    };

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
            const res = await fetch('/api/weather?nx=55&ny=127&base_date=20250524&base_time=0200');
            const data = await res.json();

            console.log("✅ 응답 확인", data);
            const items = data.response.body.items.item;
            const extracted = {
                curTemp: items.find((e) => e.category === "TMP")?.fcstValue, // 현재기온
                rain: items.find((e) => e.category === "POP")?.fcstValue,   // 강수확률
                maxTemp: items.find((e) => e.category === "TMX")?.fcstValue, // 최고기온
                minTemp: items.find((e) => e.category === "TMN")?.fcstValue, // 최저기온
                uv: "-",
                dust: "-",
            };

            setWeather(extracted);
        }
        getWeather();
    }, []);

    // if (error) return <div className="p-8 text-red-500">{error}</div>;
    // if (!weather) return <div className="p-8">로딩 중...</div>;

    return <Home weather={weather} />;
}
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

    if (error) return <div className="p-8 text-red-500">{error}</div>;
    if (!weather) return <div className="p-8">로딩 중...</div>;

    return <Home weather={dummyWeather} />;
}
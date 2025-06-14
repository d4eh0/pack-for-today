import { useState, useEffect } from "react";
import Home from "@/components/Home";
// API호출 시 형태에 맞게 date 및 time 변환
import { getBaseDateTime } from "@/utils/timeConverter.js";
// 출력 데이터 형식으로 파싱
import { parseRainAmount, getRainTimeRange } from "@/utils/rainUtils.js";
import { parseUVIndex } from "@/utils/uvUtils.js";
import { parseDustData } from "@/utils/dustUtils";
import { locationInfoMap } from "@/utils/locationUtils.js";

export default function Index() {

    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [currentLocation, setCurrentLocation] = useState("경산시");

    // 날씨 받아오기
    useEffect(() => {
        async function getWeather() {
            const { baseDate, baseTime } = getBaseDateTime();

            const { nx, ny, areaNo } = locationInfoMap[currentLocation];

            try {
                // Weather API 호출
                const res = await fetch(`/api/weather?nx=${nx}&ny=${ny}&base_date=${baseDate}&base_time=${baseTime}`);
                const data = await res.json();
                
                // UV API 호출
                const uvRes = await fetch(`/api/uv?area=${currentLocation}&base_date=${baseDate}&base_time=${baseTime}`);
                console.log("☀️ UV API 응답 (raw):", uvRes);
                const uvRawData = await uvRes.json();
                console.log("☀️ UV API 응답 (json):", uvRawData);

                const uvItems = uvRawData?.response?.body?.items?.item;
                const currentUvIndex = parseUVIndex(uvItems);

                if (!data.response?.body?.items?.item) {
                    console.error("❌ API 응답 구조가 올바르지 않습니다:", data);
                    setError("날씨 데이터를 불러오지 못했어요.");
                    return;
                }

                const items = data.response.body.items.item;
                
                // 미세먼지 API 호출
                const dustRes = await fetch(`/api/dust?sido=${currentLocation}`);
                const dustRawData = await dustRes.json();
                const dustItems = dustRawData?.response?.body?.items;
                const currentDust = parseDustData(dustItems);

                const extracted = {
                    curTemp: items.find((e) => e.category === "TMP")?.fcstValue,
                    rain: items.find((e) => e.category === "POP")?.fcstValue,
                    maxTemp: items.find((e) => e.category === "TMX")?.fcstValue,
                    minTemp: items.find((e) => e.category === "TMN")?.fcstValue,
                    sky: items.find((e) => e.category === "SKY")?.fcstValue,
                    pty: items.find((e) => e.category === "PTY")?.fcstValue,
                    pcp: items.find((e) => e.category === "PCP")?.fcstValue,
                    uv: currentUvIndex,
                    dust: currentDust?.pm10Grade ?? "-",
                    baseDate,
                    baseTime,
                    rainTimeRange: getRainTimeRange(items),
                    rainAmount: parseRainAmount(
                        items.find((e) => e.category === "PCP")?.fcstValue ?? "-"
                    ),
                };

                console.log("📊 가공된 날씨 데이터:", {
                    ...extracted,
                    rawPcp: items.find((e) => e.category === "PCP")?.fcstValue
                });

                setWeather(extracted);
            } catch (err) {
                console.error("❌ 날씨 API 요청 실패", err);
                setError("날씨 데이터를 불러오지 못했어요.");
            }
        }

        getWeather();
    }, [currentLocation]);

    return (
        <Home
            weather={weather}
            location={currentLocation}
            setLocation={setCurrentLocation}
            onLocationChange={(newCode) => {
                const nameMap = {
                    seoul: "서울특별시",
                    gyeongsan: "경산시",
                    daegu: "대구시",
                };
                const newName = nameMap[newCode] || "경산시";
                setCurrentLocation(newName);
            }}
        />
    );
}
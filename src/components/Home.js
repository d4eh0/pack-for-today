import { useState } from 'react';
import DetailPanel from "@/components/DetailPanel";
import LocationModal from "@/components/LocationModal";
import SensitivityModal from "@/components/SensitivityModal";


// 신호등 색깔 불러오기
import {
    getRainColor,
    getUVColor,
    getTempGapColor,
    getDustColor
} from "@/utils/trafficColors.js";

export default function Home({ weather, location, setLocation, onLocationChange }) {
    if (!weather) return null; // weather 로딩되기 전에 렌더링 방지
    const [openIndex, setOpenIndex] = useState(null); // 0,1,2,3 중 하나 or null

    // 위치 변경
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("경산시");
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("위치 변경 중...");
    const locationCodeMap = {
        "서울특별시": "seoul",
        "경산시": "gyeongsan",
        "대구시": "daegu",
    };
    // 민감도 설정
    const [isSensitivityOpen, setIsSensitivityOpen] = useState(false);
    const [sensitivity, setSensitivity] = useState({
        uv: [2, 5, 8, 11],
        tempGap: [6, 10, 15, 20],
    });

    // 날씨정보 : SKY 및 PTY로 날씨상태 파싱
    const getWeatherIcon = () => {
        const sky = weather.sky;
        const pty = weather.pty;

        if (pty !== "0") {
            switch (pty) {
                case "1": return { icon: "rain", label: "비" };
                case "2": return { icon: "rain", label: "비/눈" };
                case "3": return { icon: "snow", label: "눈" };
                case "4": return { icon: "rain", label: "소나기" };
                case "5": return { icon: "rain", label: "빗방울" };
                case "6": return { icon: "rain", label: "빗방울/눈날림" };
                case "7": return { icon: "snow", label: "눈날림" };
                default: return { icon: "undefined", label: "불명확" };
            }
        } else {
            switch (sky) {
                case "1": return { icon: "sunny", label: "맑음" };
                case "3": return { icon: "partly-cloudy", label: "구름 많음" };
                case "4": return { icon: "cloudy", label: "흐림" };
                default: return { icon: "undefined", label: "불명확" };
            }
        }
    };
    const { icon, label } = getWeatherIcon();

    function formatDateLabel(date, time) {
        const month = date.slice(4, 6);
        const day = date.slice(6, 8);
        const hour = time.slice(0, 2);
        return `${month}/${day} ${hour}:00`;
    }
    // 신호등 색깔 불러오기
    const colors = [
        getRainColor(weather.rain, weather.rainAmount),
        getUVColor(weather.uv, sensitivity.uv),
        getTempGapColor(Math.abs(weather.maxTemp - weather.minTemp), sensitivity.tempGap),
        getDustColor(weather.dust)
    ];

    // --- 상세정보 데이터 ---
    const rainDetailData = {
        rainTimeRange: weather.rainTimeRange || "0시 ~ 24시",
        rainChance: weather.rain || "0",
        rainAmount: weather.rainAmount || "0",
    };

    const uvDetailData = {
        uvIndex: weather.uv ?? 6,
        sensitivity: sensitivity.uv,
    };

    const tempGapDetailData = {
        tempGap: Math.abs(weather.maxTemp - weather.minTemp) ?? 12,
        sensitivity: sensitivity.tempGap,
    };

    const dustDetailData = {
        dustLevel: weather.dust ?? 45,
    };

    return (
        <>
            {/* 위치 변경 시, 로딩 오버레이 */}
            {isLoading && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
                    <div className="text-white font-bold text-xl">{loadingMessage}</div>
                </div>
            )}
            <div className="min-h-screen bg-cover bg-center flex justify-center items-center px-12"
                style={{ backgroundImage: `url('/background/${icon}-bg.jpg')` }}>

                {/* 뒷 날씨 배경 흐리게*/}
                <div className="absolute inset-0 bg-white/20 z-0" />

                {/* 날씨 정보 카드 */}
                <main className="relative z-10 w-full max-w-5xl bg-white rounded-3xl shadow-xl">
                    <p className="text-right text-sm px-6 py-4 text-neutral-400"> {formatDateLabel(weather.baseDate, weather.baseTime)} 기준</p>
                    {/* 날씨 정보 요약 및 신호등 헤더 */}
                    <header className="px-12 py-6 flex justify-between">

                        {/* 날씨 요약 */}
                        <section className="flex flex-col gap-3">
                            <h2 className="text-2xl font-semibold text-zinc-700">{location}</h2>
                            <div className="flex gap-2 font-extralight text-zinc-800">
                                <img className="w-16 h-16 mr-2" src={`/weather/${icon}.svg`} />
                                <span className="text-6xl">{Math.round(weather.curTemp)}</span>
                                <span className="text-5xl">°</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xl text-neutral-500 font-bold">{label}</span>
                                <span className="text-md text-neutral-400 font-bold">
                                    최고: {Math.round(weather.maxTemp)}° / 최저: {Math.round(weather.minTemp)}°
                                </span>
                            </div>
                        </section>

                        {/* 신호등 */}
                        <section>
                            <div className="flex flex-row gap-6 p-4 rounded-[3rem]" style={{ backgroundColor: '#42464D' }}>
                                {['umbrella', 'sunscreen', 'temp-gap', 'mask'].map((icon, idx) => (
                                    <div
                                        key={icon}
                                        className="w-24 h-24 rounded-full outline-1 outline-zinc-600 flex items-center justify-center"
                                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                        style={{ backgroundColor: colors[idx] }}
                                    >
                                        <img className="w-12 h-12" src={`/traffic/${icon}.png`} alt={icon} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </header>

                    {/* 상세정보 */}
                    <section
                        className={`transition-all duration-1200 overflow-hidden ${
                            openIndex !== null ? "max-h-[300px] py-10 px-6" : "max-h-0 py-0 px-6"
                        }`}
                    >
                        {openIndex === 0 && <DetailPanel type="rain" data={rainDetailData} />}
                        {openIndex === 1 && <DetailPanel type="uv" data={uvDetailData} />}
                        {openIndex === 2 && <DetailPanel type="temp-gap" data={tempGapDetailData} />}
                        {openIndex === 3 && <DetailPanel type="dust" data={dustDetailData} />}
                    </section>
                    <footer className="flex justify-end p-4">
                        <div className="flex flex-col items-end gap-1 text-sm text-neutral-500">
                            <button className="hover:underline" onClick={() => setIsModalOpen(true)}>위치 변경</button>
                            <button className="hover:underline" onClick={() => setIsSensitivityOpen(true)}>민감도 설정</button>
                        </div>
                    </footer>

                    <LocationModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSelect={(loc) => {
                            const code = locationCodeMap[loc];

                            if (onLocationChange) {
                                setLoadingMessage("위치 변경 중...");
                                setIsLoading(true); // ✅ 로딩 시작
                                onLocationChange(code);
                                setTimeout(() => {
                                    setIsLoading(false); // ✅ 1초 뒤 로딩 종료
                                }, 1000);
                            }

                            setIsModalOpen(false);
                        }}
                    />

                    <SensitivityModal
                        isOpen={isSensitivityOpen}
                        onClose={() => setIsSensitivityOpen(false)}
                        onSave={(newValues) => {
                            setLoadingMessage("민감도 변경 중...");
                            setIsLoading(true); // ✅ 로딩 시작
                            setSensitivity(newValues);
                            setTimeout(() => {
                                setIsLoading(false); // ✅ 1초 뒤 로딩 종료
                            }, 1000);
                        }}
                        initialValues={sensitivity}
                    />
                </main>
            </div>
        </>
    );
}
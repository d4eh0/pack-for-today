import { useState } from 'react';
import DetailPanel from "@/components/DetailPanel";

export default function Home({ weather }) {
    if (!weather) return null; // weather 로딩되기 전에 렌더링 방지
    const [openIndex, setOpenIndex] = useState(null); // 0,1,2,3 중 하나 or null

    // SKY 및 PTY로 날씨상태 파싱
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

    // 상세정보 더미데이터
    const rainDetailData = {
        rainTimeRange: "15시 ~ 18시",
        rainChance: weather.rain,
        rainAmount: "1.5",
    };

    const uvDetailData = {
        uvIndex: weather.uv ?? 6,
    };

    const tempGapDetailData = {
        tempGap: Math.abs(weather.maxTemp - weather.minTemp) ?? 12,
    };

    const dustDetailData = {
        dustLevel: weather.dust ?? 45,
    };

    return (
        <>
            {/*
            <div className="space-y-1">
                <p>현재: {weather.curTemp ?? "-"}°</p>
                <p>최고: {weather.maxTemp ?? "-"}°</p>
                <p>최저: {weather.minTemp ?? "-"}°</p>
                <p>강수확률: {weather.rain ?? "-"}%</p>
                <p>자외선: {weather.uv ?? "-"}</p>
                <p>미세먼지: {weather.dust ?? "-"}</p>
            </div> */}


        <div className="min-h-screen bg-cover bg-center flex justify-center items-center px-12"
             style={{ backgroundImage: `url('/background/${icon}-bg.jpg')` }}>

            {/* 오버레이 */}
            <div className="absolute inset-0 bg-white/20 z-0" />

            <main className="relative z-10 w-full max-w-5xl bg-white rounded-3xl shadow-xl">
                <header className=" px-12 pt-12 flex justify-between">
                    {/* 날씨 요약 */}
                    <section className="flex flex-col gap-3">
                        <h2 className="text-2xl font-semibold text-zinc-700">경산시</h2>
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
                                    style={{ backgroundColor: ['#A5DC99', '#FF7C6D', '#FFCD6A', '#A5DC99'][idx] }}
                                >
                                    <img className="w-12 h-12" src={`/traffic/${icon}.svg`} alt={icon} />
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
                        <button className="hover:underline">위치 변경</button>
                        <button className="hover:underline">민감도 설정</button>
                    </div>
                </footer>
            </main>
        </div>
            </>
    );
}
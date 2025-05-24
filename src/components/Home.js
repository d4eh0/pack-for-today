import { useState } from 'react';

export default function Home({ weather }) {
    const [openIndex, setOpenIndex] = useState(null); // 0,1,2,3 중 하나 or null
    return (
        <>
            <div className="space-y-1">
                <p>현재: {weather.curTemp}°</p>
                <p>최고: {weather.maxTemp}°</p>
                <p>최저: {weather.minTemp}°</p>
                <p>강수확률: {weather.rain}%</p>
                <p>자외선: {weather.uv}</p>
                <p>미세먼지: {weather.dust}</p>
            </div>
        <div className="min-h-screen bg-cover bg-center flex justify-center items-center px-12"
             style={{ backgroundImage: "url('/background/sunny-bg.jpg')" }}>

            {/* 오버레이 */}
            <div className="absolute inset-0 bg-white/20 z-0" />

            <main className="relative z-10 w-full max-w-5xl bg-white rounded-3xl shadow-xl">
                <header className=" p-8 flex justify-between">
                    {/* 날씨 요약 */}
                    <section className="flex flex-col gap-3">
                        <h2 className="text-2xl font-semibold text-zinc-700">경산시</h2>
                        <div className="flex font-extralight text-zinc-800">
                            <img className="w-16 h-16 mr-2" src="/weather/sunny-icon.svg"/>
                            <span className="text-6xl">19</span>
                            <span className="text-5xl">°</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xl text-neutral-500 font-bold">맑음</span>
                            <span className="text-md text-neutral-400 font-bold">최고: 24° / 최저: 16°</span>
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
                    className={`transition-all duration-500 overflow-hidden ${
                        openIndex !== null ? "max-h-[300px] py-10 px-6" : "max-h-0 py-0 px-6"
                    }`}
                >
                    {openIndex === 0 && <p>강수량 정보</p>}
                    {openIndex === 1 && <p>자외선 정보</p>}
                    {openIndex === 2 && <p>일교차 정보</p>}
                    {openIndex === 3 && <p>미세먼지 정보</p>}
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
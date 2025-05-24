export default function DetailPanel({ isOpen, type, data }) {
    return (
        <div
            className={`
        transition-all duration-3000 ease-in-out origin-top transform
        ${isOpen ? "max-h-[1000px] py-6" : "max-h-[1000px] py-0"}
      `}
        >
            {type === "rain" && (
                <div className="bg-white px-6 space-y-7">
                    <h2 className="text-2xl font-bold"><strong className="text-3xl">☂️ </strong> 우산을 챙기면 든든해요 !</h2>
                    <ul className="text-gray-700 text-sm space-y-2">
                        <li>우선, <strong className="text-lg">{data.rainTimeRange}</strong> 에 비 예보가 있어요!</li>
                        <li>비가 올 확률은 ... <strong className="text-lg">{data.rainChance}% !</strong></li>
                        <li>예상 강수량은 <strong className="text-lg">{data.rainAmount}mm</strong> 정도에요!</li>
                    </ul>
                </div>
            )}

            {type === "uv" && (
                <div className="bg-white px-6 space-y-7">
                    <h2 className="text-2xl font-bold"><strong className="text-3xl">🧴 </strong> 선크림을 꼼꼼히 발라야겠어요 !</h2>
                    <ul className="text-gray-700 text-sm space-y-2">
                        <li>자외선 지수는 <strong className="text-xl">6</strong>  이에요.</li>
                        <li>햇볕 아래 오래 있으면 피부가 아파할지도 몰라요!</li>
                    </ul>
                </div>
            )}

            {type === "temp-gap" && (
                <div className="bg-white px-6 space-y-7">
                    <h2 className="text-2xl font-bold">겉옷이 없다면 후회할지도 몰라요.. <strong className="text-3xl"> 😶</strong></h2>
                    <ul className="text-gray-700 text-sm space-y-2">
                        <li>오늘 일교차는 <strong className="text-lg">{data.tempGap}°</strong>이에요.</li>
                        <li>아침저녁엔 쌀쌀할 수 있으니 얇은 겉옷 하나 챙기세요!</li>
                    </ul>
                </div>
            )}

            {type === "dust" && (
                <div className="bg-white px-6 space-y-7">
                    <h2 className="text-2xl font-bold">우리 코에도 방패가 필요해요, 마스크 꼭 챙겨요  <strong className="text-3xl"> 😷</strong></h2>
                    <ul className="text-gray-700 text-sm space-y-2">
                        <li>미세먼지 농도는 <strong className="text-lg">{data.dustLevel}㎍/㎥</strong>이에요.</li>
                        <li>{data.dustLevel > 80 ? "공기가 탁해요! 마스크 필수에요." : "오늘은 공기 상태가 좋아요 ☺️"}</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
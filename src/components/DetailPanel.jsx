export default function DetailPanel({ type, data }) {
    return (
        <div className="transition-all duration-3000 ease-in-out origin-top transform">
            {type === "rain" && (() => {
                const chance = parseInt(data.rainChance);
                const amount = data.rainAmount;
                const time = data.rainTimeRange;
                const isNegligible = amount === "0" || amount === "1mm 미만";

                let title = "";
                let detail1 = "";
                let detail2 = "";

                if (chance === 0) {
                    title = "오늘은 비 걱정 없어요 ☀️";
                    detail1 = "하늘이 맑고 깨끗할 예정이에요 🌈";
                } else if (chance <= 30 && isNegligible) {
                    title = "비가 온다는 소식은 있는데... ☁️";
                    detail1 = `${time}에 약한 비 가능성 있어요.`;
                    detail2 = "우산 하나 챙기면 안심돼요!";
                } else if (chance <= 60) {
                    title = "비가 올거에요 ☔️";
                    detail1 = `${time}에 비 예보 있어요.`;
                    detail2 = `강수 확률은 ${chance}%, 예상 강수량은 ${amount}입니다.`;
                } else {
                    title = "비 많이 와요! 꼭 대비하세요 🌧️";
                    detail1 = `${time}에 비가 집중될 수 있어요.`;
                    detail2 = `강수 확률 ${chance}%, 강수량 ${amount}입니다.`;
                }

                return (
                    <div className="bg-white px-6 space-y-7">
                        <h2 className="text-2xl font-bold">{title}</h2>
                        <ul className="text-gray-700 text-sm space-y-2">
                            {detail1 && <li>{detail1}</li>}
                            {detail2 && <li>{detail2}</li>}
                        </ul>
                    </div>
                );
            })()}

            {type === "uv" && (() => {
                const uv = data.uvIndex ?? 6;
                const sensitivity = data.sensitivity ?? [2, 5, 8, 11];

                let uvColor = "text-gray-500";
                let uvMessage = "";

                if (uv <= sensitivity[0]) {
                    uvColor = "text-green-600";
                    uvMessage = "오늘은 자외선 걱정 없어요 ☁️";
                } else if (uv <= sensitivity[1]) {
                    uvColor = "text-green-600";
                    uvMessage = "햇볕이 조금 있어요. 선크림 바르면 좋아요 🌤️";
                } else if (uv <= sensitivity[2]) {
                    uvColor = "text-yellow-500";
                    uvMessage = "자외선이 강해요! 선크림은 필수에요 ☀️";
                } else {
                    uvColor = "text-red-600";
                    uvMessage = "매우 강한 자외선! 외출시 꼭 대비하세요 🔥";
                }

                return (
                    <div className="bg-white px-6 space-y-7">
                        <h2 className="text-2xl font-bold">{uvMessage}</h2>
                        <ul className="text-gray-700 text-sm space-y-2">
                            <li>
                                자외선 지수는{" "}
                                <strong className={`text-xl ${uvColor}`}>{uv}</strong> 이에요.
                            </li>
                            <li>Tip) 햇볕 아래 오래 있으면 피부가 아파할지도 몰라요!</li>
                        </ul>
                    </div>
                );
            })()}

            {type === "temp-gap" && (() => {
                const gap = data.tempGap ?? 12;
                const sensitivity = data.sensitivity ?? [6, 10, 15, 20];

                let gapColor = "text-gray-500";
                let titleMessage = "";
                let detailMessage = "";

                if (gap <= sensitivity[0]) {
                    gapColor = "text-[#A5DC99]";
                    titleMessage = "오늘은 일교차 거의 없어요!";
                    detailMessage = "추위 걱정은 잠시 접어두세요 ☀️";
                } else if (gap <= sensitivity[1]) {
                    gapColor = "text-[#FFCD6A]";
                    titleMessage = "오늘은 약간 쌀쌀할 수 있어요.";
                    detailMessage = "겉옷 하나 챙기면 좋아요 🍃";
                } else if (gap <= sensitivity[2]) {
                    gapColor = "text-[#FF9360]";
                    titleMessage = "오늘은 일교차가 커요!";
                    detailMessage = "겉옷 없으면 춥게 느껴질 수도.. 🧥";
                } else {
                    gapColor = "text-[#FF6B4D]";
                    titleMessage = "오늘은 일교차가 매우 커요!";
                    detailMessage = "감기 걸리기 딱 좋아요 🤧";
                }

                return (
                    <div className="bg-white px-6 space-y-7">
                        <h2 className="text-2xl font-bold">
                           {titleMessage}<strong className="text-2xl">     🌡️ </strong>
                        </h2>
                        <ul className="text-gray-700 text-sm space-y-2">
                            <li>
                                오늘 일교차는{" "}
                                <strong className={`text-lg ${gapColor}`}>{gap}°C</strong> 이에요.
                            </li>
                            {detailMessage && (
                                <li>{detailMessage}</li>
                            )}
                        </ul>
                    </div>
                );
            })()}

            {type === "dust" && (() => {
                const grade = data.dustLevel;

                const gradeTextMap = {
                    1: "좋음",
                    2: "보통",
                    3: "나쁨",
                    4: "매우 나쁨",
                };

                const messageMap = {
                    1: "오늘은 공기 상태가 좋아요 ☺️",
                    2: "약간 탁하지만 괜찮아요!",
                    3: "공기가 탁해요! 마스크 챙기세요!",
                    4: "위험! 외출 자제 권장해요. 나간다면 마스크는 필수!",
                };

                const colorMap = {
                    1: "text-green-600",
                    2: "text-green-600",
                    3: "text-orange-600",
                    4: "text-red-600",
                };

                const gradeText = gradeTextMap[grade] ?? "알 수 없음";
                const message = messageMap[grade] ?? "미세먼지 정보를 불러오지 못했어요.";
                const colorClass = colorMap[grade] ?? "text-gray-500";

                return (
                    <div className="bg-white px-6 space-y-7">
                        <h2 className="text-2xl font-bold">{message}</h2>
                        <ul className="text-gray-700 text-sm space-y-2">
                            <li>
                                미세먼지는 <strong className={`text-lg ${colorClass}`}>{gradeText}</strong> 이에요.
                            </li>
                        </ul>
                    </div>
                );
            })()}
        </div>
    );
}
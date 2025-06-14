// 1. 강수량 값 해석
export function parseRainAmount(value) {
    if (value === "-" || value === "0" || value === "강수없음") return "0";
    const num = parseFloat(value);
    if (isNaN(num)) return "정보 없음";
    if (num < 1.0) return "1mm 미만";
    if (num >= 1.0 && num < 30.0) return "10~30mm";
    if (num >= 30.0 && num < 50.0) return "30~50mm";
    return "50.0mm 이상";
}

// 2. 비 예보 시간대 추출
export function getRainTimeRange(items) {
    const rainyHours = items
        .filter(e =>
            (e.category === "POP" && parseInt(e.fcstValue) > 60) ||
            (e.category === "PTY" && e.fcstValue !== "0")
        )
        .map(e => parseInt(e.fcstTime.slice(0, 2)))
        .sort((a, b) => a - b);

    if (rainyHours.length === 0) return "-";

    const start = rainyHours[0];
    const end = rainyHours[rainyHours.length - 1] + 1;

    return `${start}시 ~ ${end}시`;
}
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
    const popHours = items
        .filter(e => e.category === "POP" && parseInt(e.fcstValue) > 60)
        .map(e => parseInt(e.fcstTime.slice(0, 2)));

    if (popHours.length === 0) return "짧게";
    if (popHours.length >= 10) return "하루종일";

    // 연속된 구간 추출 (예: 03,04,05 → 3~6시)
    const ranges = [];
    let start = popHours[0];
    let prev = popHours[0];

    for (let i = 1; i < popHours.length; i++) {
        if (popHours[i] !== prev + 1) {
            ranges.push(`${start}시~${prev + 1}시`);
            start = popHours[i];
        }
        prev = popHours[i];
    }
    ranges.push(`${start}시~${prev + 1}시`);

    return ranges.join(", ");
}
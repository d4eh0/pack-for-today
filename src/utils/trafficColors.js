export function getRainColor(chance, amount) {
    const c = Number(chance);  // 문자열을 숫자로 변환

    if (c === 0) return '#A5DC99';
    if (c <= 30 && (amount === "0" || amount === "1mm 미만")) return '#FFCD6A';
    if (c <= 60) return '#FF9360';
    return '#FF6B4D';
}

export function getUVColor(uv, sensitivity = [2, 5, 8, 11]) {
    if (uv <= sensitivity[0]) return '#A5DC99';
    if (uv <= sensitivity[1]) return '#FFCD6A';
    if (uv <= sensitivity[2]) return '#FF9360';
    return '#FF6B4D';
}

export function getTempGapColor(gap, sensitivity = [6, 10, 15, 20]) {
    if (gap <= sensitivity[0]) return '#A5DC99';
    if (gap <= sensitivity[1]) return '#FFCD6A';
    if (gap <= sensitivity[2]) return '#FF9360';
    return '#FF6B4D';
}

export function getDustColor(grade) {
    const map = {
        1: '#A5DC99',
        2: '#A5DC99',
        3: '#FFCD6A',
        4: '#FF6B4D',
    };
    return map[grade] || '#9CA3AF'; // fallback: gray
}
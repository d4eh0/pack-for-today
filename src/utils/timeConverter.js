// base_date, base_time 자동 계산 함수
export function getBaseDateTime() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    const base = [
        { h: 2, m: 10, v: '0200' },
        { h: 5, m: 10, v: '0500' },
        { h: 8, m: 10, v: '0800' },
        { h: 11, m: 10, v: '1100' },
        { h: 14, m: 10, v: '1400' },
        { h: 17, m: 10, v: '1700' },
        { h: 20, m: 10, v: '2000' },
        { h: 23, m: 10, v: '2300' },
    ];

    let baseTime = '0200';
    for (let i = base.length - 1; i >= 0; i--) {
        const { h, m, v } = base[i];
        if (hour > h || (hour === h && minute >= m)) {
            baseTime = v;
            break;
        }
    }

    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const baseDate = `${yyyy}${mm}${dd}`;

    return { baseDate, baseTime };
}
export function parseDustData(items) {
    if (!items || items.length === 0) return null;

    // 유효한 pm10Grade를 가진 첫 번째 item 찾기
    const item = items.find(i => i.pm10Grade && i.pm10Grade !== "-");
    if (!item) return null;

    return {
        stationName: item.stationName || null,
        dataTime: item.dataTime || null,
        pm10: parseInt(item.pm10Value) || null,
        pm25: parseInt(item.pm25Value) || null,
        pm10Grade: parseInt(item.pm10Grade) || null,
        pm25Grade: parseInt(item.pm25Grade) || null
    };
}
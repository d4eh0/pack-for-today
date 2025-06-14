export function parseDustData(items) {
    if (!items || items.length === 0) return null;

    const item = items[0];

    return {
        stationName: item.stationName || null,
        dataTime: item.dataTime || null,
        pm10: parseInt(item.pm10Value) || null,
        pm25: parseInt(item.pm25Value) || null,
        pm10Grade: parseInt(item.pm10Grade) || null,
        pm25Grade: parseInt(item.pm25Grade) || null
    };
}
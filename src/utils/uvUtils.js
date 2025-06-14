export function parseUVIndex(items) {
    if (!Array.isArray(items) || items.length === 0) return null;
    const h0 = items[0]?.h0;
    return h0 ? parseInt(h0) : null;
}
export const ls = {
  saveMap(key: string, map: Map<string, unknown>) {
    localStorage.setItem(
      key,
      JSON.stringify(map, (_, v) => (v instanceof Map ? Array.from(v) : v)),
    );
  },
  loadMap(key: string) {
    const json: string | null = localStorage.getItem(key);
    if (!json) return new Map();
    return JSON.parse(json, (k, v) => (k === '' ? new Map(v) : v));
  },
};

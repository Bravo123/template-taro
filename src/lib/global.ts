const globalData = {};

export function set(key: string, val: string | object) {
  globalData[key] = val;
}

export function get(key: string): string | object {
  return globalData[key];
}

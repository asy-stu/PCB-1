export function getPath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

export function setPath(obj, path, value) {
  const keys = path.split(".");
  const clone = structuredClone(obj);
  let cur = clone;
  keys.forEach((key, i) => {
    if (i === keys.length - 1) {
      cur[key] = value;
    } else {
      if (cur[key] == null || typeof cur[key] !== "object") cur[key] = {};
      cur = cur[key];
    }
  });
  return clone;
}

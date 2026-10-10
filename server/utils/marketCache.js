const cache = new Map();

function getCachedData(key) {
  const entry = cache.get(key);

  if (!entry) {
    return null;
  }

  if (Date.now() >= entry.expiresAt) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

function setCachedData(key, data, ttlMinutes) {
  cache.set(key, {
    data,
    expiresAt: Date.now() + ttlMinutes * 60 * 1000,
  });
}

module.exports = {
  getCachedData,
  setCachedData,
};

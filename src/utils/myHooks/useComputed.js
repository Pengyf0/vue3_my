import { computed } from "vue";
export function useComputed(fn) {
  const cache = new Map();
  function getCache(args) {
    const key = JSON.stringify(args);
    return cache.get(key);
  }

  return function (...args) {

    const cacheResult = getCache(args);
    if (cacheResult) {
      console.log('缓存', args)
      return cacheResult;
    }
    const result = computed(() => fn(...args))
    cache.set(JSON.stringify(args), result);
    console.log('开始', result, cache)
    return result
  }
}

export function myRquest(urls, maxNum) {
  return new Promise((resolve, reject) => {
    if (urls.length === 0) {
      resolve([])
    }
    const results = [];
    let index = 0;//请求的下一个数标
    let count = 0;
    async function request() {
      if (index === urls.length) return
      const i = index
      const url = urls[index];
      index++;
      console.log(url);
      try {
        const res = await fetch(url);
        results[i] = res
      } catch (error) {
        results[i] = error
      } finally {//一个请求完成之后
        count++;
        console.log('over88', count)
        if (count === urls.length) {
          console.log('over')
          resolve(results)
        }
        // request()
      }
      console.log('结果', results);
    };
    // request()
    const times = Math.min(maxNum, urls.length);
    for (let i = 0; i < times; i++) {
      request();
    }
  })
}
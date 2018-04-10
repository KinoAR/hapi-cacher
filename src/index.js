const time = require("./time");
module.exports = {
  RESULTS:{},
  get(url, type='cached', duration='24h') {
    const cachedResult = this.RESULTS[url];
    if (cachedResult !== undefined && cachedResult.type === 'cached'
    && !time.isOverTimeLimit(cachedResult.timestamp, cachedResult.duration)) {
      return Promise.resolve(this.RESULTS[url].result);
    }
    else {
      return new Promise((resolve, reject) => {
        console.log("New Promise");
        const protocol = /https/.test(url)
          ? require('https') : require('http');
        protocol.get(url, (res) => {
          res.setEncoding('utf8');
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });

          res.on('end', () => {
            const result = JSON.parse(data);
            /* Catalogs the results into results. 
            * Type defines how future requests will be handled.
            * no-cache: API requests will go through without being cached.
            * duration: Difference in time (now vs timestamp) before the API 
            * request gets updated.
            */
            this.RESULTS[url] = {
              timestamp: Date.now(),
              type: type,
              duration: duration,
              result
            };
            resolve(result);
          });
          res.on('error', (err) => {
            console.error(err);
            resolve(err);
          });
        });
      });
    }
  }
}
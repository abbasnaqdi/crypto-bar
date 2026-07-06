import {get} from '../request.js';

export let OkxClient = {
  async _getPrice(name, vol) {
    try {
      const url = 'https://www.okx.com/api/v5/market/ticker?instId=';
      const res = await get(url + name + '-' + vol);

      const jsonRes = JSON.parse(res.body);

      if (jsonRes.data && jsonRes.data.length > 0) {
        const price = +jsonRes.data[0].last;
        const open = +jsonRes.data[0].sodUtc0;
        const change = ((price - open) / open) * 100;
        return { price, change };
      }
      return { price: 'Error', change: 0 };
    } catch (error) {
      console.debug(error);
      return { price: 'Error', change: 0 };
    }
  },

  async _getHistory(name, vol) {
    try {
      const url = `https://www.okx.com/api/v5/market/candles?instId=${name}-${vol}&bar=1H&limit=24`;
      const res = await get(url);
      const jsonRes = JSON.parse(res.body);
      if (!jsonRes.data) return [];
      return jsonRes.data.map(d => parseFloat(d[4])).reverse();
    } catch (error) {
      return [];
    }
  },

  _getChartUrl(symbol) {
    let exchangeUrl = 'https://www.okx.com/markets/spot-info';
    let formattedPair = symbol.replace('/', '-').toLowerCase();

    return `${exchangeUrl}/${formattedPair}`;
  }
}

const fetch = require('node-fetch');

const Api = {
    getActivityList: async (category = 0) => {
      try {
        let resp = await fetch(
          `https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=${
            category === 0 ? 'all' : category
          }`,
        );
        let data = await resp.json();
        return data
      } catch (err) {
        return [];
      }
    },
  };
  
  export default Api;
  
/* eslint-disable no-unused-vars */
export default class ApiCalls {
  // Get Request API Wrapper Function
  GetRequest = async (url) => {
    const data = await fetch(url)
      .then((res) => {
        res.json().then((_res) => {
          console.log(_res);
        });
      }).catch((err) => err);
    return data;
  };
}

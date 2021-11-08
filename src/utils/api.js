/* eslint-disable no-unused-vars */
export const getTokenPrice = async (apiTokenName) => {
  const tokenPrice = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${apiTokenName}&vs_currencies=usd`,
  )
    .then((res) => {
      res.json().then((_res) => {
        console.log(`${apiTokenName} === `, _res);
      });
    })
    .catch((err) => {
      console.warn('ERROR', err);
    });
};

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Chart from '../../components/Chart';
import UserInput from '../../components/UserInput';
import CoinGecko from 'coingecko-api';
import './Home.scss';

const Home = ({
  cryptos,
  daysRange,
  setCryptoData,
}) => {
  const CoinGeckoClient = new CoinGecko();

  const [gecko, setGecko] = useState('');
  const [isNormalized, setIsNormalized] = useState(false);
  
  const getGecko = async () => {
    const { data: { gecko_says } } = await CoinGeckoClient.ping();
    setGecko(gecko_says);
  }

  useEffect(() => {
    getGecko();
  }, []);

  const getData = async (cryptos, daysRange) => {
    const cryptosData = {};

    // get full data set to determine maximum price value
    const allDays = 10000;

    const params = {
      days: allDays,
      vs_currency: 'usd',
      interval: 'daily',
    };
  
    for (let crypto of cryptos) {
      cryptosData[crypto] = {};
      const { data: { prices } } = await CoinGeckoClient.coins.fetchMarketChart(crypto, params);
      cryptosData[crypto].prices = prices;
    }
    
    // parse API data for each cryptocurrency
    for (let crypto in cryptosData) {
      const cryptoData = cryptosData[crypto];
  
      // determine maximum all-time price
      let maxPrice = 0;
      for (let priceData of cryptoData.prices) {
        if (priceData[1] >= maxPrice) {
          maxPrice = priceData[1];
        }
      }
      cryptoData.maxPrice = maxPrice;
  
      // extract price data over user-specified `daysRange` (regular and normalized forms)
      const dataArray = cryptoData.prices;
      cryptoData.pricesData = dataArray.slice(dataArray.length - daysRange).map(priceData => priceData[1]);
      cryptoData.normalizedPricesData = cryptoData.pricesData.map(price => price/maxPrice);
  
      // remove superfluous raw price data
      delete cryptoData.prices;
    }
  
    // update redux
    setCryptoData(cryptosData);
  }

  useEffect(() => {
    getData(cryptos, daysRange);
  }, [cryptos, daysRange]);

  return (
    <div className='home'>
      <h1>{gecko}</h1>
      <h2>🚀🌙</h2>
      <UserInput setIsNormalized={setIsNormalized} isNormalized={isNormalized} />
      <Chart isNormalized={isNormalized} />
    </div>
  );
}

Home.propTypes = {
  cryptos: PropTypes.array.isRequired,
  daysRange: PropTypes.number.isRequired,
  setCryptoData: PropTypes.func.isRequired,
};

export default Home;
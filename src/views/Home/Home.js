import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Chart from '../../components/Chart';
import UserInput from '../../components/UserInput';
import CoinGecko from 'coingecko-api';
import './Home.scss';

const Home = ({
  cryptosData,
  setCryptosList,
}) => {
  const CoinGeckoClient = new CoinGecko();

  const [gecko, setGecko] = useState('');
  const [isNormalized, setIsNormalized] = useState(false);
  
  const getGecko = async () => {
    const { data: { gecko_says } } = await CoinGeckoClient.ping();
    setGecko(gecko_says);
  }

  const getInitialData = async () => {
    const { data } = await CoinGeckoClient.coins.list();
    setCryptosList([...data]);
  }

  useEffect(() => {
    getGecko();
    getInitialData();
  }, []);

  return (
    <div className='home'>
      <h1 className='home-gecko'>{gecko}</h1>
      <h2 className='home-emojis'>🚀🌙</h2>
      {cryptosData && <Chart isNormalized={isNormalized} />}
      <UserInput setIsNormalized={setIsNormalized} isNormalized={isNormalized} />
    </div>
  );
}

Home.propTypes = {
  // redux state
  cryptosData: PropTypes.shape({
    crypto: PropTypes.shape({
      pricesData: PropTypes.arrayOf(PropTypes.number),
      normalizedPricesData: PropTypes.arrayOf(PropTypes.number),
      maxPrice: PropTypes.number,
      maxPriceDate: PropTypes.string,
    }),
  }).isRequired,
  // redux actions
  setCryptosList: PropTypes.func.isRequired,
};

export default Home;

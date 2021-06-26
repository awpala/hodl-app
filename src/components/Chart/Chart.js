import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import {
  BITCOIN,
  ETHEREUM,
  DOGECOIN,
  CARDANO,
  MONERO,
} from '../../constants';
import './Chart.scss';

const Chart = ({
  cryptosData,
  addedCryptos,
  dates,
  isNormalized,
}) => {
  const initializeColors = () => {
      const initialColors = {};
      initialColors[BITCOIN] = 'red';
      initialColors[ETHEREUM] = 'blue';
      initialColors[MONERO] = 'black';
      initialColors[CARDANO] = 'violet';
      initialColors[DOGECOIN] = 'green';

      return initialColors;
  }

  const [cryptoColors, setCryptoColors] = useState(initializeColors());

  const cryptos = [...new Set(addedCryptos)];
  const dataSets = [];

  const getRandomColor = () => {
    const hexCodes = '0123456789ABCDEF';
    let color = '#'

    for (let i = 0; i < 6; i++) {
      color += hexCodes[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  for (let crypto of cryptos) {
    if (cryptosData[crypto]) {
      const label = crypto;

      const { pricesData, normalizedPricesData } = cryptosData[crypto];
      const data = !isNormalized ? pricesData : normalizedPricesData;

      if (!cryptoColors[crypto]) {
        const updatedColors = { ...cryptoColors };
        updatedColors[crypto] = getRandomColor();
        setCryptoColors(updatedColors);
      }

      dataSets.push({ 
        label,
        data,
        backgroundColor: cryptoColors[crypto],
        borderColor: cryptoColors[crypto],
        fill: false,
      });
    }
  }

  const chartData = {
    datasets: dataSets,
    labels: dates,
  };

  const options = {
    scales: {
      yAxis: {
        type: !isNormalized ? 'logarithmic' : 'linear',
      },
    }
  };

  return (
    <div className='chart'>
      <Line data={chartData} options={options} />
    </div>
  );
}

Chart.propTypes = {
  // redux state
  cryptosData: PropTypes.shape({
    crypto: PropTypes.shape({
      pricesData: PropTypes.arrayOf(PropTypes.number),
      normalizedPricesData: PropTypes.arrayOf(PropTypes.number),
      maxPrice: PropTypes.number,
      maxPriceDate: PropTypes.string,
    }),
  }).isRequired,
  addedCryptos: PropTypes.arrayOf(PropTypes.string),
  dates: PropTypes.arrayOf(PropTypes.string),
  // props
  isNormalized: PropTypes.bool.isRequired,
};

export default Chart;

import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import {
  BITCOIN,
  ETHEREUM,
  DOGECOIN,
  POLKADOT,
  MONERO,
} from '../../constants';
import './Chart.scss';

const Chart = ({
  isNormalized,
  cryptoData,
  daysRange,
}) => {
  const dataSets = [];

  const mapDataToColor = (crypto) => {
    let color;

    switch (crypto) {
      case BITCOIN: color = 'red'; break;
      case ETHEREUM: color = 'blue'; break;
      case DOGECOIN: color = 'green'; break;
      case POLKADOT: color = 'purple'; break;
      case MONERO: color = 'white'; break;
      default: color = 'black'; break;
    }

    return color;
  }

  for (let crypto in cryptoData) {
    const label = crypto;

    const cryptoPrices = cryptoData[crypto];
    const data = !isNormalized ? cryptoPrices.pricesData : cryptoPrices.normalizedPricesData;

    dataSets.push({ 
      label,
      data,
      backgroundColor: mapDataToColor(crypto),
      borderColor: mapDataToColor(crypto),
      fill: false,
    });
  }

  const xLabels = [];
  for (let i = 0; i < daysRange; i++) {
    xLabels.push((i + 1) + '');
  }

  const chartData = {
    datasets: dataSets,
    labels: xLabels,
  }

  const options = {
    scales: {
      yAxis: {
        type: !isNormalized ? 'logarithmic' : 'linear',
        scaleLabel: {
          display: true,
          labelString: !isNormalized ? 'USD' : 'fraction of max',
        },
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
  isNormalized: PropTypes.bool.isRequired,
  cryptoData: PropTypes.shape({
    crypto: PropTypes.shape({
      pricesData: PropTypes.array,
      normalizedPricesData: PropTypes.array,
      maxPrice: PropTypes.number,
    }),
  }).isRequired,
  daysRange: PropTypes.number.isRequired,
};

export default Chart;

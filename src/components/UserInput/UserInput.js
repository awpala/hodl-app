import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CoinGecko from 'coingecko-api';
import { calculateDates } from '../../utils';
import {
  BITCOIN,
  ETHEREUM,
  MONERO,
  CARDANO,
  DOGECOIN,
} from '../../constants';
import './UserInput.scss';

const UserInput = ({
  cryptosData,
  cryptosList,
  addedCryptos,
  daysRange,
  setCryptosData,
  addCrypto,
  removeCrypto,
  setDates,
  setDaysRange,
  setIsNormalized,
  isNormalized,
}) => {
  const initialCryptos = [
    BITCOIN,
    ETHEREUM,
    MONERO,
    CARDANO,
    DOGECOIN,
  ];

  const [daysSelection, setDaysSelection] = useState(daysRange);
  const [isEditingSelection, setIsEditingSelection] = useState(false);
  const [currentCryptos, setCurrentCryptos] = useState(initialCryptos);
  const [queryString, setQueryString] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    initialCryptos.map(crypto => addCrypto(crypto));
  }, []);

  const handleSearchQuery = (queryString) => {
    if (queryString === null) {
      setQueryString('');
      setSearchResults([]);
    } else {
      setQueryString(queryString);
      const queryStringCaseInsensitive = queryString.toLowerCase();
      const results = cryptosList.filter(crypto => {
        const { id } = crypto;
        return id.includes(queryStringCaseInsensitive) && !addedCryptos.find(c => c === id);
      });
      setSearchResults(results);
    }
  }

  useEffect(() => {
    if (!queryString && searchResults.length) {
      setSearchResults([]);
    }
  }, [queryString, searchResults]);

  const handleRemoveCrypto = (crypto) => {
    const updatedCryptos = currentCryptos.filter(c => c !== crypto);
    setCurrentCryptos(updatedCryptos);
    removeCrypto(crypto);
  }

  const selections = [...new Set(currentCryptos)].map(crypto => (
    <div className='selection' key={crypto}>
      <p className='selection-crypto'>{crypto}</p>
      {cryptosData[crypto] && cryptosData[crypto].maxPrice && 
        <p className='selection-max-price'>
          max price: ${cryptosData[crypto].maxPrice.toFixed(2)}<br/>on {cryptosData[crypto].maxPriceDate}
        </p>
      }
      <button onClick={() => handleRemoveCrypto(crypto)}>
        remove
    </button>
  </div>
  ));

  const setUpdatedCryptos = async (addedCryptos, daysRange) => {
    const updatedCryptos = [...new Set(addedCryptos)];
    const updatedCryptosData = { ...cryptosData };

      for (let crypto of updatedCryptos) {
        if (!updatedCryptosData[crypto]) {
          updatedCryptosData[crypto] = {};

          const CoinGeckoClient = new CoinGecko();

          // get full data set to determine maximum price value
          const allDays = 10000;

          const params = {
            days: allDays,
            vs_currency: 'usd',
            interval: 'daily',
          };

          const { data: { prices } } = await CoinGeckoClient.coins.fetchMarketChart(crypto, params);
          updatedCryptosData[crypto].prices = prices;
        }

        const cryptoData = updatedCryptosData[crypto];
        const cryptoPrices = cryptoData.prices;

        // determine maximum all-time price
        let maxPrice = 0;
        let maxPriceDate = null;
        for (let priceData of cryptoPrices) {
          const [timestamp, price] = priceData;
          if (price >= maxPrice) {
            maxPrice = price;
            maxPriceDate = new Date(timestamp).toDateString();
          }
        }
        cryptoData.maxPrice = maxPrice;
        cryptoData.maxPriceDate = maxPriceDate;

        // extract price data over user-specified `daysRange` (regular and normalized forms)
        if (cryptoPrices.length < daysRange) {
          cryptoData.pricesData = cryptoPrices.map(priceData => priceData[1]);
          cryptoData.normalizedPricesData = cryptoData.pricesData.map(price => price/maxPrice);
          
          // pad with `null`s if `daysRange` extends beyond earliest price data point for `crypto`
          while (cryptoData.pricesData.length !== daysRange) {
            cryptoData.pricesData.unshift(null);
            cryptoData.normalizedPricesData.unshift(null);
          }
        } else {
          const updatedDaysRange = cryptoPrices.length - daysRange;
          cryptoData.pricesData = cryptoPrices.slice(updatedDaysRange).map(priceData => priceData[1]);
          cryptoData.normalizedPricesData = cryptoData.pricesData.map(price => price/maxPrice);
        }
      }
      setCryptosData(updatedCryptosData);
      setDates(calculateDates(daysRange));
  }

  useEffect(() => {
    setCurrentCryptos(addedCryptos);
    setUpdatedCryptos(addedCryptos, daysRange);
    handleSearchQuery(null);
  }, [addedCryptos, addCrypto, setDaysRange]);

  const handleUpdateDays = (mode) => {
    setIsEditingSelection(false);

    if (mode === 'update' && !daysSelection) {
      setDaysRange(daysRange);
      return;
    }

    switch (mode) {
      case 'update':
        const updatedDaysRange = Number(daysSelection);
        setDaysRange(updatedDaysRange);
        setUpdatedCryptos(addedCryptos, updatedDaysRange);
        break;
      case 'cancel':
        setDaysRange(daysRange);
        break;
      default:
        break;
    }
  }

  const changeDaysRange = !isEditingSelection
    ? (
      <button onClick={() => setIsEditingSelection(true)}>Change days range</button>
    )
    : (
      <div>
        <input
          type='text'
          placeholder='enter number'
          onChange={(e) => setDaysSelection(Number(e.target.value))}
        />
        <button onClick={() => handleUpdateDays('update')}>Update</button>
        <button onClick={() => handleUpdateDays('cancel')}>Cancel</button>
      </div>
    );

  return (
    <div className='user-input'>
      <div>
        <h2>Cryptocurrencies</h2>
          {cryptosList.length 
            ? (
              <div className='search'>
                <div className='search-bar'>
                  <input
                    text='text'
                    value={queryString}
                    placeholder='search crypto by name'
                    onChange={(e) => handleSearchQuery(e.target.value)}
                  />
                  <button onClick={() => handleSearchQuery(null)}>
                    Clear Search
                  </button>
                </div>
                {searchResults.length
                  ? (
                    <div className='search-results'>
                      {searchResults.map(result => (
                          <div className='search-result' key={result.id}>
                            <p>{result.id}</p>
                            <button onClick={() => addCrypto(result.id)}>
                              Add
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  )
                  : null
                }
              </div>
            )
            : null
          }
          <h2>Selected Cryptocurrencies</h2>
          <div className='selections'>
            {selections}
          </div>
      </div>
      <div className='chart-attributes'>
        <h2>Chart Attributes</h2>
        <p>Range: past <span className='days-range'>{daysRange}</span> days</p>
        {changeDaysRange}
        <button className='btn-normalize' onClick={() => setIsNormalized(!isNormalized)}>
          {!isNormalized ? 'Normalize' : 'De-Normalize'}
        </button>
        <p>{isNormalized ? 'Normalized to 1.0 = all time high price' : 'Prices in USD/coin'}</p>
      </div>
    </div>
  );
}

UserInput.propTypes = {
  // redux state
  cryptosData: PropTypes.shape({
    crypto: PropTypes.shape({
      pricesData: PropTypes.arrayOf(PropTypes.number),
      normalizedPricesData: PropTypes.arrayOf(PropTypes.number),
      maxPrice: PropTypes.number,
      maxPriceDate: PropTypes.string,
    }),
  }).isRequired,
  cryptosList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      symbol: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
  addedCryptos: PropTypes.arrayOf(PropTypes.string),
  daysRange: PropTypes.number.isRequired,
  // redux actions
  setCryptosData: PropTypes.func.isRequired,
  addCrypto: PropTypes.func.isRequired,
  removeCrypto: PropTypes.func.isRequired,
  setDates: PropTypes.func.isRequired,
  setDaysRange: PropTypes.func.isRequired,
  // props
  setIsNormalized: PropTypes.func.isRequired,
  isNormalized: PropTypes.bool.isRequired,
};

export default UserInput;

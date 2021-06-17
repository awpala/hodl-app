import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  BITCOIN,
  ETHEREUM,
  DOGECOIN,
  POLKADOT,
  MONERO,
} from '../../constants';
import './UserInput.scss';

const UserInput = ({
  daysRange,
  addCrypto,
  setDaysRange,
  setIsNormalized,
  isNormalized,
}) => {
  const [daysSelection, setDaysSelection] = useState(daysRange);
  const [isEditingSelection, setIsEditingSelection] = useState(false);

  const selections = (
    <div className='selections'>
      <div className='selection'>
        <p>{BITCOIN}</p>
        <button
          onClick={() => addCrypto(BITCOIN)}
        >
          add
        </button>
      </div>
      <div className='selection'>
        <p>{ETHEREUM}</p>
        <button
          onClick={() => addCrypto(ETHEREUM)}
        >
          add
        </button>
      </div>
      <div className='selection'>
        <p>{DOGECOIN}</p>
        <button
          onClick={() => addCrypto(DOGECOIN)}
        >
          add
        </button>
      </div>
      <div className='selection'>
        <p>{POLKADOT}</p>
        <button
          onClick={() => addCrypto(POLKADOT)}
        >
          add
        </button>
      </div>
      <div className='selection'>
        <p>{MONERO}</p>
        <button
          onClick={() => addCrypto(MONERO)}
        >
          add
        </button>
      </div>
    </div>
  );

  const handleUpdateDays = () => {
    setIsEditingSelection(false);
    setDaysRange(Number(daysSelection));
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
          onChange={(e) => setDaysSelection(e.target.value)}
        />
        <button onClick={() => handleUpdateDays()}>Update</button>
      </div>
    
    );

  return (
    <div className='user-input'>
      <div>
        <h2>Cryptocurrencies</h2>
        {selections}
      </div>
      <div className='graph-attributes'>
        <h2>Graph Attributes</h2>
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
  daysRange: PropTypes.number.isRequired,
  addCrypto: PropTypes.func.isRequired,
  setDaysRange: PropTypes.func.isRequired,
  setIsNormalized: PropTypes.func.isRequired,
  isNormalized: PropTypes.bool.isRequired,
};

export default UserInput;

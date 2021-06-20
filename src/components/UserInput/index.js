import { connect } from 'react-redux';
import {
  setCryptosData,
  addCrypto,
  removeCrypto,
  setDates,
  setDaysRange,
} from '../../reducers/crypto';
import UserInput from './UserInput';

const mapStateToProps = (state) => {
  const { 
    crypto: { 
      cryptosData,
      cryptosList,
      addedCryptos,
      daysRange,
    }
  } = state;
  return {
    cryptosData,
    cryptosList,
    addedCryptos,
    daysRange,
  };
}

const mapDispatchToProps = (dispatch) => ({
  setCryptosData: (cryptoData) => dispatch(setCryptosData(cryptoData)),
  addCrypto: (crypto) => dispatch(addCrypto(crypto)),
  removeCrypto: (crypto) => dispatch(removeCrypto(crypto)),
  setDates: (dates) => dispatch(setDates(dates)),
  setDaysRange: (daysRange) => dispatch(setDaysRange(daysRange)),
});

const UserInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserInput);

export default UserInputContainer;

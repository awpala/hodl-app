import { connect } from 'react-redux';
import { addCrypto, setDaysRange } from '../../reducers/crypto';
import UserInput from './UserInput';

const mapStateToProps = (state) => {
  const { crypto: { daysRange } } = state;
  return {
    daysRange,
  };
}

const mapDispatchToProps = (dispatch) => ({
  addCrypto: (crypto) => dispatch(addCrypto(crypto)),
  setDaysRange: (daysRange) => dispatch(setDaysRange(daysRange)),
})

const UserInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserInput);

export default UserInputContainer;

import { connect } from 'react-redux';
import { setCryptosList } from '../../reducers/crypto';
import Home from './Home';

const mapStateToProps = (state) => {
  const { crypto: { cryptosData } } = state;
  return {
    cryptosData,
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCryptosList: (cryptosList) => dispatch(setCryptosList(cryptosList)),
});

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default HomeContainer;

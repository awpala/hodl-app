import { connect } from 'react-redux';
import { setCryptoData } from '../../reducers/crypto';
import Home from './Home';

const mapStateToProps = (state) => {
  const { crypto: { cryptos, daysRange } } = state;
  return {
    cryptos,
    daysRange,
  };
}

const mapDispatchToProps = (dispatch) => ({
  setCryptoData: (cryptoData) => dispatch(setCryptoData(cryptoData)),
});

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default HomeContainer;

import { connect } from 'react-redux';
import Chart from './Chart';

const mapStateToProps = (state) => {
  const {
    crypto: {
      cryptosData,
      addedCryptos,
      dates,
    }
  } = state;
  return {
    cryptosData,
    addedCryptos,
    dates,
  };
}

const ChartContainer = connect(
  mapStateToProps,
  null,
)(Chart);

export default ChartContainer;

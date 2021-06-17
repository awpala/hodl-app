import { connect } from 'react-redux';
import Chart from './Chart';

const mapStateToProps = (state) => {
  const { crypto: { cryptoData, daysRange } } = state;
  return {
    cryptoData,
    daysRange,
  };
}

const ChartContainer = connect(
  mapStateToProps,
  null,
)(Chart);

export default ChartContainer;

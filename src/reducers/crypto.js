import { calculateDates } from '../utils';

const initialDaysRange = 30;

const initialState = {
  cryptosData: {},
  cryptosList: [],
  addedCryptos: [],
  daysRange: initialDaysRange,
  dates: calculateDates(initialDaysRange),
};

// constants
export const SET_CRYPTOS_DATA = 'SET_CRYPTOS_DATA';
export const SET_CRYPTOS_LIST = 'SET_CRYPTOS_LIST';
export const SET_DATES = 'SET_DATES';
export const ADD_CRYPTO = 'ADD_CRYPTO';
export const REMOVE_CRYPTO = 'REMOVE_CRYPTO';
export const SET_DAYS_RANGE = 'SET_DAYS_RANGE';

// actions
export const setCryptosData = (cryptosData) => ({
  type: SET_CRYPTOS_DATA,
  cryptosData,
});

export const setCryptosList = (cryptosList) => ({
  type: SET_CRYPTOS_LIST,
  cryptosList,
});

export const setDates = (dates) => ({
  type: SET_DATES,
  dates,
});

export const addCrypto = (crypto) => ({
  type: ADD_CRYPTO,
  crypto,
});

export const removeCrypto = (crypto) => ({
  type: REMOVE_CRYPTO,
  crypto,
})

export const setDaysRange = (daysRange) => ({
  type: SET_DAYS_RANGE,
  daysRange,
});

const ACTION_HANDLERS = {
  [SET_CRYPTOS_DATA]: (state, action) => ({
    ...state,
    cryptosData: action.cryptosData,
  }),
  [SET_CRYPTOS_LIST]: (state, action) => ({
    ...state,
    cryptosList: action.cryptosList,
  }),
  [SET_DATES]: (state, action) => ({
    ...state,
    dates: action.dates,
  }),
  [ADD_CRYPTO]: (state, action) => ({
    ...state,
    addedCryptos: [...state.addedCryptos, action.crypto],
  }),
  [REMOVE_CRYPTO]: (state, action) => ({
    ...state,
    addedCryptos: state.addedCryptos.filter(c => c !== action.crypto),
  }),
  [SET_DAYS_RANGE]: (state, action) => ({
    ...state,
    daysRange: action.daysRange,
  }),
};

export default function cryptoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

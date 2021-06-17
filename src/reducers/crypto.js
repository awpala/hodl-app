// constants
export const SET_CRYPTO_DATA = 'SET_CRYPTO_DATA';
export const ADD_CRYPTO = 'ADD_CRYPTO';
export const SET_DAYS_RANGE = 'SET_DAYS_RANGE';

// actions
export const setCryptoData = (cryptoData) => ({
  type: SET_CRYPTO_DATA,
  cryptoData,
})

export const addCrypto = (crypto) => ({
  type: ADD_CRYPTO,
  crypto,
});

export const setDaysRange = (daysRange) => ({
  type: SET_DAYS_RANGE,
  daysRange,
});

const initialState = {
  cryptos: [],
  daysRange: 30,
  cryptoData: {},
};

const ACTION_HANDLERS = {
  [SET_CRYPTO_DATA]: (state, action) => ({
    ...state,
    cryptoData: action.cryptoData,
  }),
  [ADD_CRYPTO]: (state, action) => ({
    ...state,
    cryptos: [...state.cryptos, action.crypto],
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

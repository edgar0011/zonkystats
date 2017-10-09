
import {
  LOAD_AMOUNTS_BY_RATING,
  AMOUNTS_BY_RATING_LOADED } from '../config/CONSTANTS';

export const initialState = {
  ratingOptions: [
    { value: 'AAAAA', label: 'A**' },
    { value: 'AAAA', label: 'A*' },
    { value: 'AAA', label: 'A++' },
    { value: 'AA', label: 'A+' },
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
  ],
  loans: [],
  selectedRating: null,
  selectedRatingAverageAmount: NaN,
  calculationsCache: {},
  loansLoading: false,
};

initialState.selectedRating = initialState.ratingOptions[0];

export default function loansReducer(state = initialState, action) {
  const type = action.type;
  if (type === LOAD_AMOUNTS_BY_RATING) {
    const rating = action.payload;
    return {
      ...state,
      selectedRating: rating,
      loansLoading: true,
    };
  }

  if (type === AMOUNTS_BY_RATING_LOADED) {
    const { loans, rating } = action.payload;
    const calculationsCache = !rating ? {} : (state.calculationsCache || {});
    loans.forEach((loan) => {
      calculationsCache[loan.rating] = calculationsCache[loan.rating] || { num: 0, count: 0 };
      calculationsCache[loan.rating].num += loan.amount;
      calculationsCache[loan.rating].count++;
    });
    Object.keys(calculationsCache).forEach((key) => {
      const { num, count } = calculationsCache[key];
      const average = num / count;
      calculationsCache[key]
        = { ...calculationsCache[key], average: Math.round(average * 100) / 100 };
    });
    return {
      ...state,
      loans,
      calculationsCache,
      loansLoading: false,
    };
  }

  return state;
}

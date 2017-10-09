
import { expect, assert } from 'chai';

import loansReducer from '../app/src/reducers/loansReducer';
import mockLoans from './mocks';

import {
  LOAD_AMOUNTS_BY_RATING,
  AMOUNTS_BY_RATING_LOADED } from '../app/src/config/CONSTANTS';

describe('reducer', () => {
  describe('LOAD_AMOUNTS_BY_RATING', () => {
    it('should set selected rating', () => {
      const initialState = { };
      const action = {
        type: LOAD_AMOUNTS_BY_RATING,
        payload: ['AAA'],
      };
      const nextState = loansReducer(initialState, action);
      expect(nextState).to.deep.equal({
        selectedRating: ['AAA'],
        loansLoading: true,
      });
    });
  });

  describe('AMOUNTS_BY_RATING_LOADED', () => {
    it('should recalculate average amount, for selected rating', () => {
      const initialState = { };
      const action = {
        type: AMOUNTS_BY_RATING_LOADED,
        payload: { loans: mockLoans },
      };
      const nextState = loansReducer(initialState, action);
      const results = { average: 0, num: 0, count: 0 };
      mockLoans.forEach((loan) => {
        results.num += loan.amount;
        results.count++;
      });
      results.average = Math.round((results.num / results.count) * 100) / 100;
      expect(nextState).to.deep.equal({
        loans: mockLoans,
        loansLoading: false,
        calculationsCache: {
          AAAAA: results,
        },
      });
    });
  });
});

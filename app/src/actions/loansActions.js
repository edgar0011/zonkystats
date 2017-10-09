// @flow

import LoansService from '../dataApi/LoansService';
import type { LoansServiceType } from '../dataApi/LoansService';
import {
  LOAD_AMOUNTS_BY_RATING,
  AMOUNTS_BY_RATING_LOADED,
} from '../config/CONSTANTS';

const loansService:LoansServiceType = new LoansService();

export default function loadAmountsByRating(rating?: Array<String>): Function {
  return (dispatch:Function) => {
    dispatch({
      type: LOAD_AMOUNTS_BY_RATING,
      payload: rating,
    });
    return loansService.getLoansTotal(rating).then((response: {data: any}): Promise<any> => {
      const loans = response.data.body || response.data;
      dispatch({
        type: AMOUNTS_BY_RATING_LOADED,
        payload: { loans, rating },
      });
      return loans;
    }, (error) => {
      console.log(error);
    });
  };
}

// @flow

import axios from 'axios';
import ServiceBase from './ServiceBase';
import * as ZONKY from '../config/URLS';


axios.interceptors.request.use(request => request, error => Promise.reject(error));

axios.interceptors.response.use((response) => {
  if (response.data && response.data.body && typeof response.data.body === 'string') {
    response.data.body = JSON.parse(response.data.body);
  }
  return response;
}, error => Promise.reject(error));

export default class LoansService extends ServiceBase {
  constructor(...args:any) {
    super(args);
  }

  async getLoans(rating?:Array<String>, pageSize:number = 10, pageIndex:number = 0): Promise<any> {
    let params;
    if (rating && rating.length === 1) {
      params = { [ZONKY.ZONKY_API_FILTER.equalsRating]: rating[0] };
    } else if (rating && rating.length > 1) {
      params = { [ZONKY.ZONKY_API_FILTER.includesRating]: rating };
    }

    return super.get(`${ZONKY.ZONKY_API_LOANS}`, {
      params,
      headers: {
        'x-size': pageSize,
        'x-page': pageIndex,
      },
    });
  }

  async getLoansTotal(rating?:Array<String>): Promise<any> {
    const response1 = await this.getLoans(rating);
    const total = response1.headers['x-total'];
    const response = await this.getLoans(rating, total);
    return response;
  }
}

export type LoansServiceType = {
  getLoans(rating?:Array<String>, pageSize?:number, pageIndex?:number): Promise<any>,
  getLoansTotal(rating?:Array<String>): Promise<any>,
}

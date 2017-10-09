
export const ZONKY_API_LOANS = 'https://api.zonky.cz/loans/marketplace';
// failing, 403 unauthorized
// export const ZONKY_API_LOANS = 'https://cors-anywhere.herokuapp.com/https://api.zonky.cz/loans/marketplace';
// works but fails to delegate HEADERS (x-size, x-page)...useless
// export const ZONKY_API_LOANS = 'http://cors-proxy.htmldriven.com/?url=https://api.zonky.cz/loans/marketplace';
// NOT WORKING AT ALL< either 500 or 503 all the time
// export const ZONKY_API_LOANS = 'https://crossorigin.me/https://api.zonky.cz/loans/marketplace';

export const ZONKY_API_FILTER = {
  includesRating: 'rating__in',
  equalsRating: 'rating__eq',
};

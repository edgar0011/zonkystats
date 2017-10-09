
import React, { Component } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { BarChart, Bar, XAxis, YAxis, Cell, Tooltip, Legend } from 'recharts';
import 'react-select/dist/react-select.css';
import AsyncLoader from '../ui/AsyncLoader';
import LoansService from '../../dataApi/LoansService';
import type { LoansServiceType } from '../../dataApi/LoansService';
import * as loansActions from '../../actions/loansActions';

@connect((store) => {
  const { market } = store;
  return { market, isLoading: market.loansLoading };
}, { loadAmountsByRating: loansActions.loadAmountsByRating })
@AsyncLoader
export default class Stats extends Component {
  static propTypes = {
    loadAmountsByRating: PropTypes.func,
    market: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.service = new LoansService();
  }

  componentDidMount() {
    this.getLoansByRating([this.props.market.ratingOptions[0].value]);
  }

  getLoansByRating(rating) {
    return this.props.loadAmountsByRating(rating);
  }

  handleClick = () => {
    this.getLoansByRating();
  };

  handleRatingChange = (val) => {
    this.getLoansByRating([val.value]);
  };

  service:LoansServiceType;

  render() {
    const { market } = this.props;
    const { loans, selectedRating, ratingOptions, calculationsCache } = market;
    const selectedValue
      = selectedRating && ratingOptions.find(option => option.value === selectedRating[0]);

    const data = ratingOptions.map(value => ({
      ...calculationsCache[value.value],
      rating: value.value,
    }));

    return (
      <div>
        <Row>
          <Col>
            { `Loans for ${selectedRating || 'All'}, count ..... ${loans.length}` }
          </Col>
        </Row>
        <Row>
          <Col>
            <Select
              name="select-rating"
              value={selectedValue}
              options={ratingOptions}
              clearable={false}
              onChange={this.handleRatingChange}
            />
          </Col>
          <Col>
            <BarChart
              width={600}
              height={300}
              data={data}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* <Bar dataKey="num" fill="#e5e5e5" barSize={20} /> */}
              {/* <Bar dataKey="count" fill="#39a9b5" barSize={20} /> */}
              <Bar label="Average loan amount" dataKey="average" fill="#39a9b5" barSize={20} >
                {
                  data.map(entry => (<Cell
                    key={`chartRating${entry.rating}`}
                    fill={selectedRating && entry.rating === selectedRating[0] ? '#e44b30' : '#39a9b5'}
                  />))
                }
              </Bar>
            </BarChart>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={this.handleClick}>Call for all</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

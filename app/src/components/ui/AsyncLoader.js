import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles/zonky.scss';

export default function AsyncLoader(Content) {
  /* eslint react/prefer-stateless-function: 0 */
  return class extends Component {
    static propTypes = {
      isLoading: PropTypes.bool,
    };

    render() {
      const { isLoading } = this.props;
      return (
        <div>
          {isLoading && <div style={{
            position: 'absolute',
            zIndex: 11,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          >
            <span
              class="loader"
              style={{
                position: 'absolute',
                fontSize: '26px',
                fontWeight: 'bolder',
                width: '120px',
                left: '50%',
                top: '50%',
              }}
            />
          </div>}
          <Content {...this.props} />
        </div>
      );
    }
  };
}

/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import Calendar from '../../components/Calendar';
import './style.scss';

export default class MonthView extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { metadata, prev, next } = this.props;
    return (
      <div className="feature-page">
        <Helmet>
          <title>Month View Page</title>
          <meta
            name="description"
            content="Month View"
          />
        </Helmet>
        <h1>Month View ({metadata.month})</h1>
        <div className="bar">
          <button onClick={() => prev()}>Prev</button>
          <button onClick={() => next()} className="nextLink">Next</button>
        </div>
        <Calendar metadata={metadata} />
      </div>
    );
  }
}

MonthView.propTypes = {
  metadata: PropTypes.object.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};

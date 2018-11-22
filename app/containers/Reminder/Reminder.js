/*
 * Reminder
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class Reminder extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    title: '',
    when: moment().format('YYYY-MM-DDTHH:mm:ss'),
  };

  componentDidMount() {
    const { reset, getSaved, match: { params: { date, id } } } = this.props;
    reset();

    if (date && id) {
      getSaved({ date, id });
    }
  }

  componentWillReceiveProps(newProps) {
    const { working } = newProps;
    if (working) {
      this.setState({ title: working.title, when: moment(working.time).format('YYYY-MM-DDTHH:mm:ss') });
    }
  }

  updateValue = (key, value) => {
    this.setState((currentState) => {
      const newState = currentState;
      newState[key] = value;
      return newState;
    });
  }

  saveReminder() {
    const { title, when } = this.state;
    const { push, save, match: { params: { id } } } = this.props;

    if (title && when) {
      save({ title, when, id });
      push('/calendar');
    }
  }

  deleteReminder() {
    const { push, deleteReminder, match: { params: { id, date } } } = this.props;

    if (id && date) {
      deleteReminder({ id, date });
      push('/calendar');
    }
  }

  render() {
    const { title, when } = this.state;
    const { saved, match: { params: { id } } } = this.props;
    return (
      <div>
        <Helmet>
          <title>Reminder</title>
          <meta
            name="description"
            content="Reminder"
          />
        </Helmet>
        <h1>Reminder</h1>
        <div>
          <div>
            Title: <input type="text" name="title" value={title} onChange={(e) => this.updateValue(e.target.name, e.target.value)} />
          </div>
          <div>
            When: <input type="datetime-local" name="when" value={when} onChange={(e) => this.updateValue(e.target.name, e.target.value)} />
          </div>
          <div>
            <input type="button" value="Save" onClick={() => this.saveReminder()} />
            {id ?
              <input type="button" value="Delete" onClick={() => this.deleteReminder()} />
              : null }
          </div>
        </div>
        <div>
          {saved ? 'Successfully saved!' : ''}
        </div>
      </div>
    );
  }
}

Reminder.propTypes = {
  save: PropTypes.func.isRequired,
  deleteReminder: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  saved: PropTypes.bool.isRequired,
  getSaved: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  working: PropTypes.object,
  push: PropTypes.func.isRequired,
};

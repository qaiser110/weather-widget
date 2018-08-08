import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import Autosuggest from 'react-autosuggest';

import { findCityLike } from '../api/location';

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = city => <div>{`${city.name}, ${city.country}`}</div>;

let lastFetchId = 0;

class CityAutoSuggest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      value: '',
      suggestions: []
    };

    this.onFetchSuggestions = debounce(this.onFetchSuggestions, 1500);
  }

  onChange = (event, { newValue }) => {
    const selection = this.state.suggestions.find(s => s.name === newValue);
    if (selection) this.props.onChangeCityId(selection.id)
    this.setState({
      value: newValue
    });
  };

  onFetchSuggestions = ({ value }) => {
    if (!value) return;
    this.setState({ loading: true });
    lastFetchId += 1;
    const fetchId = lastFetchId;
    findCityLike(value).then(({ data }) => {
      if (fetchId !== lastFetchId) return;
      this.setState({ suggestions: data, loading: false });
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Search for city',
      value,
      onChange: this.onChange
    };

    return (
      <div className="edit-city">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onFetchSuggestions}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

CityAutoSuggest.propTypes = {
  onChangeCityId: PropTypes.func.isRequired
};

export default CityAutoSuggest;

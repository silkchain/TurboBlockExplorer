import React from 'react';
import { connect } from 'react-redux';

import * as actions from '@/actions/creators';

import SearchButton from '@/components/SearchButton';

const mapDispatchToProps = (dispatch) => ({
  onSubmitSearch: (query) => dispatch(actions.searchFor(query)),
});

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ searchQuery: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmitSearch(this.state.searchQuery);
  }

  render() {
    return (
      <form className='turbo-search' onSubmit={this.handleSubmit}>
        <input
          className='turbo-search__input'
          value={this.state.searchQuery}
          placeholder='Block #, Transaction #, Address'
          onChange={this.handleChange}
        />
        <SearchButton type='submit'>Search</SearchButton>
      </form>
    );
  }
}

export default connect(null, mapDispatchToProps)(Search);

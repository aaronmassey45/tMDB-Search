import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_MOVIES':
      return {
        ...state,
        results: action.payload,
        heading: 'Search Results',
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    results: [],
    heading: 'Top 10 Popular Movies',
    dispatch: action => this.setState(state => reducer(state, action)),
  };

  componentDidMount = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&page=1`
      )
      .then(res => {
        const results = res.data.results.filter((movie, i) => i < 10);
        this.setState({ results });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

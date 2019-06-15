import {
    DEFAULT_QUERY,
    DEFAULT_HPP,
    PATH_BASE,
    PARAM_HPP,
    PATH_SEARCH,
    PARAM_PAGE,
    PARAM_SEARCH
} from '../../constants';

import * as React from 'react';
import axios from 'axios';
import './app.css';
import { Button } from '../button';
import { Table } from '../table';
import { Search } from '../search';


const Loading = () =>
  <div>Loading...</div>

const withLoading = (Component) => ({ isLoading, ...rest }) => 
  isLoading
  ? <Loading />
  : <Component {...rest} />

const ButtonWithLoading = withLoading(Button);

const updateSearchTopStoriesState = (hits, page) => prevState => {
  const { searchKey, results } = prevState;
  const oldHits = results && results[searchKey]
    ? results[searchKey].hits
    : [];

  const updatedHits = [
    ...oldHits,
    ...hits
  ];

  return {
    results: {
      ...results,
      [searchKey]: { hits: updatedHits, page }
    },
    isLoading: false
  };
};


export class App extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
    }

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  }


  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    this.setState(updateSearchTopStoriesState(hits, page));
  }

  fetchSearchTopStories(searchTerm, page=0) {
    this.setState({ isLoading: true })
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`).
      then(result => this._isMounted && this.setSearchTopStories(result.data)).
      catch(error => this._isMounted && this.setState({ error }));
  }
  
  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }

  componentDidMount() {
    this._isMounted = true;
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onDismiss(objectID) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    const isNotId = item => item.objectID !== objectID;
    const updatedHits = hits.filter(isNotId);
    this.setState({ 
      results: {
        ...results, 
        [searchKey] : {hits: updatedHits}
      } 
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  render() {
    const { searchTerm, results, searchKey, error, isLoading } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (
      results && results[searchKey] && results[searchKey].hits
    ) || [];

    return (
      <div className="page" data-test="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
          Search
          </Search>
        </div>
        { error
          ? <div className="interactions">
              <p>Something went wrong.</p>
            </div>
          : <Table
              list={list}
              onDismiss={this.onDismiss}
            />
        }
        
        <div className="interactions">
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            More
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

import * as React from 'react';

export class Search extends React.Component {
  componentDidMount(){
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const { value, onChange, onSubmit, children } = this.props;
    
    return(
        <div data-test="search-form">
          <form onSubmit={onSubmit}>
            {children}<input
              type="text"
              value={value}
              onChange={onChange}
              ref={el => this.input = el}
            />
            <button type="submit">
              {children}
            </button>
          </form>
        </div>
    );
  }
}

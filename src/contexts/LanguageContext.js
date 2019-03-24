import React from 'react';

// Make sure 'C' is capitalized to tell react that this is a component.
/*export default*/ const Context = React.createContext('english');

export class LanguageStore extends React.Component {
  state = { language: 'english' };

  onLanguageChange = (language) => {
    this.setState({ language });
  }

  render() {
    return (
      // Create a new object with current state object and a new property onLanguageChange that has a value of a function.
      // Thus, whenever onLanguageChange is called, the state object is changed.
      <Context.Provider value={{ ...this.state, onLanguageChange: this.onLanguageChange }}>
        {/* this.props.children has access to all the jsx nested inside of a component as props. */}
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;


// Now whenever we want to import this file, we can either write:
//   * import LanguageContext from ...
//   * import { LanguageStore } from ...
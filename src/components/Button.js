import React from 'react';
import LanguageContext from '../contexts/LanguageContext'

class Button extends React.Component {
  renderSubmit(value) {
    return value === 'english'? 'Submit' : 'Voorleggen';
  }

  // contextType is a keyword, do NOT name it something else.
  // The 'static' keyword adds a property to this class itself.
  // Which is identical to writing: Button.contextType = LanguageContext;
  // static contextType = LanguageContext;

  render() {
    // const text = this.context === 'english'? 'Submit' : 'Voorleggen';

    return (
      <button className="ui button primary">
        {/* {text} */}
        <LanguageContext.Consumer>
          {/* We are providing a function as a child to a react component.
              The argument 'value' is the context value.*/}
          {(value) => this.renderSubmit(value)}
        </LanguageContext.Consumer>
      </button>
    );
  }
}

export default Button;
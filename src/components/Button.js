import React from 'react';
import LanguageContext from '../contexts/LanguageContext'
import ColorContext from '../contexts/ColorContext';

class Button extends React.Component {
  renderSubmit(value) {
    return value === 'english'? 'Submit' : 'Voorleggen';
  }

  renderButton(color) {
    return (
      <button className={`ui button ${color}`}>
        {/* {text} */}
        <LanguageContext.Consumer>
          {/* We are providing a function as a child to a react component.
              The argument 'value' is the context value.*/}
          {(value) => this.renderSubmit(value)}
        </LanguageContext.Consumer>
      </button>
    );
  }

  // contextType is a keyword, do NOT name it something else.
  // The 'static' keyword adds a property to this class itself.
  // Which is identical to writing: Button.contextType = LanguageContext;
  // static contextType = LanguageContext;

  render() {
    // const text = this.context === 'english'? 'Submit' : 'Voorleggen';

    return (
      // Since we want to change the Button class name, we need to wrap the button with Consumer.
      <ColorContext.Consumer>
        {(color) => this.renderButton(color)}
      </ColorContext.Consumer>
    );
  }
}

export default Button;
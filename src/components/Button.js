import React from 'react';
import LanguageContext from '../contexts/LanguageContext'

class Button extends React.Component {
  // contextType is a keyword, do NOT name it something else.
  // The 'static' keyword adds a property to this class itself.
  // Which is identical to writing: Button.contextType = LanguageContext;
  static contextType = LanguageContext;

  render() {
    const text = this.context === 'english'? 'Submit' : 'Voorleggen';

    return (
      <button className="ui button primary">{text}</button>
    );
  }
}

export default Button;
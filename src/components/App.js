import React from 'react';
import UserCreate from './UserCreate';
// Change #1: Remove LanguageContext and import LanguageStore.
// import LanguageContext from '../contexts/LanguageContext';
import { LanguageStore } from '../contexts/LanguageContext';
import ColorContext from '../contexts/ColorContext';
import LanguageSelector from './LanguageSelector';


class App extends React.Component {
  // Change #3: Remove state object, and the onLanguageChange callback.
  // state = { language: 'english' }

  // onLanguageChange = language => {
  //   this.setState({ language });
  // }

  render() {
    return (
      <div className="ui container">
        {/*
          <div>
            Select a language:
            <i className="flag us" onClick={() => this.onLanguageChange('english')} />
            <i className="flag nl" onClick={() => this.onLanguageChange('dutch')} />
          </div>
        */}

        {/* Change #2: Our App component no longer maintains business logic. */}
        {/*            Remove the Language.Context.Provider*/}
        {/*            Wrap everything inside LanguageStore since we want both LanguageSelector */}
        {/*            and UserCreate to have access to LanguageStore.*/}
        <LanguageStore>
          {/* Change #4: The LanguageSelector component no longer gets to change the language */}
          {/*            from App. But instead get this callback from the LanguageContext. */}
          {/*            Hence, we delete the prop. */}
          <LanguageSelector />
          {/* Whatever we assign to 'value', it will be used to update
              the context value. */}
          {/* The order of the Provider doesn't matter. */}
          <ColorContext.Provider value="red">
              <UserCreate />
          </ColorContext.Provider>
        </LanguageStore>
      </div>
    );
  }
}

export default App;
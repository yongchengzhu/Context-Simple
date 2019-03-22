# Translate App

A react application built for learning purpose. Here, we make use of the Context system introduced in React 16, taught by Stephen Grider.

The app will have 4 components: App, UserCreate, Field, and Button. The user selects a language in the App component, then the display texts for the Field and Button will be rendered based on the language selected. If we were to pass down the language a prop, we have to first pass language from App to UserCreate, then from UserCreate to Field and Button. But if we make use of the Context system, we can pass the language directly from App to Field and Button.



## Timeline / Notes

### Table of Contents

[Initial Setup](#initial-setup)



### Initial Setup

1. Generate the react application folder.

   `create-react-app translate-app`

   Run the app.

   `npm start`

2. Delete all the files inside `src`.

3. Inside `src`, create new file `index.js`.

   ```jsx
   import React from 'react';
   import ReactDOM from 'react-dom';
   import App from './components/App';
   
   ReactDOM.render(
     <App />, document.querySelector('#root')
   );
   ```

4. Create a new directory `src/components`.

5. Create a new component `src/components/App.js`.

   ```jsx
   import React from 'react';
   
   class App extends React.Component {
     render() {
       return (
         <div>App</div>
       );
     }
   }
   
   export default App;
   ```

6. Wire up semantic-ui for showing country flags. Inside `public/index.html`

   ```html
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" />
   ```

   Then, inside `App.js` add class name 'ui container' to root div.

   ```jsx
   <div className="ui container">App</div>
   ```

7. Create a state property 'language' inside App.

   ```jsx
   class App extends React.Component {
     state = { language: 'english' }   
   }
   ```

   Render the language selector with two flags icons.

   ```jsx
   render() {
       return (
           <div className="ui container">
               <div>
                   Select a language:
                   <i className="flag us" />
                   <i className="flag nl" />
               </div>
           </div>
       );
   }
   ```

8. Create a callback function that allows user to click and toggle between two languages.

   ```jsx
   onLanguageChange = language => {
       this.setState({ language });
   }
   
   render() {
       return (
           <div className="ui container">
               <div>
                   Select a language:
                   <i className="flag us" onClick={() => this.onLanguageChange('english')} />
                   <i className="flag nl" onClick={() => this.onLanguageChange('dutch')} />
               </div>
               { this.state.language }
           </div>
       );
   }
   ```

   
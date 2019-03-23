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

9. Create the UserCreate component.

   ```jsx
   import React from 'react';
   import Field from './Field';
   import Button from './Button';
   
   const UserCreate = () => {
     return (
       <div className="ui form">
         <Field />
         <Button />
       </div>
     );
   }
   
   export default UserCreate;
   ```

   Create the Field component.

   ```jsx
   import React from 'react';
   
   class Field extends React.Component {
     render() {
       return (
         <div className="ui field">
           <label>Name</label>
           <input />
         </div>
       );
     }
   }
   
   export default Field;
   ```

   Create the Button component.

   ```jsx
   import React from 'react';
   
   class Button extends React.Component {
     render() {
       return (
         <button className="ui button primary">Submit</button>
       );
     }
   }
   
   export default Button;
   ```

   Call an instance of the UserCreate component in App component.

   ```jsx
   render() {
       return (
           <div className="ui container">
               <div>
                   Select a language:
                   <i className="flag us" onClick={() => this.onLanguageChange('english')} />
                   <i className="flag nl" onClick={() => this.onLanguageChange('dutch')} />
               </div>
               <UserCreate />
           </div>
       );
   ```

10. In order to pass data from App directly to Field and Button components, we need to create a 'Context Object'. How do we get information in and out of the Context Object? There are two ways to get information in and out of the Context Object. 

    We can setup something called the 'Default Value' when our Context Object is created. Or alternatively, we can create something called the 'Provider' component. And this Provider component can essentially push information into the Context Object.

    Once we want to get information out of the Context Object, we can either reference the `this.context` property inside of a nested child component, or inside of the nested child component we can create a component called the 'Consumer' component.

    There will be scenarios where we want to reference `this.context` and another scenario that want to create a Consumer component.

11. We are now going create the Context Object. First, create a new directory `src/contexts`. Then, create a new file inside that directory `src/contexts/LanguageContext.js`. The purpose of this file, is to create a Context Object and export it. The reason why we create this as a separate file is so that we can import the Context Object into only the component files that we care about. (i.e. in our application, we only connect this Context Object to App, Button, and Field components.)

    ```jsx
    import React from 'react';
    
    export default React.createContext();
    ```

12. We are going to get information inside of the Context Object by creating default value. We can create default value by passing it directly into createContext() call.

    ```jsx
    export default React.createContext('english');
    ```

13. Now let's connect this Context Object to our nested child Button component by making use of the `this.context` property. Inside of Button component, the first thing we need to do is to create a property called contextType inside of Button.

    ```jsx
    import LanguageContext from '../contexts/LanguageContext'
    
    class Button extends React.Component {
      static contextType = LanguageContext;
    
      ...
    }
    ```

    Now that we have added a reference of contextType to our ContextObject to our component class, our component class can now reference `this.context`, and get access to the data inside of that Context Object. If we `console.log(this.context)`, we will see that it return `'english'` in the console.

14. Inside of the Button component, let's change the text of the button based upon the current context value. Since we only have two languages we can easily write a ternary operation to do this.

    ```jsx
    render() {
        const text = this.context === 'english'? 'Submit' : 'Voorleggen';
    
        return (
            <button className="ui button primary">{text}</button>
        );
    }
    ```

15. Inside of the Field component, let's do the same thing.

    ```jsx
    import LanguageContext from '../contexts/LanguageContext';
    
    class Field extends React.Component {
      static contextType = LanguageContext;
    
      render() {
        ...
        <label>{text}</label>
        ...
      }
    }
    ```

16. Right now the only problem we have is that the default value inside of our Context Object is fixed. To change the context value, we need to create a component called 'Provider' and wire it up inside App component. Inside App.js:

    ```jsx
    import LanguageContext from '../contexts/LanguageContext';
    
    class App extends React.Component {
      ...
      <LanguageContext.Provider value={this.state.language}>
        <UserCreate />
      </LanguageContext.Provider>
      ...
    }
    ```

    Now our texts inside Field and Button components change whenever the state property value gets changed.
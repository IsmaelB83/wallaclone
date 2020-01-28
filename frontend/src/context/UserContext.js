// NPM Modules
import React from 'react'
// Material UI
// Own modules
// Assets
// CSS

// Creo el contexto
const UserContext = React.createContext()

// Exporto el componente envuelto en el consumer
export default function withUserContext(Component) {
  return function WithUserContext(props) {
    return (
      <UserContext.Consumer>
      {userContextValue => <Component {...props} {...userContextValue} />}
      </UserContext.Consumer>
    );
  };
}
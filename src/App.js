/// external modules ///
import React from 'react';

/// reducers ///
import todo from 'reducers/todo';

/// components ///
import TodoList from 'components/TodoList';
import TodoForm from 'components/TodoForm';

/// styles ///
import './styles/App.css';

/***************************************
  COMPONENT
***************************************/
const App = () => {
  // reducer
  const [list, dispatch] = React.useReducer (todo.reducer, todo.init.list ());
  const dispatcher = todo.dispatcher (dispatch);

  return (
    <div className='App'>
      <TodoForm
      dispatcher={dispatcher}
      />
      <TodoList
      list={list}
      dispatcher={dispatcher}
      />
    </div>
  );
}

/**************************************/

export default App;

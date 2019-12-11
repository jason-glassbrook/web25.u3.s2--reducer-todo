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
  const effect = todo.actions.senders (dispatch);

  return (
    <div className='App'>
      <TodoForm
      effect={effect}
      />
      <TodoList
      list={list}
      effect={effect}
      />
    </div>
  );
}

/**************************************/

export default App;

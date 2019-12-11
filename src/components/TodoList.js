/// external modules ///
import React from 'react';

/// components ///
import TodoItem from './TodoItem';

/***************************************
  MAIN
***************************************/
const TodoList = ({ list, effect, ...rest }) => {
  console.log ('components/TodoList ~ list :', list);

  try {
    return (
      <ul>
        {list.map ((item) => (
          <TodoItem
          key={item.id}
          item={item}
          effect={effect}
          />
        ))}
      </ul>
    );
  }
  catch (error) {
    return (<div>OOPS!</div>)
  }
};

/**************************************/

export default TodoList;

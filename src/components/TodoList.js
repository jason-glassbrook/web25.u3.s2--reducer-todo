/// external modules ///
import React from 'react';

/// components ///
import TodoItem from './TodoItem';

/***************************************
  MAIN
***************************************/
const TodoList = ({ list, dispatcher, ...rest }) => {
  return (
    <ul>
      {list.map ((item) => (
        <TodoItem
        key={item.id}
        item={item}
        dispatcher={dispatcher}
        />
      ))}
    </ul>
  );
};

/**************************************/

export default TodoItem;

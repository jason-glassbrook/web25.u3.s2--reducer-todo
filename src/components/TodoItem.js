/// external modules ///
import React from 'react';

/// reducers ///
import todo from 'reducers/todo';

/***************************************
  MAIN
***************************************/
const TodoItem = ({ item, dispatcher, ...rest }) => {
  return (
    <li
    className='TodoItem'
    onClick={() => dispatcher.item.toggle (item)}
    >
      {item.text}
    </li>
  );
};

/**************************************/

export default TodoItem;
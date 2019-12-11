/// external modules ///
import React from 'react';

/***************************************
  MAIN
***************************************/
const TodoItem = ({ item, effect, ...rest }) => {
  console.log ('components/TodoList ~ item :', item);

  try {
    return (
      <li
      className='TodoItem'
      onClick={() => effect.TOGGLE_ITEM (item)}
      >
        {item.text}
      </li>
    );
  }
  catch (error) {
    return (<li>OOPS!</li>)
  }
};

/**************************************/

export default TodoItem;

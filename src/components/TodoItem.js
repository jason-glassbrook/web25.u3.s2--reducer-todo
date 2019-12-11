/// external modules ///
import React from 'react';

/***************************************
  MAIN
***************************************/
const TodoItem = ({ item, dispatcher, ...rest }) => {
  console.log ('components/TodoList ~ item :', item);

  try {
    return (
      <li
      className='TodoItem'
      onClick={() => dispatcher.item.toggle (item)}
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

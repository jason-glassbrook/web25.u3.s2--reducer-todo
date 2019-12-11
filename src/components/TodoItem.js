/// external modules ///
import React from 'react';
import styled from 'styled-components';

/***************************************
  MAIN
***************************************/
const ListItem = styled.li `
  &.is-complete {
    text-decoration: line-through;
  }
`

const TodoItem = ({ item, effect, ...rest }) => {
  console.log ('components/TodoList ~ item :', item);

  try {
    return (
      <ListItem
      className={`TodoItem ${item.isComplete ? 'is-complete' : ''}`.trim ()}
      onClick={() => effect.TOGGLE_ITEM (item)}
      >
        {item.text}
      </ListItem>
    );
  }
  catch (error) {
    return (<ListItem>OOPS!</ListItem>)
  }
};

/**************************************/

export default TodoItem;

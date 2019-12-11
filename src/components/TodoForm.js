/// external modules ///
import React from 'react';

/// tools ///
import immutably from 'tools/immutably';

/***************************************
  MAIN
***************************************/
const TodoForm = ({ dispatcher, ...rest }) => {
  // form state
  const [state, setState] = React.useState ({ text : '' });

  // handle change
  const handleChange = (e) =>
    setState (immutably.set (state, [e.target.name], e.target.value));

  return (
    <form
    className='TodoForm'
    onSubmit={(e) => e.preventDefault ()}>
      <div className='add_item'>
        <input
        type='text'
        name='text'
        placeholder='write a to-do'
        value={state.text}
        onChange={handleChange}
        />
        <button
        type='submit'
        name='add_item'
        onClick={() => dispatcher.item.add (state)}>
          add item
        </button>
      </div>
      <button
      type='button'
      name='unmark_all_items'
      onClick={() => dispatcher.list.unmark ()}>
        clear completion on all items
      </button>
    </form>
  );
};

/**************************************/

export default TodoForm;

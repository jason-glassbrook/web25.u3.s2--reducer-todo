/// external modules ///
import React from 'react';

/// tools ///
import immutably from 'tools/immutably';

/***************************************
  MAIN
***************************************/
const TodoForm = ({ dispatcher, ...rest }) => {
  // form item
  const [item, setItem] = React.useState ({
    'text' : '',});

  // handle change
  const handleChange = (e) =>
    setItem (immutably.set (item, [e.target.name], e.target.value));

  return (
    <form
    className='TodoForm'
    onSubmit={(e) => e.preventDefault ()}>
      <div className='new_item'>
        <input
        type='text'
        name='text'
        placeholder='write a to-do'
        value={item.text}
        onChange={handleChange}
        />
        <button
        type='submit'
        name='add_item'
        onClick={() => dispatcher.item.add (item)}>
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

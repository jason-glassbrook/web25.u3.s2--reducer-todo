/// tools ///
import { boolean } from 'tools/iffy';

/**************************************/

export const init = {
  'todosList' : () => ([]),
  'todoItem' : (text, isComplete) => ({
    'id' : (Date.now ()),
    'text' : text,
    'isComplete' : (boolean (isComplete) ? isComplete : false),
  }),
};

export const actions = [
];

export const reducer = (state, action) => {
  switch (action.type) {
    default : return (state);
  };
};

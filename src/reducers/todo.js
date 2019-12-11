/// tools ///
import { flag } from 'tools/hi';
import { boolean } from 'tools/iffy';
import immutably from 'tools/immutably';

/**************************************/

/*--------------------------------------
  init - initial values
--------------------------------------*/
export const init = {
  'list' : () => ([]),
  'item' : (text, isComplete) => ({
    'id' : (Date.now ()),
    'text' : text,
    'isComplete' : (boolean (isComplete) ? isComplete : false),
  }),
};

/*--------------------------------------
  actions
  .make - fun to make an action obj
  .names - list of action names (types)
  .senders - funs to send (dispatch) action objs
--------------------------------------*/
export const actions = {};

actions.make = (type, data) => {
  console.log ({ type, data });
  return ({ type, data });
};

actions.names = [
  // add/delete item
  'ADD_ITEM',
  'DELETE_ITEM',
  // mark/toggle specific item
  'MARK_ITEM',
  'UNMARK_ITEM',
  'TOGGLE_ITEM',
  // mark/toggle all items
  'MARK_ALL_ITEMS',
  'UNMARK_ALL_ITEMS',
  'TOGGLE_ALL_ITEMS',
];

actions.senders = (dispatch) => Object.fromEntries (
  actions.names.map ((name) => [
    name, (...args) => dispatch (actions.make (name, ...args))
  ])
);

/*--------------------------------------
  reducer
--------------------------------------*/
export const reducer = (/* state = */ list, { type, data }) => {
  /// find item by ID ///
  const getItemIndex = (item) => (
    list.findIndex ((elem) => (elem.id === item.id))
  );

  try {
    /// actions ///
    switch (type) {
      // add/delete item
      case 'ADD_ITEM' :
        return ([
          ...list,
          init.item (data.text)
        ]);
      case 'DELETE_ITEM' :
        return (
          list.filter ((item) => (item.id !== data.id))
        );
      // mark/toggle specific item
      case 'MARK_ITEM' :
        return (
          immutably.set (list, [getItemIndex (data), 'isComplete'], true)
        );
      case 'UNMARK_ITEM' :
        return (
          immutably.set (list, [getItemIndex (data), 'isComplete'], false)
        );
      case 'TOGGLE_ITEM' :
        return (
          immutably.toggle (list, [getItemIndex (data), 'isComplete'])
        );
      // mark/toggle all items
      case 'MARK_ALL_ITEMS' :
        return (list.map ((item) => (
          immutably.set (item, ['isComplete'], true)
        )));
      case 'UNMARK_ALL_ITEMS' :
        return (list.map ((item) => (
          immutably.set (item, ['isComplete'], false)
        )));
      case 'TOGGLE_ALL_ITEMS' :
        return (list.map ((item) => (
          immutably.toggle (item, ['isComplete'])
        )));
      // else
      default :
        flag ('warn', 'action not defined');
        console.log ('type :', type);
        return (list);
    };
  }
  catch (error) {
    flag ('error', 'something bad happened');
    console.error (error);
  }
};

/**************************************/

export default {
  init,
  actions,
  reducer,
};

/// tools ///
import { flag } from 'tools/hi';
import { boolean } from 'tools/iffy';
import immutably from 'tools/immutably';

/**************************************/

export const init = {
  'list' : () => ([]),
  'item' : (text, isComplete) => ({
    'id' : (Date.now ()),
    'text' : text,
    'isComplete' : (boolean (isComplete) ? isComplete : false),
  }),
};

export const actions = [
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

export const reducer = (state, { type, data }) => {
  switch (type) {
    // add/delete item
    case 'ADD_ITEM' :
      return ([
        ...state,
        init.item (data.text)
      ]);
    case 'DELETE_ITEM' :
      return (
        state.filter ((item) => (item.id !== data.item.id))
      );
    // mark/toggle specific item
    case 'MARK_ITEM' :
      const i = state.indexOf (data.item.id);
      return (
        immutably.set (state, [i, 'isComplete'], true)
      );
    case 'UNMARK_ITEM' :
      const i = state.indexOf (data.item.id);
      return (
        immutably.set (state, [i, 'isComplete'], false)
      );
    case 'TOGGLE_ITEM' :
      const i = state.indexOf (data.item.id);
      return (
        immutably.toggle (state, [i, 'isComplete'])
      );
    // mark/toggle all items
    case 'MARK_ALL_ITEMS' :
      return (state.map ((item) => (
        immutably.set (item, ['isComplete'], true)
      )));
    case 'UNMARK_ALL_ITEMS' :
      return (state.map ((item) => (
        immutably.set (item, ['isComplete'], false)
      )));
    case 'TOGGLE_ALL_ITEMS' :
      return (state.map ((item) => (
        immutably.toggle (item, ['isComplete'])
      )));
    // else
    default :
      flag ('warn', 'action not defined');
      flag ('warn', type);
      return (state);
  };
};

export const dispatcher = (dispatch) => {
  // there's probably a way to do this more automatically
  const item = {
    add : (...args) =>
      dispatch ({ type : 'ADD_ITEM', data : { ...args } }),
    delete : (...args) =>
      dispatch ({ type : 'DELETE_ITEM', data : { ...args } }),
    mark : (...args) =>
      dispatch ({ type : 'MARK_ITEM', data : { ...args } }),
    unmark : (...args) =>
      dispatch ({ type : 'UNMARK_ITEM', data : { ...args } }),
    toggle : (...args) =>
      dispatch ({ type : 'TOGGLE_ITEM', data : { ...args } }),
  };
  //
  const list = {
    mark : (...args) =>
      dispatch ({ type : 'MARK_ALL_ITEMS', data : { ...args } }),
    unmark : (...args) =>
      dispatch ({ type : 'UNMARK_ALL_ITEMS', data : { ...args } }),
    toggle : (...args) =>
      dispatch ({ type : 'TOGGLE_ALL_ITEMS', data : { ...args } }),
  };
  //
  return [item, list];
}

/**************************************/

export default {
  init,
  actions,
  reducer,
  dispatcher,
};

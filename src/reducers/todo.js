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

export const dispatcher = (dispatch) => {
  // there's probably a way to do this more automatically
  const item = {
    add : (data) =>
      dispatch ({ type : 'ADD_ITEM', data }),
    delete : (data) =>
      dispatch ({ type : 'DELETE_ITEM', data }),
    mark : (data) =>
      dispatch ({ type : 'MARK_ITEM', data }),
    unmark : (data) =>
      dispatch ({ type : 'UNMARK_ITEM', data }),
    toggle : (data) =>
      dispatch ({ type : 'TOGGLE_ITEM', data }),
  };
  //
  const list = {
    mark : () =>
      dispatch ({ type : 'MARK_ALL_ITEMS' }),
    unmark : () =>
      dispatch ({ type : 'UNMARK_ALL_ITEMS' }),
    toggle : () =>
      dispatch ({ type : 'TOGGLE_ALL_ITEMS' }),
  };
  //
  return { item, list };
};

/**************************************/

export default {
  init,
  actions,
  reducer,
  dispatcher,
};

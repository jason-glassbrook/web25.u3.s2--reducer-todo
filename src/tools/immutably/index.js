/*******************************************************************************
  immutably
--------------------------------------------------------------------------------
  A set of helper functions for "immutably" setting values in objects.
*******************************************************************************/

/// tools ///
import nullably from 'tools/nullably';
import { isnt, boolean } from 'tools/iffy';

/***********************************************************
  MAIN
***********************************************************/

/***************************************
  setters
***************************************/

/*--------------------------------------
  set
----------------------------------------
  - make a copy (shallow) of an object
  - set the value at the end of a "path" (eg: a list of fields or indexes)
--------------------------------------*/
export const set = (object, /* path */ [field, ...rest], value) =>
  (isnt (field) ? object : {
    ...object,
    [field] : set (object [field], rest, value)
  });

/*--------------------------------------
  setField, setItem
----------------------------------------
  - aliases for easier reading
--------------------------------------*/
export const setField = (object, field, value) =>
  set (object, [field], value);
export const setItem = (array, index, value) =>
  set (array, [index], value);

/*--------------------------------------
  setBy
----------------------------------------
  - make a copy (shallow) of an object
  - functionally set the value of one "path" (eg: a field or index)
  - the function takes the original object, path, and original value of object[path]
--------------------------------------*/
export const setBy = (object, path, fun) =>
  set (object, path,
    fun (object, path, nullably.get (object, path))
  );

/*--------------------------------------
  setFieldBy, setItemBy
----------------------------------------
  - aliases for easier reading
--------------------------------------*/
export const setFieldBy = (object, field, fun) =>
  setBy (object, [field], fun);
export const setItemBy = (array, index, fun) =>
  setBy (array, [index], fun);

/***************************************
  togglers
***************************************/

export const _toggle = (x) => {
  if (boolean (x)) {
    return (!x);
  } else {
    console.warn (`The value you're toggling isn't boolean.`);
    console.warn (`Returning the value as-is.`, x);
    return (x);
  }
};

/*--------------------------------------
  toggle
----------------------------------------
  - make a copy (shallow) of an object
  - toggle the boolean value of one "path" (eg: a field or index)
--------------------------------------*/
export const toggle = (object, path) =>
  set (object, path, _toggle (object[path]));

/*--------------------------------------
  toggleField, toggleItem
----------------------------------------
  - aliases for easier reading
--------------------------------------*/
export const toggleField = (object, field) =>
  toggle (object, [field]);
export const toggleItem = (array, index) =>
  toggle (array, [index]);

/**************************************/

export default {
  set, setField, setItem,
  setBy, setFieldBy, setItemBy,
  toggle, toggleField, toggleItem,
};

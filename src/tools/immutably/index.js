/*******************************************************************************
  immutably
--------------------------------------------------------------------------------
  A set of helper functions for "immutably" setting values in objects.
*******************************************************************************/

/// tools ///
import { flag } from 'tools/hi';
import { isnt, like } from 'tools/iffy';
import nullably from 'tools/nullably';

/***********************************************************
  MAIN
***********************************************************/

/***************************************
  setters
***************************************/

export function _set (object, /* path = */ [field, ...rest], value) {
  if (isnt (field)) {
    return (value);
  }
  else {
    const subject = _set ((
      // if field exists, then enter it, else create a blank object
      object.hasOwnProperty (field) ? object [field] : {}
      ), rest, value
    );

    if (like ('Array', object)) {
      const a = [ ...object ]; a[field] = subject;
      return (a);
    }
    else if (like ('Object', object)) {
      const o = { ...object }; o[field] = subject;
      return (o);
    }
    else {
      throw ('currently, you can only set fields in Object and Array objects');
    }
  }
}

/*--------------------------------------
  set
----------------------------------------
  - make a copy (shallow) of an object
  - set the value at the end of a "path" (eg: a list of fields or indexes)
--------------------------------------*/
function set (object, path, value) {
  const fallback = object;

  if (isnt (object)) {
    flag ('warn', 'immutably/set : `object` is `null` or `undefined`');
    console.warn ('<-- <fallback>');
    return (fallback);
  }

  try {
    return (_set (object, path, value));
  }
  catch (error) {
    flag ('error', 'immutably/set : an error occured');
    console.error (error);
    console.warn ('<-- <fallback>');
    return (fallback);
  }
}

/*--------------------------------------
  setField, setIndex
----------------------------------------
  - aliases for easier reading
--------------------------------------*/
export const setField = (object, field, value) =>
  set (object, [field], value);
export const setIndex = (array, index, value) =>
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
  setFieldBy, setIndexBy
----------------------------------------
  - aliases for easier reading
--------------------------------------*/
export const setFieldBy = (object, field, fun) =>
  setBy (object, [field], fun);
export const setIndexBy = (array, index, fun) =>
  setBy (array, [index], fun);

/***************************************
  togglers
***************************************/

export function _toggle (x) {
  if (like ('Boolean', x)) {
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
  set (object, path, _toggle (nullably.get (object, path)));

/*--------------------------------------
  toggleField, toggleIndex
----------------------------------------
  - aliases for easier reading
--------------------------------------*/
export const toggleField = (object, field) =>
  toggle (object, [field]);
export const toggleIndex = (array, index) =>
  toggle (array, [index]);

/**************************************/

export default {
  set, setField, setIndex,
  setBy, setFieldBy, setIndexBy,
  toggle, toggleField, toggleIndex,
};

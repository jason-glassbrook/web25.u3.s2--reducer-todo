/*******************************************************************************
  nullably
--------------------------------------------------------------------------------
  A set of helper functions for "nullably" getting values in objects.
*******************************************************************************/

/// tools ///
import { flag } from 'tools/hi';
import { isnt } from 'tools/iffy';

/***********************************************************
  MAIN
***********************************************************/

/*--------------------------------------
  get
----------------------------------------
  - get the value at the end of a "path" (eg: a list of fields or indexes)
  - return undefined if the path does not exist
--------------------------------------*/
function get (object, path) {
  const fallback = undefined;

  if (isnt (object)) {
    flag ('warn', 'nullably/get : `object` is `null` or `undefined`');
    console.warn ('<-- <fallback>');
    return (fallback);
  }

  try {
    return (_get (object, path));
  }
  catch (error) {
    flag ('error', 'nullably/get : an error occured');
    console.error (error);
    console.warn ('<-- <fallback>');
    return (fallback);
  }
}

function _get (object, /* path = */ [ field, ...rest ]) {
  return (
    isnt (field) ? object : _get (object [field], rest)
  );
}

/*--------------------------------------
  getField, getIndex
----------------------------------------
  - aliases for easier reading
--------------------------------------*/
export const getField = (object, field) =>
  get (object, [field]);
export const getIndex = (array, index) =>
  get (array, [index]);

/**************************************/

export default {
  get, getField, getIndex,
};

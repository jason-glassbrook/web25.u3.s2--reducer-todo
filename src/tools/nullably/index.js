/*******************************************************************************
  nullably
--------------------------------------------------------------------------------
  A set of helper functions for "nullably" getting values in objects.
*******************************************************************************/

/// tools ///
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
export const get = (object, /* path = */ [field, ...rest]) =>
  (isnt (field) ? undefined : get (object [field], rest));

/*--------------------------------------
  getField, getItem
----------------------------------------
  - aliases for easier reading
--------------------------------------*/
export const getField = (object, field, value) =>
  get (object, [field], value);
export const getItem = (array, index, value) =>
  get (array, [index], value);

/**************************************/

export default {
  get, getField, getItem,
};

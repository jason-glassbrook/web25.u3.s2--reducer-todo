/*******************************************************************************
  immutably
--------------------------------------------------------------------------------
  A set of helper functions for "mutating" immutable values.
*******************************************************************************/

/// imports ///
import iffy from 'tools/iffy';

/// exports ///
export const toggle = (x) => {
  if (iffy.boolean (x)) {
    return (!x);
  } else {
    console.warn (`The value you're toggling isn't boolean.`);
    console.warn (`Returning the value as-is.`, x);
    return (x);
  }
};

export class immutably {
  // constructor () {
  //   console.warn ('--> constructing immutably is unnecessary <--');
  // }

  /***************************************
    setters
  ***************************************/
  /*--------------------------------------
    set
  ----------------------------------------
    - make a copy (shallow) of an object
    - directly set the value of one "path" (eg: a field or index)
  --------------------------------------*/
  static set = (object, path, value) => ({
    ...object,
    [path] : value
  });

  /*--------------------------------------
    setField, setItem
  ----------------------------------------
    - aliases for easier reading
  --------------------------------------*/
  static setField = (object, field, value) => (
    immutably.set (object, field, value)
  );
  static setItem = (array, index, value) => (
    immutably.set (array, index, value)
  );

  /*--------------------------------------
    setBy
  ----------------------------------------
    - make a copy (shallow) of an object
    - functionally set the value of one "path" (eg: a field or index)
    - the function takes the original object, path, and original value of object[path]
  --------------------------------------*/
  static setBy = (object, path, fun) => (
    immutably.set (object, path, fun (object, path, object[path]))
  );

  /*--------------------------------------
    setFieldBy, setItemBy
  ----------------------------------------
    - aliases for easier reading
  --------------------------------------*/
  static setFieldBy = (object, field, fun) => (
    immutably.setBy (object, field, fun)
  );
  static setItemBy = (array, index, fun) => (
    immutably.setBy (array, index, fun)
  );

  /***************************************
    togglers
  ***************************************/
  /*--------------------------------------
    toggle
  ----------------------------------------
    - make a copy (shallow) of an object
    - toggle the boolean value of one "path" (eg: a field or index)
  --------------------------------------*/
  static toggle = (object, path) => (
    immutably.set (object, path, toggle (object[path]))
  );

  /*--------------------------------------
    toggleField, toggleItem
  ----------------------------------------
    - aliases for easier reading
  --------------------------------------*/
  static toggleField = (object, field) => (
    immutably.toggle (object, field)
  );
  static toggleItem = (array, index) => (
    immutably.toggle (array, index)
  );
}

/**************************************/

export default immutably;

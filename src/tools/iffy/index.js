/*******************************************************************************
  iffy
--------------------------------------------------------------------------------
  A set of helper functions for very basic existence/type/form checks.
*******************************************************************************/

/***************************************
  MAIN
***************************************/

/// existence ///
export const is    = (x) => (x !== undefined && x !== null);
export const isnt  = (x) => (!is (x)); /* (x === undefined || x === null); */
export const maybe = (x) => (is (x) || isnt (x));

/// boolean ///
export const yes     = (x) => (x === true);
export const no      = (x) => (x === false);
export const boolean = (x) => (yes (x) || no (x));

/**************************************/

export default {
  is, isnt, maybe,
  yes, no, boolean,
};

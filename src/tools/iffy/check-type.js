/*******************************************************************************
  iffy/check-type
--------------------------------------------------------------------------------
  Functions to robustly check types.
--------------------------------------------------------------------------------
  based on: <https://stackoverflow.com/a/17772086>
  originally based on: <https://stackoverflow.com/a/7356528>
*******************************************************************************/

/*--------------------------------------
  isOf
  Check if input is of type _name_.
--------------------------------------*/
export const isOf = (name, maybe) => (
  maybe && (toString.call(maybe) === '[object ' + name + ']')
);

/*--------------------------------------
  is.<_name_>
  Check if input is of type _name_.
--------------------------------------*/
export const is = Object.fromEntries (
  [
    'Arguments' ,
    'Function'  ,
    'String'    ,
    'Number'    ,
    'Date'      ,
    'RegExp'    ,
  ]
  .map ((name) => ([
    name,
    (maybe) => (isOf (name, maybe)),
  ]))
);

/**************************************/

export default {
  isOf,
  is,
};

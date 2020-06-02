/// external modules ///
import React from 'react';
import { render } from '@testing-library/react';

/***************************************
  TEST
***************************************/
export const renders = (name, Component) => {
  test (`${name} renders without crashing`, () => {
    const thing = render (<Component/>);
    
    thing.unmount ();
  });
};

/**************************************/

export default renders;

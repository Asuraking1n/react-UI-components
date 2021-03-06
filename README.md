
A library of reusable React component

## Available components
* Dropdown
* List
* Form
* Modal
* Confirm
* Side Panel
* Table
* Tooltip

## Using the components


1. From the command line inside of your project

  ```
  npm install --save reactjs-components react react-gemini-scrollbar canvas-ui
  ```

2. Import the component that you want to use

  ```js
  // es6
  import {Modal} from 'reactjs-components';

  // es5
  var Modal = require('reactjs-components').Modal;
  ```

3. Use as if it was any other component

  ```js
  // ...

  render: function () {
    return (
      // ...
      <Modal ...{props}>
        // Content
      <Modal />
    );
  }
  ```

4. Import LESS files which will add all styles for all components.

  ```less
  @import "./node_modules/canvas-ui/styles/canvas.less"
  @import (inline) "./node_modules/reactjs-components/lib/index.less"
  ```


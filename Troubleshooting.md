# Common errors

## Mixed up default and name imports
[Source](https://blog.logrocket.com/common-bugs-in-react-native/)

```js
export const componentName;
```

=> To import ***with*** curly braces

```js
import {componentName} from './file';
```

**Default export**

```js
export default componentName
```

=> To import ***without*** curly braces. Naming is no longer important => possible to rename the component when used :(

```js
import componentName from './file';
```
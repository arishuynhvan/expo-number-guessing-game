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

# UI issues

## Font weight

Available in react native, but not Expo. To use bold text in Expo, import the bold font of the family

## Passing down style properties to children

Basically, it's JS and not CSS, so this won't happen. Each component must be styled up on its own.

## Using a font before it finishes loading

Using loadAsync of AppLoading component (Expo only) doesn't guarantee the async function completes before the app renders.
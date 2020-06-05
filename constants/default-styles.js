//also possible to use very thin component wrapper 
//to reuse basic components like texts with the same styles

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    bodyText:{
        fontFamily: 'open-sans',
        textAlign: 'center'
    },
    title:{
        fontFamily:'open-sans-bold',
    }
});
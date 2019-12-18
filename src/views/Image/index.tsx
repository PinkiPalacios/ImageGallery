import * as React from 'react';
import {View, ViewStyle} from 'react-native';

const ROOT: ViewStyle = {
  flex: 1,
  width: '100%',
  backgroundColor: 'red',
};

const ImageView = () => {
  return <View style={ROOT}></View>;
};

export default ImageView;

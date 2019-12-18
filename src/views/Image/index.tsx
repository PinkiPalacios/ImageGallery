import React, {useEffect} from 'react';
import {
  View,
  ViewStyle,
  Image,
  ActivityIndicator,
  ImageStyle,
  TextStyle,
  Text,
} from 'react-native';
import {useStores} from '../../store/useStores';
import {useNavigationParam, useNavigation} from 'react-navigation-hooks';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {observer} from 'mobx-react';

const ROOT: ViewStyle = {
  flex: 1,
  width: '100%',
  backgroundColor: 'black',
  paddingHorizontal: 20,
  justifyContent: 'center',
  alignItems: 'center',
};

const IMAGE: ImageStyle = {
  width: 300,
  height: 300,
};

const TEXT: TextStyle = {
  color: 'white',
  fontSize: 20,
};

const ImageView = observer(() => {
  const {imageCollection} = useStores();
  const id = useNavigationParam('id') as string;
  const picture = imageCollection.getPicture(id);
  useEffect(() => {
    imageCollection.fetchImageById(id);
  }, []);

  return (
    <View style={ROOT}>
      {imageCollection.loading || !picture.full_picture ? (
        <ActivityIndicator></ActivityIndicator>
      ) : (
        <>
          <Image style={IMAGE} source={{uri: picture.full_picture}} />
          <Text style={TEXT}>{picture.author}</Text>
          <Text style={TEXT}>{picture.camera}</Text>
        </>
      )}
    </View>
  );
});

export default ImageView;

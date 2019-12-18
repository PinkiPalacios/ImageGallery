import React, {useEffect, useReducer, FC} from 'react';
import {
  View,
  ViewStyle,
  ActivityIndicator,
  FlatList,
  Image,
  ImageStyle,
  TouchableOpacity,
} from 'react-native';
import {useStores} from '../../store/useStores';
import {observer} from 'mobx-react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from 'react-navigation-hooks';

const imageSize = wp('45%');

const ROOT: ViewStyle = {
  flex: 1,
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'black',
};

const ROW: ViewStyle = {
  flex: 1,
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  height: imageSize,
};

const IMAGE: ImageStyle = {
  flex: 1,
  resizeMode: 'contain',
};

const Row = ({pictures, onPress}) => {
  return (
    <View style={ROW}>
      {pictures.map(p => (
        <TouchableOpacity
          onPress={() => onPress(p.id)}
          style={{flex: 0.4}}
          key={p.id}>
          <Image style={IMAGE} source={{uri: p.cropped_picture}} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const FLATLIST: ViewStyle = {
  flex: 1,
  width: '100%',
};

const List = observer(() => {
  const {imageCollection, session, bootstrap} = useStores();
  const {navigate} = useNavigation();
  const handlePress = (id: string) => {
    navigate('ImageView', {
      id,
    });
  };
  const init = async () => {
    await bootstrap();
    await imageCollection.fetchImages();
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <View style={ROOT}>
      {imageCollection.loading || !session.token ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={FLATLIST}
          data={imageCollection.pairedPictures}
          keyExtractor={([first, second]) => first.id + second.id}
          renderItem={props => (
            <Row pictures={props.item} onPress={handlePress} />
          )}
        />
      )}
    </View>
  );
});

export default List;

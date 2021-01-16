/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  Animated,
  Platform,
} from 'react-native';

import {
  height,
  width,
  LOGO_HEIGHT,
  LOGO_WIDTH,
  ITEM_SIZE,
} from './src/config/theme';
import {getMovies} from './src/services/api';

import {Ticker} from './src/components/Ticker';
import {Item} from './src/components/Item';
import {Pagination} from './src/components/Pagination';
import {Loading} from './src/components/Loading';
import {Backdrop} from './src/components/Backdrop';

export default function App() {
  const [movies, setMovies] = React.useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      // Add empty items to create fake space
      // [empty_item, ...movies, empty_item]
      // setMovies([{key: 'empty-left'}, ...movies, {key: 'empty-right'}]);
      setMovies(movies.slice(0, 4));
    };

    if (movies.length === 0) {
      fetchData();
    }
  }, [movies]);

  if (movies.length === 0) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Backdrop scrollX={scrollX} movies={movies} />
      <StatusBar hidden />
      <Animated.FlatList
        style={{
          zIndex: 2,
          elevation: 2,
        }}
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => item.key}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{alignItems: 'center'}}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        renderItem={({item, index}) => (
          <Item {...item} index={index} scrollX={scrollX} />
        )}
      />
      {/*<Image*/}
      {/*  style={styles.logo}*/}
      {/*  source={require('./assets/ue_black_logo.png')}*/}
      {/*/>*/}
      <Pagination scrollX={scrollX} data={movies} />
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'red',
          bottom: 0,
          left: 0,
          right: 0,
          width: width * 2,
          height: height * 0.6,
          zIndex: 1,
          elevation: 0,
          transform: [{rotateZ: '-15deg'}, {translateX: -LOGO_WIDTH / 2}],
          paddingTop: 24,
        }}>
        {/*<View*/}
        {/*  style={{*/}
        {/*    position: 'absolute',*/}
        {/*    top: -100,*/}
        {/*    left: width / 2 + 100,*/}
        {/*    width: 200,*/}
        {/*    height: 200,*/}
        {/*    borderRadius: 100,*/}
        {/*    backgroundColor: 'black',*/}
        {/*  }}*/}
        {/*/>*/}
        <View
          style={{
            backgroundColor: 'green',
            paddingTop: 24,
            flex: 1,
          }}>
          <View
            style={{
              backgroundColor: 'blue',
              flex: 1,
            }}
          />
        </View>
      </View>

      {/*<Ticker scrollX={scrollX} data={movies} />*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    zIndex: 2,
    opacity: 0.9,
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    resizeMode: 'contain',
    position: 'absolute',
    left: 10,
    bottom: 10,
    transform: [
      {translateX: -LOGO_WIDTH / 2},
      {translateY: -LOGO_HEIGHT / 2},
      {rotateZ: '-90deg'},
      {translateX: LOGO_WIDTH / 2},
      {translateY: LOGO_HEIGHT / 2},
    ],
  },
});

export default App;

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
import {View, FlatList, Image, Animated} from 'react-native';
import {width, height, BACKDROP_HEIGHT, ITEM_SIZE} from '../../config/theme';

export const Backdrop = ({movies, scrollX}) => {
  return (
    <View
      style={{
        height: BACKDROP_HEIGHT,
        width,
        position: 'absolute',
        backgroundColor: 'yellow',
      }}>
      <FlatList
        data={movies.reverse()}
        keyExtractor={(item) => item.key + '-backdrop'}
        removeClippedSubviews={false}
        contentContainerStyle={{width, height: BACKDROP_HEIGHT}}
        renderItem={({item, index}) => {
          if (!item.backdrop) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 1) * ITEM_SIZE, (index) * ITEM_SIZE],
            outputRange: [0, width],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: 'absolute',
                width: translateX,
                height,
                overflow: 'hidden',
              }}>
              <Image
                source={{uri: item.backdrop}}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: 'absolute',
                }}
              />
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

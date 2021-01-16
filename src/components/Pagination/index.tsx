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
import {StyleSheet, View, Animated} from 'react-native';

import {width, DOT_SIZE} from '../../config/theme';

export const Pagination = ({scrollX, data}) => {
  const inputRange = [-width, 0, width];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-DOT_SIZE, 0, DOT_SIZE],
  });
  return (
    <View style={[styles.pagination]}>
      {/*<Animated.View*/}
      {/*  style={[*/}
      {/*    styles.paginationIndicator,*/}
      {/*    {*/}
      {/*      position: 'absolute',*/}
      {/*      // backgroundColor: 'red',*/}
      {/*      transform: [{translateX}],*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*/>*/}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          height: DOT_SIZE,
          justifyContent: 'center',
          // alignItems: 'center'
        }}>
        {data.map((item) => {
          return (
            <View key={item.key} style={styles.paginationDotContainer}>
              <View
                style={[styles.paginationDot, {backgroundColor: 'white'}]}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    zIndex: 2,
    elevation: 2,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 40,
    flexDirection: 'row',
  },
  paginationDot: {
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE * 0.3,
    borderRadius: DOT_SIZE * 0.15,
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    borderColor: '#ddd',
  },
});

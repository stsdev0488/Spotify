import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';

import Separator from './Separator';
import Item from './Item';

export default ({ items, onEndReached, navigate }) => (
  <FlatList
    data={items}
    renderItem={(info) => (
      <Item item={info.item} navigate={navigate} />
    )}
    ItemSeparatorComponent={() => <Separator />}
    keyExtractor={item => item.id}
    onEndReached={onEndReached}
  />
);

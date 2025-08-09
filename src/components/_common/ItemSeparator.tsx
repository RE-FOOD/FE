import React from 'react';
import { View } from 'react-native';

const cache = new Map<number, React.ComponentType>();

export function itemSeparator(width: number) {
  if (cache.has(width)) return cache.get(width)!;

  const Sep = React.memo(() => <View style={{ width }} />);
  cache.set(width, Sep);
  return Sep;
}

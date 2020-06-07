import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './screens/Home';
import Playlist from './screens/Playlist';
import TrackDetail from './screens/TrackDetail';

const AppNavigator = createStackNavigator({
    Home: {screen: Home},
    Playlist: {screen: Playlist},
    TrackDetail: {screen: TrackDetail}
});

export default AppNavigator;

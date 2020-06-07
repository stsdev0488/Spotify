import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class TrackDetail extends React.Component {
    render() {
        const {navigation} = this.props;
        const detail = navigation.getParam('detail', 'detail');

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{detail.title}</Text>
                <Image
                    source={{uri: detail.imageUri}}
                    style={styles.image}
                />
                <Text style={styles.text}>Artist: {detail.artist}</Text>
                <Text style={styles.text}>Album: {detail.album}</Text>
                <Text style={styles.text}>Duration: {detail.duration}ms</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        paddingTop: 50,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 10,
        marginBottom: 10
    },
    title: {
        fontSize: 30,
    }
});

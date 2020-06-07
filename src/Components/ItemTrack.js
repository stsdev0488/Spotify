import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    detail: {
        flexDirection: 'column',
    },
    text: {},
});

export default class Item extends Component<{ item: any }> {
    handleItemClick = (item) => {
        const {navigate} = this.props;
        navigate('TrackDetail', {
            detail: item
        });
    };

    render() {
        let {
            item: {
                id,
                imageUri,
                title,
                popularity,
                artist,
                album,
                duration
            },
        } = this.props;
        return (
            <TouchableOpacity onPress={() => this.handleItemClick(this.props.item)}>
                <View style={styles.container}>
                    <Image
                        source={{uri: imageUri}}
                        style={styles.image}
                    />
                    <View style={styles.detail}>
                        <Text style={styles.text}>{title}</Text>
                        <Text style={styles.text}>Artist: {artist}</Text>
                        <Text style={styles.text}>Popularity: {popularity}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
};

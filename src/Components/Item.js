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
    handleItemClick = (trackHref) => {
        const {navigate} = this.props;
        navigate('Playlist', {
            href: trackHref
        });
    };

    render() {
        let {
            item: {
                id,
                imageUri,
                title,
                trackCount,
                trackHref
            },
        } = this.props;
        return (
            <TouchableOpacity onPress={() => this.handleItemClick(trackHref)}>
                <View style={styles.container}>
                    <Image
                        source={{uri: imageUri}}
                        style={styles.image}
                    />
                    <View style={styles.detail}>
                        <Text style={styles.text}>{title}</Text>
                        <Text style={styles.text}>Tracks: {trackCount}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
};

import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import ListingTrack from '../Components/ListingTrack';

// production Spotify APIs
import token from '../api/token';
import fetchTracks from '../api/fetchTracks';

const PAGE = 20;

export default class Playlist extends React.Component {
    constructor() {
        super();

        this.state = {
            items: [],
            offset: 0,
            isFetching: false,
            query: 'Metallica',
            token: null,
        };
    }

    async refreshToken() {
        const newToken = await token();
        this.setState({
            token: newToken,
        });
    }

    async loadNextPage() {
        if (this.state.isFetching) {
            console.log('already fetching');
            return;
        }

        this.setState({ isFetching: true });
        const {navigation} = this.props;
        const href = JSON.stringify(navigation.getParam('href', 'href'));

        const newItems = await fetchTracks({
            offset: this.state.offset,
            limit: PAGE,
            href: href,
            token: this.state.token,
        });

        this.setState({
            isFetching: false,
            offset: this.state.offset + PAGE,
            items: [
                ...this.state.items,
                ...newItems,
            ],
        });
    }

    async componentDidMount() {
        await this.refreshToken();
        await this.loadNextPage();
    }

    handleEndReached() {
        this.loadNextPage();
    }

    render() {
        const { items, isFetching } = this.state;
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                {
                    (isFetching && items.length === 0)
                        ? <ActivityIndicator />
                        : <ListingTrack
                            items={items}
                            onEndReached={
                                () => this.handleEndReached()
                            }
                            navigate={navigate}
                        />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        padding: 10,
        paddingTop: 50,
    },
});

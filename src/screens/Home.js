import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Search from '../Components/Search';
import Listing from '../Components/Listing';

// production Spotify APIs
import token from '../api/token';
import search from '../api/searchPlaylist';
import user from '../api/user';

const PAGE = 20;

export default class Home extends React.Component {
    constructor() {
        super();

        this.state = {
            items: [],
            offset: 0,
            isFetching: false,
            query: 'Popular',
            token: null,
        };
    }

    async refreshToken() {
        const newToken = await token();
        this.setState({
            token: newToken,
        });
    }

    async getUserProfile() {
        const userProfile = await user(this.state.token);

    }

    async loadNextPage() {
        if (this.state.isFetching) {
            console.log('already fetching');
            return;
        }

        this.setState({ isFetching: true });

        const newItems = await search({
            offset: this.state.offset,
            limit: PAGE,
            q: this.state.query,
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
        await this.getUserProfile();
        await this.loadNextPage();
    }

    handleSearchChange(text) {
        this.setState({
            query: text,
            items: [],
            offset: 0,
        }, () => {
            this.loadNextPage();
        });
    }

    handleEndReached() {
        this.loadNextPage();
    }

    render() {
        const { items, isFetching } = this.state;
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <Text>Playlists(Bulgaria)</Text>
                <Search
                    onChange={
                        text => this.handleSearchChange(text)
                    }
                />
                {
                    (isFetching && items.length === 0)
                        ? <ActivityIndicator />
                        : <Listing
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
        paddingTop: 20,
    },
});

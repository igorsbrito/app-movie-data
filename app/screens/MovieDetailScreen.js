import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Image,
    Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';

import { base_movie_api } from '../constants/Urls';
import { database_api_key } from '../constants/Keys';
import * as api from '../requests';
import moment from 'moment';

const width = Dimensions.get('window').width

export default class MovieDetailScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            movieId: '',
            movieTitle: ''
        }
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        console.log(params);

        // this.setState({ movieId: params.id, movieTitle: params.title })

        // this.searchMovie(params.id);
    }

    searchMovie = (movieId) => {

        let url = base_movie_api + 'movie/' + movieId + '?api_key=' + database_api_key + '&language=en-US';

        console.log(url);
        this.setState({ loading: true });
        api.getRequest(url).then(response => {
            response.response
                .json()
                .then((data) => {
                    console.log(data);

                    this.setState({ loading: false });
                    // this.setState({ listMovies: data.results, loading: false });
                });
        })

    }


    render() {
        return (
            <View style={styles.conteiner}>
                <View style={{ flex: 1 }}>
                    <Swiper showsButtons={false}>
                        <View style={styles.slide1}>
                            <Image
                                source={{ uri: 'https://image.tmdb.org/t/p/w500/v4yVTbbl8dE1UP2dWu5CLyaXOku.jpg' }}
                                style={{ flex: 1, width: width, }}
                                resizeMode='cover'
                            />
                        </View>
                        <View style={styles.slide2}>
                            <Text style={styles.text}>Beautiful</Text>
                        </View>
                        <View style={styles.slide3}>
                            <Text style={styles.text}>And simple</Text>
                        </View>
                    </Swiper>

                </View>
                <View style={{ flex: 2.3 }}>

                </View>
                {/* {
                    this.state.loading ? (
                        <View style={styles.conteinerloading}>
                            <ActivityIndicator size="large" color="#000" />
                        </View>

                    ) : null
                } */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    },
    conteinerloading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
})
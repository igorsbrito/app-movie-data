import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    ScrollView,
    ActivityIndicator,
    Image
} from 'react-native';
import { FilmCard } from '../components/FilmCard';

import { base_movie_api } from '../constants/Urls';
import { database_api_key } from '../constants/Keys';
import * as api from '../requests';
import moment from 'moment';


export default class ListMovieScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            listMovies: []
        }
    }


    componentWillMount() {
        const { params } = this.props.navigation.state;
        console.log(params);

        this.doSearch(params.searchValue);
    }


    doSearch = (searchValueStr) => {
        let searchValue = searchValueStr.replace(' ', '+');

        let url = base_movie_api + 'search/movie?api_key=' + database_api_key + "&query=" + searchValue
        console.log(url);
        this.setState({ loading: true });

        api.getRequest(url).then(response => {
            response.response
                .json()
                .then((data) => {
                    console.log(data);
                    console.log(data.results[0]);


                    this.setState({ listMovies: data.results, loading: false });

                });
        }).catch(error => {
            Alert.alert('Request Problem', 'There was a problem o the request, try again latter')
        })
    }

    movieDetail = (data) => {
        console.log(data);
        this.props.navigation.navigate('movieDetail', data);
    }

    render() {
        return (
            <ImageBackground
                source={require('../../assets/background/jorge-vasconez.jpg')}
                style={styles.conteiner}>

                <ScrollView contentContainerStyle={styles.scrollview}>
                    <View style={{ flex: 1 }}>
                        {
                            this.state.listMovies.map((movie, i) => {


                                let imageUri = 'https://image.tmdb.org/t/p/w200/' + movie.poster_path;

                                let releaseDate = moment(movie.release_date, 'YYYY-MM-DD').format('DD/MM/YYYY')

                                return (
                                    <FilmCard
                                        key={i}
                                        id={movie.id}
                                        title={movie.title}
                                        releaseDate={releaseDate}
                                        imageUri={movie.poster_path == null ? null : imageUri}
                                        averageVote={movie.vote_average}
                                        overview={movie.overview}
                                        onPress={this.movieDetail}
                                    />
                                )
                            })
                        }

                    </View>


                </ScrollView>
                {
                    this.state.loading ?
                        (<ScrollView contentContainerStyle={styles.scrollview}>
                            <ActivityIndicator size="large" color="#fff" />
                        </ScrollView>
                        )
                        : null
                }
            </ImageBackground>
        )
    }

}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1
    },
    scrollview: {
        // flex: 1,
        alignItems: 'center',
        // justifyContent: 'center'
    },
})
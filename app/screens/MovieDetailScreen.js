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

import { base_movie_api, base_image_500_url } from '../constants/Urls';
import { database_api_key } from '../constants/Keys';
import * as api from '../requests';
import moment from 'moment';

const width = Dimensions.get('window').width

export default class MovieDetailScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            loadingImage: true,
            movieId: '',
            movieTitle: '',
            listImages:[],
            movieData:{}
        }
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        console.log(params);
        let movieId = params.id; //12445;
        let movieTitle = params.movieTitle; //"Harry Potter and the Deathly Hallows: Part 2";
        this.setState({ movieId, movieTitle })

        this.searchMovieImages(movieId);
        this.searchMovie(movieId);
    }

    searchMovie = (movieId) => {

        let url = base_movie_api + 'movie/' + movieId + '?api_key=' + database_api_key + '&language=en-US';

        console.log(url);
        this.setState({ loading: true });
        api.getRequest(url).then(response => {
            response.response
                .json()
                .then((data) => {
                    console.log('======= Movie Data =====');
                    console.log(data);

                   this.setState({movieData:data, loading:false});
                });
        })

    }

    searchMovieImages = (movieId) =>{
        this.setState({loadingImage:true});
        let url = base_movie_api + 'movie/'+ movieId + '/images?api_key=' + database_api_key + '&language=en-US&include_image_language=en';
        console.log('Images URL: ');
        console.log(url);

        api.getRequest(url).then(response =>{
            response.response
            .json()
            .then((data) => {

                if(data.backdrops.length >0){
                    this.buildImages(data.backdrops);
                }else{
                    this.buildImages(data.posters);
                }
                
            });
        })
    }
    
    buildImages = (list) =>{
        listImages =  list.map(image =>{
            return{
                url:base_image_500_url + image.file_path
            }
        })
        console.log('===== images =======');
        console.log(listImages);
        this.setState({listImages, loadingImage:false});
    }


    buildSlides = () =>{
        return this.state.listImages.map((image, index) =>{
            return(
                <View style={styles.slide1} key={index}>
                    <Image
                        source={{ uri: image.url }}
                        style={{ flex: 1, width: width, borderRadius:10 }}
                        resizeMode='contain'
                    />
                </View>
            )
        });
    }

    render() {
        return (
            <View style={styles.conteiner}>
                <View style={{ flex: 1, marginVertical:10 }}>
                    {
                        this.state.loadingImage ?
                        <View style={styles.conteinerloading}>
                            <ActivityIndicator size="large" color="#000" />
                        </View>
                        :
                        <Swiper showsButtons={false}>
                           {this.buildSlides()}
                        </Swiper>
                    }
                    

                </View>
                <View style={{ flex: 2.3, marginHorizontal:20,}}>
                {
                    this.state.loading ? (
                        <View style={styles.conteinerloading}>
                            <ActivityIndicator size="large" color="#000" />
                        </View>

                    ) : (
                        <View style={{marginVertical:10,}}>
                            {/* TO DO: begining */}
                            <View>
                                <Text style={{ fontSize:24, fontWeight:'bold', color:"#284887"}}>
                                    {this.state.movieData.title}
                                </Text>
                            </View>
                            <View style={{marginVertical:5}}>
                                <Text style={{fontSize:16, textAlign:'justify'}}>
                                    {this.state.movieData.overview}
                                </Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.label}>Release Date:</Text>
                                <Text style={styles.value}>07/07/2011</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.label}>Revenue</Text>
                                <Text style={styles.value}>07/07/2011</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.label}>Genders:</Text>
                                <Text style={styles.value}>07/07/2011</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.label}>Production Companies</Text>
                                <Text style={styles.value}>07/07/2011</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.label}>Production Contries</Text>
                                <Text style={styles.value}>07/07/2011</Text>
                            </View>
                             {/* TO DO: end */}
                        </View>
                    )
                }
                  
                </View>
  
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
    },
    info:{
        marginVertical:5, 
        flexDirection:'row'
    },
    label:{
        marginRight:10, 
        fontSize:18, 
        fontWeight:'bold'
    },
    value:{
        fontSize:16
    }
})
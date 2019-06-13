import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import searchScreen from '../screens/SearchScreen';
import listMovieScreen from '../screens/ListMovieScreen';

const rootStackNavigator = createStackNavigator({

    search: {
        screen: searchScreen,
        navigationOptions: {
            header: null
        },
    },

    listMovie: {
        screen: listMovieScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'List of Movies',
            headerStyle: {
                backgroundColor: '#284887',
            },
            titleStyle: {
                fontFamily: 'josefin_sans_bold',
                fontWeight: '800'
            },

            headerTintColor: "#fff",
        })
    }
},
    { initialRouteName: 'search' })

export default createAppContainer(rootStackNavigator);
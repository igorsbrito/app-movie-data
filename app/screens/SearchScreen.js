import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StatusBar,
    ImageBackground,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    ActivityIndicator,
    Alert
} from 'react-native';
// import { Button } from 'react-native-elements';

export default class SearchScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            loading: false
        }
    }

    doSearch = () => {
        console.log(this.state.searchValue);
        if (this.checkField(this.state.searchValue)) {

            this.props.navigation.navigate('listMovie', { searchValue: this.state.searchValue });
        } else {
            Alert.alert('Invalid Search', 'The movie tittle field can`t be empty');
        }

    }

    checkField = (value) => {
        if (value != "" && value != null && value != undefined) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <ImageBackground
                source={require('../../assets/background/jorge-vasconez.jpg')}
                style={styles.conteiner}>
                <StatusBar barStyle="light-content" hidden={false} pointerEvents={this.state.loading ? 'none' : 'auto'} />
                <KeyboardAvoidingView style={styles.viewContent} behavior="padding" enabled pointerEvents={this.state.loading ? 'none' : 'auto'}>
                    <View style={styles.viewTittle}>
                        <Image
                            source={require('../../assets/icons/filme-icon.png')}
                        />
                        <Text style={styles.titleText}>
                            Movie Search
                        </Text>
                    </View>
                    <View style={styles.InputView}>
                        <TextInput style={styles.input}
                            placeholder='INSERT THE MOVIE TITTLE'
                            onChangeText={(text) => this.setState({ searchValue: text })}
                            value={this.state.searchValue} />
                        <TouchableOpacity style={styles.touchableView}
                            onPress={() => this.doSearch()}>
                            {
                                !this.state.loading ?
                                    (
                                        <Text style={{ color: '#fff', fontFamily: 'josefin_sans_bold', fontSize: 18 }}>SEARCH</Text>
                                    ) : (
                                        <ActivityIndicator size="large" color="#fff" />
                                    )
                            }

                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>


            </ImageBackground>

        )
    }
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        width: '100%', height: '100%',

    },
    viewContent: {
        flex: 1,
        // flexDirection: 'column',
        marginTop: 35,
        marginHorizontal: 15,

    },
    viewTittle: {
        flex: 1,
        marginTop: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        color: '#e2e2e2',
        fontSize: 50,
        fontFamily: "josefin_sans_bold"
    },
    InputView: {
        flex: 1
    },
    input: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        textAlign: 'center'
    },
    touchableView: {
        marginHorizontal: -5,
        margin: 30,
        alignItems: 'center',
        backgroundColor: '#284887',
        padding: 10,
        borderRadius: 20
    }

})
import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import moment from 'moment'

const FilmCard = ({ title, imageUri, releaseDate, averageVote, onPress, overview }) => {

    screenWidth = Dimensions.get('window').width

    const styles = StyleSheet.create({
        cardView: {
            width: screenWidth * 0.9,
            marginVertical: 15,
            borderRadius: 10,
            backgroundColor: '#e2e2e2',

            elevation: 5,
            shadowRadius: 3,
            shadowColor: "rgba(72, 96, 35, 0.35)",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: .3,
        },
        topView: {
            flexDirection: "row",
            marginHorizontal: 5,
            marginTop: 15
        },
        imageView: {
            flex: 1,
            alignContent: 'flex-start'
        },
        textView: {
            flex: 2,
            alignContent:
                'flex-start', marginLeft: 10
        },
        title: {
            fontSize: 22,
            fontWeight: '800'
        },
        infoView: {
            flexDirection: 'row',
            marginTop: 5
        },
        label: {
            flex: 1,
            fontSize: 15,
            fontWeight: '800'
        },
        value: {
            flex: 1.2,
            fontSize: 15
        },
        overviewView: {
            marginHorizontal: 15,
            marginVertical: 10
        },
        labelOverview: {
            fontSize: 15,
            fontWeight: '800'
        },
        overviewText: {
            textAlign: 'justify'
        }
    })

    return (
        <TouchableOpacity style={styles.cardView}>
            <View style={styles.topView}>
                {
                    imageUri == null ?
                        null
                        :
                        (
                            <View style={styles.imageView}>
                                <Image
                                    source={{ uri: imageUri }}
                                    style={{ height: 150, borderRadius: 5 }}
                                    resizeMode='contain'
                                />
                            </View>

                        )

                }

                <View style={styles.textView}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.infoView}>
                        <Text style={styles.label}>Release Date:</Text>
                        <Text style={styles.value}>{releaseDate}</Text>
                    </View>
                    <View style={styles.infoView}>
                        <Text style={styles.label}>Average Vote:</Text>
                        <Text style={styles.value}>{averageVote}</Text>
                    </View>
                </View>

            </View>
            <View style={styles.overviewView}>
                <Text style={styles.labelOverview}>Overview:</Text>
                <Text style={styles.overviewText}
                    numberOfLines={3}
                    ellipsizeMode={'tail'}
                >{overview}</Text>
            </View>

        </TouchableOpacity>
    )

}

export { FilmCard };
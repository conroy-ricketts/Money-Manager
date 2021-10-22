import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const Statistics = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Statistics</Text>
        </View>
    );
}

export default Statistics;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DBDBD9'
    },
    text: {
        color: '#131313',
        fontWeight: 'bold',
        fontSize: 30,
    }
});
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const OverView = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Overview</Text>
        </View>
    );
}

export default OverView;

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
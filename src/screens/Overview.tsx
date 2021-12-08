import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const OverView = () => {

    return (
        <View style={styles.container}>
            <View style={styles.label}>
                <Text style={styles.text}>Accounts</Text>
            </View>
        </View>
    );
}

export default OverView;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#DBDBD9',
    },
    text: {
        color: '#131313',
        fontSize: 30,
    },
    label: {
        top: 100
    },

    

});
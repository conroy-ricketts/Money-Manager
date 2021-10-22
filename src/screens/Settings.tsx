import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const Settings = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Settings</Text>
        </View>
    );
}

export default Settings;

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
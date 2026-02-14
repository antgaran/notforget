import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native';


type School = {
    id: string;
    schoolName: string;
    schoolCode: string;
};


const App = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<School[]>([]);

    const getSchools = async () => {
        try {
            const response = await fetch('http://localhost:8080/notforget/schools');
            const json = (await response.json()) ;
            console.log('########################');
            console.log(json);
            //setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSchools();
    }, []);

    return (
        <View style={{flex: 1, padding: 24}}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={({id}) => id}
                    renderItem={({item}) => (
                        <Text style={styles.input}>
                            {item.schoolName}, {item.schoolCode}
                        </Text>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create(
    {
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        },
    });


export default App;
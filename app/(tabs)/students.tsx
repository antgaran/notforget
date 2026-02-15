import React from 'react';
import {Alert, Button, FlatList, Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import ParallaxScrollView from "@/components/parallax-scroll-view";
import Octicons from "@expo/vector-icons/Octicons";

type Student = {
    id: number;
    studentName: string | null;
    studentCode: string | null;
};

const TextInputExample = () => {
    const [studentName, onChangeStudentName] = React.useState('');
    const [studentCode, onChangeStudentCode] = React.useState('');
    const [students, setStudents] = React.useState<Student[]>([]);

    const Item = ({title}) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    const createStudent = async () => {
        try {

            const response = await fetch('http://192.168.1.235:8080/notforget/students', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentName: studentName,
                    studentCode: studentCode,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }


            // Display the response
            console.log('Schools fetched successfully:');

            return "";
        } catch (error) {
            console.error('Error fetching schools:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch schools';
            showAlert(`Error: ${errorMessage}`);
            throw error;
        }
    };


    const getStudents = async () => {
        try {
            const response = await fetch('http://192.168.1.235:8080/notforget/students', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const json: Student[] = await response.json();

            // Store the data in state
            setStudents(json);

            // Display the response
            console.log('Schools fetched successfully:', json);

            return json;
        } catch (error) {
            console.error('Error fetching schools:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch schools';
            showAlert(`Error: ${errorMessage}`);
            throw error;
        }
    };

    function showAlert(message: string) {
        if (Platform.OS === 'web') {
            window.alert(message);
        } else {
            Alert.alert('Schools', message);
        }
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={
                <Octicons name="person-fill" size={24} style={styles.input} />
            }>
            <SafeAreaProvider>
                <SafeAreaView>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeStudentName}
                        value={studentName}
                        placeholder="Enter student name"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeStudentCode}
                        value={studentCode}
                        placeholder="Enter student code"
                    />
                    <View style={buttonstyles.buttonContainer}>
                        <Button onPress={createStudent} title="Create Student" />
                    </View>
                    <View style={buttonstyles.buttonContainer}>
                        <Button onPress={getStudents} title="Fetch Students" />
                    </View>
                    <FlatList
                        data={students}
                        renderItem={({item}) => <Item title={item.studentName || ' - ' || item.studentCode || ''} />}
                        keyExtractor={item => item.id}
                    />

                </SafeAreaView>
            </SafeAreaProvider>
        </ParallaxScrollView>
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
        container: {
            flex: 1
        },
        item: {
            backgroundColor: '#f9c2ff',
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 16,
        },
        title: {
            fontSize: 32,
        },
    });
const buttonstyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        margin: 20,
    },
    alternativeLayoutButtonContainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default TextInputExample;
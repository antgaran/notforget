import React from 'react';
import {Alert, Button, Platform, StyleSheet, Text, TextInput, View,Image} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import ParallaxScrollView from "@/components/parallax-scroll-view";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

type Teacher = {
    id: number;
    teacherName: string | null;
    teacherCode: string | null;
};

const TextInputExample = () => {
    const [teacherName, onChangeTeacherName] = React.useState('');
    const [teacherCode, onChangeTeacherCode] = React.useState('');
    const [teachers, setTeachers] = React.useState<Teacher[]>([]);

    const createTeacher = async () => {
        try {

            const response = await fetch('http://192.168.1.235:8080/notforget/teachers', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    teacherName: teacherName,
                    teacherCode: teacherCode,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }


            // Display the response
            console.log('teachers fetched successfully:');

            return "";
        } catch (error) {
            console.error('Error fetching teachers:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch teachers';
            showAlert(`Error: ${errorMessage}`);
            throw error;
        }
    };


    const getteachers = async () => {
        try {
            const response = await fetch('http://192.168.1.235:8080/notforget/teachers', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const json: Teacher[] = await response.json();

            // Store the data in state
            setTeachers(json);

            // Display the response
            console.log('teachers fetched successfully:', json);

            return json;
        } catch (error) {
            console.error('Error fetching teachers:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch teachers';
            showAlert(`Error: ${errorMessage}`);
            throw error;
        }
    };

    function showAlert(message: string) {
        if (Platform.OS === 'web') {
            window.alert(message);
        } else {
            Alert.alert('teachers', message);
        }
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={
                <FontAwesome6 name="person-chalkboard" size={24} style={styles.input} />
            }>
            <SafeAreaProvider>
                <SafeAreaView>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeTeacherName}
                        value={teacherName}
                        placeholder="Enter teacher name"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeTeacherCode}
                        value={teacherCode}
                        placeholder="Enter teacher code"
                    />
                    <View style={buttonstyles.buttonContainer}>
                        <Button onPress={createTeacher} title="Create Teacher" />
                    </View>
                    <View style={buttonstyles.buttonContainer}>
                        <Button onPress={getteachers} title="Fetch teachers" />
                    </View>
                    {teachers.map((teacher) => (
                        <View key={teacher.id}>
                            <FontAwesome6 name="person-chalkboard" size={24} color="#D0D0D0" >
                            <Text style={{ color: 'white' }}>   {teacher.teacherName} </Text>
                                </FontAwesome6>
                        </View>
                    ))}


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
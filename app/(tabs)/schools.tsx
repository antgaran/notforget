import React from 'react';
import {StyleSheet, TextInput,Text, Button, View, Alert, Platform} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {IconSymbol} from "@/components/ui/icon-symbol";
import ParallaxScrollView from "@/components/parallax-scroll-view";

type School = {
    id: number;
    schoolName: string | null;
    schoolCode: string | null;
};

const TextInputExample = () => {
    const [schoolName, onChangeSchoolName] = React.useState('');
    const [schoolCode, onChangeSchoolCode] = React.useState('');
    const [schools, setSchools] = React.useState<School[]>([]);

    const createSchool = async () => {
        try {

            const response = await fetch('http://192.168.1.235:8080/notforget/schools', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    schoolName: schoolName,
                    schoolCode: schoolCode,
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


    const getSchools = async () => {
        try {
            const response = await fetch('http://192.168.1.235:8080/notforget/schools', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const json: School[] = await response.json();

            // Store the data in state
            setSchools(json);

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
                <IconSymbol
                    size={310}
                    color="#808080"
                    name="chevron.left.forwardslash.chevron.right"
                    style={styles.input}
                />
            }>
        <SafeAreaProvider>
            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeSchoolName}
                    value={schoolName}
                    placeholder="Enter school name"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeSchoolCode}
                    value={schoolCode}
                    placeholder="Enter school code"
                />
                <View style={buttonstyles.buttonContainer}>
                    <Button onPress={createSchool} title="Create School" />
                </View>
                <View style={buttonstyles.buttonContainer}>
                    <Button onPress={getSchools} title="Fetch Schools" />
                </View>
                {schools.map((school) => (
                    <Text key={school.id}>
                        {school.schoolName}, {school.schoolCode}
                    </Text>
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
import React from 'react';
import { Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import ParallaxScrollView from "@/components/parallax-scroll-view";
import Ionicons from "@expo/vector-icons/Ionicons";
import {Table, Row, Cell} from 'react-native-table-component';

type School = {
    id: number; schoolName: string | null; schoolCode: string | null;
};

function callSchoolService(schoolName: string, schoolCode: string, setSchools: (value: (((prevState: School[]) => School[]) | School[])) => void) {
    const createSchool = async () => {
        try {

            const response = await fetch('http://192.168.1.235:8080/notforget/schools', {
                method: 'POST', headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                }, body: JSON.stringify({
                    schoolName: schoolName, schoolCode: schoolCode,
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
            throw error;
        }
    };


    const getSchools = async () => {
        try {
            const response = await fetch('http://192.168.1.235:8080/notforget/schools', {
                method: 'GET', headers: {
                    'Accept': 'application/json', 'Content-Type': 'application/json',
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
            throw error;
        }
    };
    return {createSchool, getSchools};
}

const TextInputExample = () => {
    const [schoolName, onChangeSchoolName] = React.useState('');
    const [schoolCode, onChangeSchoolCode] = React.useState('');
    const [schools, setSchools] = React.useState<School[]>([]);
    const {createSchool, getSchools} = callSchoolService(schoolName, schoolCode, setSchools);
    const tableHead = ['Id', 'School Name', 'School Code'];

    return (<ParallaxScrollView
            headerBackgroundColor={{light: '#D0D0D0', dark: '#353636'}}
            headerImage={<Ionicons name="school" size={24} style={styles.input}/>}>
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
                        <Button onPress={createSchool} title="Create School"/>
                    </View>
                    <View style={buttonstyles.buttonContainer}>
                        <Button onPress={getSchools} title="Fetch Schools"/>
                    </View>
                    <View style={styles.container}>
                        <View >
                            <View>
                                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                    <Row data={tableHead} style={styles.head} textStyle={styles.headText}/>
                                </Table>
                                <View style={styles.dataWrapper}>
                                     <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                        {
                                            schools.map((school, index) => (
                                                <Row
                                                    key={school.id}
                                                    data={[school.id, school.schoolName || '', school.schoolCode || '']}
                                                    style={index % 2 !== 0 ?{backgroundColor: '#f7eb0c'} : {backgroundColor: '#F7F6E7'}}
                                                    textStyle={styles.text}
                                                />
                                            ))
                                        }
                                </Table>
                                </View>
                            </View>
                        </View>
                    </View>

                </SafeAreaView>
            </SafeAreaProvider>
        </ParallaxScrollView>);
};

const styles = StyleSheet.create({
    input: {
        height: 40, margin: 12, borderWidth: 1, padding: 10,
    }, container: {
        flex: 1, backgroundColor: '#fff', padding: 10,
    },
    head: {
        height: 40, backgroundColor: '#808B97',
    },
    row: {
        flexDirection: 'row', borderWidth: 1, borderColor: '#ccc',
    }, cell: {
        flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10,
    }, headText: {
        fontWeight: 'bold', textAlign: 'center', color: '#fff',
    },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
});

const buttonstyles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center',
    }, buttonContainer: {
        margin: 20,
    }, alternativeLayoutButtonContainer: {
        margin: 20, flexDirection: 'row', justifyContent: 'space-between',
    },
});

export default TextInputExample;
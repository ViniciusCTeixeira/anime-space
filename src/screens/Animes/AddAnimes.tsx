import React from 'react';
import uuid from 'react-native-uuid';
import {ActivityIndicator, Alert, Button, TextInput} from "react-native";
import {Picker} from '@react-native-picker/picker';
import {Container, Divider, Paper} from "../../components/Views";

import * as AnimesService from '../../services/Animes';

import {RootStackScreenProps} from "../../../types/ReactNavigation";
import {WebsitesProps} from "../../../types/Pages";

import {ValidUrl, WebsiteInfo} from "../../../resources/Tools";

export default function AddAnimes({navigation}: RootStackScreenProps<'AddAnimes'>) {
    const [text, onChangeText] = React.useState<string>("");
    const [type, onChangeType] = React.useState<number>(0);
    const [loading, onChangeLoading] = React.useState<boolean>(false);

    const SavePage = async () => {
        onChangeLoading(true);
        let isValid = await ValidUrl(text);
        if (!isValid) {
            Alert.alert('Error!!!', 'Invalid URL', [
                {
                    text: 'OK', onPress: () => {
                    }
                },
            ]);
            onChangeLoading(false);
            return;
        }

        let info = await WebsiteInfo(text);
        if (!info) {
            Alert.alert('Error!!!', 'It was not possible to fetch the information from the website!', [
                {
                    text: 'OK', onPress: () => {
                    }
                },
            ]);
            onChangeLoading(false);
            return;
        }

        let site: WebsitesProps = {
            id: uuid.v4().toString(),
            url: text,
            name: info.title,
            image: info.icon,
            isFavorite: false
        };

        let exist = await AnimesService.Exists(text, type);
        if (exist) {
            Alert.alert('Error!!!', 'Already registered!', [
                {
                    text: 'OK', onPress: () => {
                    }
                },
            ]);
            onChangeLoading(false);
            return;
        }

        let save = await AnimesService.Save(site, type);
        if (save) {
            Alert.alert('Success!!!', 'Successfully registered', [
                {
                    text: 'OK', onPress: () => {
                    }
                },
            ]);
        } else {
            Alert.alert('Error!!!', 'Couldn\'t save', [
                {
                    text: 'OK', onPress: () => {
                    }
                },
            ]);
        }

        onChangeLoading(false);
    }

    return (
        <Container>
            <Paper>
                {loading
                    ? <ActivityIndicator size="large" style={{flex: 1}}/>
                    : <>
                        <Picker
                            selectedValue={type}
                            onValueChange={(itemValue, itemIndex) => {
                                onChangeType(itemValue)
                            }}
                            style={{color: "white"}}
                            dropdownIconColor={"white"}
                        >
                            <Picker.Item label="Website" value="0"/>
                            <Picker.Item label="Anime" value="1"/>
                        </Picker>
                        <Divider style={{marginBottom: 15}}/>
                        <TextInput
                            style={{
                                height: 40,
                                borderColor: 'white',
                                borderWidth: 1,
                                color: "white",
                                padding: 10,
                                marginBottom: 15
                            }}
                            onChangeText={onChangeText}
                            value={text}
                            placeholder={"URL"}
                            placeholderTextColor="white"
                        />
                        <Button title={'Save'} onPress={SavePage} disabled={text.length <= 15 || loading}/>
                    </>
                }

            </Paper>
        </Container>
    );
}
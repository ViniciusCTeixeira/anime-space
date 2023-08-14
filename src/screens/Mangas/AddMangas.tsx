import React from 'react';
import uuid from 'react-native-uuid';
import {ActivityIndicator, Alert, Button, TextInput} from "react-native";
import {Picker} from '@react-native-picker/picker';
import {Container, Divider, Paper} from "../../components/Views";

import * as MangasService from '../../services/Mangas';
import * as MangasToSearch from '../../services/ToSearch';

import {RootStackScreenProps} from "../../../types/ReactNavigation";
import {ToSearchProps, WebsitesProps} from "../../../types/Pages";

import {ValidUrl, WebsiteInfo} from "../../../resources/Tools";

export default function AddMangas({navigation}: RootStackScreenProps<'AddMangas'>) {
    const [text, onChangeText] = React.useState<string>("");
    const [type, onChangeType] = React.useState<number>(0);
    const [loading, onChangeLoading] = React.useState<boolean>(false);

    const SavePage = async () => {
        onChangeLoading(true);
        if (type != 2) {
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

            let exist = await MangasService.Exists(text, type);
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

            let save = await MangasService.Save(site, type);
            if (save) {
                Alert.alert('Success!!!', 'Successfully registered!', [
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

        } else {
            let exist = await MangasToSearch.Exists(text);
            if (exist) {
                Alert.alert('Error!!!', 'Already registered!', [
                    {
                        text: 'OK', onPress: () => {
                        }
                    },
                ]);
                onChangeLoading(false);
                return
            }

            let manga: ToSearchProps = {
                id: uuid.v4().toString(),
                name: text
            }
            let save = await MangasToSearch.Save(manga);
            if (save) {
                Alert.alert('Success!!!', 'Successfully registered!', [
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
                            <Picker.Item label="Manga" value="1"/>
                            <Picker.Item label="To Search" value="2"/>
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
                            placeholder={type != 2 ? "URL" : "Manga Name"}
                            placeholderTextColor="white"
                        />
                        <Button title={'Save'} onPress={SavePage} disabled={text.length < (type == 2 ? 5 : 15) || loading}/>
                    </>
                }
            </Paper>
        </Container>
    );
}
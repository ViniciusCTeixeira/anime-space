import React from 'react';
import * as Mangas from '../services/Mangas';
import * as Animes from '../services/Animes';
import uuid from 'react-native-uuid';
import {ActivityIndicator, TextInput, Button, Alert} from "react-native";
import {Picker} from '@react-native-picker/picker';
import {Container, Paper, Divider} from "../components/Views";

import {RootStackScreenProps} from "../../types/ReactNavigation";
import {WebsitesProps, MangasToSearchProps} from "../../types/Pages";

import {ValidUrl, WebsiteInfo} from "../../resources/Tools";

export default function AddSite({navigation}: RootStackScreenProps<'AddSite'>) {
    const [text, onChangeText] = React.useState<string>("");
    const [type, onChangeType] = React.useState<number>(0);
    const [loading, onChangeLoading] = React.useState<boolean>(false);

    const SavePage = async () => {
        onChangeLoading(true);
        if(type != 4) {
            let isValid = await ValidUrl(text);
            if (isValid) {
                let info = await WebsiteInfo(text);
                if (info) {
                    let site: WebsitesProps = {
                        id: uuid.v4().toString(),
                        url: text,
                        name: info.title,
                        image: info.icon,
                        isFavorite: false
                    };

                    if(type == 0){
                        let exist = await Mangas.Exists(text, 1);
                        if (!exist) {
                            let save = await Mangas.Save(site, 1);
                            if(save){
                                Alert.alert('Success!!!', 'Manga website registered!', [
                                    {
                                        text: 'OK', onPress: () => {}
                                    },
                                ]);
                            }else{
                                Alert.alert('Error!!!', 'Couldn\'t save', [
                                    {
                                        text: 'OK', onPress: () => {
                                        }
                                    },
                                ]);
                            }
                        } else {
                            Alert.alert('Error!!!', 'Manga website already registered!', [
                                {
                                    text: 'OK', onPress: () => {
                                    }
                                },
                            ]);
                        }
                    }

                    if(type == 1){
                        let exist = await Animes.Exists(text, 1);
                        if (!exist) {
                            let save = await Animes.Save(site, 1);
                            if(save){
                                Alert.alert('Success!!!', 'Anime website registered!', [
                                    {
                                        text: 'OK', onPress: () => {}
                                    },
                                ]);
                            }else{
                                Alert.alert('Error!!!', 'Couldn\'t save', [
                                    {
                                        text: 'OK', onPress: () => {}
                                    },
                                ]);
                            }
                        } else {
                            Alert.alert('Error!!!', 'Anime website already registered!', [
                                {
                                    text: 'OK', onPress: () => {
                                    }
                                },
                            ]);
                        }
                    }

                    if(type == 2){
                        let exist = await Mangas.Exists(text, 0);
                        if (!exist) {
                            let save = await Mangas.Save(site, 0);
                            if(save){
                                Alert.alert('Success!!!', 'Manga registered!', [
                                    {
                                        text: 'OK', onPress: () => {}
                                    },
                                ]);
                            }else{
                                Alert.alert('Error!!!', 'Couldn\'t save', [
                                    {
                                        text: 'OK', onPress: () => {}
                                    },
                                ]);
                            }
                        } else {
                            Alert.alert('Error!!!', 'Manga already registered!', [
                                {
                                    text: 'OK', onPress: () => {}
                                },
                            ]);
                        }
                    }

                    if(type == 3){
                        let exist = await Animes.Exists(text, 0);
                        if (!exist) {
                            let save = await Animes.Save(site, 0);
                            if(save){
                                Alert.alert('Success!!!', 'Anime registered!', [
                                    {
                                        text: 'OK', onPress: () => {}
                                    },
                                ]);
                            }else{
                                Alert.alert('Error!!!', 'Couldn\'t save', [
                                    {
                                        text: 'OK', onPress: () => {}
                                    },
                                ]);
                            }
                        } else {
                            Alert.alert('Error!!!', 'Anime already registered!', [
                                {
                                    text: 'OK', onPress: () => {}
                                },
                            ]);
                        }
                    }
                }else{
                    Alert.alert('Error!!!', 'It was not possible to fetch the information from the website!', [
                        {
                            text: 'OK', onPress: () => {}
                        },
                    ]);
                }
            }else{
                Alert.alert('Error!!!', 'Invalid URL', [
                    {
                        text: 'OK', onPress: () => {}
                    },
                ]);
            }

        } else {
            let exist = await Mangas.ExistsMangasToSearch(text);
            if (!exist) {
                let manga: MangasToSearchProps = {
                    id: uuid.v4().toString(),
                    name: text
                }
                let save = await Mangas.SaveMangasToSearch(manga);
                if(save){
                    Alert.alert('Success!!!', 'Manga registered!', [
                        {
                            text: 'OK', onPress: () => {}
                        },
                    ]);
                }
            } else {
                Alert.alert('Error!!!', 'Manga already registered!', [
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
                <Picker
                    selectedValue={type}
                    onValueChange={(itemValue, itemIndex) => {onChangeType(itemValue)}}
                    style={{color: "white"}}
                    dropdownIconColor={"white"}
                >
                    <Picker.Item label="Manga Website" value="0" />
                    <Picker.Item label="Anime Website" value="1" />
                    <Picker.Item label="Manga Page" value="2" />
                    <Picker.Item label="Anime Page" value="3" />
                    <Picker.Item label="Manga To Search" value="4" />
                </Picker>
                <Divider style={{marginBottom: 15}}/>
                <TextInput
                    style={{height: 40, borderColor: 'white', borderWidth: 1, color: "white", padding: 10, marginBottom: 15}}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder={type != 4 ? "Website URL" : "Manga Name"}
                    placeholderTextColor="white"
                />
                <Button title={'Save'} onPress={SavePage} disabled={text.length <= 15 || loading}/>
                {loading && <ActivityIndicator size="large"/>}
            </Paper>
        </Container>
    );
}
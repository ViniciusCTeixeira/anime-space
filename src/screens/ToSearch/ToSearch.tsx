import React, {useEffect, useState} from "react";
import {Alert, View} from "react-native";
import {ActivityIndicator} from 'react-native-paper';
import {useIsFocused} from "@react-navigation/native";
import {Picker} from "@react-native-picker/picker";
import {Container, Divider, Paper, WebsitesList, MangasToSearchList} from "../../components/Views";

import * as MangasService from '../../services/Mangas';
import * as MangasToSearchService from '../../services/ToSearch';

import {ToSearchProps, WebsitesProps} from "../../../types/Pages";
import {RootTabScreenProps} from '../../../types/ReactNavigation';

export default function toSearch({navigation}: RootTabScreenProps<'Mangas'>) {
    const isFocused = useIsFocused();
    const [type, setType] = React.useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

    const [websites, setWebsites] = useState<WebsitesProps[]>([]);
    const [toSearch, setToSearch] = useState<ToSearchProps[]>([]);

    const getWebsites = () => {
        MangasService.Get(type).then((r) => {
            setWebsites(r);
        }).catch((err) => {
            Alert.alert('Error!!!', 'Couldn\'t load', [
                {
                    text: 'OK', onPress: () => {
                    }
                },
            ]);
        }).finally(() => setLoading(false))
    }
    const updateLastAccess = (item: WebsitesProps) => {
        MangasService.UpdateLastAcess(item, type).then();
    }

    const deleteWebsiteOrManga = (item: WebsitesProps) => {
        setLoading(true);
        if (type !== 2) {
            Alert.alert('Delete', 'Do you really want to delete the record?', [
                {
                    text: 'OK', onPress: () => {
                        MangasService.Delete(item, type).then((res) => {
                            if (res) {
                                setWebsites((current) =>
                                    current.filter((itens) => itens.id !== item.id)
                                );
                            }
                        })
                    },
                },
                {
                    text: 'Cancel', onPress: () => {
                    },
                }
            ]);
        }
        setLoading(false);
    }

    const getToSearch = () => {
        MangasToSearchService.Get().then((r) => {
            setToSearch(r);
        }).catch((err) => {
            Alert.alert('Error!!!', 'Couldn\'t load', [
                {
                    text: 'OK', onPress: () => {
                    }
                },
            ]);
        }).finally(() => setLoading(false))
    }

    const deleteToSearch = (item: ToSearchProps) => {
        setLoading(true);
        if (type == 2) {
            Alert.alert('Delete', 'Do you really want to delete the record?', [
                {
                    text: 'OK', onPress: () => {
                        MangasToSearchService.Delete(item).then((res) => {
                            if (res) {
                                setToSearch((current) =>
                                    current.filter((itens) => itens.id !== item.id)
                                );
                            }
                        })
                    },
                },
                {
                    text: 'Cancel', onPress: () => {
                    },
                }
            ]);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (!isFocused) return;

        setLoading(true);
        setWebsites([]);

    }, [isFocused, type]);

    return (
        <Container>
            <Paper>
                <Picker
                    selectedValue={type}
                    onValueChange={(itemValue, itemIndex) => {
                        setType(itemValue)
                    }}
                    style={{color: "white"}}
                    dropdownIconColor={"white"}
                >
                    <Picker.Item label="Websites" value="0"/>
                    <Picker.Item label="Mangas" value="1"/>
                    <Picker.Item label="To Search" value="2"/>
                </Picker>
                <Divider style={{marginBottom: 15}}/>
                <View style={{flex: 1, justifyContent: "space-between", alignItems: "center"}}>
                    {
                        loading
                            ? <ActivityIndicator size="large"/>
                            : type == 2
                                ? <MangasToSearchList pages={toSearch} navigation={navigation}
                                                      deleteItem={deleteToSearch}/>
                                : <WebsitesList pages={websites} navigation={navigation} deleteItem={deleteWebsiteOrManga}
                                                updateLastAcess={updateLastAccess}/>
                    }
                </View>
            </Paper>
        </Container>
    );
}

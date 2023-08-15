import React, {useEffect, useState} from "react";
import {Alert, View} from "react-native";
import {ActivityIndicator} from 'react-native-paper';
import {useIsFocused} from "@react-navigation/native";
import {Picker} from "@react-native-picker/picker";
import {Container, Divider, Paper, WebsitesList} from "../../components/Views";

import * as MangasService from '../../services/Mangas';

import {WebsitesProps} from "../../../types/Pages";
import {RootTabScreenProps} from '../../../types/ReactNavigation';

export default function Mangas({navigation}: RootTabScreenProps<'Mangas'>) {
    const isFocused = useIsFocused();
    const [type, setType] = React.useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const [websites, setWebsites] = useState<WebsitesProps[]>([]);

    const getWebsites = () => {
        setLoading(true);

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

    const updateFavorite = (item: WebsitesProps) => {
        setLoading(true);
        MangasService.updateFavorite(item, type).then(() => {item.isFavorite = !item.isFavorite; setLoading(false)});
    }

    const updateLastAccess = (item: WebsitesProps) => {
        MangasService.updateLastAccess(item, type).then();
    }

    const deleteWebsiteOrManga = (item: WebsitesProps) => {
        setLoading(true);
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
                text: 'Cancel', onPress: () => {},
            }
        ]);
        setLoading(false);
    }

    useEffect(() => {
        if (!isFocused) return;
        getWebsites();
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
                </Picker>
                <Divider style={{marginBottom: 15}}/>
                <View style={{flex: 1, justifyContent: "space-between", alignItems: "center"}}>
                    {
                        loading
                            ? <ActivityIndicator size="large"/>
                            : <WebsitesList pages={websites} navigation={navigation} deleteItem={deleteWebsiteOrManga} updateLastAccess={updateLastAccess} updateFavorite={updateFavorite}/>
                    }
                </View>
            </Paper>
        </Container>
    );
}

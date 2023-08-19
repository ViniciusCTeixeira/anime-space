import React, {useEffect, useState} from "react";
import {Alert, View} from "react-native";
import {ActivityIndicator, Divider, useTheme, RadioButton, Text} from 'react-native-paper';
import {useIsFocused} from "@react-navigation/native";
import {Container, WebsitesList} from "../components/Views";

import * as MangasService from '../services/Mangas';

import {WebsitesProps} from "../../types/Pages";
import {RootTabScreenProps} from '../../types/ReactNavigation';

export default function Mangas({navigation}: RootTabScreenProps<'Mangas'>) {
    const isFocused = useIsFocused();
    const [type, setType] = useState<string>("0");
    const [loading, setLoading] = useState<boolean>(true);

    const [websites, setWebsites] = useState<WebsitesProps[]>([]);

    const theme = useTheme();

    const getWebsites = (load: boolean = true) => {
        if (load) setLoading(true);

        MangasService.Get(Number(type)).then((r) => {
            setWebsites(r);
        }).catch(() => {
            Alert.alert('Error!!!', 'Couldn\'t load', [
                {
                    text: 'OK', onPress: () => {
                    }
                },
            ]);
        }).finally(() => {
            if (load) setLoading(false);
        })
    }

    const updateFavorite = (item: WebsitesProps) => {
        MangasService.updateFavorite(item, Number(type)).then(() => {
            item.isFavorite = !item.isFavorite;
            getWebsites(false)
        });
    }

    const updateLastAccess = (item: WebsitesProps) => {
        MangasService.updateLastAccess(item, Number(type)).then();
    }

    const deleteWebsiteOrManga = (item: WebsitesProps) => {
        setLoading(true);
        Alert.alert('Delete', 'Do you really want to delete the record?', [
            {
                text: 'OK', onPress: () => {
                    MangasService.Delete(item, Number(type)).then((res) => {
                        if (res) {
                            setWebsites((current) =>
                                current.filter((items) => items.id !== item.id)
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
        setLoading(false);
    }

    useEffect(() => {
        if (!isFocused) return;
        getWebsites();
    }, [isFocused, type]);

    return (
        <Container style={{backgroundColor: theme.colors.outlineVariant}}>
            <RadioButton.Group onValueChange={newValue => setType(newValue)} value={type}>
                <View style={{flexDirection: "row"}}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text>Websites</Text>
                        <RadioButton value="0"/>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text>Mangas</Text>
                        <RadioButton value="1"/>
                    </View>
                </View>
            </RadioButton.Group>
            <Divider style={{marginBottom: 15, height: 2, backgroundColor: theme.colors.secondary}}/>
            <View style={{flex: 1, justifyContent: "space-around", alignItems: "center"}}>
                {
                    loading
                        ? <ActivityIndicator color='purple' size={100}/>
                        : <WebsitesList pages={websites} navigation={navigation} deleteItem={deleteWebsiteOrManga}
                                        updateLastAccess={updateLastAccess} updateFavorite={updateFavorite}/>
                }
            </View>
        </Container>
    );
}

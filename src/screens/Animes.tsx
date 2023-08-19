import React, {useEffect, useState} from "react";
import {ActivityIndicator, Alert, View} from "react-native";
import {useIsFocused} from "@react-navigation/native";
import {Container, WebsitesList} from "../components/Views";

import * as AnimesService from "../services/Animes";

import {WebsitesProps} from "../../types/Pages";
import {RootTabScreenProps} from "../../types/ReactNavigation";
import {RadioButton, Text, Divider, useTheme} from "react-native-paper";

export default function Animes({navigation}: RootTabScreenProps<'Animes'>) {
    const isFocused = useIsFocused();
    const [type, setType] = useState<string>("0");
    const [loading, setLoading] = useState<boolean>(true);

    const [websites, setWebsites] = useState<WebsitesProps[]>([]);

    const theme = useTheme();

    const getWebsites = (load: boolean = true) => {
        if (load) setLoading(true);

        AnimesService.Get(Number(type)).then((r) => {
            setWebsites(r);
        }).catch((err) => {
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
        AnimesService.updateFavorite(item, Number(type)).then(() => {
            item.isFavorite = !item.isFavorite;
            getWebsites(false)
        });
    }

    const updateLastAccess = (item: WebsitesProps) => {
        AnimesService.updateLastAccess(item, Number(type)).then();
    }

    const deleteWebsiteOrAnime = (item: WebsitesProps) => {
        setLoading(true);
        Alert.alert('Delete', 'Do you really want to delete the record?', [
            {
                text: 'OK', onPress: () => {
                    AnimesService.Delete(item, Number(type)).then((res) => {
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
        getWebsites()
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
                        <Text>Animes</Text>
                        <RadioButton value="1"/>
                    </View>
                </View>
            </RadioButton.Group>
            <Divider style={{marginBottom: 15, height: 2, backgroundColor: theme.colors.secondary}}/>
            <View style={{flex: 1, justifyContent: "space-around", alignItems: "center"}}>
                {
                    loading
                        ? <ActivityIndicator color='purple' size={100}/>
                        : <WebsitesList pages={websites} navigation={navigation} deleteItem={deleteWebsiteOrAnime}
                                        updateLastAccess={updateLastAccess} updateFavorite={updateFavorite}/>
                }
            </View>
        </Container>
    );
}
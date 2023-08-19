import React, {useEffect, useState} from "react";
import {Alert, View} from "react-native";
import {ActivityIndicator, useTheme} from 'react-native-paper';
import {useIsFocused} from "@react-navigation/native";
import {Container, MangasToSearchList} from "../components/Views";

import * as MangasToSearchService from '../services/ToSearch';

import {ToSearchProps} from "../../types/Pages";
import {RootTabScreenProps} from '../../types/ReactNavigation';

export default function ToSearch({navigation}: RootTabScreenProps<'ToSearch'>) {
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState<boolean>(true);

    const [toSearch, setToSearch] = useState<ToSearchProps[]>([]);

    const theme = useTheme();

    const getToSearch = () => {
        setLoading(true)
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
        Alert.alert('Delete', 'Do you really want to delete the record?', [
            {
                text: 'OK', onPress: () => {
                    MangasToSearchService.Delete(item).then((res) => {
                        if (res) {
                            setToSearch((current) =>
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
        getToSearch()
    }, [isFocused]);

    return (
        <Container style={{backgroundColor: theme.colors.outlineVariant}}>
            <View style={{flex: 1, justifyContent: "space-around", alignItems: "center"}}>
                {
                    loading
                        ? <ActivityIndicator color='purple' size={100}/>
                        : <MangasToSearchList pages={toSearch} navigation={navigation} deleteItem={deleteToSearch}/>
                }
            </View>
        </Container>
    );
}

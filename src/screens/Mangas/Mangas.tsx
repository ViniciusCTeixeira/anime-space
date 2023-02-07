import React, {useEffect, useState} from "react";
import {ActivityIndicator, Alert, Dimensions, View} from "react-native";
import {RootTabScreenProps} from '../../../types/ReactNavigation';
import {Container, Divider, Paper, PagesList, MangasToSearchList} from "../../components/Views";
import {useIsFocused} from "@react-navigation/native";
import {Picker} from "@react-native-picker/picker";

import * as MangasService from '../../services/Mangas';

import {MangasToSearchProps, WebsitesProps} from "../../../types/Pages";

export default function Mangas({navigation}: RootTabScreenProps<'Mangas'>) {
    const [pages, setPages] = useState<WebsitesProps[]>([]);
    const [mangasToSearch, setMangasToSearch] = useState<MangasToSearchProps[]>([]);
    const [type, onChangeType] = React.useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const isFocused = useIsFocused();

    const updateLastAcess = (item: WebsitesProps) => {
        setLoading(true);
        if(type !== 2) {
            MangasService.UpdateLastAcess(item, type).then();
        }
        setLoading(false);
    }

    const deleteItem = (item: WebsitesProps) => {
        setLoading(true);
        if(type !== 2) {
            Alert.alert('Delete', 'Do you really want to delete the record?', [
                {
                    text: 'OK', onPress: () => {
                        MangasService.Delete(item, type).then((res) => {
                            if (res) {
                                setPages((current) =>
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
        }
        setLoading(false);
    }

    const deleteMangasToSearch = (item: MangasToSearchProps) => {
        setLoading(true);
        if(type == 2) {
            Alert.alert('Delete', 'Do you really want to delete the record?', [
                {
                    text: 'OK', onPress: () => {
                        MangasService.DeleteMangasToSearch(item).then((res) => {
                            if (res) {
                                setMangasToSearch((current) =>
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
        }
        setLoading(false);
    }

    const loadItens = () => {
        if(type == 2){
            MangasService.GetMangasToSearch().then((r) => {
                setMangasToSearch(r);
            }).catch((err) => {
                Alert.alert('Error!!!', 'Couldn\'t load', [
                    {
                        text: 'OK', onPress: () => {}
                    },
                ]);
            }).finally(() => setLoading(false))
        }else{
            MangasService.Get(type).then((r) => {
                setPages(r);
            }).catch((err) => {
                Alert.alert('Error!!!', 'Couldn\'t load', [
                    {
                        text: 'OK', onPress: () => {}
                    },
                ]);
            }).finally(() => setLoading(false))
        }
    }

    useEffect(() => {
        if (!isFocused) return;

        setLoading(true);
        setPages([]);

        loadItens();
    }, [isFocused, type]);

    return (
        <Container>
            <Paper>
                <Picker
                    selectedValue={type}
                    onValueChange={(itemValue, itemIndex) => {
                        onChangeType(itemValue)
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
                                ? <MangasToSearchList pages={mangasToSearch} navigation={navigation} deleteItem={deleteMangasToSearch} />
                                : <PagesList pages={pages} navigation={navigation} deleteItem={deleteItem} updateLastAcess={updateLastAcess}/>
                    }
                </View>
            </Paper>
        </Container>
    );
}

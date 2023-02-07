import {RootTabScreenProps} from "../../../types/ReactNavigation";
import {ActivityIndicator, Alert, View} from "react-native";
import React, {useEffect, useState} from "react";
import {WebsitesProps} from "../../../types/Pages";
import {useIsFocused} from "@react-navigation/native";
import * as AnimesService from "../../services/Animes";
import {Container, Divider, PagesList, Paper} from "../../components/Views";
import {Picker} from "@react-native-picker/picker";

export default function Animes({navigation}: RootTabScreenProps<'Animes'>) {
    const [pages, setPages] = useState<WebsitesProps[]>([]);
    const [type, onChangeType] = React.useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const isFocused = useIsFocused();

    const deleteItem = (item: WebsitesProps) => {
        setLoading(true);
        Alert.alert('Delete', 'Do you really want to delete the record?', [
            {
                text: 'OK', onPress: () => {
                    AnimesService.Delete(item, type).then((res) => {
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
        setLoading(false);
    }

    const loadItens = () => {
        AnimesService.Get(type).then((r) => {
            setPages(r);
        }).catch((err) => {
            Alert.alert('Error!!!', 'Couldn\'t load', [
                {
                    text: 'OK', onPress: () => {}
                },
            ]);
        }).finally(() => setLoading(false))
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
                    <Picker.Item label="Animes" value="1"/>
                </Picker>
                <Divider style={{marginBottom: 15}}/>
                <View style={{flex: 1, justifyContent: "space-between", alignItems: "center"}}>
                    {
                        loading
                            ? <ActivityIndicator size="large"/>
                            : <PagesList pages={pages} navigation={navigation} deleteItem={deleteItem}/>
                    }
                </View>
            </Paper>
        </Container>
    );
}
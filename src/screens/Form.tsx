import * as React from "react";
import {Alert, Dimensions, View} from "react-native";
import {ActivityIndicator, Appbar, Button, Divider, Menu, Text, TextInput, useTheme} from "react-native-paper";
import {Container} from "../components/Views";
import {useState} from "react";
import {RootStackScreenProps} from "../../types/ReactNavigation";
import {Feather} from "@expo/vector-icons";
import uuid from 'react-native-uuid';

import {ValidUrl, WebsiteInfo} from "../../resources/Tools";
import {WebsitesProps, ToSearchProps} from "../../types/Pages";

import * as MangasService from "../services/Mangas"
import * as AnimesService from "../services/Animes"
import * as ToSearchService from "../services/ToSearch"

export default function Form({navigation}: RootStackScreenProps<'Form'>) {
    const [text, setText] = React.useState<string>("");
    const [type, setType] = useState<number>(0);
    const [typeName, setTypeName] = useState<string>("Website (Manga)");
    const [loading, setLoading] = useState<boolean>(false);
    const [visible, setVisible] = React.useState(false);

    const ScreenWidth = Dimensions.get("window").width;
    const ScreenHeight = Dimensions.get("window").height;

    const theme = useTheme();

    const save = async () => {
        setLoading(true);
        if (type != 4) {
            let isValid = await ValidUrl(text);
            if (!isValid) {
                Alert.alert('Error!!!', 'Invalid URL', [
                    {
                        text: 'OK', onPress: () => {
                        }
                    },
                ]);
                setLoading(false);
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
                setLoading(false);
                return;
            }

            let site: WebsitesProps = {
                id: uuid.v4().toString(),
                url: text,
                name: info.title,
                image: info.icon,
                isFavorite: false
            };

            if(type in [0,1]) {
                let exist = await MangasService.Exists(text, type);
                if (exist) {
                    Alert.alert('Error!!!', 'Already registered!', [
                        {
                            text: 'OK', onPress: () => {
                            }
                        },
                    ]);
                    setLoading(false);
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
            }else{
                let exist = await AnimesService.Exists(text, type-2);
                if (exist) {
                    Alert.alert('Error!!!', 'Already registered!', [
                        {
                            text: 'OK', onPress: () => {
                            }
                        },
                    ]);
                    setLoading(false);
                    return;
                }

                let save = await AnimesService.Save(site, type-2);
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

        } else {
            let exist = await ToSearchService.Exists(text);
            if (exist) {
                Alert.alert('Error!!!', 'Already registered!', [
                    {
                        text: 'OK', onPress: () => {
                        }
                    },
                ]);
                setLoading(false);
                return
            }

            let to_search: ToSearchProps = {
                id: uuid.v4().toString(),
                name: text
            }
            let save = await ToSearchService.Save(to_search);
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
        setLoading(false);
    }

    return (
        <Container style={{backgroundColor: theme.colors.outlineVariant}}>
            {loading
                ?
                <ActivityIndicator
                    color='purple'
                    size={100}
                    style={{
                        height: ScreenHeight,
                        width: ScreenWidth,
                        position: "absolute",
                        backgroundColor: "rgba(79,79,79,0.5)"
                    }}
                />
                :
                <>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <Text variant="titleSmall">{typeName}</Text>
                        <Menu
                            visible={visible}
                            onDismiss={() => setVisible(false)}
                            anchor={
                                <Appbar.Action
                                    icon="dots-vertical"
                                    onPress={() => setVisible(true)}
                                />
                            }
                        >
                            <Menu.Item
                                leadingIcon={(props) => <Feather size={props.size} name="corner-up-right" color={props.color}/>}
                                onPress={() => {
                                    setType(0)
                                    setTypeName("Website (Manga)")
                                    setVisible(false)
                                }}
                                title="Website (Manga)"
                            />
                            <Menu.Item
                                leadingIcon={(props) => <Feather size={props.size} name="corner-up-right" color={props.color}/>}
                                onPress={() => {
                                    setType(1)
                                    setTypeName("Manga")
                                    setVisible(false)
                                }}
                                title="Manga"
                            />
                            <Menu.Item
                                leadingIcon={(props) => <Feather size={props.size} name="corner-up-right" color={props.color}/>}
                                onPress={() => {
                                    setType(2)
                                    setTypeName("Website (Anime)")
                                    setVisible(false)
                                }}
                                title="Website (Anime)"
                            />
                            <Menu.Item
                                leadingIcon={(props) => <Feather size={props.size} name="corner-up-right" color={props.color}/>}
                                onPress={() => {
                                    setType(3)
                                    setTypeName("Anime")
                                    setVisible(false)
                                }}
                                title="Anime"
                            />
                            <Menu.Item
                                leadingIcon={(props) => <Feather size={props.size} name="corner-up-right" color={props.color}/>}
                                onPress={() => {
                                    setType(4)
                                    setTypeName("To Search")
                                    setVisible(false)
                                }}
                                title="To Search"
                            />
                        </Menu>
                    </View>
                    <Divider style={{marginBottom: 15, height: 2, backgroundColor: theme.colors.secondary}}/>
                    <TextInput mode={"flat"} label={type === 4 ? "Name" : "URL"} value={text} onChangeText={text => setText(text)}/>
                    <Button mode={"contained"} onPress={() => {save()}} disabled={text.length < (type == 4 ? 5 : 15) || loading} style={{marginTop: 15}}>Save</Button>
                </>
            }
        </Container>
    )
}
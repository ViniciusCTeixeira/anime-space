import * as React from "react";
import {Dimensions, FlatList, Image, TouchableOpacity, View} from "react-native";
import {Button, Card, Modal, Portal, Text, useTheme} from "react-native-paper";
import {Feather} from "@expo/vector-icons";

import {ToSearchProps, WebsitesProps} from "../../types/Pages";

import {CalcNumColumns} from "../../resources/Tools"
import {WebviewTooKit} from "../../resources/constants";


export function Container(props: View['props']) {
    const {style, ...others} = props;

    return <View
        style={[{flex: 1, padding: 10, flexDirection: "column"}, style]} {...others} />;
}

export function WebsitesList(props: {
    pages: WebsitesProps[],
    navigation: any,
    deleteItem: any,
    updateLastAccess: any,
    updateFavorite: any
}) {
    const ScreenWidth = Dimensions.get("window").width;
    const FlatListItemWidth = 150;
    const FlatListItemMargin = 5;

    const [numColumns, setNumColumns] = React.useState<number>(CalcNumColumns(ScreenWidth, FlatListItemWidth, FlatListItemMargin));

    React.useEffect(() => {
        setNumColumns(CalcNumColumns(ScreenWidth, FlatListItemWidth, FlatListItemMargin));
    }, [ScreenWidth]);

    return (
        <FlatList
            data={props.pages}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            numColumns={numColumns}
            renderItem={({item, index}) => (
                <Card
                    style={{
                        borderWidth: 1,
                        borderColor: item.isFavorite ? "rgba(218, 165, 32, 0.6)" : "rgba(255, 255, 255, 0.6)",
                        borderRadius: 15,
                        alignItems: 'center',
                        width: FlatListItemWidth,
                        margin: FlatListItemMargin,
                    }}
                >
                    <Card.Content style={{alignItems: 'center',}}>
                        <Image source={{uri: item.image}} style={{width: 48, height: 48, marginTop: 5}}/>
                        <Text numberOfLines={1} variant="titleMedium">{item.name}</Text>
                        <Text variant="bodySmall">{item.lastAcess}</Text>
                        <View style={{marginTop: 2, flexDirection: "row"}}>
                            <Button
                                style={{marginHorizontal: 2, width: 40}}
                                buttonColor={item.isFavorite ? "rgba(218, 165, 32, 0.6)" : ""}
                                compact={true}
                                mode={"contained"}
                                onPress={() => {
                                    props.updateFavorite(item)
                                }}
                            >
                                <Feather
                                    name="star"
                                    size={15}
                                    color={"#fff"}
                                />
                            </Button>
                            <Button
                                style={{marginHorizontal: 2, width: 40}}
                                compact={true}
                                mode={"contained"}
                                onPress={() => {
                                    props.deleteItem(item)
                                }}
                            >
                                <Feather
                                    name="trash"
                                    size={15}
                                    color={"#fff"}
                                />
                            </Button>
                            <Button
                                style={{marginHorizontal: 2, width: 40}}
                                compact={true}
                                mode={"contained"}
                                onPress={() => {
                                    props.updateLastAccess(item);
                                    const script = WebviewTooKit.replace("#d#", item.url)
                                    props.navigation.navigate({
                                        name: 'WebView',
                                        params: {url: item.url, title: item.name, script: script}
                                    })
                                }}
                            >
                                <Feather
                                    name="book-open"
                                    size={15}
                                    color={"#fff"}
                                />
                            </Button>
                        </View>
                    </Card.Content>
                </Card>
            )}
        />
    )
}

export function MangasToSearchList(props: { pages: ToSearchProps[], navigation: any, deleteItem: any }) {
    const ScreenWidth = Dimensions.get("window").width;
    const FlatListItemWidth = 150;
    const FlatListItemMargin = 5;

    const [numColumns, setNumColumns] = React.useState<number>(CalcNumColumns(ScreenWidth, FlatListItemWidth, FlatListItemMargin));

    React.useEffect(() => {
        setNumColumns(CalcNumColumns(ScreenWidth, FlatListItemWidth, FlatListItemMargin));
    }, [ScreenWidth]);

    return (
        <FlatList
            data={props.pages}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            numColumns={numColumns}
            renderItem={({item, index}) => (
                <Card
                    style={{
                        borderWidth: 1,
                        borderColor: "rgba(255, 255, 255, 0.6)",
                        borderRadius: 15,
                        alignItems: 'center',
                        width: FlatListItemWidth,
                        margin: FlatListItemMargin,
                    }}
                >
                    <Card.Content style={{alignItems: 'center',}}>
                        <Text numberOfLines={2} variant="titleMedium">{item.name}</Text>
                        <View style={{marginTop: 2, flexDirection: "row"}}>
                            <Button
                                style={{marginHorizontal: 2, width: 40}}
                                compact={true}
                                mode={"contained"}
                                onPress={() => {
                                    props.deleteItem(item)
                                }}
                            >
                                <Feather
                                    name="trash"
                                    size={15}
                                    color={"#fff"}
                                />
                            </Button>
                            <Button
                                style={{marginHorizontal: 2, width: 40}}
                                compact={true}
                                mode={"contained"}
                                onPress={() => {
                                    const url = `https://www.google.com/search?q=${item.name}`
                                    const script = WebviewTooKit.replace("#d#", url)
                                    props.navigation.navigate({
                                        name: 'WebView',
                                        params: {url: url, title: item.name, script: script}
                                    })
                                }}
                            >
                                <Feather
                                    name="book-open"
                                    size={15}
                                    color={"#fff"}
                                />
                            </Button>
                        </View>
                    </Card.Content>
                </Card>
            )}/>
    )
}
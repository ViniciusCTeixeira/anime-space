import * as React from "react";
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View, View as DefaultView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { MangasToSearchProps, WebsitesProps } from "../../types/Pages";

import { CalcNumColumns } from "../../resources/Tools"
import { WebviewSaveLink } from "../../resources/constants";

export function Container(props: DefaultView['props']) {
    const { style, ...others } = props;

    return <DefaultView style={[{ flex: 1, borderRadius: 10, padding: 10, flexDirection: "column" }, style]} {...others} />;
}

export function Paper(props: DefaultView['props']) {
    const { style, ...others } = props;

    return <DefaultView style={[{ flex: 1, borderRadius: 10, padding: 10, flexDirection: "column", backgroundColor: "rgba(79,79,79,0.5)" }, style]} {...others} />;
}

export function Divider(props: DefaultView['props']) {
    const { style, ...others } = props;

    return <DefaultView style={[{ borderBottomColor: 'white', borderBottomWidth: 1, marginVertical: 5 }, style]} {...others} />;
}

export function WebsitesList(props: { pages: WebsitesProps[], navigation: any, deleteItem: any, updateLastAcess: any }) {
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
            renderItem={({ item, index }) => (
                <TouchableOpacity
                    onPress={() => {
                        props.updateLastAcess(item);
                        props.navigation.navigate({
                            name: 'WebView',
                            params: { url: item.url, title: item.name }
                        })
                    }}
                    style={{
                        flexDirection: "column",
                        borderWidth: 1,
                        borderColor: "rgba(255, 255, 255, 0.6)",
                        borderRadius: 15,
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        alignItems: 'center',
                        padding: 2,
                        width: FlatListItemWidth,
                        margin: FlatListItemMargin,
                    }}
                >
                    <Image source={{ uri: item.image }} style={{ width: 50, height: 50, marginTop: 5 }} />
                    <Text numberOfLines={1} style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>{item.name}</Text>
                    <Text style={{ color: '#fff', fontSize: 9, fontWeight: 'bold' }}>{item.lastAcess}</Text>

                    <View style={{ flex: 1, paddingVertical: 5, marginHorizontal: 1, flexDirection: "row", backgroundColor: "rgba(79,79,79,0.5)", borderRadius: 10 }}>
                        <TouchableOpacity
                            onPress={() => {
                                props.deleteItem(item)
                            }}
                            style={{
                                flex: 1,
                                borderWidth: 1,
                                borderColor: "rgba(255, 255, 255, 0.6)",
                                borderRadius: 5,
                                backgroundColor: "rgba(255, 0, 0, 0.3)",
                                alignItems: "center",
                                justifyContent: "center",
                                marginVertical: 1,
                                marginHorizontal: 2,
                            }}>
                            <FontAwesome
                                name="trash-o"
                                size={15}
                                color={"#fff"}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                props.deleteItem(item)
                            }}
                            style={{
                                flex: 1,
                                borderWidth: 1,
                                borderColor: "rgba(255, 255, 255, 0.6)",
                                borderRadius: 5,
                                backgroundColor: "rgba(255, 0, 0, 0.3)",
                                alignItems: "center",
                                justifyContent: "center",
                                marginVertical: 1,
                                marginHorizontal: 2,
                            }}>
                            <FontAwesome
                                name="trash-o"
                                size={15}
                                color={"#fff"}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                props.deleteItem(item)
                            }}
                            style={{
                                flex: 1,
                                borderWidth: 1,
                                borderColor: "rgba(255, 255, 255, 0.6)",
                                borderRadius: 5,
                                backgroundColor: "rgba(255, 0, 0, 0.3)",
                                alignItems: "center",
                                justifyContent: "center",
                                marginVertical: 1,
                                marginHorizontal: 2,
                            }}>
                            <FontAwesome
                                name="trash-o"
                                size={15}
                                color={"#fff"}
                            />
                        </TouchableOpacity>
                    </View>

                </TouchableOpacity>
            )} />
    )
}

export function MangasToSearchList(props: { pages: MangasToSearchProps[], navigation: any, deleteItem: any }) {
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
            renderItem={({ item, index }) => (
                <TouchableOpacity
                    onPress={() => props.navigation.navigate({
                        name: 'WebView',
                        params: { url: `https://www.google.com/search?q=${item.name}`, title: item.name, script: WebviewSaveLink }
                    })}
                    style={{
                        flexDirection: "column",
                        borderWidth: 1,
                        borderColor: "rgba(255, 255, 255, 0.6)",
                        borderRadius: 15,
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        alignItems: 'center',
                        padding: 2,
                        width: FlatListItemWidth,
                        margin: FlatListItemMargin,
                    }}
                >
                    <Text numberOfLines={2} style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>{item.name}</Text>
                    <View style={{ flex: 1, paddingVertical: 5, marginHorizontal: 1, flexDirection: "row", backgroundColor: "rgba(79,79,79,0.5)", borderRadius: 10 }}>
                        <TouchableOpacity
                            onPress={() => {
                                props.deleteItem(item)
                            }}
                            style={{
                                flex: 1,
                                borderWidth: 1,
                                borderColor: "rgba(255, 255, 255, 0.6)",
                                borderRadius: 5,
                                backgroundColor: "rgba(255, 0, 0, 0.3)",
                                alignItems: "center",
                                justifyContent: "center",
                                marginHorizontal: 5
                            }}>
                            <FontAwesome
                                name="trash-o"
                                size={20}
                                color={"#fff"}
                            />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            )} />
    )
}
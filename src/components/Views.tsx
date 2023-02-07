import * as React from "react";
import {Dimensions, FlatList, Image, Text, TouchableOpacity, View, View as DefaultView} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

import {MangasToSearchProps, WebsitesProps} from "../../types/Pages";
import {DeleteMangasToSearch} from "../services/Mangas";
import {UpdateLastAcess} from "../services/Animes";

export function Container(props: DefaultView['props']) {
    const {style, ...others} = props;

    return <DefaultView style={[{flex: 1, borderRadius: 10, padding: 10, flexDirection: "column"}, style]} {...others} />;
}

export function Paper(props: DefaultView['props']) {
    const {style, ...others} = props;

    return <DefaultView style={[{flex: 1, borderRadius: 10, padding: 10, flexDirection: "column", backgroundColor: "rgba(79,79,79,0.5)"}, style]} {...others} />;
}

export function Divider(props: DefaultView['props']) {
    const {style, ...others} = props;

    return <DefaultView style={[{borderBottomColor: 'white', borderBottomWidth: 1, marginVertical: 5}, style]} {...others} />;
}

export function PagesList(props: {pages: WebsitesProps[], navigation: any, deleteItem: any, updateLastAcess: any}){
    const ScreenWidth = Dimensions.get("window").width;

    return (
        <FlatList
        data={props.pages}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({item, index}) => (
            <TouchableOpacity
                onPress={() => {
                    props.updateLastAcess(item);
                    props.navigation.navigate({
                    name: 'WebView',
                    params: {url: item.url, title: item.name}
                })}}
                style={{
                    flexDirection: "column",
                    borderWidth: 1,
                    borderColor: "rgba(255, 255, 255, 0.6)",
                    borderRadius: 15,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    padding: 2,
                    width: (ScreenWidth - 40) / 2 - 15,
                    marginHorizontal: 5,
                    marginVertical: 5
                }}
            >
                <View style={{flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 5}}>
                    <Image source={{uri: item.image}} style={{width: 50, height: 50}}/>
                </View>
                <View style={{flex: 1, alignItems: "center"}}>
                    <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold'}}>{item.name}</Text>
                </View>
                {item.lastAcess
                    && <View style={{flex: 1, alignItems: "center", marginVertical: 5}}>
                        <Text style={{color: '#fff', fontSize: 10, fontWeight: 'bold'}}>{item.lastAcess}</Text>
                    </View>
                }

                <TouchableOpacity
                    onPress={() => {
                        props.deleteItem(item)
                    }}
                    style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: "rgba(255, 255, 255, 0.6)",
                        borderRadius: 15,
                        backgroundColor: "rgba(255, 0, 0, 0.3)",
                        alignItems: "center",
                        justifyContent: "center",
                        marginVertical: 5,
                        marginHorizontal: 5,
                    }}>
                    <FontAwesome
                        name="trash-o"
                        size={20}
                        color={"#fff"}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        )}/>
    )
}

export function MangasToSearchList(props: {pages: MangasToSearchProps[], navigation: any, deleteItem: any}){
    const ScreenWidth = Dimensions.get("window").width;

    const script = `
            const createButton = document.createElement('button');
            createButton.innerText = '❤️';
            createButton.style.position = 'fixed';
            createButton.style.bottom = '20px';
            createButton.style.right = '30px';
            createButton.style.zIndex = '9999';
            createButton.style.border = 'none';
            createButton.style.outline = 'none';
            createButton.style.backgroundColor = 'rgba(60, 60, 60, 0.5)';
            createButton.style.color = 'white';
            createButton.style.padding = '10px';
            createButton.style.borderRadius = '10px';
            createButton.style.fontSize = '25px';
            
            createButton.addEventListener('click', function handleClick(event) {
                var dummy = document.createElement('input'),
                text = window.location.href;
                document.body.appendChild(dummy);
                dummy.value = text;
                dummy.select();
                if(document.execCommand('copy')){
                    window.ReactNativeWebView.postMessage(JSON.stringify({type: 1, msg : "URL copied successfully"}));
                }else{
                    window.ReactNativeWebView.postMessage(JSON.stringify({type: 1, msg : "Unable to copy URL"}));
                }
                document.body.removeChild(dummy);
            });
            
            document.body.appendChild(createButton);
            true;
        `;

    return (
        <FlatList
            data={props.pages}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            numColumns={2}
            renderItem={({item, index}) => (
                <TouchableOpacity
                    onPress={() => props.navigation.navigate({
                        name: 'WebView',
                        params: {url: `https://www.google.com/search?q=${item.name}`, title: item.name, script: script}
                    })}
                    style={{
                        flexDirection: "column",
                        borderWidth: 1,
                        borderColor: "rgba(255, 255, 255, 0.6)",
                        borderRadius: 15,
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        padding: 2,
                        width: (ScreenWidth - 40) / 2 - 15,
                        marginHorizontal: 5,
                        marginVertical: 5
                    }}
                >
                    <View style={{flex: 1, alignItems: "center", marginBottom: 10}}>
                        <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold'}}>{item.name}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            props.deleteItem(item)
                        }}
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: "rgba(255, 255, 255, 0.6)",
                            borderRadius: 15,
                            backgroundColor: "rgba(255, 0, 0, 0.3)",
                            alignItems: "center",
                            marginVertical: 5,
                            marginHorizontal: 5,
                        }}>
                        <FontAwesome
                            name="trash-o"
                            size={20}
                            color={"#fff"}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
            )}/>
    )
}
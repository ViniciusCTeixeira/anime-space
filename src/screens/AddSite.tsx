import React from 'react';
import {RootStackScreenProps} from "../../types/ReactNavigation";
import {ActivityIndicator, View, Text, TextInput, Button, Alert} from "react-native";
import {Container, Paper} from "../components/Views";

import {Exists as ExistsAnime} from "../services/Animes";
import {Exists as ExistsManga} from "../services/Mangas";
import {ValidUrl, WebsiteInfo} from "../../resources/Tools";

export default function AddSite({navigation}: RootStackScreenProps<'AddSite'>) {
    const [text, onChangeText] = React.useState<string>("");

    const checkUrl = async () => {
        let isValid = await ValidUrl(text);

        if (!isValid) {
            Alert.alert('Alert Title', 'My Alert Msg', [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
            return;
        }

        let info = await WebsiteInfo(text);
    }


    return (
        <Container>
            <Paper>
                <TextInput
                    style={{height: 40, borderWidth: 1, borderRadius: 15, borderColor: "white", color: "white", padding: 10}}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="useless placeholder"
                    placeholderTextColor="white"
                />
                <Button title={'2-Button Alert'} onPress={checkUrl} />
            </Paper>
        </Container>
    );
}
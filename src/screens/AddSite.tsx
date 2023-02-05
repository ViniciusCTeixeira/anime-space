import React from 'react';
import {RootStackScreenProps} from "../../types/ReactNavigation";
import {ActivityIndicator, View, Text, TextInput, Button, Alert} from "react-native";
import {Picker} from '@react-native-picker/picker';
import {Container, Paper} from "../components/Views";

import {Exists as ExistsAnime} from "../services/Animes";
import {Exists as ExistsManga} from "../services/Mangas";
import {ValidUrl, WebsiteInfo} from "../../resources/Tools";

export default function AddSite({navigation}: RootStackScreenProps<'AddSite'>) {
    const [url, onChangeUrl] = React.useState<string>("");
    const [type, onChangeType] = React.useState<number>();

    const SavePage = async () => {
        let isValid = await ValidUrl(url);

        if (!isValid) {
            Alert.alert('Error!!!', 'Invalid URL', [
                {text: 'OK', onPress: () => {}},
            ]);
            return;
        }

        let info = await WebsiteInfo(url);
    }


    return (
        <Container>
            <Paper>
                <TextInput
                    style={{height: 40, borderWidth: 1, borderRadius: 15, borderColor: "white", color: "white", padding: 10}}
                    onChangeText={onChangeUrl}
                    value={url}
                    placeholder="useless placeholder"
                    placeholderTextColor="white"
                />
                <Picker
                    selectedValue={type}
                    onValueChange={(itemValue, itemIndex) => {onChangeType(itemValue)}
                    }>
                    <Picker.Item label="Manga Page" value="0" />
                    <Picker.Item label="Anime Page" value="1" />
                    <Picker.Item label="Manga Website" value="2" />
                    <Picker.Item label="Anime Website" value="3" />
                </Picker>
                <Button title={'Save'} onPress={SavePage} disabled={url.length <= 15}/>
            </Paper>
        </Container>
    );
}
import {useEffect, useState} from "react";
import {ActivityIndicator, Text, View} from "react-native";
import {RootTabScreenProps} from '../../types/ReactNavigation';

import {Get} from "../services/Mangas";
import {WebsitesProps} from "../../types/Pages";

export default function Mangas({navigation}: RootTabScreenProps<'Mangas'>) {
    const [pages, setPages] = useState<WebsitesProps[]>([]);

    useEffect(() => {
        Get(1).then((r) => {
            setPages(r);
        })
    }, []);

    return (
        <View style={{flex: 1, borderRadius: 10, padding: 10}}>
            {
                pages.length
                    ? pages.map((e) => {
                        return <Text key={e.id}>{e.name}</Text>
                    })
                    : <ActivityIndicator size="large"/>
            }
        </View>
    );
}

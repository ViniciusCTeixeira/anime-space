import {useEffect, useState} from "react";
import {FlatList, Text} from "react-native";
import {Container, Loading, View} from '../components/Views';
import {PagesTouchableOpacity} from "../components/Buttons";
import {RootTabScreenProps} from '../../types/ReactNavigation';

import {Get} from "../services/Mangas";
import {PagesProps} from "../../types/Pages";

export default function Mangas({navigation}: RootTabScreenProps<'Mangas'>) {
    const [pages, setPages] = useState<PagesProps[]>([]);

    useEffect(() => {
        Get().then((r) => {
            setPages(r);
        })
    }, []);

    return (
        <Container colorName={'background'}>
            <View colorName={'backgroundPaper'} style={{flex: 1, borderRadius: 10, padding: 10}}>
                {
                    pages.length
                        ? pages.map((e) => {return <Text key={e.id}>{e.name}</Text>})
                        : <Loading/>
                }
            </View>
        </Container>
    );
}

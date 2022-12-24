import {Text} from '../../components/TextsComponent';
import {View} from '../../components/ViewsComponent';

import {GeneralStyle} from "../../../assets/styles";

import {RootTabScreenProps} from '../../resources/types/ReactNavigationType';

export default function TabMangas({navigation}: RootTabScreenProps<'TabMangas'>) {
    return (
        <View style={GeneralStyle.container}>
            <Text style={GeneralStyle.title}>Tab One</Text>
            <View style={GeneralStyle.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
        </View>
    );
}

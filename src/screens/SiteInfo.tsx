import {RootStackScreenProps} from "../../types/ReactNavigation";
import {ActivityIndicator, View} from "react-native";

export default function SiteInfo({navigation}: RootStackScreenProps<'SiteInfo'>) {
    return (
        <View style={{flex: 1, borderRadius: 10, padding: 10}}>
            <ActivityIndicator size="large"/>
        </View>
    );
}
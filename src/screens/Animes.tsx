import {RootTabScreenProps} from "../../types/ReactNavigation";
import {ActivityIndicator, View} from "react-native";

export default function Animes({navigation}: RootTabScreenProps<'Animes'>) {
    return (
        <View style={{flex: 1, borderRadius: 10, padding: 10}}>
            <ActivityIndicator size="large" style={{flex: 1}}/>
        </View>
    );
}
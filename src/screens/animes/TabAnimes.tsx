import {Container, View} from "../../components/Views";
import {MonoText} from "../../components/Texts";
import {Loading} from "../../components/Tools";

import {RootTabScreenProps} from "../../../types/ReactNavigation";

export default function TabAnimes({navigation}: RootTabScreenProps<'TabAnimes'>) {
    return (
        <Container colorName={'background'}>
            <View colorName={'backgroundPaper'} style={{flex: 1, borderRadius: 10, padding: 10}}>
                <Loading />
            </View>
        </Container>
    );
}
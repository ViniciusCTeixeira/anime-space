import {Container, View} from "../components/Views";
import {Loading} from "../components/Views";

import {RootStackScreenProps} from "../../types/ReactNavigation";

export default function SiteInfo({navigation}: RootStackScreenProps<'SiteInfo'>) {
    return (
        <Container colorName={'background'}>
            <View colorName={'backgroundPaper'} style={{flex: 1, borderRadius: 10, padding: 10}}>
                <Loading />
            </View>
        </Container>
    );
}
import {Container, View} from '../../components/Views';
import {RootTabScreenProps} from '../../../types/ReactNavigation';

export default function TabMangas({navigation}: RootTabScreenProps<'TabMangas'>) {
    return (
        <Container colorName={'background'}>
            <View colorName={'backgroundPaper'} style={{flex: 1, borderRadius: 10, padding: 10}}>

            </View>
        </Container>
    );
}

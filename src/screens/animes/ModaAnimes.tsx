import { Text } from '../../components/TextsComponent';
import { View } from '../../components/ViewsComponent';

import {GeneralStyle} from "../../../assets/styles";

export default function ModalAnimes() {
  return (
    <View style={GeneralStyle.container}>
      <Text style={GeneralStyle.title}>Modal Animes</Text>
      <View style={GeneralStyle.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

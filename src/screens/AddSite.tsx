import React from 'react';
import {RootStackScreenProps} from "../../types/ReactNavigation";
import {ActivityIndicator} from "react-native";
import {Container} from "../components/Views";

export default function AddSite({navigation}: RootStackScreenProps<'AddSite'>) {
    return (
        <Container>
            <ActivityIndicator size="large" style={{flex: 1}}/>
        </Container>
    );
}
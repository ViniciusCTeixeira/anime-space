import AsyncStorage from '@react-native-async-storage/async-storage';

import {AnimesProps} from "../resources/types/AnimesType";

export async function Get(){
    try {
        let sites: AnimesProps[] = JSON.parse(<string>await AsyncStorage.getItem('@animes'));
        return sites;
    } catch (e) {
        return null;
    }
}
export async function Save(site: AnimesProps) {
    try {
        let sites: AnimesProps[] = JSON.parse(<string>await AsyncStorage.getItem('@animes'));
        sites.push(site);
        await AsyncStorage.setItem('@favoritos', JSON.stringify(sites))
        return true;
    } catch (e) {
        return false;
    }
}

export async function Update(site: AnimesProps) {
    try {
        let sites: AnimesProps[] = JSON.parse(<string>await AsyncStorage.getItem('@animes'));
        let indexToUpdate = sites.findIndex(item => item.id === site.id);

        if (indexToUpdate === -1) {
            return false;
        }

        sites[indexToUpdate] = site;
        await AsyncStorage.setItem('@favoritos', JSON.stringify(sites))
        return true;
    } catch (e) {
        return false;
    }
}

export async function Delete(site: AnimesProps) {
    try {
        let sites: AnimesProps[] = JSON.parse(<string>await AsyncStorage.getItem('@animes'));
        let indexToUpdate = sites.findIndex(item => item.id === site.id);

        if (indexToUpdate === -1) {
            return false;
        }

        sites.splice(indexToUpdate, 1);
        await AsyncStorage.setItem('@favoritos', JSON.stringify(sites))
        return true;
    } catch (e) {
        return false;
    }
}
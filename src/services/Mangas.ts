import AsyncStorage from '@react-native-async-storage/async-storage';

import {MangasProps} from "../../types/Mangas";

export async function Get(){
    try {
        let sites: MangasProps[] = JSON.parse(<string>await AsyncStorage.getItem('@mangas'));
        return sites;
    } catch (e) {
        return null;
    }
}
export async function Save(site: MangasProps) {
    try {
        let sites: MangasProps[] = JSON.parse(<string>await AsyncStorage.getItem('@mangas'));
        sites.push(site);
        await AsyncStorage.setItem('@favoritos', JSON.stringify(sites))
        return true;
    } catch (e) {
        return false;
    }
}

export async function Update(site: MangasProps) {
    try {
        let sites: MangasProps[] = JSON.parse(<string>await AsyncStorage.getItem('@mangas'));
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

export async function Delete(site: MangasProps) {
    try {
        let sites: MangasProps[] = JSON.parse(<string>await AsyncStorage.getItem('@mangas'));
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
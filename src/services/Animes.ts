import AsyncStorage from '@react-native-async-storage/async-storage';

import {PagesProps} from "../../types/Pages";

export async function Get(){
    try {
        const data = await AsyncStorage.getItem('@animes');
        if (data) {
            let sites: PagesProps[] = await JSON.parse(data);
            return sites;
        }
        return [];
    } catch (e) {
        console.log(e)
        return [];
    }
}
export async function Save(site: PagesProps | PagesProps[]) {
    try {
        let sites: PagesProps[] = JSON.parse(<string>await AsyncStorage.getItem('@animes'));
        if(Array.isArray(site)){
            sites ? sites.concat(site) : sites = site;
        }else{
            sites ? sites.push(site) : sites = [site];
        }

        await AsyncStorage.setItem('@animes', JSON.stringify(sites))
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}

export async function Update(site: PagesProps) {
    try {
        let sites: PagesProps[] = JSON.parse(<string>await AsyncStorage.getItem('@animes'));
        let indexToUpdate = sites.findIndex(item => item.id === site.id);

        if (indexToUpdate === -1) {
            return false;
        }

        sites[indexToUpdate] = site;
        await AsyncStorage.setItem('@animes', JSON.stringify(sites))
        return true;
    } catch (e) {
        return false;
    }
}

export async function Delete(site: PagesProps) {
    try {
        let sites: PagesProps[] = JSON.parse(<string>await AsyncStorage.getItem('@animes'));
        let indexToUpdate = sites.findIndex(item => item.id === site.id);

        if (indexToUpdate === -1) {
            return false;
        }

        sites.splice(indexToUpdate, 1);
        await AsyncStorage.setItem('@animes', JSON.stringify(sites))
        return true;
    } catch (e) {
        return false;
    }
}

export async function Clear() {
    try {
        await AsyncStorage.setItem('@animes', '')
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}
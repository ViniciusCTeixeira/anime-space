import AsyncStorage from '@react-native-async-storage/async-storage';

import {MangasToSearchProps} from "../../types/Pages";

export async function Get(){
    try {
        const data = await AsyncStorage.getItem("@mangasToSearch");
        if (data) {
            let sites: MangasToSearchProps[] = await JSON.parse(data);
            return sites;
        }
        return [];
    } catch (e) {
        return [];
    }
}

export async function Save(site: MangasToSearchProps) {
    try {

        let sites: MangasToSearchProps[] = JSON.parse(<string>await AsyncStorage.getItem("@mangasToSearch"));
        if(Array.isArray(site)){
            sites ? sites.concat(site) : sites = site;
        }else{
            sites ? sites.push(site) : sites = [site];
        }

        await AsyncStorage.setItem("@mangasToSearch", JSON.stringify(sites))
        return true;
    } catch (e) {
        return false;
    }
}


export async function Delete(site: MangasToSearchProps) {
    try {
        let sites: MangasToSearchProps[] = JSON.parse(<string>await AsyncStorage.getItem("@mangasToSearch"));
        let indexToUpdate = sites.findIndex(item => item.id === site.id);

        if (indexToUpdate === -1) {
            return false;
        }

        sites.splice(indexToUpdate, 1);
        await AsyncStorage.setItem("@mangasToSearch", JSON.stringify(sites))
        return true;
    } catch (e) {
        return false;
    }
}

export async function Exists(name: string) {
    try {
        let sites: MangasToSearchProps[] = JSON.parse(<string>await AsyncStorage.getItem("@mangasToSearch"));
        let indexToUpdate = sites.findIndex(item => item.name === name);

        return indexToUpdate !== -1;
    } catch (e) {
        return false;
    }
}

export async function Clear(type: number) {
    try {
        await AsyncStorage.setItem("@mangasToSearch", '')
        return true;
    } catch (e) {
        return false;
    }
}
import AsyncStorage from '@react-native-async-storage/async-storage';

import {MangasToSearchProps, WebsitesProps} from "../../types/Pages";

export async function Get(type: 0 | 1){
    try {
        let key  = type ? "@mangas" : "@mangaWebsites";

        const data = await AsyncStorage.getItem(key);
        if (data) {
            let sites: WebsitesProps[] = await JSON.parse(data);
            return sites;
        }
        return [];
    } catch (e) {
        console.log(e)
        return [];
    }
}

export async function GetMangasToSearch(){
    try {
        const data = await AsyncStorage.getItem("@mangasToSearch");
        if (data) {
            let sites: MangasToSearchProps[] = await JSON.parse(data);
            return sites;
        }
        return [];
    } catch (e) {
        console.log(e)
        return [];
    }
}

export async function Save(site: WebsitesProps | WebsitesProps[], type: 0 | 1) {
    try {
        let key  = type ? "@mangas" : "@mangaWebsites";

        let sites: WebsitesProps[] = JSON.parse(<string>await AsyncStorage.getItem(key));
        if(Array.isArray(site)){
            sites ? sites.concat(site) : sites = site;
        }else{
            sites ? sites.push(site) : sites = [site];
        }

        await AsyncStorage.setItem(key, JSON.stringify(sites))
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}

export async function SaveMangasToSearch(site: MangasToSearchProps | MangasToSearchProps[]) {
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
        console.log(e)
        return false;
    }
}

export async function Update(site: WebsitesProps, type: 0 | 1) {
    try {
        let key  = type ? "@mangas" : "@mangaWebsites";

        let sites: WebsitesProps[] = JSON.parse(<string>await AsyncStorage.getItem(key));
        let indexToUpdate = sites.findIndex(item => item.id === site.id);

        if (indexToUpdate === -1) {
            return false;
        }

        sites[indexToUpdate] = site;
        await AsyncStorage.setItem(key, JSON.stringify(sites))
        return true;
    } catch (e) {
        return false;
    }
}

export async function Delete(site: WebsitesProps, type: 0 | 1) {
    try {
        let key  = type ? "@mangas" : "@mangaWebsites";

        let sites: WebsitesProps[] = JSON.parse(<string>await AsyncStorage.getItem(key));
        let indexToUpdate = sites.findIndex(item => item.id === site.id);

        if (indexToUpdate === -1) {
            return false;
        }

        sites.splice(indexToUpdate, 1);
        await AsyncStorage.setItem(key, JSON.stringify(sites))
        return true;
    } catch (e) {
        return false;
    }
}

export async function DeleteMangasToSearch(site: MangasToSearchProps) {
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

export async function Exists(url: string, type: 0 | 1) {
    try {
        let key  = type ? "@mangas" : "@mangaWebsites";

        let sites: WebsitesProps[] = JSON.parse(<string>await AsyncStorage.getItem(key));
        let indexToUpdate = sites.findIndex(item => item.url === url);

        return indexToUpdate !== -1;
    } catch (e) {
        return false;
    }
}

export async function ExistsMangasToSearch(name: string) {
    try {
        let sites: MangasToSearchProps[] = JSON.parse(<string>await AsyncStorage.getItem("@mangasToSearch"));
        let indexToUpdate = sites.findIndex(item => item.name === name);

        return indexToUpdate !== -1;
    } catch (e) {
        return false;
    }
}

export async function Clear(type: 0 | 1) {
    try {
        let key  = type ? "@mangas" : "@mangaWebsites";

        await AsyncStorage.setItem(key, '')
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}
import AsyncStorage from '@react-native-async-storage/async-storage';

import {WebsitesProps} from "../../types/Pages";

export async function Get(type: number) {
    try {
        let key = type == 1 ? "@mangas" : "@mangaWebsites";

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

export async function Save(site: WebsitesProps | WebsitesProps[], type: number) {
    try {
        let key = type == 1 ? "@mangas" : "@mangaWebsites";

        let sites: WebsitesProps[] = JSON.parse(<string>await AsyncStorage.getItem(key));
        if (Array.isArray(site)) {
            sites ? sites.concat(site) : sites = site;
        } else {
            sites ? sites.push(site) : sites = [site];
        }

        await AsyncStorage.setItem(key, JSON.stringify(sites))
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}

export async function Update(site: WebsitesProps, type: number) {
    try {
        let key = type == 1 ? "@mangas" : "@mangaWebsites";

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

export async function updateFavorite(site: WebsitesProps, type: number) {
    try {
        let key = type == 1 ? "@mangas" : "@mangaWebsites";

        let sites: WebsitesProps[] = JSON.parse(<string>await AsyncStorage.getItem(key));
        let indexToUpdate = sites.findIndex(item => item.id === site.id);

        if (indexToUpdate === -1) {
            return false;
        }

        sites[indexToUpdate]['isFavorite'] = !sites[indexToUpdate]['isFavorite'];
        await AsyncStorage.setItem(key, JSON.stringify(sites))
        return true;
    } catch (e) {
        return false;
    }
}

export async function updateLastAccess(site: WebsitesProps, type: number) {
    try {
        let key = type == 1 ? "@mangas" : "@mangaWebsites";

        let sites: WebsitesProps[] = JSON.parse(<string>await AsyncStorage.getItem(key));
        let indexToUpdate = sites.findIndex(item => item.id === site.id);

        if (indexToUpdate === -1) {
            return false;
        }

        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        sites[indexToUpdate]["lastAcess"] = date + ' ' + time;
        await AsyncStorage.setItem(key, JSON.stringify(sites))
        return true;
    } catch (e) {
        return false;
    }
}

export async function Delete(site: WebsitesProps, type: number) {
    try {
        let key = type == 1 ? "@mangas" : "@mangaWebsites";

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

export async function Exists(url: string, type: number) {
    try {
        let key = type == 1 ? "@mangas" : "@mangaWebsites";

        let sites: WebsitesProps[] = JSON.parse(<string>await AsyncStorage.getItem(key));
        let indexToUpdate = sites.findIndex(item => item.url === url);

        return indexToUpdate !== -1;
    } catch (e) {
        return false;
    }
}

export async function Clear(type: number) {
    try {
        let key = type == 1 ? "@mangas" : "@mangaWebsites";

        await AsyncStorage.setItem(key, '')
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}
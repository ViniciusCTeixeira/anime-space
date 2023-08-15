import {useEffect, useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import NetInfo from '@react-native-community/netinfo';
import {WebsiteInfo} from "./Tools"

import * as Animes from "../src/services/Animes";
import * as Mangas from "../src/services/Mangas";

export function CachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    async function loadResourcesAndDataAsync() {
        try {
            await SplashScreen.preventAutoHideAsync();

            // Load fonts
            await Font.loadAsync({
                'roboto': require('../assets/fonts/Roboto-Regular.ttf'),
            });

            let state = await NetInfo.fetch();

            if (state.isConnected) {
                let animes = await Animes.Get(0);
                animes.map(async (anime) => {
                    let info = await WebsiteInfo(anime.url);
                    if (info.title) anime.name = info.title
                    if (info.icon) anime.image = info.icon

                    if (info.icon || info.title) {
                        await Animes.Update(anime, 0)
                    }
                });

                let animeWebsites = await Animes.Get(1);
                animeWebsites.map(async (anime) => {
                    let info = await WebsiteInfo(anime.url);
                    if (info.title) anime.name = info.title
                    if (info.icon) anime.image = info.icon

                    if (info.icon || info.title) {
                        await Animes.Update(anime, 1)
                    }
                });

                let mangas = await Mangas.Get(0);
                mangas.map(async (manga) => {
                    let info = await WebsiteInfo(manga.url);
                    if (info.title) manga.name = info.title
                    if (info.icon) manga.image = info.icon

                    if (info.icon || info.title) {
                        await Mangas.Update(manga, 0)
                    }
                });

                let mangaWebsites = await Mangas.Get(1);
                mangaWebsites.map(async (manga) => {
                    let info = await WebsiteInfo(manga.url);
                    if (info.title) manga.name = info.title
                    if (info.icon) manga.image = info.icon

                    if (info.icon || info.title) {
                        await Mangas.Update(manga, 1)
                    }
                });
            }
        } catch (e) {
            console.warn(e);
        } finally {
            await SplashScreen.hideAsync();
            setLoadingComplete(true);
        }
    }

    useEffect(() => {
        loadResourcesAndDataAsync().then();
    }, []);

    return isLoadingComplete;
}
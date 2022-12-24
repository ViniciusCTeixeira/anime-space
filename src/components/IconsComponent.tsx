import * as React from "react";
import {FontAwesome, Feather} from "@expo/vector-icons";

export function TabBarIconFontAwesome(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string; }) {
    return <FontAwesome size={30} style={{marginBottom: -3}} {...props} />;
}

export function TabBarIconFeather(props: { name: React.ComponentProps<typeof Feather>['name']; color: string; }) {
    return <Feather size={30} style={{marginBottom: -3}} {...props} />;
}
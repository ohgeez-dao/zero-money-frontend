import React, { useContext, useState } from "react";

import { OpenSans_300Light, OpenSans_400Regular, OpenSans_700Bold } from "@expo-google-fonts/open-sans";
import { UnicaOne_400Regular } from "@expo-google-fonts/unica-one";
import { AppLoading } from "expo";
import { DeviceType, getDeviceTypeAsync } from "expo-device";
import { useFonts } from "expo-font";

import { DefaultTheme, NavigationContainer, Theme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "dotenv/config";
import useAsyncEffect from "use-async-effect";
import Header from "./src/components/Header";
import MobileNotSupported from "./src/components/MobileNotSupported";
import linking from "./src/constants/linking";
import { ContextProvider } from "./src/context";
import { GlobalContext } from "./src/context/GlobalContext";
import useColors from "./src/hooks/useColors";
import FarmingScreen from "./src/screens/FarmingScreen";
import LiquidityScreen from "./src/screens/LiquidityScreen";
import SwapScreen from "./src/screens/SwapScreen";

const Stack = createStackNavigator();

const App = () => {
    const [deviceType, setDeviceType] = useState(null as DeviceType | null);
    const [fontsLoaded] = useFonts({
        title: UnicaOne_400Regular,
        light: OpenSans_300Light,
        regular: OpenSans_400Regular,
        bold: OpenSans_700Bold
    });
    useAsyncEffect(async () => {
        setDeviceType(await getDeviceTypeAsync());
    }, []);
    if (!deviceType || !fontsLoaded) {
        return <AppLoading />;
    }
    return <ContextProvider>{deviceType === DeviceType.PHONE ? <MobileNotSupported /> : <Main />}</ContextProvider>;
};

const Main = () => {
    const { load } = useContext(GlobalContext);
    useAsyncEffect(load, []);
    return <Navigation />;
};

const Navigation = () => {
    const { primary, background, border, textDark } = useColors();
    const theme: Theme = {
        ...DefaultTheme,
        colors: {
            primary,
            background,
            border,
            card: background,
            notification: background,
            text: textDark
        }
    };
    return (
        <NavigationContainer theme={theme} linking={linking}>
            <Stack.Navigator
                screenOptions={{
                    header: Header,
                    title: "SushiSwap by LevX"
                }}>
                <Stack.Screen name="Home" component={SwapScreen} />
                <Stack.Screen name="Liquidity" component={LiquidityScreen} />
                <Stack.Screen name="Farming" component={FarmingScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

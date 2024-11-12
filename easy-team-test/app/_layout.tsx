import "react-native-url-polyfill/auto";
import { useEffect } from "react";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { EasyTeamProvider } from "@easyteam/ui";

import { useLogin } from "@/hooks/useLogin";
import { useHydrateApp } from "@/hooks/useHydrateApp";
import { UserContext } from "@/contexts/User/UserContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { token, role } = useLogin("jamessmith", "securePassword123");
  // const { token, role } = useLogin("charlibrown", "securePassword123");
  const { employees } = useHydrateApp();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, token, employees]);

  if (!loaded || token === null || employees === undefined) {
    return null;
  }

  return (
    <ThemeProvider value={DarkTheme}>
      <StatusBar style="light" />
      <EasyTeamProvider
        token={token}
        employees={employees}
        basePath="https://easyteam-dev-cbbeaxcbbkabh2g8.z03.azurefd.net/embed"
        isGlobalTimeTrackingEnabled={true}
      >
        <UserContext.Provider value={{ token, role }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </UserContext.Provider>
      </EasyTeamProvider>
    </ThemeProvider>
  );
}

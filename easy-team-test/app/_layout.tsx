import "react-native-url-polyfill/auto";
import { useEffect } from "react";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { EasyTeamProvider } from "@easyteam/ui";

import { useHydrateApp } from "@/hooks/useHydrateApp";
import { AppContext } from "@/contexts/App/AppContext";
import { Colors } from "@/constants/Colors";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const {
    token,
    role,
    employees,
    isGlobalTimeTrackingEnabled,
    locationId,
    employeeId,
  } = useHydrateApp();

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
        isGlobalTimeTrackingEnabled={isGlobalTimeTrackingEnabled}
      >
        <AppContext.Provider value={{ token, role, locationId, employeeId }}>
          <Stack
            screenOptions={{
              headerTintColor: Colors.dark.tint,
              headerBackTitle: "Back",
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="employee/[employeeId]"
              options={{ headerTitle: "Timesheet" }}
            />
            <Stack.Screen
              name="employee/shift/[employeeId]"
              options={{
                headerTitle: "Shift Form",
              }}
            />
          </Stack>
        </AppContext.Provider>
      </EasyTeamProvider>
    </ThemeProvider>
  );
}

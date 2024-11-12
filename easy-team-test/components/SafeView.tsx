import { SafeAreaView, StyleSheet } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";

type SafeViewProps = {
  children: React.ReactNode | React.ReactNode[];
};
export default function SafeView({ children }: SafeViewProps) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
});

import { Camera, CameraView } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import {
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Overlay } from "./Overlay";
import { useEffect, useRef } from "react";

export default function Scanner() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const router = useRouter(); // Router para redirigir con datos

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {/* <Stack.Screen
        options={{
          title: "Overview",
          headerShown: false,
        }}
      /> */}
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            qrLock.current = true;
            setTimeout(async () => {
              // await Linking.openURL(data);
              // Regresa con el QR escaneado
              router.push({ pathname: "/", params: { scannedData: data } });
            }, 500);
          }
        }}
      />
      <Overlay />
    </SafeAreaView>
  );
}


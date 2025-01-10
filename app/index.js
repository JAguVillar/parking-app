import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { supabase } from "../lib/supabase";
import { Link } from "expo-router";
import Precio from "../components/marker";
import THEMES from "../lib/mapThemes";
import Enlace from "../components/enlace";
import BotonRefresh from "../components/botonRefresh";
import Above from "../components/above";

export default function Index() {
  const [newPosition, setNewPosition] = useState({
    latitude: -27.78783714845861,
    longitude: -64.25676138825011,
  });

  const [cocheras, setCocheras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState([]);

  useEffect(() => {
    fetchCocheras();
    console.log("Parent loading state:", loading);
  }, []);

  const fetchCocheras = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("cocheras").select("*");
    if (data) {
      setCocheras(data);
    }
    setLoading(false);
  };

  function cambiarTema(id) {
    setTheme(THEMES[id]);
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: newPosition.latitude,
              longitude: newPosition.longitude,
              latitudeDelta: 0.002,
              longitudeDelta: 0.007,
            }}
            customMapStyle={theme}
          >
            {cocheras.map((cochera, index) => {
              return (
                <Link
                  style={styles.component}
                  href={`/${cochera.id}`}
                  asChild
                  key={index}
                >
                  <Marker
                    tracksViewChanges={false}
                    coordinate={{
                      latitude: cochera.latitud,
                      longitude: cochera.longitud,
                    }}
                  >
                    <Precio></Precio>
                  </Marker>
                </Link>
              );
            })}
          </MapView>
        </>
      )}
      <BotonRefresh refresh={() => fetchCocheras()} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  footer: {
    position: "absolute",
    bottom: 50,
  },
});

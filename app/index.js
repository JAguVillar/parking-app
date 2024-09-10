import { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Button } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { supabase } from "../lib/supabase";
import { Link } from "expo-router";
import Above from "../components/above";
import Precio from "../components/marker";
import THEMES from "../lib/mapThemes";
import Enlace from "../components/enlace";

export default function Index() {
  const [newPosition, setNewPosition] = useState({
    latitude: -27.78783714845861,
    longitude: -64.25676138825011,
  });

  const [cocheras, setCocheras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState([]);

  useEffect(() => {
    fetchCocheras();
  }, []);

  const fetchCocheras = async () => {
    const { data, error } = await supabase.from("cocheras").select("*");
    setCocheras(data);
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

          <Above handleClick={cambiarTema}></Above>
        </>
      )}
      <Enlace></Enlace>
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

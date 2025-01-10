import { useLocalSearchParams, Link, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { supabase } from "../lib/supabase";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import DetalleItem from "../components/detalleItem";

export default function Detalle() {
  const [cocheraInfo, setCocheraInfo] = useState();
  const [imagenes, setImagenes] = useState();
  const [horarios, setHorarios] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const { id } = useLocalSearchParams();

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("cocheras")
        .select(
          `
        *,
        cocheras_imagenes(url),
        cocheras_horarios(*)
      `
        )
        .eq("id", id)
        .single(); // Expect a single result based on the id

      console.log(data);

      const cochera = data;
      const imagenes = data.cocheras_imagenes;
      const horarios = data.cocheras_horarios[0]; // Assuming you want the first schedule

      setCocheraInfo(cochera);
      setImagenes(imagenes);
      setHorarios(horarios);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]); // Fetch when `id` changes

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }, []);

  return (
    <View className="px-8 pt-8">
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView
          className="gap-8"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className="py-4">
            <Text style={{ fontFamily: "Satoshi" }} className="text-4xl">
              {cocheraInfo.nombre}
            </Text>
          </View>

          <DetalleItem
            detalle={cocheraInfo.direccion}
            Icono={<FontAwesome5 name="parking" size={24} color="black" />}
          />

          <DetalleItem
            detalle={`${horarios.dia} - Abierto de: ${horarios.hora_apertura} hasta ${horarios.hora_cierre}`}
            Icono={<FontAwesome5 name="clock" size={24} color="black" />}
          />
          <DetalleItem
            detalle={cocheraInfo.disponibilidad}
            Icono={<FontAwesome5 name="car" size={24} color="black" />}
          />
          <DetalleItem
            detalle={cocheraInfo.direccion}
            Icono={<FontAwesome5 name="dollar-sign" size={24} color="black" />}
          />

          <View className="">
            <FlatList
              horizontal={true}
              data={imagenes}
              renderItem={({ item }) => (
                <Image
                  className="rounded-2xl"
                  source={{ uri: item.url }}
                  style={{ width: 150, height: 150 }}
                />
              )}
              ItemSeparatorComponent={() => {
                return <View className="h-full w-5" />;
              }}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
            />
            {/* {imagenes.map((imagen, index) => {
              return (
                <Image
                  source={{ uri: imagen.url }}
                  style={{ width: 100, height: 100 }}
                />
              );
            })} */}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

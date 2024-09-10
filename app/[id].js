import { useLocalSearchParams, Link, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  FlatList,
} from "react-native";
import { supabase } from "../lib/supabase";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const Item = ({ title }) => (
  <View>
    <Text>{title}</Text>
  </View>
);

export default function Detalle() {
  const [cocheraInfo, setCocheraInfo] = useState();
  const [imagenes, setImagenes] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useLocalSearchParams();

  useEffect(() => {
    // Fetch cochera and images in parallel
    const fetchData = async () => {
      setLoading(true);
      try {
        const [cocheraResponse, imagenesResponse] = await Promise.all([
          supabase.from("cocheras").select("*").eq("id", id).single(),
          supabase.from("cocheras_imagenes").select("*").eq("cochera_id", id),
        ]);
        if (cocheraResponse.error || imagenesResponse.error) {
          throw new Error(
            cocheraResponse.error?.message || imagenesResponse.error?.message
          );
        }
        setCocheraInfo(cocheraResponse.data);
        setImagenes(imagenesResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        console.log(cocheraInfo);
      }
    };
    fetchData();
  }, [id]); // Fetch when `id` changes

  return (
    <ScrollView className="px-8 pt-8">
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View className="gap-8">
          <View>
            <Text className="text-6xl font-bold">{cocheraInfo.nombre}</Text>
          </View>
          <View>
            <FontAwesome6 name="square-parking" size={24} color="black" />
          </View>
          <View>
            <FontAwesome5 name="clock" size={24} color="black" />
          </View>
          <View>
            <FontAwesome5 name="car" size={24} color="black" />
          </View>
          <View>
            <FontAwesome5 name="dollar-sign" size={24} color="black" />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

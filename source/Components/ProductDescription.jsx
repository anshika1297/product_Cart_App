import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { addToCart, removeFromCart } from "../Redux/action";
import { useDispatch } from "react-redux";

function ProductDescription({ navigation }) {
  const dispatch = useDispatch();
  const route = useRoute();
  const { item } = route.params;
  const [cartbtm, setcartbtm] = React.useState(false);

  const handleAddToCart = () => {
    if (cartbtm) {
      dispatch(removeFromCart(item));
      setcartbtm(false);
    } else {
      dispatch(addToCart(item));
      setcartbtm(true);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={styles.headerView}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back-sharp"
                size={24}
                color="black"
                style={{ paddingTop: 2 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        style={{
          paddingHorizontal: 15,
          paddingVertical: 15,
          backgroundColor: "white",
        }}
      >
        <Image
          source={{ uri: item?.image }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.details}>
          <Text style={{ color: "gray" }}>{item?.category_name}</Text>
          <Text style={styles.name}>{item.title}</Text>

          <View
            style={{
              flexDirection: "row",
              paddingBottom: 5,
              paddingVertical: 8,
            }}
          >
            <Text style={styles.rating}>
              Rating: &nbsp;{item.rating.rate} Star ({item.rating.count}){" "}
            </Text>
          </View>

          <View style={{ backgroundColor: "#E6F0FF", padding: 10 }}>
            <Text style={styles.price}>₹{item?.price}</Text>
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 13, paddingTop: 4 }}>
            Buy Now and Pay ₹{item?.price} next month using Pay Later
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            backgroundColor: "orange",
            height: 50,
            paddingVertical: 10,
          }}
          onPress={handleAddToCart}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
            }}
          >
            {cartbtm ? "Remove" : "Add to Cart"} &nbsp;
          </Text>
          <AntDesign name="shoppingcart" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, paddingBottom: 10 }}>
          Product Details:
        </Text>
        <Text>{item?.description}</Text>
        <Text style={{ fontWeight: "bold" }}>
          category: &nbsp;{item?.category}
        </Text>
      </View>
    </ScrollView>
  );
}

export default ProductDescription;

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    height: 60,
    padding: 15,
    justifyContent: "space-between",
  },

  image: {
    width: "100%",
    height: 350,
  },
  details: {
    paddingVertical: 10,
    flex: 1,
    flexDirection: "column",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
    marginRight: 10,
  },
  rating: {
    fontSize: 15,
    color: "#888",

    marginLeft: 12,
    marginTop: 4,
  },
});

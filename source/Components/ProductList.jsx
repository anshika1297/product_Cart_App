import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { addToCart, removeFromCart } from "../Redux/action";
import { useDispatch } from "react-redux";

function ProductList({ item }) {
  const dispatch = useDispatch();

  const navigation = useNavigation();
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
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductDescription", { item })}
      >
        <Image
          source={{ uri: item?.image }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.details}>
          <Text style={styles.name}>{item.title}</Text>
          <Text style={styles.rating}>
            Rating: &nbsp;{item.rating.rate} Star ({item.rating.count}){" "}
          </Text>
          <View style={{ paddingTop: 5, paddingLeft: 5 }}>
            <Text style={styles.price}>
              Price: &nbsp;
              {item?.price ? `₹${item?.price}` : `₹${item?.price}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.AddCart} onPress={handleAddToCart}>
        <Text style={styles.CartText}>
          {cartbtm ? "Remove" : "Add to Cart"} &nbsp;
        </Text>
        <AntDesign name="shoppingcart" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

export default ProductList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 40,
    borderWidth: 0.5,
    width: 180,
    paddingHorizontal: 10,
    borderColor: "#EBEDF0",
    height: 700,
  },
  image: {
    width: 155,
    height: 200,
    marginTop: -5,
    marginBottom: 20,
    paddingVertical: 100,
  },
  details: {
    width: 135,
    marginLeft: 10,
    paddingLeft: 10,
    paddingVertical: 60,
    height: 300,
  },
  name: {
    paddingLeft: 5,
    color: "blue",
    fontSize: 20,
  },
  price: {
    color: "blue",
    fontSize: 20,
  },
  rating: {
    paddingTop: 5,
    paddingLeft: 5,
    fontSize: 15,
  },
  AddCart: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  CartText: { color: "white", fontWeight: "bold", fontSize: 16 },
});

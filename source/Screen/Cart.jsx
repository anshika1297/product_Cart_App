import React from "react";
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../Redux/action";
import { View, Text, Button, Image, FlatList } from "react-native";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Shopping Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <Image
              source={{ uri: item?.image }}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={{ width: 100 }}>
              <Text>{item.title}</Text>
              <Text style={{ fontSize: 16, color: "blue" }}>
                Price- ₹{item.price}
              </Text>
            </View>
            <Button title="Remove" onPress={() => handleRemoveFromCart(item)} />
          </View>
        )}
      />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    paddingVertical: 50,
  },
});

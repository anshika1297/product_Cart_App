import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TextInput } from "react-native";

import { useRoute } from "@react-navigation/native";
import ProductList from "../Components/ProductList";

const Product = ({ navigation }) => {
  const route = useRoute();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const SearchResult = () => {
    let debounceTimeout;

    if (searchTerm) {
      setLoading(true);

      debounceTimeout = setTimeout(() => {
        fetch("https://fakestoreapi.com/products")
          .then((res) => res.json())
          .then((data) => {
            const filteredList = data.filter((item) =>
              item.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setLoading(false);
            setProduct(filteredList);
          })
          .catch((err) => console.log(err));
      }, 500);
    } else {
      setProduct([]);
    }

    return () => {
      // Clear the debounce timeout if the component unmounts or if searchTerm changes
      clearTimeout(debounceTimeout);
    };
  };
  const handleInputChange = (text) => {
    setSearchTerm(text);
    SearchResult();
  };

  return (
    <View>
      <View>
        <Text>Product Search</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            paddingHorizontal: 10,
          }}
          placeholder="Search for products..."
          value={searchTerm}
          onChangeText={handleInputChange}
        />
      </View>

      <Text style={{ fontSize: 18, alignSelf: "center" }}>
        {loading ? "Loading..." : ""}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignitems: "center",
        }}
      >
        {product.length > 0 ? (
          <FlatList
            data={product}
            renderItem={({ item }) => <ProductList item={item} />}
            horizontal={true}
            keyExtractor={(item) => item.id}
          />
        ) : (
          !loading && <Text>No results found.</Text>
        )}
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({});

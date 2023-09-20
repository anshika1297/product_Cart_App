import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, AntDesign } from "@expo/vector-icons";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Cart from "./source/Screen/Cart";
import Product from "./source/Screen/Product";
import ProductDescription from "./source/Components/ProductDescription";
import { Provider } from "react-redux";
import store from "./source/Redux/store";

const Tab = createBottomTabNavigator();
const ProductStack = createStackNavigator();

const StackNavigator = () => (
  <ProductStack.Navigator screenOptions={{ headerShown: false }}>
    <ProductStack.Screen name="BottomNavigation" component={Navigation} />
    <ProductStack.Screen
      name="ProductDescription"
      component={ProductDescription}
    />
  </ProductStack.Navigator>
);

const Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "yellowgreen",
        tabBarInactiveTintColor: "black",
      }}
    >
      <Tab.Screen
        name="Product"
        component={Product}
        options={{
          tabBarLabel: "Products",
          tabBarIcon: ({ color = "green", size }) => (
            <Entypo name="shopping-bag" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ color = "green", size }) => (
            <AntDesign name="shoppingcart" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="auto" />
      <Provider store={store}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}

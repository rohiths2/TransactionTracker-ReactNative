import { Image } from 'expo-image';
import { Alert, KeyboardAvoidingView, StatusBar } from 'react-native';
import { SafeAreaView, Platform, StyleSheet, View, Text, ScrollView, Button, Modal, TextInput, FlatList } from 'react-native';
import { useState, useEffect } from 'react';

const img = require("@/assets/images/icon.png");

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [list, setList] = useState([])
  const fetchData = async (limit = 10) => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts?_limit=${limit}'
    );
    const data = await response.json()
    setList(data)
  };



  return (
    <View style={{flex: 1, backgroundColor: "cyan"}}>
    </View>

  );
}

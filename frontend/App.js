import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, Image } from "react-native";  // Import Image here
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons"; 
import Toast from "react-native-toast-message";

const App = () => {
  const [query, setQuery] = useState("");
  const [maxPages, setMaxPages] = useState("");
  const [loading, setLoading] = useState(false);

  const startAutomation = async () => {
    if (!query.trim() || !maxPages || maxPages <= 0) {
      Toast.show({ type: "error", text1: "Invalid Input", text2: "Enter a valid query & pages." });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://192.168.29.229:5000/start", { query, max_pages: Number(maxPages) });

      if (!response.data.message) throw new Error("Invalid response");
      Toast.show({ type: "success", text1: "Success", text2: response.data.message });
    } catch (error) {
      Toast.show({ type: "error", text1: "Error", text2: "Failed to start automation." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('./assets/photo.jpg')} // Local image
            style={styles.image}
          />
          <Text style={styles.title}>LinkedIn Connection Automation</Text>
        </View>

        <TextInput 
          style={styles.input} 
          placeholder="Search Query" 
          value={query} 
          onChangeText={setQuery} 
          placeholderTextColor="#888"
        />
        <TextInput 
          style={styles.input} 
          placeholder="Number of Pages" 
          keyboardType="numeric" 
          value={maxPages} 
          onChangeText={setMaxPages} 
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.button} onPress={startAutomation} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.buttonText}>Start Automation</Text>}
        </TouchableOpacity>

        <Toast />
      </View>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#f4f6f8", 
    padding: 20
  },
  container: {
    width: "100%",
    maxWidth: 500,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // for Android shadow effect
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize:30,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#fafafa",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#0077B5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
    elevation: 3, // for Android
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: 100,    // Image width
    height: 70,   // Image height
    borderRadius:0,  // Optional: if you want to make the image circular
  }
});

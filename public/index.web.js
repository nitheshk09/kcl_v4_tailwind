import React from "react";
import { AppRegistry, View, Text, Button, TextInput, StyleSheet } from "react-native";
import { name as appName } from "./app.json";

function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>🚀 MyProject Web</Text>

      <TextInput
        placeholder="Type something..."
        style={styles.input}
      />

      <Button
        title="Click Me"
        onPress={() => alert("Hello from React Native Web!")}
      />

      <View style={styles.card}>
        <Text style={styles.cardText}>This is a sample card widget</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: "100vh", // ensures full screen
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "70%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  card: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardText: {
    fontSize: 16,
  },
});

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById("root"),
});

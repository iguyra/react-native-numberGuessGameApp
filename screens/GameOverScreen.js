import { View, Text, StyleSheet, Button } from "react-native";
import colors from "../constants/colors";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.headerTitle}>The game is over</Text>
      <Text>Number of rounds:{props.guessRounds}</Text>
      <Text>Number of was:{props.userNumber}</Text>
      <Button title="NEW GAME" onPress={props.configureNewGameHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    color: "black",
    fontSize: 18,
  },
});

export default GameOverScreen;

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Card from "../Components/Card";
import Input from "../Components/Input";
import NumberContainer from "../Components/NumberContainer";
import colors from "../constants/colors";

const StartGameScreen = ({ startGameHandler }) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState("");

  const numberINputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      alert("number has to be between 1 and 99", [
        { text: "okay", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>you selected:</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button
          title="START GAME"
          onPress={() => startGameHandler(selectedNumber)}
        />
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>start a new game</Text>
        <Card style={styles.inputContainer}>
          <Text style={styles.headerTitle}>SELECT A NUMBER</Text>
          <Input
            style={styles.input}
            keyboardType="numeric"
            maxLength={2}
            onChangeText={numberINputHandler}
            value={enteredValue}
          />

          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                onPress={resetInputHandler}
                title="reset"
                color={colors.accent}
              />
            </View>
            <View style={styles.button}>
              <Button
                onPress={confirmInputHandler}
                title="confirm"
                color={colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
  },

  title: {
    color: "black",
    fontSize: 20,
    marginVertical: 10,
  },

  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    paddingHorizontal: 15,
  },

  button: {
    width: "45%",
    backgroundColor: "red",
  },

  input: {
    width: 50,
    textAlign: "center",
  },

  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default StartGameScreen;

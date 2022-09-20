import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import Card from "../Components/Card";
import NumberContainer from "../Components/NumberContainer";
import colors from "../constants/colors";

const generateRandomBetween = (min, max, exlude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNum = Math.floor(Math.random() * (max - min)) + min;

  if (randomNum === exlude) {
    return generateRandomBetween(min, max, exlude);
  } else {
    return randomNum;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );
  const [rounds, setRounds] = useState(0);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, gameOverHandler } = props;

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.gameOverHandler(rounds);
    }
  }, [currentGuess, userChoice, gameOverHandler]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "gretaer" && currentGuess > props.userChoice)
    ) {
      Alert.alert("don't lie", "you that this is wrong", [
        { text: "sorry", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setRounds((curRounds) => curRounds + 1);

    setCurrentGuess(nextNumber);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.number}>Opponents Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={() => nextGuessHandler("lower")} />
        <Button title="GREATER" onPress={() => nextGuessHandler("greater")} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",

    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;

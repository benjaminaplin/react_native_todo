import React, { Component } from "react";
import {
  StatusBar,
  Image,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableHighlight
} from "react-native";
import picSierra from "./assets/Sierra-Spencer.png";
import picTanner from "./assets/Tanner-McTab.png";

export default class HelloWorld extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      fetching: false,
      backgroundColor: 'grey',
      todoColor: 'red'
    };
  }

  componentDidMount() {
    this.setState({ fetching: true });
    fetch("http://localhost:3000/todos")
      .then(response => response.json())
      .then(todos =>
        // console.log(todos)
        this.setState({
          todos: todos,
          fetching: false
        })
      )
      .catch(err => console.log("error fetching", err));
  }

  changeColor(todoColor) {
    this.setState({ todoColor })
  }

  render() {
    const { todos, todoColor, backgroundColor } = this.state;
    return (
      <ScrollView style={
        styles.container
      }>
        <ActivityIndicator
          size="large"
          style={styles.spinner}
          animating={this.state.fetching}
        />
        {todos.length > 0 &&
          todos.map((todo, i) => (
            <View style={styles.row} key={i}>
              <View style={[styles.sample, { backgroundColor: 'yellow' }]} />
              <Text
                onPress={() => this.changeColor('green')}
                style={[styles.todo, { backgroundColor: this.state.todoColor }]}
              >
                {todo.todo}
              </Text>
              <Text style={styles.completed}>{todo.completed}</Text>
            </View>
          ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    backgroundColor: "grey"
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  sample: {
    height: 20,
    width: 20,
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'white'
  },
  text: {
    fontSize: 30,
    margin: 5
  },
  // button: {
  //   margin: 10,
  //   padding: 10,
  //   borderWidth: 2,
  //   borderRadius: 10,
  //   alignSelf: 'stretch',
  //   backgroundColor: 'rgba(255,255,255,.8)'
  // },
  spinner: {
    position: "absolute",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },
  todo: {
    fontSize: 30,
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  completed: {
    fontSize: 16
  },
  accountNumber: {
    fontSize: 15
  }
});

AppRegistry.registerComponent("HelloWorld", () => HelloWorld);

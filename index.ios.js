import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  Dimensions
} from "react-native";

import TodoForm from "./components/todo-form"
import ColorButton from "./components/color-button"

export default class HelloWorld extends Component {
  constructor() {
    super();

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.todos = []
    this.state = {
      todos: [],
      fetching: false,
      dataSource: this.ds.cloneWithRows(this.todos)
    };
  }

  componentDidMount() {
    this.setState({ fetching: true });
    fetch("http://localhost:3000/todos")
      .then(response => response.json())
      .then(todos =>
        // console.log(todos)
        this.setState({
          dataSource: this.ds.cloneWithRows(todos),
          fetching: false
        })
      )
      .catch(err => console.log("error fetching", err));
  }

  changeColor(todoColor) {
    this.setState({ todoColor })
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(todo) => (
          <Text style={todo.completed ? styles.completed : styles.notCompleted}>{todo.todo} </Text>
        )}
        renderHeader={() => (
          <TodoForm />
        )}
      >
      </ListView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    backgroundColor: "lightgrey",
    flex: 1
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
  completed: {
    color: 'blue',
    fontSize: 30,
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  notCompleted: {
    color: 'salmon',
    fontSize: 30,
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  spinner: {
    position: "absolute",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },
  todo: {

  },
  header: {
    fontSize: 30,
    backgroundColor: 'grey',
    paddingTop: 20,
    padding: 10,
    textAlign: 'center'
  }
});

AppRegistry.registerComponent("HelloWorld", () => HelloWorld);

        // <ActivityIndicator
        //   size="large"
        //   style={styles.spinner}
        //   animating={this.state.fetching}
        // />
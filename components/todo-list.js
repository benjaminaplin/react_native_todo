import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  ListView,
  View,
  Dimensions
} from "react-native";

import { CheckBox } from 'react-native-elements'

import TodoForm from "./todo-form"
import ColorButton from "./color-button"

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
    this.getTodos()
  }

  getTodos() {
    this.setState({ fetching: true });
    fetch("http://localhost:3000/todos")
      .then(response => response.json())
      .then(todos =>
        this.setState({
          dataSource: this.ds.cloneWithRows(todos),
          fetching: false
        }),
      console.log("got todos: ", this.state.todos)
      )
      .catch(err => console.log("error fetching", err));
  }

  deleteTodo(todoID) {
    fetch(`http://localhost:3000/todos/${todoID}`, {
      method: "DELETE",
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(response => response.json())
      .then(() => this.getTodos())
      .catch(err => console.log("error fetching", err));

  }

  updateTodo(todoID, todo) {
    console.log(todo)
    fetch(`http://localhost:3000/todos/${todoID}`, {
      method: "PATCH",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        completed: !todo.completed
      })
    })
      .then(response => response.json())
      .then(() => this.getTodos())
      .catch(err => console.log("error fetching", err));
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(todo) => (
          <View style={styles.todoView}>
            <Text style={styles.todoText}>{todo.todo} </Text>
            <CheckBox
              center
              style={styles.checkboxes}
              onPress={() => this.updateTodo(todo.id, todo)}
              checked={todo.completed ? false : true}
            />
            <Text
              style={styles.deleteTodo}
              onPress={() => this.deleteTodo(todo.id)}
            >X</Text>
          </View>
        )}
        renderHeader={() => (
          <TodoForm getTodos={this.getTodos.bind(this)} />
        )}
      >
      </ListView>
    );
  }
}

HelloWorld.propTypes = {}
HelloWorld.propsTypes = {}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    backgroundColor: "lightgrey",
    flex: 1
  },
  checkboxes: {
    width: 50,
    alignSelf: 'stretch',
    paddingTop: 15
  },
  deleteTodo: {
    paddingTop: 8,
    color: 'red',
    fontSize: 30,
    alignSelf: 'stretch'
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
  todoText: {
    fontSize: 30,
    margin: 5
  },
  todoView: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10
  },
  spinner: {
    position: "absolute",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },
  header: {
    fontSize: 30,
    backgroundColor: 'grey',
    paddingTop: 20,
    padding: 10,
    textAlign: 'center'
  }
});
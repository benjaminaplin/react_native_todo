import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native'

export default class TodoForm extends Component {
  constructor() {
    super()
    this.state = {
      todo: ''
    }
    this.submitTodo = this.submitTodo.bind(this)
  }

  submitTodo() {
    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        todo: this.state.todo,
        completed: 'false'
      })
    })
      .then(response => response.json())
      .then(todos =>
        console.log(todos)
      )
      .catch(err => console.log("error fetching", err));
    this.setState({ todo: '' })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.txtInput}
          placeholder="enter a todo..."
          onChangeText={(todo) => this.setState({ todo })}
          value={this.state.todo}
        />
        <Text
          style={styles.button}
          onPress={this.submitTodo}
        >Add</Text>
      </View>
    )
  }
}

TodoForm.propTypes = {
  onNewColor: React.PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'lightgrey',
    height: 70,
    paddingTop: 20
  },
  txtInput: {
    flex: 1,
    margin: 5,
    padding: 5,
    borderWidth: 2,
    fontSize: 20,
    borderRadius: 5,
    backgroundColor: 'snow'
  },
  button: {
    backgroundColor: 'darkblue',
    margin: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 20
  }
})
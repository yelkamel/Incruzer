
import React, { Component } from 'react';
import { TouchableOpacity, View, ScrollView, Image, Text } from 'react-native';

import t from 'tcomb-form-native';

import User from '../../../schemas/user';
import styles from './style';

const Form = t.form.Form;

export default class Register extends Component {

  static propTypes = {

  }

  constructor(props) {
    super(props);
    this.state = {
      value: {

      }
    }
  }

  onChange(value) {
    this.setState({value});
  }

  onPress() {
    var value = this.refs.form.getValue();
    if (value) {
      console.log(value);
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerIconLeftContainer}>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>
              Je crée mon compte
            </Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>  
        <View style={styles.pictureContainer}>

        </View>
        <View style={styles.formContainer}>
          <ScrollView>
            <Form
              ref="form"
              type={User}
              value={this.state.value}
              onChange={this.onChange}
            />
            <TouchableOpacity style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
              <Text style={styles.submitButton}>Valider</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}
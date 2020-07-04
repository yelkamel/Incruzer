import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import { formatnumber } from '../../../helpers';


const r = 4000;

class Cluster extends Component {

  constructor(props) {
    super(props);
    this.state = {
      incrementationNumber: 0,
    }
  }

  componentWillMount() {
    this.counter = this.getCounter();

    this.timerCounterID = setInterval(
      () => this.recusiveIncrmentationNumber(),
      r/this.props.cluster,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerCounterID);
  }

  getCounter() {
    if (this.props.cluster > 0 && this.props.cluster < 40) {
        return 1;
    } else {
      if (this.props.cluster >= 40 && this.props.cluster < 100) {
        return 2;
      } else {
        if (this.props.cluster >= 100 && this.props.cluster < 500) {
          return 4;
        } else {
          if (this.props.cluster >= 500 && this.props.cluster < 1000) {
            return 7;
          } else {
            if (this.props.cluster >= 1000 && this.props.cluster < 5000) {
              return 14;
            } else {
              return 38;
            }
          }
        }
      }
    }
  }

  recusiveIncrmentationNumber() {
    const i = this.state.incrementationNumber + this.counter;
    if (i < this.props.cluster) {
      this.setState({
        incrementationNumber: (i),
      });
    } else {
      this.setState({
        incrementationNumber: this.props.cluster,
      });
      clearInterval(this.timerCounterID);
    }
  }

  render() {
    const { unread } = this.props;
    return(
      <View style={[
        styles.cluster,
        unread ? styles.unread :{}
      ]}
    >
        <Text style={styles.textClustor} ref='number'>
          {this.props.cluster}
        </Text>
      </View>
    );
  }
}

export default Cluster;

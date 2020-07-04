import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

class Button extends Component {

  static propTypes = {
    borderWidth: React.PropTypes.number,
    borderColor: React.PropTypes.string,
    borderRadius: React.PropTypes.number,
    color: React.PropTypes.string,
    text: React.PropTypes.string,
    fontSize:  React.PropTypes.number,
    fontWeight: React.PropTypes.string,
  };

  static defaultProps = {
    borderWidth: 5,
    borderColor: '#fff',
    borderRadius: 20,
    color: '#fff',
    text: '',
    fontSize: 16,
    fontWeight: 'bold',
  };

  constructor(props) {
    super(props);
  }

  getStyles() {
    return StyleSheet.create({
      buttonBorder: {
        borderColor: this.props.borderColor,
        borderWidth: this.props.borderWidth,
        borderRadius: this.props.borderRadius,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText: {
        color:  this.props.color,
        fontSize: this.props.fontSize,
        fontWeight: this.props.fontWeight,
        backgroundColor: 'transparent'
      },
      iconContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 10,
        top: 10
      },
      textContainer: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10
      },
      icon: {
        tintColor: '#FFFFFF',
        height: 27,
        width: 27,
      }
    });
  }

  render() {
    const styles = this.getStyles();
    return(
      <View style={styles.buttonBorder}>
        {
          this.props.iconSource &&
          <View style={styles.iconContainer}>
            <Image 
              style={styles.icon} 
              source={this.props.iconSource}>
            </Image>
          </View>
        }
        <View style={styles.textContainer}>
          <Text style={styles.buttonText}>
            {this.props.text}
          </Text>
        </View>
      </View>
    )
  }
}

export default Button;


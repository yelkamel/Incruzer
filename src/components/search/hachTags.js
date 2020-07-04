import React, { Component } from 'react';
import { 
  View, 
  ListView,
  Text,
  StyleSheet, 
  Dimensions,
} 
from 'react-native';


import Background from '../common/background';

const deviceHeight = Dimensions.get('window').height;
const deviceWidh = Dimensions.get('window').width;

export default class HachTagsView extends Component {

  static propTypes = {
    lastHours: React.PropTypes.bool,
  };

  static defaultProps = {
    lastHours: true,
  };

  constructor(props) {
    super(props);
    
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    
    this.state = {
      dataSource: ds.cloneWithRows(props.hachTags),
    };
  }


  componentWillReceiveProps(nextProps){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(nextProps.hachTags),
    })
  }
  
  renderRow = (hachTag, key) => {
    return <View
      style={styles.rowHachTag}
    >
      <Text style={{fontWeight: 'bold'}}>{hachTag}</Text>
    </View>;
  }

  render() {
    return(
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        { this.props.lastHours &&
        <Background horizontal={true}>
          <View style={{
              width: deviceWidh,
              flex: 1, 
              justifyContent: 'center',
              padding: 5,
            }}
          >
            <Text style={{
                backgroundColor: 'transparent',
                color: 'white'
              }}
            >
              Last 24 hours
            </Text>
          </View>
        </Background>
        }
        <View style={{flex: 8}}>
          <ListView
            scrollEnabled={false}
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={
              (hachTag, key) => this.renderRow(hachTag, key)
            }
          />
        </View>
      </View>
    );
  }
};


const styles = StyleSheet.create({
  rowHachTag:{
    flexDirection: 'row',
    height: deviceHeight/10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});


import React, { Component } from 'react';
import { 
  View, 
  ListView,
  Text,
} 
from 'react-native';
import Hr from 'react-native-hr';

import { Actions } from "react-native-router-flux";
import NotificationRow from './notificationRow';
import { notifications } from '../../dummyData';
import theme from '../../themes/base-theme';

export default class Notifications extends Component {

  constructor(props) {
    super(props);
    
    notifications.unshift({type: 'add'});
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(notifications)
    };
  }


  render() {
    return(
      <View style={{flex: 3}}>
      	<View 
      	 style={{
	      	 borderBottomWidth: 1,
	      	 borderStyle: 		"solid", 
	      	 borderColor: 		"#DEDEDE", 
	      	 paddingLeft: 		10, 
	      	 marginBottom: 		10 
	      }}
      	>
	      	<Text 
	      		style={{ color: theme.blue, fontWeight: "bold"}}>
	      		POPULAR TODAY
	      	</Text>
        </View>
        <ListView
          scrollEnabled={false}
          dataSource={this.state.dataSource}
          renderRow={
            (notification) => 
              <NotificationRow 
                notification={notification}
                onPress={
                  notification.type === 'add' ?
                  this.props.setVisibleInvite 
                  :
                  () => {}
                }
              />
          }
        />
      </View>
    );
  }
};

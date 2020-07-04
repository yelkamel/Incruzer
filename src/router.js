import React 		from 'react';
import {connect} 	from 'react-redux';
import {
  Scene,
  Router,
  Modal,
  ActionConst
} from 'react-native-router-flux';

import Home 					from './components/home';
import Moments 					from './components/moments';
import Launch 					from './components/splashscreen';
import Profile 					from './components/profile';
import TabProfile 				from './components/profile/tabs';
import MomentsProfile 			from './components/profile/moments';
import Messaging 				from './components/messaging';
import Connection 				from './components/connection';
import InstagramUsersProposal 	from './components/connection/instagramUsersProposal';
import MobileUsersProposal 		from './components/connection/mobileUsersProposal';
import MobileConnection 		from './components/connection/mobileConnection';
import PhoneNumber 				from './components/connection/phoneNumber';
import SmsCode 					from './components/connection/smsCode';
import CreateMoment 			from './components/createMoment';
import CreateMomentValidation 	from './components/createMoment/validation';
import Share 					from './components/share';
import User 					from './components/user';
import UsersList 				from './components/user/usersList';
import Setting 					from './components/setting';
import Username 				from './components/setting/username';
import PushNotifications 		from './components/setting/pushNotifications';
import Search 					from './components/search';
import TabSearch 				from './components/search/tabSearch';


export default class App extends React.Component {
  render() {
  return (<Router  >
  		<Scene key="modal" component={Modal}>
        <Scene  key='root' hideNavBar hideTabBar>
            <Scene key='launch'
            initial
            direction='vertical'
            component={Launch} />
            <Scene key='home'
                type={ActionConst.REPLACE}
                component={Home} />
            <Scene key='moments'
                component={Moments} />
            <Scene key='messaging' component={Messaging}   />
            <Scene key='connection'  component={Connection} />
            <Scene
              key='mobileConnection'
              component={MobileConnection} />
            <Scene
              key='phoneNumber'
              component={PhoneNumber} />
            <Scene
              key='smsCode'
              component={SmsCode} />
            <Scene
              key='mobileUsersProposal'
              component={MobileUsersProposal} />
            <Scene
              key='instagramUsersProposal'
              component={InstagramUsersProposal} />
            <Scene
              key='createMoment'
              component={CreateMoment} />
            <Scene key='share' component={Share}  />
            <Scene key='user' component={User}  />
            <Scene key='setting' component={Setting}  />
            <Scene key='username' component={Username}  />
            <Scene key='pushNotifications'  component={PushNotifications}  />
            <Scene key='usersList'  component={UsersList}  />
            <Scene key='setting' component={Setting}  />
            <Scene
              direction='leftToRight'
              key='search'
              component={Search}
            />
            <Scene key='tabSearch' component={TabSearch} />
          </Scene>
          <Scene key="profile"  component={Profile} />
          <Scene key='tabProfile' component={TabProfile}  />
          <Scene key='momentsProfile' component={MomentsProfile} />
          </Scene>
    </Router>)
    }
}

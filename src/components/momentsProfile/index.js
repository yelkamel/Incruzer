import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import moments from '../../dummyData';
import Moment from './moment';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


class Moments extends PureComponent {

  static propTypes = {
    index: React.PropTypes.number,
  }


  
  renderScene = () => {
    const momentsPage = [];
    
    moments.forEach((moment, index) => {
      momentsPage.push(<Moment
          goToMaps={this.props.goToMaps}
          moment={moment}
          key={index} 
        />
      );
    })
    return momentsPage;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Swiper
          showsPagination={false}
        >
          {this.renderScene()}
        </Swiper>
      </View>
    )
  }
}

export default Moments;

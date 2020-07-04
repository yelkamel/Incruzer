import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';

const {
  height: deviceHeight, 
  width: deviceWidth,
} = Dimensions.get("window");

export default class Search extends React.Component {

  static propTypes = {
    left: React.PropTypes.any,
    right: React.PropTypes.any,
    filter: React.PropTypes.func,
    textSearch: React.PropTypes.string,
  };

  static defaultProps = {
    left: null,
    right: null,
    filter: () => {},
    textSearch: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      textSearch: props.textSearch
    };
    
  }

  filter = ( textSearch ) => {
    this.setState({ textSearch });
    this.props.filter(textSearch);
  };

  render() {
    const { percent, percentHeight } = this.props;
    return (
      <View 
        style={styles.rowSearch}
      >
        <View
          style={styles.blockContainer}
        >
        {
          this.props.left
        }
        </View>
        <View 
          style={styles.searchContainer}
        >
          
            <TextInput
              onChangeText={ this.filter }
              style={ styles.searchInput }
              underlineColorAndroid="transparent"
              placeholderTextColor="#FFFFFF"
              placeholder={ 'Search' }
              placeholderTextColor={'gray'}
              placeholderStyle={{ color: "gray", fontSize: 14, fontFamily: 'HelveticaNeue' }}
              value={ this.state.textSearch }
            />
            
      
          <Image
            style={ styles.searchIcon }
            source={ require('../../../assets/icons/search.png') }
          />
        </View>
        <View
          style={styles.blockContainer}
        >
        {
          this.props.right 
        }
        </View>
      </View>
    );
  }
};

const searchContainerHeight = deviceHeight/12;
const searchInputHeight 	= deviceHeight/20;

const styles = StyleSheet.create({
  blockContainer: {
    flexDirection: 	'row',
    justifyContent: 'center',
    alignItems: 	'center',
  },
  rowSearch: {
    flex: 1,
    flexDirection: 'row',
  },
  searchContainer: {
    flex: 4.5,
    height: searchContainerHeight,
    paddingVertical: (searchContainerHeight - searchInputHeight)/2,
  },
  searchInput: {
    backgroundColor: 'rgba(240, 240, 240, 0.8)',
    textAlign: 'center',
    color: '#FFFFFF',
    height: searchInputHeight,
    borderRadius: 10,
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 1,
    left: deviceWidth/50,
    top: (searchContainerHeight - searchInputHeight)/2 + deviceHeight/80,
    height: deviceHeight/29,
    width: deviceHeight/29,
  },
});


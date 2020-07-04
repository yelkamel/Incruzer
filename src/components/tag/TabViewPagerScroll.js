/* @flow */

import React, { PureComponent, Children, PropTypes } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';


import { SceneRendererPropType } from '../../../node_modules/react-native-tab-view/src/TabViewPropTypes';
import type { SceneRendererProps } from '../../../node_modules/react-native-tab-view/src/TabViewTypeDefinitions';

const deviceHeight = Dimensions.get('window').height;

type ScrollEvent = {
  nativeEvent: {
    contentOffset: {
      x: number;
      y: number;
    };
  };
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  page: {
    flex: 1,
    overflow: 'hidden',
  },
});

type Props = SceneRendererProps & {
  swipeEnabled?: boolean;
  children?: any;
}

export default class TabViewPagerScroll extends PureComponent<void, Props, void> {
  static propTypes = {
    ...SceneRendererPropType,
    swipeEnabled: PropTypes.bool,
    children: PropTypes.node,
  };

  componentDidMount() {
    this._scrollTo(this.props.navigationState.index * deviceHeight);
    this._positionListener = this.props.subscribe('position', this._updatePosition);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.layout !== this.props.layout || Children.count(prevProps.children) !== Children.count(this.props.children)) {
      global.requestAnimationFrame(() =>
        this._scrollTo(this.props.navigationState.index * deviceHeight)
      );
    }
  }

  componentWillUnmount() {
    this._positionListener.remove();
  }

  _positionListener: Object;
  _scrollView: Object;
  _isManualScroll: boolean = false;
  _isMomentumScroll: boolean = false;

  _scrollTo = (y: number) => {
    if (this._scrollView) {
      this._scrollView.scrollTo({
        y,
        animated: false,
      });
    }
  };

  _updatePosition = (value: number) => {
    if (this._isManualScroll || !this._scrollView) {
      return;
    }
    this._scrollTo(value * deviceHeight);
  };

  _handleBeginDrag = () => {
    // onScrollBeginDrag fires when user touches the ScrollView
    this._isManualScroll = true;
    this._isMomentumScroll = false;
  };

  _handleEndDrag = () => {
    // onScrollEndDrag fires when user lifts his finger
    // onMomentumScrollBegin fires after touch end
    // run the logic in next frame so we get onMomentumScrollBegin first
    global.requestAnimationFrame(() => {
      if (this._isMomentumScroll) {
        return;
      }
      this._isManualScroll = false;
    });
  };

  _handleMomentumScrollBegin = () => {
    //alert('_handleMomentumScrollBegin')
    // onMomentumScrollBegin fires on flick, as well as programmatic scroll
    this._isMomentumScroll = true;
  };

  _handleMomentumScrollEnd = (e: ScrollEvent) => {
    //alert('_handleMomentumScrollEnd')
    // onMomentumScrollEnd fires when the scroll finishes
    this._isMomentumScroll = false;
    this._isManualScroll = false;

    const nextIndex = Math.round(e.nativeEvent.contentOffset.y / deviceHeight);
    this.props.jumpToIndex(nextIndex);
  };

  _handleScroll = (e: ScrollEvent) => {

    if (!this._isManualScroll) {
      return;
    }
    this.props.position.setValue(
      e.nativeEvent.contentOffset.y / deviceHeight
    );
  };

  _setRef = (el: Object) => (this._scrollView = el);

  render() {
    const { children, layout, navigationState } = this.props;
    return (
      <ScrollView
        horizontal={false}
        pagingEnabled
        directionalLockEnabled
        scrollEnabled={this.props.swipeEnabled}
        automaticallyAdjustContentInsets={false}
        bounces={false}
        alwaysBounceVertical={false}
        scrollsToTop={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={this._handleScroll}
        onScrollBeginDrag={this._handleBeginDrag}
        onScrollEndDrag={this._handleEndDrag}
        onMomentumScrollBegin={this._handleMomentumScrollBegin}
        onMomentumScrollEnd={this._handleMomentumScrollEnd}
        contentOffset={{ x: 0, y: this.props.navigationState.index * deviceHeight }}
        style={styles.container}
        contentContainerStyle={styles.container}
        ref={this._setRef}
      >
        {
          Children.map(children, (child, i) => (
          <View
            key={navigationState.routes[i].key}
            testID={navigationState.routes[i].testID}
            style={{ height: deviceHeight, overflow: 'hidden' }}
          >
            {child}
          </View>
        ))
      }
      </ScrollView>
    );
  }
}
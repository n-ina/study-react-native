import React from 'react';
import { View, Text } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import fonts from 'app/src/fonts';
import images from 'app/src/images';

export default class App extends React.Component {
  static defaultProps = {
    skipLoadingScreen: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false,
    };
  }

  loadResourcesAshync = async () => {
    // ローカルフォルダから画像をロードします
    await Asset.loadAsync(Object.keys(images).map(key => images[key]));
    // ローカルフォルダからフォントをロードします
    await Font.loadAsync(fonts);

    return true;
  }

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;

    // リソースをロードが終わるまでは AppLoading を render します
    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          // 非同期でリソースをロードします
          startAsync={this.loadResourcesAshync}
          onError={error => console.warn(error)}
          // リソースのロードが終わったらロードを終了します
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Hello World</Text>
      </View>
    );
  }
}

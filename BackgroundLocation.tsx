import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import BackgroundGeolocation, { Subscription } from 'react-native-background-geolocation';

const BackgroundLocation = (props) => {
  const {enable, setEnable} = props;
  const [_onLocation, setOnLocation] = useState("");
  const [_onMotionChange, setOnMotionChange] = useState("");
  const [_onActivityChange, setOnActivityChange] = useState("");
  const [_onProviderChange, setOnProviderChange] = useState("");

  React.useEffect(() => {
    /// 1.  Subscribe to events.
    const onLocation: Subscription = BackgroundGeolocation.onLocation((location) => {      
      setOnLocation(JSON.stringify(location))
    });

    const onMotionChange: Subscription = BackgroundGeolocation.onMotionChange((event) => {
      setOnMotionChange(JSON.stringify(event))
    });

    const onActivityChange: Subscription = BackgroundGeolocation.onActivityChange((event) => {
      setOnActivityChange(JSON.stringify(event))
    });

    const onProviderChange: Subscription = BackgroundGeolocation.onProviderChange((event) => {
      setOnProviderChange(JSON.stringify(event))
    });

    /// 2. ready the plugin.
    BackgroundGeolocation.ready({
      // Geolocation Config
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 5,
      // Application config
      debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true, // <-- Auto start tracking when device is powered-up.
    }).then((state) => {
        
      setEnable(state.enabled);
      console.log('- BackgroundGeolocation is configured and ready: ', state.enabled);
    });

    return () => {
      onLocation.remove();
      onMotionChange.remove();
      onActivityChange.remove();
      onProviderChange.remove();
    };
  }, []);

  return <View>

        <View style={{ justifyContent: 'center',borderTopWidth:0.2, padding: 10}}>
          <Text
            style={{ textAlign: 'center',  }}>
              {"[onLocation]\n"}
            {_onLocation ? _onLocation : "Empty"}
          </Text>
        </View>

        <View style={{ justifyContent: 'center',borderTopWidth:0.2, padding: 10}}>
          <Text
            style={{ textAlign: 'center',  }}>
              {"[onMotionChange]\n"}
            {_onMotionChange ? _onMotionChange : "Empty"}
          </Text>
        </View>

        <View style={{ justifyContent: 'center',borderTopWidth:0.2, padding: 10}}>
          <Text
            style={{ textAlign: 'center',  }}>
              {"[onActivityChange]\n"}
            {_onActivityChange ? _onActivityChange : "Empty"}
          </Text>
        </View>

        <View style={{ justifyContent: 'center',borderTopWidth:0.2, padding: 10}}>
          <Text
            style={{ textAlign: 'center',  }}>
              {"[onProviderChange]\n"}
            {_onProviderChange ? _onProviderChange : "Empty"}
          </Text>
        </View>

  </View>;
};
export default BackgroundLocation;

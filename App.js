import React, { useState,useEffect } from 'react';
import {
  SafeAreaView, ScrollView, StatusBar,
  StyleSheet,
  Switch,
  Text,
  useColorScheme,
  View
} from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';
import BackgroundLocation from './BackgroundLocation';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [enable, setEnable] = useState(false);
  const [list, setList] = useState([]);

  const onClick = (value) => {
    if (value) {
        BackgroundGeolocation.start();
      } else {
        BackgroundGeolocation.stop();
      }
      setEnable(!enable)
  }

  return (
    <SafeAreaView style={{flex:1}}>
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow:1}} >
          <View style={{alignItems:"center"}}>
          <Switch value={enable} onValueChange={onClick} />
          <Text style={{padding:10}}>Enable Check BackgroundLocation</Text>
          </View>
          
            <BackgroundLocation setEnable={(e)=>{setEnable(e)}}
            list={list}
            setList={(e)=>{setList(e)}}
            />
          
          
          </ScrollView>
      </View>
        
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:"center",
    justifyContent:'center',
    backgroundColor: "white"
  },
});

export default App;

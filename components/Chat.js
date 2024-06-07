import { StyleSheet, View, Text } from 'react-native';
import { useEffect, useState } from "react";

const Chat = ({ route, navigation }) => {
  const { name, selectedColor } = route.params;
  // const [bgColor, setBgColor] = useState("")

  useEffect(() => {
    navigation.setOptions({ title: name });
    // setBgColor({ selectedColor });
  }, []);

 return (
   <View style={[styles.container, {backgroundColor: selectedColor ? selectedColor : "white"}]}>
     <Text>Hello Screen2!</Text>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
 }
});

export default Chat;
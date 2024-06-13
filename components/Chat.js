import {
  StyleSheet,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
// Chat interface
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
// Firestore DB
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
// Async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
  const { name, bgColor, userID } = route.params;
  const [messages, setMessages] = useState([]);

  // Fetch messages from DB
  let unsubMessages;
  useEffect(() => {
    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc")); //returns messages in descending order of "createdAt"
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cachedMessages(newMessages); // function below, set cache
        setMessages(newMessages);
      });
    } else loadCachedMessages(); // function below, load cache
    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  // Set cache
  const cachedMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log("AsyncStorage.setItem error -> ", error.message);
    }
  };
  // load cache
  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || [];
    setMessages(JSON.parse(cachedMessages));
  };


  // Navigation settings
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  // Send messages to DB
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  // Change chat bubble color
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  // render or !render InputTool Bar depending on Connection
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: bgColor ? bgColor : "white" },
      ]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;

//working on chat bubble color changing with bgColor

// const colorSchema = [
//   //bgColor options
//   {
//     background: "#090C08",//dark
//     rightBubble: "#...",
//     leftBubble: "#...",
//     systemMessage: "#...",
//   },
//   {
//     background: "#474056",//purple
//     rightBubble: "#...",
//     leftBubble: "#...",
//     systemMessage: "#...",
//   },
//   {
//     background: "#8A95A5",//blue
//     rightBubble: "#...",
//     leftBubble: "#...",
//     systemMessage: "#...",
//   },
//   {
//     background: "#B9C6AE",//green
//     rightBubble: "#...",
//     leftBubble: "#...",
//     systemMessage: "#...",
//   },
//   //option if nothing selected
//   {
//     background: "#fff",//white
//     rightBubble: "#000",//black
//     leftBubble: "#...",
//     systemMessage: "#...",
//   },
// ];

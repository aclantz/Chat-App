import {
  StyleSheet,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useEffect, useState } from "react";
// Chat interface
import { GiftedChat, Bubble } from "react-native-gifted-chat";
// Firestore DB
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  const { name, bgColor, userID } = route.params;
  const [messages, setMessages] = useState([]);

  // Fetch messages from DB
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc")); //returns messages in descending order of "createdAt"
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMessages);
    });

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages(); 
    };
  }, []);

  // Navigation settings
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  // Send messages to DB
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  // Function to change chat bubble color
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

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: bgColor ? bgColor : "white" },
      ]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
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

import { Image } from 'expo-image';
import { LineChart } from 'react-native-chart-kit';
import { Alert, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Platform, StyleSheet, View, Text, ScrollView, Button, Modal, TextInput, FlatList } from 'react-native';
import { useState } from 'react';
import { Line } from 'react-native-svg';

const img = require("@/assets/images/icon.png");

export default function App() {
  const [prevB, setPrevB] = useState(0.0);
  const [prevT, setPrevT] = useState(0.0);
  const [balance, setBalance] = useState(0.0);
  const [transactionTotal, setTransactionTotal] = useState(0.0);
  const [temp, setTemp] = useState("");
  const [transactionHistory, setTransactionHistory] = useState(['Transaction History:'])
  const [balanceHistory, setBalanceHistory] = useState([0])
  return (
    <ScrollView style={{flex: 1, backgroundColor: "cyan"}}>
      <View>
        <Text style={{fontFamily: "Comic", paddingTop: 40, fontSize: 20, textAlign: 'center'}}>Transaction Tracker</Text>
      </View>
      <View>
        <Text style={{fontFamily: "Comic", padding: 10, fontSize: 20, textAlign: 'center'}}>Account balance: ${balance}</Text>
        <Text style={{fontFamily: "Comic", fontSize: 20, textAlign: 'center'}}>Total spent: ${transactionTotal}</Text>
      </View>
      <View style={styles.container}>
        <Text>Transaction: (numeric only, max 2 decimal places)</Text>
        <TextInput onChangeText={ (text) => {
          // Source for RegEx used below: https://stackoverflow.com/questions/68784025/how-to-prevent-the-input-field-from-accepting-more-than-2-decimal-places-in-reac
            if (text.match(/^(\d*\.{0,1}\d{0,2}$)/)) {
              setTemp(text)
            }
          }
          } keyboardAppearance='dark' value = {temp} placeholder = 'Enter amount here' style={{borderColor: 'black', borderWidth: 1}}></TextInput>
        <Button title='I spent this much' onPress={() => {
          if (temp != "") {
            setPrevB(balance)
            setPrevT(transactionTotal)
            setTransactionTotal(transactionTotal + parseFloat(temp))
            setBalance(balance - parseFloat(temp))
            setBalanceHistory(balanceHistory.concat([balance]))
            const day = new Date().getDate()
            const month = new Date().getMonth()
            const year = new Date().getFullYear()
            setTransactionHistory(transactionHistory.concat(['On ' + (month+1) + '/' + day + '/' + year + ': Spent $' + temp]))
          }
        }}></Button>
                <Button title='I earned this much' onPress={() => {
          if (temp != "") {
            setPrevB(balance)
            setBalance(balance + parseFloat(temp))
            setBalanceHistory(balanceHistory.concat([balance]))
            const day = new Date().getDate()
            const month = new Date().getMonth()
            const year = new Date().getFullYear()
            setTransactionHistory(transactionHistory.concat(['On ' + (month+1) + '/' + day + '/' + year + ': Earned $' + temp]))
          }
        }}></Button>
        <Button title='Undo last transaction' onPress={
        () => Alert.alert("Undo last transaction", "Are you sure you want to undo the last change to your Balance and/or Total (reverse the last spending/transaction entry)?", [{
            text: 'Yes',
            onPress: ()  => {
              setBalance(prevB)
              setTransactionTotal(prevT)
              setBalanceHistory(balanceHistory.slice(0, balanceHistory.length - 1))
              setTransactionHistory(transactionHistory.slice(0, transactionHistory.length - 1))
            }
        },
      {
        text: 'No'
      }])
      }></Button>
                        <Button title='Reset' onPress={
        () => Alert.alert("Reset to 0", "Are you sure you want to change Balance and Total Spent both to zero?", [{
            text: 'Yes',
            onPress: ()  => {
              setPrevB(balance)
              setPrevT(transactionTotal)
              setBalance(0)
              setTransactionTotal(0)
              setTransactionHistory(['Transaction History:'])
              setBalanceHistory([0])
            }
        },
      {
        text: 'No'
      }])
      }></Button>
      </View>
      <ScrollView>
        <FlatList data={transactionHistory} renderItem={
          ({item}) => (
            <Text style={{textAlign: 'center'}}>{item}</Text>
          )
        }>
        </FlatList>
      </ScrollView>
      <View>

      </View>
      <View style={{height: 100}}>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    width: 250,
    alignSelf: 'center',
    backgroundColor: 'white',
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

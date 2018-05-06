import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux'
import configureStore from './src/store/ConfigureStore';
import SelectStayDate from './src/module/SelectDate/SelectStayDate';



const store = configureStore();

const App = () => {
  return (
    < Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <SelectStayDate />
      </SafeAreaView>
    </Provider >
  )
}

export default App;
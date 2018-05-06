import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux'
import configureStore from './src/store/ConfigureStore';
import SelectTravelDate from './src/module/SelectDate/SelectTravelDate';



const store = configureStore();

const App = () => {
  return (
    < Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <SelectTravelDate />
      </SafeAreaView>
    </Provider >
  )
}

export default App;
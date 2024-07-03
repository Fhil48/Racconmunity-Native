import React, { useState } from 'react';
import { View, Button, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CreateCustomButton from './CreateCustomButton';

export function DateTimeInput() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Selecciona fecha y hora');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();
    setText(fDate + ' ' + fTime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View>
      <View className="mt-12">
        <CreateCustomButton textStyles='text-white' onPress={() => showMode('date')} title="Seleccionar fecha" />
      </View>
      <View className="mt-2">
        <CreateCustomButton textStyles='text-white' onPress={() => showMode('time')} title="Seleccionar hora" />
      </View>
      <Text className="text-sm" style={{ textAlign: 'center', marginTop: 20, color:'#FFF' }}>{text}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

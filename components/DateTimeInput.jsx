import React, { useState, useEffect } from 'react';
import { View, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CreateCustomButton from './CreateCustomButton';
import { formatISO } from 'date-fns';

export function DateTimeInput({ initialDate, setForm }) {
  const [date, setDate] = useState(initialDate ? new Date(initialDate) : new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Selecciona fecha y hora');

  useEffect(() => {
    if (initialDate) {
      setDate(new Date(initialDate));
      updateText(new Date(initialDate));
    }
  }, [initialDate]);

  const updateText = (currentDate) => {
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    let fTime = tempDate.getHours() + ':' + (tempDate.getMinutes() < 10 ? '0' + tempDate.getMinutes() : tempDate.getMinutes());
    setText(fDate + ' ' + fTime);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    updateText(currentDate);

    // Formatear la fecha en el formato requerido
    const formattedDate = formatISO(currentDate);
    // Actualizar la propiedad date en form
    setForm((prevForm) => ({
      ...prevForm,
      date: formattedDate,
    }));
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

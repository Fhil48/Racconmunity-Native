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
    let fDate = currentDate.toLocaleDateString();
    let fTime = currentDate.toLocaleTimeString();
    setText(fDate + ' ' + fTime);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    updateText(currentDate);

    // Convertir la fecha a formato ISO 8601 UTC antes de enviarla
    const formattedDateUTC = formatISO(currentDate, { representation: 'complete' });
  
    // Actualizar la propiedad date en form con la fecha convertida a UTC
    setForm((prevForm) => ({
      ...prevForm,
      date: formattedDateUTC,
    }));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View>
      <View style={{ marginTop: 12 }}>
        <CreateCustomButton textStyles='text-white' onPress={() => showMode('date')} title="Seleccionar fecha" />
      </View>
      <View style={{ marginTop: 12 }}>
        <CreateCustomButton textStyles='text-white' onPress={() => showMode('time')} title="Seleccionar hora" />
      </View>
      <Text style={{ textAlign: 'center', marginTop: 20, color: '#FFF' }}>{text}</Text>
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

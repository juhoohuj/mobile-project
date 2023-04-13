import React, {useState} from 'react';

const App = () => {
  const [selected, setSelected] = useState('');
  import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
  return (
    <Calendar
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      }}
    />
  );
};

export default App;
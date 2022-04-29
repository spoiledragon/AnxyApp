import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';

export default Reloj = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button title="Open" onPress={() => setOpen(true)} />
      
    </>
  );
};

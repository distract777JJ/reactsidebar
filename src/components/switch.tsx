
import  {  useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


export default function MySwitch() {
    const [isChecked, setIsChecked] = useState(false);
   // const value = isChecked ? 'Y' : 'N';
    const handleChange = () => {
      setIsChecked(!isChecked);
    };
  
    return (
      <FormControlLabel
        control={<Switch checked={isChecked} onChange={handleChange} />}
        label={isChecked ? 'Yes' : 'No'}
      />
    );
  }
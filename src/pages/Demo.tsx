import * as React from 'react';
import { Dayjs } from 'dayjs';
import  DynamicFormAndGrid  from "../components/FormGrid";
import {
  TextField,
  Select,
  
  MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';






const [value, setValue] = React.useState<Dayjs | null>(null);

const schema = [
  { name: 'id', label: 'ID', component: <TextField /> },
  { name: 'type', label: 'Type', component:  <Select
  labelId="type"
  id="type"
  value={''}
  label="Age"
  
>
  <MenuItem value={'A'}>A</MenuItem>
  <MenuItem value={'B'}>Twenty</MenuItem>
  <MenuItem value={'C'}>C</MenuItem>
  <MenuItem value={'D'}>D</MenuItem>
  <MenuItem value={'E'}>E</MenuItem>
</Select> },
  { name: 'name', label: 'Name', component: <TextField /> },
  { name: 'lang', label: 'Lang', component: <Select
  labelId="lang"
  id="lang"
  value={''}
  label="lang"
>
  <MenuItem value={'zh-tw'}>zh-tw</MenuItem>
  <MenuItem value={'en-us'}>en-us</MenuItem>

</Select> },
  { name: 'createtime', label: 'CreateTime', component: <DatePicker value={value} onChange={(newValue) => setValue(newValue)} /> }
];



const initialData = [
  { id: 1, type: 'Type1', name: 'Name1', lang: 'Lang1' },
  { id: 2, type: 'Type2', name: 'Name2', lang: 'Lang2' },
];

function App() {
  return (
    <div>
      <DynamicFormAndGrid schema={schema} data={initialData} />
    </div>
  );
}
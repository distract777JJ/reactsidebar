import React, { useState } from 'react';
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
  
} from '@mui/material';

// Define a TypeScript interface for the schema
interface FieldSchema {
  name: string;
  label: string;
  component: JSX.Element; // Accept an MUI component as part of the schema
}

interface DataRow {
    [key: string]: string | number;
  }

interface DynamicFormAndGridProps {
  schema: FieldSchema[];
  data?: DataRow[];
}


function DynamicFormAndGrid({ schema, data = [] }: DynamicFormAndGridProps) {
  const initialFormData: Record<string, string> = {};
  schema.forEach((field) => {
    initialFormData[field.name] = '';
  });

  const [formData, setFormData] = useState(initialFormData);
  const [tableData, setTableData] = useState(data);
  const [editRowId, setEditRowId] = useState<number | null>(null);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editRowId !== null) {
      // Update existing row
      const updatedData = tableData.map((row) =>
        row.id === editRowId ? { ...formData, id: editRowId } : row
      );
      setTableData(updatedData);
      setEditRowId(null); // Exit edit mode
    } else {
      // Create a new row
      const newRow = { id: tableData.length + 1, ...formData };
      setTableData([...tableData, newRow]);
    }
    // Clear the form
    setFormData(initialFormData);
  };

  const handleEditClick = (id: number, rowData: DataRow) => {
    // Convert all values in rowData to strings
    const stringRowData: Record<string, string> = {};
    for (const key in rowData) {
      stringRowData[key] = String(rowData[key]);
    }
  
    setFormData(stringRowData);
    setEditRowId(id);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {schema.map((field) => (
          <div key={field.name}>
            {field.component}
            {/* Example: for TextField */}
            <TextField
            label={field.label}
            value={formData[field.name]}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleFormChange(e, field.name)}
            />
            {/* Example: for Select */}
            {/* <FormControl>
              <InputLabel>{field.label}</InputLabel>
              <Select
                value={formData[field.name]}
                onChange={(e) => handleFormChange(e, field.name)}
              >
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
              </Select>
            </FormControl> */}
          </div>
        ))}
        <Button variant="contained" color="primary" type="submit">
          {editRowId !== null ? 'Update' : 'Create'}
        </Button>
      </form>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {schema.map((field) => (
                <TableCell key={field.name}>{field.label}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id}>
                {schema.map((field) => (
                  <TableCell key={field.name}>{row[field.name]}</TableCell>
                ))}
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditClick(Number(row.id), row)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DynamicFormAndGrid;

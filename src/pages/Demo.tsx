import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
//import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';
import {
  //GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};



// interface EditToolbarProps {
//   setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
//   setRowModesModel: (
//     newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
//   ) => void;
// }

function EditToolbar() {
  //const { setRows, setRowModesModel } = props;
 //open form to create data
  const handleClick = () => {

    // const id = randomId();
    // setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    // setRowModesModel((oldModel) => ({
    //   ...oldModel,
    //   [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    // }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const numRows = 100; // Number of initial rows

const initialRows: any[] | (() => any[]) = [];

for (let i = 0; i < numRows; i++) {
  initialRows.push({
    id: randomId(),
    name: randomTraderName(),
    age: Math.floor(Math.random() * 50) + 18, // Random age between 18 and 67
    joinDate: randomCreatedDate(),
    role: randomRole(),
  });
}





const CategoryGrid: React.FC = () =>  {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);


 // State to manage the confirmation dialog
 const [confirmationDialogOpen, setConfirmationDialogOpen] = React.useState(false);
 const [rowToConfirm, setRowToConfirm] = React.useState<GridRowModel | null>(null);

 // Function to handle opening the confirmation dialog
 const openConfirmationDialog = (row: GridRowModel) => {
   setRowToConfirm(row);
   setConfirmationDialogOpen(true);
 };

 // Function to handle closing the confirmation dialog
 const closeConfirmationDialog = () => {
   setRowToConfirm(null);
   setConfirmationDialogOpen(false);
 };

 function mockApiCall() {
  return new Promise<void>((resolve, reject) => {
    // Simulate an API call with a delay
    setTimeout(() => {
      const randomSuccess = Math.random() < 0.7; // Simulate 70% success rate

      if (randomSuccess) {
        resolve();
      } else {
        reject();
      }
    }, 1000); // Simulate a 1-second delay
  });
}

 // Function to handle the "Yes" button click in the confirmation dialog
 const handleConfirmationYes = async () => {
   if (rowToConfirm) {
     try {
       // Replace with your actual API endpoint and fetch configuration
      //  const response = await fetch('your-api-endpoint', {
      //    method: 'POST', // or 'PUT' or 'DELETE' as needed
      //    body: JSON.stringify(rowToConfirm),
      //    headers: {
      //      'Content-Type': 'application/json',
      //    },
      //  });
      //test 
     //  const response = await mockApiCall();
      // if (response && response.success) {
        if (rowToConfirm.action === 'update') {
          // Handle update logic
          
           await mockApiCall();
           processRowUpdate(rowToConfirm);
            // Set the row back to view mode
           handleRowModesModelChange({
          ...rowModesModel,
          [rowToConfirm.id]: { mode: GridRowModes.View },
        });
           setSnackbar({ children: 'Update successful', severity: 'success' });
        } else if (rowToConfirm.action === 'delete') {
          // Handle delete logic
          await mockApiCall();
          setSnackbar({ children: 'Deletion successful', severity: 'success' });
          setRows(rows.filter((row) => row.id !== rowToConfirm.id));
        }
       //} else {
       //  setSnackbar({ children: 'API call failed', severity: 'error' });
      // }
     } catch (error) {
       console.error('API call error:', error);
       setSnackbar({ children: 'API call failed', severity: 'error' });
     }
   }

   closeConfirmationDialog();
 };


  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    const rowToSave = rows.find((row) => row.id === id);
    if (rowToSave) {
      rowToSave.action = 'update';
      openConfirmationDialog(rowToSave);
    }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    const rowToDelete = rows.find((row) => row.id === id);
    if (rowToDelete) {
      rowToDelete.action = 'delete';
      openConfirmationDialog(rowToDelete);
    }
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };


    // Render the confirmation dialog
    const renderConfirmDialog = () => {
      if (!rowToConfirm) {
        return null;
      }
  
      return (
        <Dialog maxWidth="xs" open={confirmationDialogOpen}>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogActions>
            <Button onClick={handleConfirmationYes}>Yes</Button>
            <Button onClick={closeConfirmationDialog}>No</Button>
          </DialogActions>
        </Dialog>
      );
    };






  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'joinDate',
      headerName: 'Join date',
      type: 'date',
      width: 180,
      editable: true,
    },
    {
      field: 'role',
      headerName: 'Department',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Market', 'Finance', 'Development'],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
        {renderConfirmDialog()}
      <DataGrid
         className="border rounded-md shadow-lg p-4 bg-white" // Add padding
         
         
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
       {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  );
}
export default CategoryGrid;
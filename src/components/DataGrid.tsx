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
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';
import {
  GridRowsProp,
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
import ConfirmationDialog from './ConfirmationDialog'; // 請確保路徑正確
const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};

interface EditableDataGridProps {
  rows: any[]; // Data rows
  columns: GridColDef[]; // Data columns
  onRowAdd: (newRow: any) => void; // Function to add a new row
  onRowEdit: (updatedRow: any) => void; // Function to edit an existing row
  onRowDelete: (id: number) => void; // Function to delete a row
}

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}















const DataGrid: React.FC<EditableDataGridProps> = ({  rows,
  columns,
  onRowAdd,
  onRowEdit,
  onRowDelete, }) =>  {
    const [editCellId, setEditCellId] = useState<GridEditCellPropsParams | null>(null);

    const handleRowEdit = (params: GridEditCellPropsParams) => {
      setEditCellId(params);
    };
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [pendingSaveRowId, setPendingSaveRowId] = React.useState<GridRowId | null>(null);
  const [confirmedRowId, setConfirmedRowId] =  React.useState<GridRowId | null>(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = React.useState(false);
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


  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleSaveConfirmed = async (id: GridRowId) => {
    if (id !== null) {
      const rowToUpdate = rows.find((row) => row.id === id);
  
      if (rowToUpdate) {
        try {
          // Make the HTTP request to save in the backend
    
         // setSnackbar({ children: 'User successfully saved', severity: 'success' });
          console.log('User successfully saved');
        
        // Reset relevant states
        setConfirmedRowId(id); // Mark the row as confirmed
        setShowConfirmationDialog(false); // Close the confirmation dialog
        setPendingSaveRowId(null); // Reset pendingSaveRowId

        // Update the row mode to View after successful save
        setRowModesModel({
          ...rowModesModel,
          [id]: { mode: GridRowModes.View },
        });

        } catch (error) {
         // setSnackbar({ children: "Name can't be empty", severity: 'error' });
  
          // Handle the error or rejection logic
          // ...
          setShowConfirmationDialog(false); // Close the confirmation dialog
        }
      }
    }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
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
    setPendingSaveRowId(null);
    setShowConfirmationDialog(false); // Close the confirmation dialog
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
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
              onClick={() => {
                setPendingSaveRowId(id);
                setShowConfirmationDialog(true);
              }}
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
     
      <DataGrid
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
      {/* {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar}
         autoHideDuration={6000}
         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Set anchor origin to center
         >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )} */}
        {/* Confirmation Dialog */}
  {/* <Dialog open={showConfirmationDialog} onClose={() => setShowConfirmationDialog(false)}>
    <DialogTitle>Confirm Update</DialogTitle>
    <DialogContent>
      Are you sure you want to update this record?
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setShowConfirmationDialog(false)}>No</Button>
      <Button onClick={handleSaveConfirmed}>Yes</Button>
    </DialogActions>
  </Dialog> */}
          {pendingSaveRowId !== null && (
      <ConfirmationDialog
        open={showConfirmationDialog}
        onClose={() => setShowConfirmationDialog(false)}
        onConfirm={handleSaveConfirmed}
        id={pendingSaveRowId}
        message="Are you sure you want to update this record?"
      />
    )}



    </Box>
  );
}
export default DataGrid;
import React, { useState } from 'react';

// mui
import { Box, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// store
import { useStore } from 'store/useStore';
import { ADD_TASK } from 'store/actions';

// components
import PriorityControl from './PriorityControl';
import DueDateControl from './DueDateControl';
import TextControl from './TextControl';
import WarningDialog from 'components/WarningDialog';
import CustomForm from './CustomForm';
import LabelControl from './LabelControl';

// helpers
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

// Add task button: controls whether the form is visible
const AddButton = ({ openForm }) => (
  <Button variant="text" onClick={openForm} startIcon={<AddIcon />}>
    Add task
  </Button>
);

// renders the task creation form's ui
const Form = ({ createItem, closeForm, updateData, formData, onSubmit }) => {
  // extract values from state
  const { name, description, priority, due, label } = formData;

  // create setters
  const setName = updateData('name');
  const setDescription = updateData('description');
  const setPriority = updateData('priority');
  const setDue = updateData('due');
  const setLabel = updateData('label');

  const handleSubmit = () => {
    createItem();
    onSubmit();
  };

  const update = (setter) => (e) => setter(e.target.value);

  return (
    <CustomForm
      onSubmit={handleSubmit}
      title="Add a Task"
      canSubmit={name}
      onCancel={closeForm}
      submitButton="Add Task"
    >
      <TextControl
        name="Task"
        value={name || ''}
        onChange={update(setName)}
        required
        autoFocus
      />
      <TextControl
        name="Description"
        value={description || ''}
        onChange={update(setDescription)}
        lines={3}
      />
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <DueDateControl date={due} setDate={setDue} />
        </Grid>
        <Grid item>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <LabelControl label={label} setLabel={setLabel} />
            </Grid>
            <Grid item>
              <PriorityControl priority={priority} setPriority={setPriority} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CustomForm>
  );
};

// main component control: maintains form state, handles dispatch to store
const TaskCreateForm = ({ defaultItem }) => {
  const { dispatch } = useStore();
  const [formOpen, setFormOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [formData, setFormData] = useState(
    defaultItem ? { ...defaultItem } : {}
  );

  // store
  const itemCreator = (data) => {
    return {
      type: ADD_TASK,
      payload: { ...data },
    };
  };

  const newItem = () => dispatch(itemCreator(formData));

  // accepts a string representing a task property,
  // returns a function that accepts a value, which updates the state as: state[property] = value;
  const updateData = (property) => (value) => {
    setFormData((prev) => {
      return {
        ...prev,
        [property]: value,
      };
    });
  };

  // clears the entire form
  const clearForm = () => setFormData({ ...defaultItem });

  // closes the form, closes the warning dialog, clears out all form data
  const confirmCloseForm = () => {
    setWarningOpen(false);
    setFormOpen(false);
    clearForm();
  };

  // attempts to close the form and discard changes
  // if form data is not empty: opens a warning dialog
  // if form data is empty: discards changes and closes form
  const closeForm = () => {
    if (isEmpty(formData) || isEqual(formData, defaultItem)) confirmCloseForm();
    else setWarningOpen(true);
  };

  return (
    <Box sx={{ mt: 2 }}>
      {formOpen ? (
        <Form
          createItem={newItem}
          closeForm={closeForm}
          updateData={updateData}
          formData={formData}
          onSubmit={confirmCloseForm}
        />
      ) : (
        <AddButton openForm={() => setFormOpen(true)} />
      )}
      <WarningDialog
        open={warningOpen}
        title="Discard Changes"
        body="Are you sure you want to discard your work? This cannot be undone."
        handleCancel={() => setWarningOpen(false)}
        handleConfirm={confirmCloseForm}
        confirmLabel={'Discard'}
        cancelLabel={'Cancel'}
      />
    </Box>
  );
};

export default TaskCreateForm;

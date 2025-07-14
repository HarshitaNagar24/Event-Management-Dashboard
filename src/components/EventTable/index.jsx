// src/components/EventTable/index.jsx
import React, { useEffect, useState } from 'react';
import { TableRow, TableCell, Chip, Button, Box, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Import the new, smaller components
import TableToolbar from './TableToolbar';
import EventForm from './EventForm';
import DeleteDialog from './DeleteDialog';

// Import common components
import CustomTable from '../common/CustomTable';
import CustomSnackbar from '../common/CustomSnackbar';
import CustomDialog from '../common/CustomDialog';

const defaultValues = {
  id: '',
  name: '',
  description: '',
  location: '',
  startDate: '',
  endDate: '',
  organizer: '',
  type: '',
  maxAttendees: '',
  tags: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Event name is required'),
  description: Yup.string().required('Description is required'),
  location: Yup.string().required('Location is required'),
  startDate: Yup.string().required('Start date is required'),
  endDate: Yup.string()
    .required('End date is required')
    .test('is-after', 'End date must be after start date', function (value) {
      const { startDate } = this.parent;
      return new Date(value) > new Date(startDate);
    }),
  organizer: Yup.string().required('Organizer is required'),
  type: Yup.string().required('Event type is required'),
  maxAttendees: Yup.number().required('Max attendees is required'),
  tags: Yup.string().required('Tags are required'),
});

const EventTable = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [confirmDelete, setConfirmDelete] = useState({ open: false, eventId: null });

  useEffect(() => {
    const stored = localStorage.getItem('events');
    if (stored) {
      setEvents(JSON.parse(stored));
    }
  }, []);

  const saveToLocalStorage = (updatedEvents) => {
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const requestDelete = (id) => {
    setConfirmDelete({ open: true, eventId: id });
  };

  const confirmDeleteEvent = () => {
    const updated = events.filter((e) => e.id !== confirmDelete.eventId);
    setEvents(updated);
    saveToLocalStorage(updated);
    showSnackbar('Event deleted successfully', 'info');
    setConfirmDelete({ open: false, eventId: null });
  };

  const handleEdit = (event) => {
    setEditMode(true);
    formik.setValues({ ...event, tags: event.tags.join(', ') });
    setOpen(true);
  };

  const handleAddNew = () => {
    setEditMode(false);
    formik.resetForm();
    setOpen(true);
  };

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema,
    onSubmit: (values) => {
      const event = {
        ...values,
        id: editMode ? values.id : Date.now(),
        tags: values.tags.split(',').map((tag) => tag.trim()),
      };
      const updatedEvents = editMode
        ? events.map((e) => (e.id === event.id ? event : e))
        : [...events, event];
      
      setEvents(updatedEvents);
      saveToLocalStorage(updatedEvents);
      showSnackbar(editMode ? 'Event updated successfully' : 'Event added successfully');
      setOpen(false);
    },
  });

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'All' ? true : event.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <Box>
      <TableToolbar
        search={search}
        onSearchChange={setSearch}
        filterType={filterType}
        onFilterChange={setFilterType}
        onAddNew={handleAddNew}
      />

      <CustomTable
        columns={[
          { label: 'Event', align: 'center' },
          { label: 'Location', align: 'center' },
          { label: 'Start', align: 'center' },
          { label: 'End', align: 'center' },
          { label: 'Organizer', align: 'center' },
          { label: 'Type', align: 'center' },
          { label: 'Max', align: 'center' },
          { label: 'Tags', align: 'center' },
          { label: 'Actions', align: 'center' },
        ]}
        data={filteredEvents}
        renderRow={(event) => (
          <TableRow key={event.id}>
            <TableCell align="center">
              <strong>{event.name}</strong>
              <br />
              <Typography variant="body2" color="text.secondary">
                {event.description}
              </Typography>
            </TableCell>
            <TableCell align="center">{event.location}</TableCell>
            <TableCell align="center">{new Date(event.startDate).toLocaleString()}</TableCell>
            <TableCell align="center">{new Date(event.endDate).toLocaleString()}</TableCell>
            <TableCell align="center">{event.organizer}</TableCell>
            <TableCell align="center">
              <Chip
                label={event.type}
                color={event.type === 'Online' ? 'info' : 'success'}
                size="small"
              />
            </TableCell>
            <TableCell align="center">{event.maxAttendees}</TableCell>
            <TableCell align="center">
              {event.tags.map((tag, i) => (
                <Chip key={i} label={tag} variant="outlined" size="small" sx={{ mr: 0.5, mb: 0.5 }} />
              ))}
            </TableCell>
            <TableCell align="center">
              <Button size="small" color="primary" startIcon={<Edit />} onClick={() => handleEdit(event)}>Edit</Button>
              <Button size="small" color="error" startIcon={<Delete />} onClick={() => requestDelete(event.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        )}
      />

      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={formik.handleSubmit}
        title={editMode ? 'Edit Event' : 'Add New Event'}
        submitLabel={editMode ? 'Update' : 'Add'}
      >
        <EventForm formik={formik} defaultValues={defaultValues} />
      </CustomDialog>

      <DeleteDialog
        open={confirmDelete.open}
        onClose={() => setConfirmDelete({ open: false, eventId: null })}
        onConfirm={confirmDeleteEvent}
      />

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default EventTable;
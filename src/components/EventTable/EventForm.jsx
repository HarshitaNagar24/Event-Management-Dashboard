import React from 'react';
import { Grid, TextField, MenuItem } from '@mui/material';

const EventForm = ({ formik, defaultValues }) => (
  <Grid container spacing={2}>
    {Object.keys(defaultValues).map((field) => {
      if (field === 'id' || field === 'tags') return null;

      if (field === 'type') {
        return (
          <Grid item xs={12} sm={6} key={field}>
            <TextField
              id="type"
              select
              fullWidth
              label="Event Type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              error={formik.touched.type && Boolean(formik.errors.type)}
              helperText={formik.touched.type && formik.errors.type}
            >
              <MenuItem value="Online">Online</MenuItem>
              <MenuItem value="Offline">Offline</MenuItem>
            </TextField>
          </Grid>
        );
      }

      return (
        <Grid item xs={12} sm={6} key={field}>
          <TextField
            fullWidth
            id={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            type={field.includes('Date') ? 'datetime-local' : 'text'}
            value={formik.values[field]}
            onChange={formik.handleChange}
            error={formik.touched[field] && Boolean(formik.errors[field])}
            helperText={formik.touched[field] && formik.errors[field]}
            {...(field.includes('Date') && {
              InputLabelProps: { shrink: true },
              inputProps: { min: new Date().toISOString().slice(0, 16) },
            })}
          />
        </Grid>
      );
    })}
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Tags (comma separated)"
        name="tags"
        id="tags"
        value={formik.values.tags}
        onChange={formik.handleChange}
        error={formik.touched.tags && Boolean(formik.errors.tags)}
        helperText={formik.touched.tags && formik.errors.tags}
      />
    </Grid>
  </Grid>
);

export default EventForm;

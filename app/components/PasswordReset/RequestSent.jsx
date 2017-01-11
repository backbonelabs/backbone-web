import React from 'react';
import Paper from 'material-ui/Paper';

const RequestSent = () => (
  <div style={{ display: 'flex', height: '60vh', justifyContent: 'center', alignItems: 'center' }}>
    <Paper style={{ padding: 25 }} zDepth={2}>
      <h2 style={{ textAlign: 'center' }}>
        Instructions on how to reset your password have been emailed to you.
      </h2>
    </Paper>
  </div>
);

export default RequestSent;

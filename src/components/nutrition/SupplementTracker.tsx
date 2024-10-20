import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, TextField, Button, Chip, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { X } from 'lucide-react';

interface Supplement {
  name: string;
  dosage: string;
  frequency: string;
}

const SupplementTracker: React.FC = () => {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [newSupplement, setNewSupplement] = useState<Supplement>({ name: '', dosage: '', frequency: '' });

  useEffect(() => {
    const savedSupplements = localStorage.getItem('supplements');
    if (savedSupplements) {
      setSupplements(JSON.parse(savedSupplements));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('supplements', JSON.stringify(supplements));
  }, [supplements]);

  const handleAddSupplement = () => {
    if (newSupplement.name.trim() !== '') {
      setSupplements([...supplements, newSupplement]);
      setNewSupplement({ name: '', dosage: '', frequency: '' });
    }
  };

  const handleRemoveSupplement = (index: number) => {
    const updatedSupplements = supplements.filter((_, i) => i !== index);
    setSupplements(updatedSupplements);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Supplement Tracker
        </Typography>
        <TextField
          label="Supplement Name"
          value={newSupplement.name}
          onChange={(e) => setNewSupplement({...newSupplement, name: e.target.value})}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Dosage"
          value={newSupplement.dosage}
          onChange={(e) => setNewSupplement({...newSupplement, dosage: e.target.value})}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Frequency"
          value={newSupplement.frequency}
          onChange={(e) => setNewSupplement({...newSupplement, frequency: e.target.value})}
          fullWidth
          margin="normal"
        />
        <Button onClick={handleAddSupplement} variant="contained" color="primary" fullWidth className="mt-2 mb-4">
          Add Supplement
        </Button>
        <List>
          {supplements.map((supplement, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={supplement.name}
                secondary={`${supplement.dosage} - ${supplement.frequency}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveSupplement(index)}>
                  <X />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default SupplementTracker;
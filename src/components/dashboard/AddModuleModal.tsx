import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
} from '@mui/material';
import { moduleRegistry, DashboardModule } from './moduleRegistry';
import { useAuth } from '../../contexts/AuthContext';

interface AddModuleModalProps {
  open: boolean;
  onClose: () => void;
  onAddModule: (moduleId: string) => void;
}

const AddModuleModal: React.FC<AddModuleModalProps> = ({ open, onClose, onAddModule }) => {
  const { user } = useAuth();
  const availableModules = user ? moduleRegistry.getForRole(user.role) : [];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Module</DialogTitle>
      <DialogContent>
        <List>
          {availableModules.map((module: DashboardModule) => (
            <ListItem key={module.moduleMetadata.id}>
              <ListItemAvatar>
                <Avatar>
                  <module.moduleMetadata.icon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={module.moduleMetadata.title} secondary={module.moduleMetadata.description} />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  onAddModule(module.moduleMetadata.id);
                  onClose();
                }}
              >
                Add
              </Button>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default AddModuleModal;
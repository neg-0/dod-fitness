import React from 'react';
import { Box, IconButton } from '@mui/material';
import { X } from 'lucide-react';

interface ModuleWrapperProps {
  children: React.ReactNode;
  editMode: boolean;
  onDelete: () => void;
}

const ModuleWrapper: React.FC<ModuleWrapperProps> = ({ children, editMode, onDelete }) => {
  return (
    <Box
      className='module-wrapper'
      sx={{
        position: 'relative',
        height: '100%',
        '&:hover .delete-button': {
          opacity: 1,
        }
      }}
    >
      {editMode && (
        <IconButton
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          sx={{
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 1004, // Highest z-index
            opacity: 0,
            transition: 'opacity 0.2s',
          }}
        >
          <X size={24} />
        </IconButton>
      )}
      <Box
        sx={{
          height: '100%',
          pointerEvents: editMode ? 'none' : 'auto',
          '& > *': {
            pointerEvents: 'auto',
          },
        }}
      >
        {children}
      </Box>
      {editMode && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            cursor: 'move',
            zIndex: 1002, // Lower than the resize handle
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Slight overlay to indicate edit mode
          }}
        />
      )}
    </Box>
  );
};

export default ModuleWrapper;
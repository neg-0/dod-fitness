import React from 'react';
import { Fab } from '@mui/material';
import { MessageCircle } from 'lucide-react';

interface ChatIconProps {
  onClick: () => void;
}

const ChatIcon: React.FC<ChatIconProps> = ({ onClick }) => {
  return (
    <Fab
      color="primary"
      aria-label="chat"
      style={{
        position: 'fixed',
        bottom: '110px', // Moved up to avoid overlapping with the footer
        right: '20px',
        zIndex: 1000,
      }}
      onClick={onClick}
    >
      <MessageCircle />
    </Fab>
  );
};

export default ChatIcon;

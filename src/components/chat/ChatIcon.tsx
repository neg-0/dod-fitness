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
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.3), 0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12)',
      }}
      onClick={onClick}
    >
      <MessageCircle />
    </Fab>
  );
};

export default ChatIcon;
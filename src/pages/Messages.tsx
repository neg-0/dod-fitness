import React, { useState } from 'react';
import { Typography, List, ListItem, ListItemText, TextField, Button, Card, CardContent } from '@mui/material';

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([
    { sender: 'System', content: 'Welcome to your inbox!' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { sender: 'You', content: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Messages
      </Typography>
      <Card>
        <CardContent>
          <List>
            {messages.map((message, index) => (
              <ListItem key={index}>
                <ListItemText primary={message.sender} secondary={message.content} />
              </ListItem>
            ))}
          </List>
          <TextField
            fullWidth
            variant="outlined"
            label="New Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSendMessage}>
            Send
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Messages;
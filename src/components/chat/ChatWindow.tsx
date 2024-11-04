import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Button,
  Typography,
  Box,
  IconButton,
  TextField,
  useTheme,
} from '@mui/material';
import { X, Send } from 'lucide-react';
import { styled } from '@mui/material/styles';
import { sendChatMessage, getChatHistory, saveChatHistory, ChatMessage } from '../../services/chatService';
import { useAuth } from '../../contexts/AuthContext';

interface ChatWindowProps {
  onClose: () => void;
  userProfile: any;
  workoutData: any;
  nutritionData: any;
}

const ChatContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: '110px',
  right: '20px',
  width: '350px',
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1001,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[10],
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: '100%',
    bottom: 0,
    right: 0,
  },
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ChatContent = styled(Box)({
  flexGrow: 1,
  overflowY: 'auto',
  padding: '16px',
});

const ChatInputArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isUser',
})<{ isUser: boolean }>(({ theme, isUser }) => ({
  maxWidth: '70%',
  padding: theme.spacing(1, 2),
  borderRadius: '18px',
  marginBottom: theme.spacing(1),
  wordWrap: 'break-word',
  backgroundColor: isUser ? theme.palette.primary.main : theme.palette.grey[200],
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  'p': {color: isUser ? theme.palette.primary.contrastText : theme.palette.text.primary,} // Sets the user's bubble text color
}));

const specialists = [
  'AI Assistant',
  'Guardian Resilience Team',
  'Nutritionist',
  'Fitness Trainer',
];

const ChatWindow: React.FC<ChatWindowProps> = ({
  onClose,
  userProfile,
  workoutData,
  nutritionData,
}) => {
  const theme = useTheme();
  const { user } = useAuth();
  const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      const history = getChatHistory(user.id);
      setMessages(history);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      saveChatHistory(user.id, messages);
    }
    scrollToBottom();
  }, [messages, user]);

  const scrollToBottom = () => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  };

  const handleSpecialistSelect = useCallback((specialist: string) => {
    setSelectedSpecialist(specialist);
    const systemMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'System',
      text: `You are now chatting with ${specialist}`,
      timestamp: new Date().toISOString(),
    };
    setMessages([systemMessage]);
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim() || !selectedSpecialist || !user) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'User',
      text: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await sendChatMessage(user.id, inputMessage, selectedSpecialist);
      
      const specialistMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: selectedSpecialist,
        text: response,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, specialistMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'System',
        text: 'Failed to send message. Please try again.',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [inputMessage, selectedSpecialist, user]);

  return (
    <ChatContainer>
      <ChatHeader>
        <Typography variant="h6">
          {selectedSpecialist ? `Chatting with ${selectedSpecialist}` : 'Atlas Chat'}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <X />
        </IconButton>
      </ChatHeader>

      <ChatContent ref={chatContentRef}>
        {!selectedSpecialist ? (
          <Box>
            <Typography variant="body2" gutterBottom>
              Select a specialist to chat with:
            </Typography>
            {specialists.map((specialist) => (
              <Button
                key={specialist}
                fullWidth
                variant="outlined"
                onClick={() => handleSpecialistSelect(specialist)}
                sx={{ mb: 1 }}
              >
                {specialist}
              </Button>
            ))}
          </Box>
        ) : (
          <Box display="flex" flexDirection="column">
            {messages.map((message) => (
              <MessageBubble key={message.id} isUser={message.sender === 'User'}>
                <Typography variant="body2">{message.text}</Typography>
              </MessageBubble>
            ))}
            {isTyping && (
              <MessageBubble isUser={false}>
                <Typography variant="body2">Typing...</Typography>
              </MessageBubble>
            )}
          </Box>
        )}
      </ChatContent>

      {selectedSpecialist && (
        <ChatInputArea>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            sx={{ mr: 1 }}
          />
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
          >
            <Send />
          </IconButton>
        </ChatInputArea>
      )}
    </ChatContainer>
  );
};

export default ChatWindow;
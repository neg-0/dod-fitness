import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import { X, Send } from 'lucide-react';
import { styled } from '@mui/material/styles';

interface ChatWindowProps {
  onClose: () => void;
  userProfile: any;
  workoutData: any;
  nutritionData: any;
}

const ChatCard = styled(Card)(({ theme }) => ({
  position: 'fixed',
  bottom: '110px',
  right: '20px',
  width: '350px',
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1001,
  boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
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
  color: isUser
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,
  backgroundColor: isUser
    ? theme.palette.primary.main
    : theme.palette.grey[200],
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  animation: 'fadeIn 0.3s ease-in-out',
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(10px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
}));

const ScrollToBottomButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  bottom: '70px',
  right: '20px',
  zIndex: 1002,
}));

const ChatWindow: React.FC<ChatWindowProps> = ({
  onClose,
  userProfile,
  workoutData,
  nutritionData,
}) => {
  const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(
    null
  );
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContentRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const specialists = [
    'AI Assistant',
    'Guardian Resilience Team',
    'Nutritionist',
    'Fitness Trainer',
  ];

  const scrollToBottom = () => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSpecialistSelect = useCallback((specialist: string) => {
    setSelectedSpecialist(specialist);
    setMessages([
      { sender: 'System', text: `You are now chatting with ${specialist}` },
    ]);
  }, []);

  const handleSendMessage = useCallback(() => {
    if (inputMessage.trim() === '') return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'User', text: inputMessage },
    ]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate a response from the specialist
    setTimeout(() => {
      let response = '';
      switch (selectedSpecialist) {
        case 'AI Assistant':
          response = `Based on your profile and recent activity, I recommend focusing on ${
            workoutData?.goal || 'your fitness goals'
          }.`;
          break;
        case 'Guardian Resilience Team':
          response =
            'How can I assist you with your mental health and resilience today?';
          break;
        case 'Nutritionist':
          response = `Your current nutrition plan suggests a daily intake of ${
            nutritionData?.dailyCalories || 2000
          } calories. How can I help you optimize your diet?`;
          break;
        case 'Fitness Trainer':
          response =
            "Let's review your recent workout performance and adjust your plan accordingly.";
          break;
        default:
          response = 'How can I assist you today?';
      }
      setIsTyping(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: selectedSpecialist || 'Specialist', text: response },
      ]);
    }, 1500);
  }, [inputMessage, selectedSpecialist, workoutData, nutritionData]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    setShowScrollButton(scrollHeight - scrollTop > clientHeight + 100);
  };

  return (
    <ChatCard>
      <ChatHeader>
        <Typography variant="h6">
          {selectedSpecialist
            ? `Chatting with ${selectedSpecialist}`
            : 'DoD Fitness Chat'}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <X />
        </IconButton>
      </ChatHeader>
      <ChatContent ref={chatContentRef} onScroll={handleScroll}>
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
                style={{ marginBottom: '8px' }}
              >
                {specialist}
              </Button>
            ))}
          </Box>
        ) : (
          <Box display="flex" flexDirection="column">
            {messages.map((message, index) => (
              <MessageBubble key={index} isUser={message.sender === 'User'}>
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
      {showScrollButton && (
        <ScrollToBottomButton
          variant="contained"
          color="primary"
          size="small"
          onClick={scrollToBottom}
        >
          ↓
        </ScrollToBottomButton>
      )}
    </ChatCard>
  );
};

export default ChatWindow;

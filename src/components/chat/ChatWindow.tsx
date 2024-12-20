import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Button,
  Typography,
  Box,
  IconButton,
  TextField,
  useTheme,
} from '@mui/material';
import { X, Send, Maximize2, Minimize2 } from 'lucide-react';
import { styled } from '@mui/material/styles';
import { sendChatMessage, getChatHistory, saveChatHistory, ChatMessage } from '../../services/chatService';
import { useAuth } from '../../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatWindowProps {
  onClose: () => void;
  userProfile: any;
  workoutData: any;
  nutritionData: any;
}

const ChatContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<{ isExpanded: boolean }>(({ theme, isExpanded }) => ({
  position: 'fixed',
  bottom: '110px',
  right: '20px',
  width: isExpanded ? '600px' : '350px',
  height: isExpanded ? '80vh' : '500px',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1001,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[10],
  transition: 'all 0.3s ease',
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

const MarkdownContent = styled(Box)(({ theme }) => ({
  '& p': {
    margin: 0,
  },
  '& pre': {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    overflowX: 'auto',
  },
  '& code': {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    fontSize: '0.875rem',
  },
  '& ul, & ol': {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
  },
  '& table': {
    borderCollapse: 'collapse',
    width: '100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  '& th, & td': {
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(0.5),
  },
  '& blockquote': {
    borderLeft: `4px solid ${theme.palette.grey[300]}`,
    margin: theme.spacing(1, 0),
    padding: theme.spacing(0, 1),
  },
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
  '& p, & li': {
    color: isUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
  },
  '& code': {
    backgroundColor: isUser ? theme.palette.common.white : theme.palette.grey[100],
    color: isUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
  },
  '& pre code': {
    display: 'block',
    overflow: 'auto',
  },
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
  const [isExpanded, setIsExpanded] = useState(false);

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

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.text.length > 300 && !isExpanded) {
      setIsExpanded(true);
    }
  }, [messages]);

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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    setTimeout(scrollToBottom, 300); // Scroll after transition
  };

  const renderMessage = (message: ChatMessage) => {
    const isUser = message.sender === 'User';
    return (
      <MessageBubble 
        key={message.id} 
        isUser={isUser}
        sx={{
          maxWidth: isExpanded ? '85%' : '70%',
        }}
      >
        <MarkdownContent>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Override default components for better styling
              p: ({ children }) => (
                <Typography variant="body2" component="p">
                  {children}
                </Typography>
              ),
              code: ({ node, inline, children, ...props }) => {
                if (inline) {
                  return (
                    <Typography
                      component="code"
                      variant="body2"
                      sx={{ 
                        backgroundColor: theme.palette.grey[100],
                        padding: '2px 4px',
                        borderRadius: '4px',
                      }}
                      {...props}
                    >
                      {children}
                    </Typography>
                  );
                }
                return (
                  <Box
                    component="pre"
                    sx={{
                      backgroundColor: theme.palette.grey[100],
                      padding: 1,
                      borderRadius: 1,
                      overflowX: 'auto',
                    }}
                  >
                    <Typography component="code" variant="body2" {...props}>
                      {children}
                    </Typography>
                  </Box>
                );
              },
            }}
          >
            {message.text}
          </ReactMarkdown>
        </MarkdownContent>
      </MessageBubble>
    );
  };

  return (
    <ChatContainer isExpanded={isExpanded}>
      <ChatHeader>
        <Typography variant="h6">
          {selectedSpecialist ? `Chatting with ${selectedSpecialist}` : 'Atlas Chat'}
        </Typography>
        <Box>
          <IconButton onClick={toggleExpand} size="small" sx={{ mr: 1 }}>
            {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </IconButton>
          <IconButton onClick={onClose} size="small">
            <X />
          </IconButton>
        </Box>
      </ChatHeader>

      <ChatContent 
        ref={chatContentRef}
        sx={{
          transition: 'all 0.3s ease',
          maxHeight: isExpanded ? 'calc(80vh - 120px)' : '380px',
        }}
      >
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
            {messages.map((message) => renderMessage(message))}
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
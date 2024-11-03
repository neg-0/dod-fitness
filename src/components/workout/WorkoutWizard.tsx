import React, { useState } from 'react';
import {
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

interface WorkoutWizardProps {
  onComplete: (data: any) => void;
  onCancel: () => void;
}

const WorkoutWizard: React.FC<WorkoutWizardProps> = ({
  onComplete,
  onCancel,
}) => {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState<any>(null);

  const handleSendMessage = async () => {
    if (!userInput) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { user: userInput, bot: '' }]);
    setUserInput('');
    setLoading(true);

    // Simulate LLM response (replace with actual API call)
    const botResponse = await simulateLLMResponse(userInput);
    
    // Add bot response to chat
    setMessages((prev) => {
      const updatedMessages = [...prev];
      updatedMessages[updatedMessages.length - 1].bot = botResponse;
      return updatedMessages;
    });

    // Update workout plan based on bot response
    updateWorkoutPlan(botResponse);
    setLoading(false);
  };

  const simulateLLMResponse = async (input: string) => {
    // Simulate a delay for the LLM response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Received your input: "${input}". Let's create your workout plan!`);
      }, 1000);
    });
  };

  const updateWorkoutPlan = (response: string) => {
    // Logic to update the workout plan based on the response
    // This is where you would parse the response and update the state
    setWorkoutPlan((prev) => ({
      ...prev,
      details: response, // Example of adding response to the plan
    }));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Let's Create Your Workout Plan!
        </Typography>
        <Box mb={2}>
          <List>
            {messages.map((msg, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`User: ${msg.user}`}
                  secondary={`Bot: ${msg.bot}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <TextField
          fullWidth
          label="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? 'Sending...' : 'Send'}
        </Button>
        {workoutPlan && (
          <Box mt={4}>
            <Typography variant="h6">Your Workout Plan:</Typography>
            <Typography variant="body1">{workoutPlan.details}</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkoutWizard;

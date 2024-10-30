import ApiFactory from './apiConfig';
import { mockStorage } from './mockStorage';

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

interface ChatResponse {
  response?: string;
  error?: string;
}

const MOCK_RESPONSES: { [key: string]: string } = {
  'AI Assistant': 'Based on your fitness data, I recommend focusing on strength training this week.',
  'Guardian Resilience Team': 'Remember to maintain a healthy work-life balance and practice stress management techniques.',
  'Nutritionist': 'Your current meal plan is well-balanced. Consider adding more protein to support muscle recovery.',
  'Fitness Trainer': 'Great progress on your workouts! Let\'s increase the intensity next week.',
};

export const sendChatMessage = async (
  userId: string,
  userInput: string,
  specialist: string
): Promise<string> => {
  try {
    if (ApiFactory.getMode() === 'live') {
      const api = ApiFactory.getApi();
      const response = await api.chatPost({
        id: userId,
        userInput,
        specialist
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      return response.data.response || 'No response received';
    } else {
      // Mock response
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      return MOCK_RESPONSES[specialist] || 'How can I assist you today?';
    }
  } catch (error) {
    console.error('Error sending chat message:', error);
    ApiFactory.handleApiFailure();
    throw new Error('Failed to send message');
  }
};

export const getChatHistory = (userId: string): ChatMessage[] => {
  const history = mockStorage.getItem(`chat_history_${userId}`);
  return history || [];
};

export const saveChatHistory = (userId: string, messages: ChatMessage[]): void => {
  mockStorage.setItem(`chat_history_${userId}`, messages);
};
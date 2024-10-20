import { OpenAI } from 'openai';  // Import OpenAI

const openAIKey = import.meta.env.VITE_OPENAI_API_KEY;
;
const openai = new OpenAI({ 
  apiKey: openAIKey,
  dangerouslyAllowBrowser: true, 
 });

export default openai
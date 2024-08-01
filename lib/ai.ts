import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const STRUCTURE = `
interface STRUCTURE {
  firstCigaretteTime: 'within5Minutes' | 'from6To30Minutes' | 'from31To60Minutes' | 'moreThan60Minutes';
  difficultyNotSmokingInProhibitedPlaces: boolean;
  mostSatisfyingCigarette: 'firstInTheMorning' | 'others';
  cigarettesPerDay: 'lessThan10' | 'from11To20' | 'from21To30' | 'moreThan31';
  moreFrequentSmokingInMorning: boolean;
  smokingWhenSick: boolean;
}`;

const generateQuestionnaireJson = async (conversation: string) => {
  const prompt = `
  I have below a conversation, that is a questionnaire. 
  I would like you to generate a JSON file with the questions and answers from the conversation. 
  The response must be JSON and nothing else, or it will break the application. 
  The conversation is below:
  '''${conversation}'''

  The JSON file must follow the structure below:
  '''${STRUCTURE}'''
  
  It must return only JSON, no formatting, nothing else, a pure RAW JSON.
  `;

  const { choices } = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: prompt }],
  });

  const content = choices[0].message.content;
  return JSON.parse(content ?? "");
};

export { generateQuestionnaireJson };

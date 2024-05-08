import {
  useGenAi,
  harmCategory,
  harmBlockThreshold
} from './useGenAi.js'

let chat = null;

export const useGetGenerativeModelGP = async (data) => {
  const model = await useGenAi('gemini-1.5-pro-latest')

  if (chat == null) {
    chat = model.startChat({
      history: [],
      generationConfig: {
        temperature: 1,
        topK: 0,
        topP: 0.95,
        maxOutputTokens: 8192,
      },
      safetySettings: [
        {
          category: harmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: harmBlockThreshold.BLOCK_NONE,
        },
        {
          category: harmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: harmBlockThreshold.BLOCK_NONE,
        },
        {
          category: harmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: harmBlockThreshold.BLOCK_NONE,
        },
        {
          category: harmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: harmBlockThreshold.BLOCK_NONE,
        },
      ]
    })
  }

  const result = await chat.sendMessage(data.prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}
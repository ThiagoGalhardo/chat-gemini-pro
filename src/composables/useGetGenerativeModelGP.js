import { useGenAi } from './useGenAi.js'

let chat = null;

export const useGetGenerativeModelGP = async (data) => {
  const model = await useGenAi('gemini-pro')

  if (chat == null) {
    chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 8000,
      },
    })
  }

  const result = await chat.sendMessage(data.prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    //  apiKey: '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',
    // apiKey: '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',

})

const openai = new OpenAIApi(configuration);

export default openai;
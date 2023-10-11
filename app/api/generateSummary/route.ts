import { NextResponse } from "next/server";
import openai from "@/openai";

export async function POST(request: Request) {
    console.log('helo..........')

    const {todos} = await request.json();
    console.log(todos);

    // communicate with openAi GPT

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
            {
                role: "system",
                content: `WHen responding . Welcome to teh user always as Mr Usama`,
            },
            {
                role: "user",
                content: `Hi there, provide a summary of the following todos. count how many todos are in each category such as
                To do, in progress and done, then tell the user to have a productive day! 
                Here's the data: ${JSON.stringify(
                    todos
                )}`
            }
        ]
    })

    const {data} = response;
    console.log("DATA IS: ",data)
    console.log(data.choices[0].message);

    return NextResponse.json(data.choices[0].message);
}


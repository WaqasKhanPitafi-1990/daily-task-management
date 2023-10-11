import formatTodosForAI from "./formatTodosForAI";

const fetchSuggestion = async (board: Board) => {
    console.log('test................')
    const todos = formatTodosForAI(board);
    console.log(todos, 'AI todos................................')

    const res = await fetch("/api/generateSummary",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({todos})
    })

    console.log('test................')
     
    const GPTdata = await res.json();
    const {content} = GPTdata;

    return content;
}

export default fetchSuggestion;
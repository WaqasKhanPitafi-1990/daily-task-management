import { databases } from "@/appwrite"

export const getTodosGroupedByColumn = async () => {
    const data = await databases.listDocuments(
        '6523ba6714f9274e0787',
        '6523bb204ac5fff20ac7',
    //     process.env.NEXT_PUBLIC_DATABASE_ID!,
    //    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
    );
    console.log(data,'data.........');
    

    const todos = data.documents;

    const columns = todos.reduce((acc,todo) => {
       if(!acc.get(todo.status)) {
        acc.set(todo.status, {
            id: todo.status,
            todos:[],
        });
       }
       acc.get(todo.status)!.todos.push({
         $id: todo.$id,
         $createdAt: todo.$createdAt,
         title: todo.title,
         status: todo.status,
         ...(todo.image && {image: JSON.parse(todo.image)})
       })

       return acc;

    },new Map<TypedColumn, Column>());

    // console.log(columns,'Old columns array')


    //if columns doesnot have inprogress , todos and done, add them with empty todos

    const columnTypes: TypedColumn[] = ["todo", "Inprogress", "done"];
    for(const columnType of columnTypes) {
      
        if(!columns.get(columnType)) {
            
          console.log(!columns.get(columnType),'boolean inner' ,columnType)

            columns.set(columnType, {
                id: columnType,
                todos: [],
            })
        }

    }

    console.log(columns,'New columns array')
    
    // sort colums by columnTypes

    const sortedColumns = new Map(
        Array.from(columns.entries()).sort(
            (a,b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
        )
    );

    const board: Board = {
        columns: sortedColumns
    }
    return board;
 
} 


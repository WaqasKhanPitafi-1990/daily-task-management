import { databases } from "@/appwrite"

export const getTodosGroupedByColumn = async () => {
    const data = await databases.listDocuments(
        '6523ba6714f9274e0787',
        '6523bb204ac5fff20ac7'
    );
    console.log(data,'data.........');
    

    const todos = data.documents;
// let DATA:any ={

//     todos:[],
//     inprogress:[],
//     done:[]
// }


//     todos?.map((item:any,index:number)=>{
//         console.log({object:item?.status})
//         if(item?.status == 'todo,'){
//             console.log('todo')
//             DATA.todos.push(item)
//         }
//         if(item?.status == 'Inprogress,'){
//             console.log('inprogress')
//             DATA.inprogress.push(item)
//         }
//         if(item?.status == 'done,'){
//             console.log('done')
//             DATA.done.push(item)
//         }
//     })
//     console.log({DATA})

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



 
} 


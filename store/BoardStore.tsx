import { databases } from '@/appwrite';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import { create } from 'zustand';


interface BoardState {
    board : Board;
    getBoard : () => void;
    setBoardState: (board: Board) => void;
    updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
    searchString: string;
    setSearchString: (searchString: string) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns : new Map<TypedColumn, Column>()
  },
  searchString:"",
  setSearchString: (searchString) => set({searchString}),

  getBoard:  async() => {
    const board = await getTodosGroupedByColumn();
    set({board})
  },

  setBoardState: (board) => set({board}),

  updateTodoInDB: async(todo, columnId) => {
    await databases.updateDocument(
        '6523ba6714f9274e0787',
        '6523bb204ac5fff20ac7',
        todo.$id,
        {
            title: todo.title,
            status: columnId,
        }
    )
  }

}));
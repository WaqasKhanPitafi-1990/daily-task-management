import { databases } from "@/appwrite"

export const getTodosGroupedByColumn = async () => {
    const data = await databases.listDocuments(
        '6523ba6714f9274e0787',
        '6523bb204ac5fff20ac7'
    );
    console.log(data);
    console.log('data...................')
} 
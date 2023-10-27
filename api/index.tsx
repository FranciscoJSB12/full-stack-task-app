import type { TaskType } from "@/models/task.model";

interface SaveTaskType {
    text: string,
    done: boolean
}

interface ChangeTaskType {
    id: number,
    text: string,
    done: boolean
}

type HeadersType = {
    "Content-Type": string;
}

const baseUrl:string = "http://localhost:3001/api/v1/tasks";

const headers:HeadersType = {
    "Content-Type": "application/json"
}

export async function getAllTasks(): Promise<TaskType[] | undefined> {
    try {
        const res = await fetch(baseUrl, { 
            cache: "no-store" 
        });
        const data = await res.json();
        return data;
    } catch(err) {
        console.error(err);
    }
}

export async function saveTask(task: SaveTaskType): Promise<void> {
    try {
        await fetch(baseUrl, {
            method: "POST",
            headers,
            body: JSON.stringify(task),
        });
    } catch (err) {
        console.error(err)
    }
}

export async function deleteTask(id: number): Promise<void> {
    try {
        await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
    } catch (err) {
        console.error(err);
    }
}

export async function changeTask({ id, text, done}:ChangeTaskType): Promise<void> {
    try {
        await fetch(`${baseUrl}/${id}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify({ text, done })
        });
    } catch (err) {
        console.error(err);
    }
}
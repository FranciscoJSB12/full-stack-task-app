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
    "Content-Type": string
}

const baseUrl:string = "http://localhost:8080/tasks";

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

export async function getOneTask(id:string): Promise<TaskType | undefined> {
    try {
        const res = await fetch(`${baseUrl}/${id}`, { cache: "no-store" });
        const task = await res.json();
        return task;
    } catch(err) {
        console.error(err);
    }
}

export async function saveTask(task: SaveTaskType): Promise<void> {
    try {
        await fetch(baseUrl, {
            method: "POST",
            headers,
            body: JSON.stringify({ id: crypto.randomUUID(), ...task }),
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

export async function changeTask(newTask:ChangeTaskType): Promise<void> {
    try {
        await fetch(`${baseUrl}/${newTask.id}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(newTask)
        });
    } catch (err) {
        console.error(err);
    }
}
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

const baseUrl = "http://localhost:3001/api/tasks";

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

export async function saveTask(task: SaveTaskType): Promise<TaskType> {
    const res = await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task),
    });

    const newTodo = await res.json();

    return newTodo;
}

export async function deleteTask(id: number): Promise<void> {
    await fetch(baseUrl, {
       method: "DELETE", 
       headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ id })
    });
}

export async function changeTask({ id, text, done}:ChangeTaskType): Promise<void> {
    await fetch(baseUrl, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, text, done})
    });
}
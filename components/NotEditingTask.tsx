import React from "react";
import type { TaskType } from "@/models/task.model";

interface NotEditingTaskProps {
    task: TaskType,
    onCheckTask: (e:React.ChangeEvent<HTMLInputElement>) => Promise<void>,
    onEditTask: () => void,
    onDeleteTask: () => Promise<void>
}

export function NotEditingTask (props: NotEditingTaskProps) {
    const { 
        task, 
        onCheckTask, 
        onEditTask, 
        onDeleteTask 
    } = props;
    
    return (
        <article>
            <label>
                <input 
                    type="checkbox"
                    name={task.text}
                    checked={task.done}
                    onChange={onCheckTask}
                />
                <span>{task.text}</span>
            </label>
            <button onClick={onEditTask}>Edit</button>
            <button onClick={onDeleteTask}>Delete</button>
        </article>
    );
}
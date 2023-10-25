import React from "react";
import type { TaskType } from "@/models/task.model";
import styles from "@/styles/NotEditingTask.module.css"

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
        <article className={styles.article}>
            <label>
                <input 
                    type="checkbox"
                    name={task.text}
                    checked={task.done}
                    onChange={onCheckTask}
                />
                <span>{task.text}</span>
            </label>
            <div className={styles.buttonsContainer}>
                <button 
                    onClick={onEditTask}
                    className={styles.button}
                >Edit</button>
                <button 
                    onClick={onDeleteTask}
                    className={styles.button}
                >Delete</button>
            </div>
        </article>
    );
}
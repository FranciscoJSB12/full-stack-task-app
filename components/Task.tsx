"use client";
import React from "react";
import type { TaskType } from "@/models/task.model";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deleteTask, changeTask } from "@/api";
import styles from "@/styles/Task.module.css"

interface TaskProps {
    task: TaskType
}

export function Task ({ task }: TaskProps) {
    
    const router = useRouter();

    const onDeleteTask = async ():Promise<void> => {
        await deleteTask(task.id);
        router.refresh();
    }

    const onCheckTask = async (e:React.ChangeEvent<HTMLInputElement>):Promise<void> => {
        await changeTask({...task, done: e.target.checked});
        router.refresh();
    }

    return (
        <article className={styles.TaskArticle}>
            <div className={styles.TaskTextContainer}>
                <input 
                    type="checkbox"
                    name={task.text}
                    checked={task.done}
                    onChange={onCheckTask}
                    id={`id-${task.id}`}
                />
                <label 
                    htmlFor={`id-${task.id}`}
                >{task.text}</label>
            </div>
            <div className={styles.TaskButtonsContainer}>
                <Link href={`/tasks/${task.id}`} className={styles.TaskEditButton}>
                    Edit
                </Link>
                <button 
                    onClick={onDeleteTask}
                >Delete</button>
            </div>
        </article>
    );
}
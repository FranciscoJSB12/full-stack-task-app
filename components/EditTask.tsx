"use client";
import React, { useState } from "react";
import type { TaskType } from "@/models/task.model";
import { useRouter } from "next/navigation";
import { deleteTask, changeTask } from "@/api";
import styles from "@/styles/EditTask.module.css";

interface EditTaskProps {
    task:  TaskType
}

export function EditTask ({ task }: EditTaskProps) {
    const [newTask, setNewTask] = useState(task);

    const router = useRouter();

    const onDeleteTask = async (): Promise<void> => {
        await deleteTask(newTask.id);
        router.refresh();
        router.back();
    }

    const onChangeTask = async (): Promise<void> => {
        await changeTask({ ...newTask });
        router.refresh();
        router.back();
    }
    
    return (
        <section className={styles.EditTaskSection}>
            <div className={styles.EditTaskCheckContainer}>
                <label htmlFor={`id-${task.id}`}>Done:</label>
                <input
                    type="checkbox"
                    checked={newTask.done}
                    onChange={(e) => setNewTask({...newTask, done: e.target.checked})}
                    id={`id-${task.id}`}
                />
            </div>
            <div className={styles.EditTaskTextAreaContainer}>
                <textarea
                   value={newTask.text}
                   onChange={(e) => setNewTask({...newTask, text: e.target.value})}
                />
            </div>
            <div className={styles.EditTaskButtonsContainer}>
                <button 
                    onClick={onChangeTask}
                >Save</button>
                <button 
                    onClick={onDeleteTask}
                >Delete</button>
            </div>
        </section>
    );
}
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { saveTask } from "@/api";
import styles from "@/styles/TaskHeader.module.css";

export function TaskHeader () {
    const [text, setText] = useState("");
    const router = useRouter();

    const onChangeText = (e:React.ChangeEvent<HTMLInputElement>):void => { 
        setText(e.target.value);
    }

    const onAddTask = async (): Promise<void> => {
        if(text) {
            await saveTask({
                text,
                done: false
            });
            setText("");
            router.refresh();
        }
    }

    const onAddTaskByEnter = async (e:React.KeyboardEvent<HTMLInputElement>):Promise<void> => {
        if (e.key === "Enter") {
            await onAddTask();
        }
    }

    return (
        <section className={styles.TaskHeaderSection}>
            <input
                type="text" 
                value={text}
                onChange={onChangeText}
                onKeyDown={onAddTaskByEnter}
                name="addTask"
                className={styles.TaskHeaderInput}
                placeholder="Add a task"
            />
            <button 
                onClick={onAddTask}
                className={styles.TaskHeaderButton}
            >+</button>
        </section>
    );
}
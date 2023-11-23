"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosAddCircle } from "react-icons/io";
import { saveTask } from "@/api";
import styles from "@/styles/AddTask.module.scss";
import iconStyles from "@/styles/Icons.module.scss";

export function AddTask () {
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
        <section className={styles.section}>
            <input
                type="text" 
                value={text}
                onChange={onChangeText}
                onKeyDown={onAddTaskByEnter}
                placeholder="Add a task"
                autoComplete="off"
                className={styles.sectionInput}
            />
            <div className={styles.buttonContainer}>
                <IoIosAddCircle
                    className={iconStyles.addIcon}
                    onClick={onAddTask}
                />
            </div>
        </section>
    );
}
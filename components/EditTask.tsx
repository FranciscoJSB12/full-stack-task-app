"use client";
import React, { useState } from "react";
import type { TaskType } from "@/models/task.model";
import { useRouter } from "next/navigation";
import { deleteTask, changeTask } from "@/api";
import { FaCheckCircle, FaPen, FaRegTrashAlt } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5";
import { getIconColor } from "@/utils/getIconColor";
import iconStyles from "../styles/Icons.module.scss";
import styles from "@/styles/EditTask.module.scss";

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
        <section>
            <div>
                <textarea
                   value={newTask.text}
                   onChange={(e) => setNewTask({...newTask, text: e.target.value})}
                   className={styles.sectionTextarea}
                />
            </div>
            <div className={styles.sectionButtonsContainer}>
                <label className={styles.sectionCheckContainer}>
                    <span className={styles.checkContainerText}>Done:</span>
                    <FaCheckCircle 
                        className={getIconColor(newTask.done)}
                        onClick={() => setNewTask({...newTask, done: !newTask.done})}
                    />
                </label>
                <button className={styles.buttonContainerButton}>
                    <IoSaveOutline 
                        className={iconStyles.saveIcon}
                        onClick={onChangeTask}
                    />
                </button>
                <button className={styles.buttonContainerButton}>
                    <FaRegTrashAlt
                        className={iconStyles.deleteIcon}
                        onClick={onDeleteTask}
                    />
                </button>
            </div>
        </section>
    );
}
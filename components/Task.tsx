"use client";
import React from "react";
import type { TaskType } from "@/models/task.model";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaCheckCircle, FaPen, FaRegTrashAlt } from "react-icons/fa";
import { deleteTask, changeTask } from "@/api";
import { getIconColor } from "@/utils/getIconColor";
import styles from "@/styles/Task.module.scss";
import iconStyles from "@/styles/Icons.module.scss";


interface TaskProps {
    task: TaskType
}

export function Task ({ task }: TaskProps) {
    
    const router = useRouter();

    const onDeleteTask = async ():Promise<void> => {
        await deleteTask(task.id);
        router.refresh();
    }

    const onCheckTask = async ():Promise<void> => {
        await changeTask({...task, done: !task.done});
        router.refresh();
    }

    return (
        <article className={styles.article}>
            <div>
               <label
                    className={styles.articleLeftContainer}
               >
                    <FaCheckCircle 
                        className={getIconColor(task.done)}
                        onClick={onCheckTask}
                    />
                    <span>
                        {task.text}
                    </span>
                </label>
            </div>
            <div
                className={styles.articleRightContainer}
            >
                <Link href={`/tasks/${task.id}`}>
                    <FaPen
                        className={iconStyles.editIcon}
                    />
                </Link>
                <FaRegTrashAlt
                    className={iconStyles.deleteIcon}
                    onClick={onDeleteTask}
                />
            </div>
        </article>
    );
}
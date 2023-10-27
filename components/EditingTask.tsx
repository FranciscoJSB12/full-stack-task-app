import React from "react";
import type { TaskType } from "@/models/task.model";
import type { EditingStateType } from "./Task";
import styles from "@/styles/EditingTask.module.css";

interface EditingTaskProps {
    task: TaskType,
    onCheckTask: (e:React.ChangeEvent<HTMLInputElement>) => Promise<void>,
    onEditTaskText:  (e:React.ChangeEvent<HTMLInputElement>) => void,
    editing: EditingStateType, 
    onSaveEditedTaskByEnter: (e:React.KeyboardEvent<HTMLInputElement>) => Promise<void>
    onSaveEditedTaskByClick: () => Promise<void>
    onDeleteTask: () => Promise<void>
}

export function EditingTask (props: EditingTaskProps) {
    const {
        task,
        editing,
        onCheckTask,
        onEditTaskText,
        onSaveEditedTaskByClick,
        onSaveEditedTaskByEnter,
        onDeleteTask
    } = props;
    
    return (
        <article className={styles.article}>
            <div>
                <input 
                    type="checkbox"
                    name={task.text}
                    checked={task.done}
                    onChange={onCheckTask}
                />
                <input
                    type="text" 
                    value={editing.text}
                    onChange={onEditTaskText}
                    onKeyDown={onSaveEditedTaskByEnter}
                    className={styles.textInput}
                />
            </div>
            <div className={styles.buttonsContainer}>
                <button 
                    onClick={onSaveEditedTaskByClick}
                    className={styles.button}
                >Save</button>
                <button 
                    onClick={onDeleteTask}
                    className={styles.button}
                >Delete</button>
            </div>
        </article>
    );
}
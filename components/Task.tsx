"use client"
import React, { useState } from "react";
import type { TaskType } from "@/models/task.model";
import { useRouter } from "next/navigation";
import { deleteTask, changeTask } from "@/api";
import { EditingTask } from "./EditingTask";
import { NotEditingTask } from "./NotEditingTask";

interface TaskProps {
    task: TaskType;
}

export interface EditingStateType {
    state: boolean,
    text: string
}

const initEditingState: EditingStateType = {
    state: false,
    text: ""
}

export function Task ({ task }: TaskProps) {
    const [editing, setEditing] = useState(initEditingState);

    const router = useRouter();

    const onEditTask = ():void => setEditing({ state: true, text: task.text });

    const onEditTaskText = (e:React.ChangeEvent<HTMLInputElement>):void => {
        setEditing({...editing, text:e.target.value});
    }

    const onSaveEditedTaskByClick = async ():Promise<void> => {
        await changeTask({...task, text: editing.text});
        setEditing(initEditingState);
        router.refresh();
    }

    const onSaveEditedTaskByEnter = async (e:React.KeyboardEvent<HTMLInputElement>):Promise<void> => {
        if(e.key === 'Enter') { 
            await onSaveEditedTaskByClick();
        }
    }

    const onDeleteTask = async ():Promise<void> => {
        await deleteTask(task.id)
        router.refresh();
    }

    const onCheckTask = async (e:React.ChangeEvent<HTMLInputElement>):Promise<void> => {
        await changeTask({...task, done: e.target.checked});
        router.refresh();
    };

    if (editing.state) {
        return (
            <EditingTask
               task={task} 
               editing={editing}
               onCheckTask={onCheckTask}
               onEditTaskText={onEditTaskText}
               onSaveEditedTaskByClick={onSaveEditedTaskByClick}
               onSaveEditedTaskByEnter={onSaveEditedTaskByEnter}
               onDeleteTask={onDeleteTask}
            />
        );
    }

    return (
     <NotEditingTask
        task={task}
        onCheckTask={onCheckTask}
        onEditTask={onEditTask}
        onDeleteTask={onDeleteTask}
     />
    );
}
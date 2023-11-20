"use client";
import React, { useState } from "react";
import type { TaskType } from "@/models/task.model";
import { useRouter } from "next/navigation";
import { deleteTask, changeTask } from "@/api";
import { FaCheckCircle, FaPen, FaRegTrashAlt } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5";
import { getIconColor } from "@/utils/getIconColor";
import iconStyles from "../styles/Icons.module.scss";

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
                <label>
                    <span>Done:</span>
                    <FaCheckCircle 
                        className={getIconColor(newTask.done)}
                        onClick={() => setNewTask({...newTask, done: !newTask.done})}
                    />
                </label>
            </div>
            <div>
                <textarea
                   value={newTask.text}
                   onChange={(e) => setNewTask({...newTask, text: e.target.value})}
                />
            </div>
            <div>
                <button>
                    <IoSaveOutline 
                        className={iconStyles.saveIcon}
                        onClick={onChangeTask}
                    />
                </button>
                <button>
                    <FaRegTrashAlt
                        className={iconStyles.deleteIcon}
                        onClick={onDeleteTask}
                    />
                </button>
            </div>
        </section>
    );
}
import React from "react";
import styles from "@/styles/TaskList.module.css";

interface TaskListProps {
    tasks: React.JSX.Element[]
}

export function TaskList ({ tasks }: TaskListProps) {
    
    if (tasks.length === 0) {
        return (
            <p className={styles.TaskListErrorText}>No tasks have been found</p>
        );
    }

    return (
        <section className={styles.TaskListSection}>
          {tasks}
        </section>
    );
}
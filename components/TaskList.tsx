import React from "react";
import styles from "@/styles/TaskList.module.scss";

interface TaskListProps {
    tasks: React.JSX.Element[]
}

export function TaskList ({ tasks }: TaskListProps) {
    
    if (tasks.length === 0) {
        return (
            <p>No tasks have been found</p>
        );
    }

    return (
        <section className={styles.section}>
          {tasks}
        </section>
    );
}
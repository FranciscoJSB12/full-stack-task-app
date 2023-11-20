import React from "react";

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
        <section>
          {tasks}
        </section>
    );
}
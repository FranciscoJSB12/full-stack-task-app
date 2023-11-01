import React from "react";
import type { TaskType } from "@/models/task.model";
import { getAllTasks } from "@/api";
import { TaskList } from "@/components/TaskList";
import { Task } from "@/components/Task";
import { TaskHeader } from "@/components/TaskHeader";
import { FetchError } from "@/components/FetchError";
import styles from "./page.module.css";

type AllTasksType = TaskType[] | undefined;

async function Home() {
    const data: AllTasksType = await getAllTasks();

    if(!data) {
      return (
        <FetchError/>
      );
    }
    
    const tasks = data.map(t => <Task key={t.id} task={t}/>);
    const totalTasks = tasks.length;
    const completedTasks = data.filter(t => !!t.done).length;

    return (
      <>
        <header className={styles.PageHeader}>
          <h1>Task list</h1>
          <h2>You've completed {completedTasks} out of {totalTasks}</h2>
        </header>
        <main>
          <TaskHeader/>
          <TaskList
            tasks={tasks}
          />
        </main>
      </>
    );
}

export default Home;

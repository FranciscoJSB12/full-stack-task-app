import React from "react";
import type { TaskType } from "@/models/task.model";
import { getAllTasks } from "@/api";
import { TaskList } from "@/components/TaskList";
import { Task } from "@/components/Task";
import { TaskHeader } from "@/components/TaskHeader";
import { FetchError } from "@/components/FetchError";
import styles from "./page.module.css";

async function Home() {
    const data: TaskType[] | undefined = await getAllTasks();

    if(!data) {
      return (
        <FetchError/>
      );
    }

    const tasks = data.map(t => <Task key={t.id} task={t}/>);
    const totalTasks = tasks.length;

    return (
      <main className={styles.main}>
          <h2>Total tasks: {totalTasks}</h2>
          <TaskHeader/>
          <TaskList
            tasks={tasks}
          />
      </main>
    );
}

export default Home;

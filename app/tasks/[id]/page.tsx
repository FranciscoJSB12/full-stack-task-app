import React from "react";
import type { TaskType } from "@/models/task.model";
import { getOneTask } from "@/api";
import { EditTask } from "@/components/EditTask";
import styles from "./page.module.css";

interface PagePropsType {
    params: {
        id: string
    }
}

type OneTaskType = TaskType | undefined;

async function Page ({ params }: PagePropsType) {
    const task: OneTaskType = await getOneTask(params.id);
    
    let content: React.JSX.Element;

    if (!task) {
        content = <p className={styles.PageErrorText}>Error while fetching the data</p>;
    } else {
        content = <EditTask task={task}/>;
    }


    return (
        <>
            <header className={styles.PageHeader}>
                <h1>Need to edit something?</h1>
                <h2>Edit here. Check, uncheck, change text, delete... Everything!</h2>
            </header>
            <main>
                {content}
            </main>
        </>
    );
}

export default Page;
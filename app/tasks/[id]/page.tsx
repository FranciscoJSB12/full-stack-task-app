import React from "react";
import type { TaskType } from "@/models/task.model";
import { getOneTask } from "@/api";
import { EditTask } from "@/components/EditTask";
import styles from "./page.module.scss";

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
        content = <p>Error while fetching the data</p>;
    } else {
        content = <EditTask task={task}/>;
    }

    return (
        <main className={styles.main}>
            <section>
                <h1 className={styles.sectionTitle}>Need to edit something?</h1>
                <h2 className={styles.sectionText}>Edit here. Check, uncheck, change text, delete... Everything!</h2>
            </section>
            {content}
        </main>
    );
}

export default Page;
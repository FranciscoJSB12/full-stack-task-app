import type { TaskType } from "@/models/task.model";
import { getOneTask } from "@/api";
import { EditTask } from "@/components/EditTask";
import { FetchError } from "@/components/FetchError";
import styles from "./page.module.css";

interface PagePropsType {
    params: {
        id: string
    }
}

type OneTaskType = TaskType | undefined;

async function Page ({ params }:PagePropsType) {
    const task: OneTaskType = await getOneTask(params.id);

    if (!task) {
        return (
            <FetchError/>
        );
    }

    return (
        <main>
            <header className={styles.header}>
                <h1>Need to edit something?</h1>
                <h2>Edit here. Check, uncheck, change text, delete... Everything!</h2>
            </header>
            <EditTask
                task={task}
            />
        </main>
    );
}

export default Page;
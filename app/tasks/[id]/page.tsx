import React from "react";
import type { TaskType } from "@/models/task.model";
import { getOneTask } from "@/api";
import { EditTask } from "@/components/EditTask";

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
        <main>
            <h1>Need to edit something?</h1>
            <h2>Edit here. Check, uncheck, change text, delete... Everything!</h2>
            {content}
        </main>
    );
}

export default Page;
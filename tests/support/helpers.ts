import { expect, APIRequestContext } from "@playwright/test";
import { TaskModel } from "../fixtures/task.model";
require('dotenv').config();
//Funções
const BASE_API =process.env.BASE_API;

export async function deleteTaskyByHelper(request: APIRequestContext, taskName: string) {
    //DADO que eu tenho uma nova tarefa
    //Chamando request API Helper
    await request.delete(`${BASE_API}/helper/tasks/${taskName}`);
}

export async function postTask(request: APIRequestContext, task: TaskModel) {
    //Chamada request API via post previamente cadastrando tarefa
    const newTask = await request.post(`${BASE_API}/tasks`, { data: task });
    expect(newTask.statusText()).toBeTruthy();
}

import { expect, test } from "@playwright/test";
import { TaskModel } from "./fixtures/task.model";
import { deleteTaskyByHelper, postTask } from "./support/helpers";
import { TaskPage } from "./support/pages/tasks";
import data from "./fixtures/tasks.json";


test.describe('Cadastro', ()=>{

  // 1 Casos de teste
  test("deve poder cadastrar uma nova tarefa", async ({ page, request }) => {
    const task = data.success as TaskModel;
  
    //Chamando request API Helper
    await deleteTaskyByHelper(request, task.name);
  
    const tasksPage: TaskPage = new TaskPage(page);
    await tasksPage.goto();
    await tasksPage.create(task);
    await tasksPage.shouldHaveText(task.name);
  });
  
  // 2 caso de testes
  test("Não deve permitir tarefa duplicada", async ({ page, request }) => {
    const task = data.duplicate as TaskModel;
  
    const tasksPage: TaskPage = new TaskPage(page);
  
    //Chamando request API Helper
    await deleteTaskyByHelper(request, task.name);
    //Chamando Função
    await postTask(request, task);
  
    await tasksPage.goto();
  
    await tasksPage.create(task);
    await tasksPage.alertHaveText("Task already exists!");
  });
  
  test("campo obrigatorio", async ({ page }) => {

    //Pegando massa de dados do aqruivo json utilizando como base o TASkmodel(ARQUIVO DE INTERFACE)
    const task = data.required as TaskModel;
  
    const tasksPage: TaskPage = new TaskPage(page);
  
    await tasksPage.goto();
    await tasksPage.create(task);
  
    const validationMessage = await tasksPage.inputTaskName.evaluate((e) => (e as HTMLInputElement).validationMessage);
    expect(validationMessage).toEqual("This is a required field");
  });
})



test.describe('Atualização', ()=> {

  test("deve concluir uma nova tarefa", async ({ page, request }) => {
    const task = data.update as TaskModel;
  
    await deleteTaskyByHelper(request, task.name);
    await postTask(request, task)
  
    //Instanciado o page object
    const tasksPage: TaskPage = new TaskPage(page)
  
    await tasksPage.goto()
    await tasksPage.toggle(task.name)
    await tasksPage.shouldBeDone(task.name)
  });
})


test.describe('Exlusão', ()=> {

  test("deve excluir uma nova tarefa", async ({ page, request }) => {
    const task = data.delete as TaskModel;
  
    await deleteTaskyByHelper(request, task.name);
    await postTask(request, task);
  
    //Instanciado o page object
    const tasksPage: TaskPage = new TaskPage(page);
  
    await tasksPage.goto()
    await tasksPage.remove(task.name)
    await tasksPage.shouldNotExist(task.name)
  })
})

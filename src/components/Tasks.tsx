import { PlusCircle } from '@phosphor-icons/react';
import { ChangeEvent, FormEvent, useState } from 'react';
import ClipboardIcon from '../assets/Clipboard.svg';
import { Task, TaskProps, TaskStatus } from './Task';
import styles from './Tasks.module.css';

export function Tasks() {
  const [taskName, setTaskName] = useState('');
  const [taskList, setTaskList] = useState([] as {name: string, status: TaskStatus, id: string}[]);

  function handleChangeTaskName(event: ChangeEvent<HTMLInputElement>) {
    const taskName = event.target.value;
    setTaskName(taskName);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
  
    const newTask = {
      name: taskName,
      status: TaskStatus.OPEN,
      id: generateTaskId(taskName),
    }

    console.log(`Create task: ${JSON.stringify(newTask)}`);
    setTaskList([...taskList, newTask]);

    setTaskName('');
  }

  function generateTaskId(taskName: string) {
    return `${taskName.toLowerCase().replace(' ', '-')}-${new Date().toISOString()}`;
  }

  function deleteTask(taskIdToDelete: string) {
    const tasksWithoutDeleteOne = taskList.filter(task => task.id !== taskIdToDelete);
    setTaskList(tasksWithoutDeleteOne);
  }

  function toCloseTask(taskIdToClose: string) {
    const closedTask = taskList.find(task => task.id === taskIdToClose) as TaskProps;
    closedTask.status = TaskStatus.CLOSED;

    const tasksWithoutCloseOne = taskList.filter(task => task.id !== taskIdToClose);
    setTaskList([...tasksWithoutCloseOne, closedTask])
  }

  function toOpenTask(taskIdToOpen: string) {
    const openTask = taskList.find(task => task.id === taskIdToOpen) as TaskProps;
    openTask.status = TaskStatus.OPEN;

    const tasksWithoutOpenOne = taskList.filter(task => task.id !== taskIdToOpen);
    setTaskList([openTask, ...tasksWithoutOpenOne]);
  }

  const numberOfTasks = taskList.length;
  const numberOfClosedTasks = taskList.reduce((acc, task) => task.status === TaskStatus.CLOSED ? acc+1 : acc, 0);
  const numberOfClosedTasksText = numberOfClosedTasks > 0 ? `${numberOfClosedTasks} de ${numberOfTasks}` : 0;
  const isTaskListEmpty = numberOfTasks === 0;

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleCreateNewTask} className={styles.createTaskForm}>
        <input 
          onChange={handleChangeTaskName}
          value={taskName}
          type="text" 
          placeholder="Adicione uma nova tarefa" 
          required
        />
        <button type='submit'>
          <strong>Criar</strong>
          <PlusCircle size={24}/>
        </button>
      </form>
      
      <header className={styles.statusCounters}>
        <div className={`${styles.statusCounter} ${styles.createdTasks}`}>
          Tarefas criadas <span>{numberOfTasks}</span>
        </div>
        <div className={`${styles.statusCounter} ${styles.closedTasks}`}>
          Concluídas <span>{numberOfClosedTasksText}</span>
        </div>
      </header>

      {
        isTaskListEmpty ?
        <div className={styles.noTasks}>
          <img src={ClipboardIcon} alt='Clipboard Icon'/>  
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
        :
        <div className={styles.withTasks}>
          {taskList.map(task => (
            <Task
              key={task.id} 
              id={task.id}
              name={task.name} 
              status={task.status}
              onDeleteTask={deleteTask} 
              onCloseTask={toCloseTask} 
              onOpenTask={toOpenTask} 
            />
          ))}
        </div>
      }
    </div>
  )
}
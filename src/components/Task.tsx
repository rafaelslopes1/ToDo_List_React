import { CheckCircle, Circle, Trash } from '@phosphor-icons/react';
import styles from './Task.module.css';

export enum TaskStatus {
  OPEN = 'open',
  CLOSED = 'closed',
}

export interface TaskProps {
  name: string,
  status: TaskStatus
  id: string,
  onDeleteTask: (taskIdToDelete: string) => void,
  onCloseTask: (taskIdToClose: string) => void,
  onOpenTask: (taskIdToOpen: string) => void,
}

export function Task({id, name, status, onDeleteTask, onCloseTask, onOpenTask}: TaskProps) {
  const handleDeleteTask = () => onDeleteTask(id);

  const handleCloseTask = () => onCloseTask(id);

  const handleOpenTask = () => onOpenTask(id);

  return (
    <div className={styles.taskContainer}>
      {status === TaskStatus.OPEN ?
        <Circle size={24} 
          className={styles.openIcon}
          onClick={handleCloseTask}
        /> : 
        <CheckCircle 
          size={24}
          className={styles.closedIcon} 
          weight="fill"
          onClick={handleOpenTask}
        />
      }
      <p className={status === TaskStatus.CLOSED ? styles.closed : ''}>
        {name}
      </p>
      <Trash 
        size={24} 
        className={styles.trashIcon} 
        onClick={handleDeleteTask}
      />
    </div>
  )
}
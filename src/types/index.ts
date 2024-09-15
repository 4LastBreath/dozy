// Auth

export type User = {
  _id: string,
  email: string,
  username: string,
  active: boolean | undefined,
  avatar: string,
  role: string,
  lists: string[],
}


// Taskboard

export type List = {
  _id: string,
  name: string,
}

export type Task = {
  _id: string,
  name: string,
  description: string,
  createdAt: Date,
  status: Status,
  listId: string,
}

export type Status = 'todo' | 'inProgress' | 'done'


export type Column = {
  id: Status;
  title: string;
  taskIds: string[];
}

export type TaskBoardState = {
  tasks: {
    [key: string]: Task;
  };
  columns: {
    [key: string]: Column;
  };
  columnOrder: Status[];
}
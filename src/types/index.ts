// Auth

export type User = {
  _id: string,
  email: string,
  username: string,
  active: boolean | undefined,
  avatar: string,
  role: string,
  lists: List[],
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
  createdAt: number,
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


// HOME DEMO DND

export type DemoTask = {
  id: string;
  logo: JSX.Element;
}

export type DemoState = {
  tasks: {
    [key: string]: DemoTask
  };
  tasksOrder: string[]
}


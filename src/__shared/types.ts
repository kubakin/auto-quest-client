export enum Role {
  User = 'user',
  Admin = 'admin',
}

export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
  VIDEO = 'video',
  NO_FILE = 'noFile',
}

export enum Status  {
  PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  ACTIVATED  = 'ACTIVATED',
  NOT_ACTIVATED = 'NOT_ACTIVATED',
}


export interface iTask {
  id: number;
  text: string;
  answer: string;
  price: number;
  file: string;
  fileType: FileType;
  helps: iHelp[]
};

export interface iHelp {
  id: number;
  task_id: number;
  text: string;
  price: number;
};

interface iTaskForTeam {
  id: number;
  task: iTask;
  next_help: Date;
  help_status: number;
}

export interface iTeam {
  id: number;
  name: string;
  progress: number;
  status: Status;
  score: number;
  currentTask: iTaskForTeam;
};

export interface iUser {
  email: string;
  id: number;
  role: Role;
  team: iTeam | null;
  username: string;
  password: string;
}


export interface ActionInterface {
  payload?: any,
  type: string
};

export interface iUserWithTeam {
  email: string;
  id: number;
  role: Role;
  team: iTeam;
  username: string;
  password: string;
}

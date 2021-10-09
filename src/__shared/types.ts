export interface iTask {
  id: number;
  text: string;
  teams: any;
  helps: iHelp[];
  answer: string;
  price: number;
  file: string;
  fileType: string;
};

export interface iHelp {
  task_id: number;
  text: string;
};

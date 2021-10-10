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


export interface iTeam {
  helpstatus: number;
  id: number;
  name: string;
  next_answer: Date;
  progress: number;
  status: string;
  score: number;
}

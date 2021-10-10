export interface iTask {
  id: number;
  text: string;
  teams: any;
  helps: iHelp[] | [];
  answer: string;
  price: number;
  file: string;
  fileType: string;
};

export interface iHelp {
  id: number;
  task_id: number;
  text: string;
  price: number;
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

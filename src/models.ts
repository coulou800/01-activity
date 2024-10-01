export interface Trainee {
  id: number;
  login: string;
  full_name: string;
  email: string;
  avatar_url: string;
  created: string;
  location: string;
  description: string;
  username: string;
}

interface GitCommit {
  url: string;
  sha: string;
  created: string;
  html_url: string;
  commit: Commit;
  author: null;
  committer: null;
  parents: Tree[];
  files: File[];
}

interface File {
  filename: string;
}

interface Commit {
  url: string;
  author: Author;
  committer: Author;
  message: string;
  tree: Tree;
}

interface Tree {
  url: string;
  sha: string;
  created: string;
}

interface Author {
  name: string;
  email: string;
  date: string;
}
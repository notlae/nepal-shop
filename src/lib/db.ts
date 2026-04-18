import { promises as fs } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const usersFile = path.join(dataDir, 'users.json');

export interface UserRecord {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  [key: string]: unknown;
}

export async function ensureUsersFile() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.access(usersFile);
  } catch (error) {
    await fs.writeFile(usersFile, JSON.stringify([], null, 2), 'utf-8');
  }
}

export async function readUsers(): Promise<UserRecord[]> {
  await ensureUsersFile();
  const content = await fs.readFile(usersFile, 'utf-8');
  return JSON.parse(content) as UserRecord[];
}

export async function writeUsers(users: UserRecord[]) {
  await ensureUsersFile();
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2), 'utf-8');
}

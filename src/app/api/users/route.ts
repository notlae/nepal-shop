import { NextResponse } from 'next/server';
import { readUsers, writeUsers, UserRecord } from '@/lib/db';

export async function GET() {
  const users = await readUsers();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body?.email || !body?.name) {
    return new NextResponse(JSON.stringify({ error: 'name and email are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const users = await readUsers();
  const newUser: UserRecord = {
    id: users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1,
    name: String(body.name),
    email: String(body.email),
    createdAt: new Date().toISOString(),
    ...body,
  };

  users.push(newUser);
  await writeUsers(users);

  return new NextResponse(JSON.stringify(newUser), { status: 201, headers: { 'Content-Type': 'application/json' } });
}

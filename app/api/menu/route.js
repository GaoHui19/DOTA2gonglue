import { getMenuList } from '@/lib/notion';

export async function GET() {
  const list = await getMenuList();
  return Response.json(list);
}

import { z } from 'zod';

export const studentSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  age: z.number().min(5).max(100),
  phone: z.string().regex(/^[0-9]{10,15}$/)
})

export async function POST(request: Request) {
    const data = await request.json();
    const validated = studentSchema.parse(data);
}
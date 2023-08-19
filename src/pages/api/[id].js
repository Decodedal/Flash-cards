import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function get({ params }) {
    const { id } = params; // Assume the ID is passed as a parameter
  
    try {
     const data =  await prisma.post.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      await prisma.$disconnect();
      return { 
            status: 200,
            body:JSON.stringify(data)
        }; 
    } catch (e) {
      console.error(e);
      await prisma.$disconnect();
      return {
        status: 500,
        body: JSON.stringify({ error: 'An error occurred while deleting the card' }),
      };
    }
  }
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function del({ params }) {
    const { id } = params; // Assume the ID is passed as a parameter
  
    try {
      await prisma.post.delete({
        where: {
          id: parseInt(id),
        },
      });
      await prisma.$disconnect();
      return { 
            status: 204,
            body:''
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
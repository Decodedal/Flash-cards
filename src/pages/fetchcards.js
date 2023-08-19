import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function get({ params, request }) {
  async function main() {
    const data = await prisma.post.findMany()
    return data
  }

  try {
    const data = await main()
        return {
      body: JSON.stringify(data),
    }
  } catch (e) {
    console.error(e)
        process.exit(1)
  }
}



export async function post({ request }) {
  try {
    const body = await request.text(); // or request.json() if you're sending JSON
    const cardData = JSON.parse(body);

    const newCard = await prisma.post.create({
      data: cardData,
    });
    
    return {
      status: 201,
      body: JSON.stringify(newCard),
    };
  } catch (e) {
    console.error(e);
    
    return {
      status: 500,
      body: JSON.stringify({ error: 'An error occurred while creating the card' }),
    };
  }
}

export async function put({ request }){
  try{
    const body = await request.json();
    
    const updatedCard = await prisma.post.update({
      where:{
        id:parseInt(body.id)
      },
      data:{
        question:body.question,
        answer:body.answer
      }
    });
    
    return{
      status:200,
      body: JSON.stringify(updatedCard)
    }
  }catch(err){
    console.log(err)
    return{
      status:500,
      body:JSON.stringify({message:err})
    }
  }
}
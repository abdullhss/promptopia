import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";


// GET 

export const GET = async (request , {params}) =>{
    try{
        await connectToDB() ;

        const prompt = await Prompt.findById(params.id).populate("creator") ;
        
        if(!prompt){
            return new Response("Prompt Not found !" , {status:404 })
        }
        
        return new Response(JSON.stringify(prompt) , {status:200 })
    }
    catch(error){
        return new Response("faild to fetch all prompts" , {status:500})
    } 
}

// PATCH 
export const PATCH = async (request , {params}) =>{
    const {prompt , tag} = await request.json() ;
    
    try{
        await connectToDB() ; 
        
        const existingPrompt = await Prompt.findById(params.id) ; 
        
        if(!existingPrompt){
            return new Response("Prompt Not found !" , {status:404 })
        }
        
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag 

        await existingPrompt.save() ; 
        return new Response(JSON.stringify(existingPrompt) , {status:200 })

    } catch (error){
        return new Response("faild to fetch all prompts" , {status:500})
    }
}

// DELETE 
export const DELETE = async (request, { params }) => {
    try {
      await connectToDB();
      console.log("Connected to DB");
  
      const existingPrompt = await Prompt.findById(params.id); 
  
      if (!existingPrompt) {
        return new Response("Prompt not found!", { status: 404 });
      }
  
      await existingPrompt.deleteOne(); 

      return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
      console.error("Error deleting prompt:", error);
      return new Response("Failed to delete prompt", { status: 500 });
    }
  };



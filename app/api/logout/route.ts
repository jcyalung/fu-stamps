
import { NextResponse } from "next/server";



export async function GET(request: Request){
    try{

        //extract jwt


        //if age is valid then change it and return 200

        //else then return 400 becuase there is no session 


   
   
   
    }catch(error:any){
        return NextResponse.json({message:error.message},{status:500});
    }







}
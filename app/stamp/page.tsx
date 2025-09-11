import Stamp from "@/components/stamp";
 
export default async function StampPage() { 
  return (
    <div className="flex justify-center min-w-screen min-h-screen bg-lightyellow">
        <div className="mt-[160px]">
            <Stamp />
        </div>
    </div>
  )
}
import { auth, signOut } from "@/auth";
import { Button, Link } from "@nextui-org/react";
import { FaRegSmile } from "react-icons/fa";
import { GoSmiley } from "react-icons/go";

export default async function Home() {
  const session = await auth()
  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-6">
      <h1 className="text-4xl font-bold">nextdate</h1>
      {session ? (<Button as={Link} href='/members' size="lg" color="default" variant="bordered">continue</Button>) :
        (<div className="flex flex-row gap-4"><Button as={Link} href="/login" size='lg' color='default' variant="bordered">sign in</Button>
          <Button as={Link} href="/register" size="lg" color="default" variant="bordered">register</Button></div>)
        //  (
        //   <div>
        //     <pre>{JSON.stringify(session, null, 2)}</pre>
        //     <form action={async () => {
        //       'use server'
        //       await signOut()
        //     }}>
        //       <Button type="submit" color="primary" variant="bordered" startContent={<FaRegSmile size={20}></FaRegSmile>}>sign out</Button>
        //     </form>
        //   </div>
        // ) : (<div>not signed</div>)}
      }

    </div>
  );
}

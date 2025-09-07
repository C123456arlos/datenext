import { auth, signOut } from "@/auth";
import { Button, Link } from "@nextui-org/react";
import { FaRegSmile } from "react-icons/fa";
import { GoSmiley } from "react-icons/go";

export default async function Home() {
  const session = await auth()
  return (
    <div>
      <h1 className="text-3xl">hello nextjs</h1>
      <h2 className="text-2xl font-semibold">user session data</h2>
      {session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <form action={async () => {
            'use server'
            await signOut()
          }}>
            <Button type="submit" color="primary" variant="bordered" startContent={<FaRegSmile size={20}></FaRegSmile>}>sign out</Button>
          </form>
        </div>
      ) : (<div>not signed</div>)}
      <Button as={Link} href="/members" color="primary" variant="bordered" startContent={<GoSmiley></GoSmiley>}>click me</Button>
    </div>
  );
}

import HomeClient from "./home";
import {auth} from "@/auth"

export default async function Home() {
  const session = await auth();
  let user = false;
  if (session?.user) {
    user = true;
  }
  console.log(user)
  return (
    <div>
      <HomeClient user={user}/>
    </div>
  )
}
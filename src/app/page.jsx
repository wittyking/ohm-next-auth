"use client"

import Image from "next/image";
import Navebar from "./component/Navbar";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession()
  return (
    <main >
      <Navebar />
      <div className="container mx-auto">
        <h3>Welcome to home page</h3>
        <hr className="my-3"/>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. In exercitationem inventore atque quod qui sapiente omnis repellendus cumque accusantium officia ipsam, fugiat provident debitis suscipit minima? Excepturi omnis iusto velit!</p>
      </div>
    </main>
  );
}

import Link from 'next/link';
import { signIn, useSession } from "next-auth/react";
import { authenticate, googleAuthenticate } from "@/app/lib/actions" // added import
import { useFormState } from "react-dom"
export default function Right() { 
  const [errorMsgGoogle, dispatchGoogle] = useFormState(googleAuthenticate, undefined) //googleAuthenticate hook
  // const {data:session} = useSession();
  return (
 
<div>
<form action={dispatchGoogle}>
    <button>
        Google Sign In
    </button>
    <p>{errorMsgGoogle}</p>
</form>
<button onClick={() => signIn()}> 왜 안돼</button>
</div>
  );
}

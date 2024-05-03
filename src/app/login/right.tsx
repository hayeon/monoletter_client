import { googleAuthenticate } from "@/app/lib/actions" // added import
import { useSession } from "next-auth/react";
import { useFormState } from "react-dom"
export default function Right() { 
  const [errorMsgGoogle, dispatchGoogle] = useFormState(googleAuthenticate, undefined) //googleAuthenticate hook
  const {data:session} = useSession();
  console.log(session);

  return (
 
<div>
<form action={dispatchGoogle}>
    <button>
        Google Sign In
    </button>
    <p>{errorMsgGoogle}</p>
</form>
</div>
  );
}

import { useSession } from "next-auth/react";
import { useFormState } from "react-dom"
export default function Right() { 
  const {data:session} = useSession();
  console.log(session);

  return (
 
<div>
    <button>
        Google Sign In
    </button>
</div>
  );
}

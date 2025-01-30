
import {LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Login() {
return (
<>
<div className="flex flex-col h-screen w-screen items-center justify-center">
<h1 className="text-3xl font-bold">
Hello @ Dave&apos;s repair shop</h1>
<LoginLink className="m-10">Sign in</LoginLink>
</div>
</>
)
}
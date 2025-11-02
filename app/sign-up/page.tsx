import { SignUp } from "@stackframe/stack";
import Link from "next/link";

export default function SignUpPage() {
    return(
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="max-w-md w-full space-y-8">
                <SignUp/>
                <Link href="/" className="mt-4 block text-purple-600 hover:underline">Back to home</Link>
            </div>
        </div>
    );
}
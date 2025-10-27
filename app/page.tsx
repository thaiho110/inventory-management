import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const user = await stackServerApp.getUser();
  if (user) {
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-puprple-50 to-purple-100 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Inventory Management
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Streamline your inventory tracking and management with our
            user-friendly application designed to help you stay organized and
            efficient. Track stock levels, manage orders, and generate reports all in
            one place.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/sign-in" 
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="#" 
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold border-2 border-purple-600 hover:bg-purple-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import SignupForm from "@/components/SignupForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();
  if (session) redirect("/");

  return (
    <div className="min-h-screen mt-32 px-4">
      <SignupForm />
    </div>
  );
}

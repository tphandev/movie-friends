import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function Page() {
  const providers = (await getProviders()) || [];
  const session = await getServerSession();

  if (session) redirect("/");

  return (
    <div className="min-h-screen mt-32 px-4">
      <LoginForm
        providers={Object.values(providers)
          .filter(({ type }) => type === "oauth")
          .map(({ id, name }) => ({
            id,
            name,
          }))}
      />
    </div>
  );
}

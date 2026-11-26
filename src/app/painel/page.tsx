import { redirect } from "next/navigation";
import ContentAdmin from "@/components/admin/ContentAdmin";
import { getAdminSession } from "@/lib/admin-auth";
import {
  getAdminSiteContent,
  isContentStoreConfigured,
} from "@/lib/content-store";

export default async function PainelPage() {
  const session = await getAdminSession();
  if (!session) redirect("/painel/login");

  const snapshot = await getAdminSiteContent();

  return (
    <ContentAdmin
      initialSnapshot={snapshot}
      storageConfigured={isContentStoreConfigured()}
      email={session.email}
    />
  );
}


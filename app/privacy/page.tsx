import { privacy } from "@/lib/legal";
import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const metadata = legalMetadata(privacy, "/privacy/");

export default function PrivacyPage() {
  return <LegalPage doc={privacy} related={{ href: "/consent/", label: "Согласие на обработку персональных данных" }} />;
}

import { consent } from "@/lib/legal";
import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const metadata = legalMetadata(consent, "/consent/");

export default function ConsentPage() {
  return <LegalPage doc={consent} related={{ href: "/privacy/", label: "Политика конфиденциальности" }} />;
}

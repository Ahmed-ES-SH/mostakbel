import ar from "@/messages/ar.json";
import en from "@/messages/en.json";
import nl from "@/messages/nl.json";  

type Locale = "ar" | "en" | "nl";
type Messages = typeof ar;
type Namespace = keyof Messages;

export function getServerTranslation<N extends Namespace>(
  locale: Locale = "ar",
  namespace: N
) {
  const messages: Messages = locale === "en" ? en : locale === "nl" ? nl : ar;
  return messages[namespace];
}

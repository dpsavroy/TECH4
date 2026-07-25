import { redirect } from "next/navigation";

/**
 * Root page — redirects to the default locale (/pl).
 * The middleware handles this for most requests, but this ensures
 * Next.js has a valid route at `/` without a 404.
 */
export default function RootPage() {
  redirect("/pl");
}

import { getPublishedCount } from "@/lib/notes";
import { NavShell } from "./NavShell";

// Server component — reads published note count at build time
// to decide whether to show the "Notes" link in the nav.
export function Nav() {
  const showNotes = getPublishedCount() >= 3;
  return <NavShell showNotes={showNotes} />;
}

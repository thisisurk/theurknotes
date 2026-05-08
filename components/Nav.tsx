import { NavShell } from "./NavShell";

// Thin wrapper kept so `layout.tsx` import path stays stable.
// Per v0.3 spec the nav is always 4 items (no `getPublishedCount` gate).
export function Nav() {
  return <NavShell />;
}

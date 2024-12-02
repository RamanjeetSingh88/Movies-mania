"use client"; // Enables client-side rendering for this layout.

import { SessionProvider } from "next-auth/react"; // Import the NextAuth session provider for managing user authentication state.


// This ensures that all nested components can access session-related information.
export default function SessionLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>; 
}

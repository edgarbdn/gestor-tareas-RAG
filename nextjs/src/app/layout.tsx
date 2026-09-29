import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mi App · Gestor de tareas",
  description: "Organiza tus tareas y pregúntale a tu asistente IA",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let logueado = false;

  if (token) {
    logueado = true;
  }

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AuthProvider estaLogueadoInicial={logueado}>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

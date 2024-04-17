import "~/styles/globals.css";

export const metadata = {
  title: "Unskew the League",
  description: "Conference-Adjusted NBA Rankings",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`flex justify-center bg-gray-50`}>{children}</body>
    </html>
  );
}

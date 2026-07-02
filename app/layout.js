export const metadata = {
  title: "World Talent Olympiad"
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}

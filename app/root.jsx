import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./styles/app.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta = () => ({
  charset: "utf-8",
  title: "Will Beaumont",
  viewport: "width=device-width,initial-scale=1",
});

function Document({ children, title = meta.title }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <title>{title}</title>
        <Links />
      </head>
      <body className="bg-bg-pri text-txt-pri">
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <Document title="Uh-oh!">
      <div className="bg-red-600 text-white p-14">
        <h1 className="text-3xl pb-8">App Error</h1>
        <pre>{error.message}</pre>
      </div>
    </Document>
  );
}

import Head from "next/head";
import { Container } from "react-bootstrap";
import TopNavbar from "./topNavbar";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <TopNavbar/>
          {children}
        </main>
    </div>
  );
}

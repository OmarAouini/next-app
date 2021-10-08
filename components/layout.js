import Head from "next/head";
import { Container } from "react-bootstrap";

export default function Layout({ children }) {
  return (
    <Container fluid className="layout">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>{children}</main>
    </Container>
  );
}

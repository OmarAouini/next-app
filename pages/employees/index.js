import { PrismaClient } from ".prisma/client";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { isAuthenticated, withAuthenticated } from "../api/auth/authenticated_middleware";

export default function Employees({ employees }) {

  return (
    <Container fluid className="employees-container">
      <h1>employees</h1>
      {employees.map((empl) => {
        return (
          <div key={empl.id}>
            <Link as={"/employees/" + empl.name} href="/employees/[employee]">
              <a>{empl.name}</a>
            </Link>
          </div>
        );
      })}
    </Container>
  );
}

const prisma = new PrismaClient();

export async function getServerSideProps({req, res}) {

    //TODO put in utils file
    const sendRedirectLocation = (location) => {
        res.writeHead(302, {
          Location: location,
        });
        res.end();
        return { props: {} }; // stop execution
      };
    
     // some auth logic here
      const isAuth = await isAuthenticated(req)
    
      if (!isAuth) {
        sendRedirectLocation('/login')
      }

    let employees = await prisma.employee.findMany();

    if (!employees) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        employees: employees,
      },
    };
  
}

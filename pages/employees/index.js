import { PrismaClient } from ".prisma/client";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { redirectIfUnauthenticated } from "../api/auth/redirect_if_unauthenticated";
import {prisma} from '../api/lib/prisma'

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

export async function getServerSideProps({req, res}) {

  // check if unhanutenticated first
  redirectIfUnauthenticated(req, res)

    const employees = await prisma.employee.findMany();

    if (!employees) {
      return {
        notFound : true
      }
    }
  
    return {
      props: {
        employees: employees,
      },
    };

  
};

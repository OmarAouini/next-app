import { PrismaClient } from ".prisma/client";
import Link from "next/link";
import { Container } from "react-bootstrap";
import useSWR from "swr";
import { withAuthenticated } from "../api/auth/authenticated_middleware";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Employees({ employees }) {
  // const { data, error } = useSWR('/api/employees', fetcher)

  // if (error) return <div>Failed to load</div>
  // if (!data) return <div>Loading...</div>

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
  withAuthenticated(req, res) = (req, res) => {

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
  
}

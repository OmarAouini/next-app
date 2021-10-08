import { PrismaClient } from ".prisma/client";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";

export default function Employee({ tasks }) {
    const router = useRouter()

    const { employee } = router.query

    return (
        <Container fluid className="employee-details-container">
            <h1>name: {employee} with {tasks.length} tasks</h1>
        </Container>
    )
};

const prisma = new PrismaClient()

export async function getServerSideProps(context) {

    let tasks = await prisma.employee.findMany()

    if (!tasks) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            tasks: tasks
        }
    }
}


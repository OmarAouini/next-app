import { PrismaClient } from ".prisma/client"
import { Container } from "react-bootstrap";
import Link from "next/link";

export default function Employee({ employee }) {
    
    // const router = useRouter()
    // const { employee_query } = router.query

    return (
        <Container fluid className="employee-details-container">
            <h1>name: {employee.name} with {employee.tasks.length} tasks</h1>
            {employee.tasks.map(task => {
                return (<div key={task.id}>
                        <Link as={"/tasks/" + task.id} href="/tasks/[task_id]">
                            <a>{task.title}</a>
                        </Link>
                    </div>)
            })}
        </Container>
    )
};

const prisma = new PrismaClient()

export async function getServerSideProps(context) {

    //get employee with all tasks
    let empl = await prisma.employee.findFirst({
        where : {
            name : context.query.employee
        },
         include : {
             tasks : true
         }
        })
    
    if (!empl) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            employee: empl
        }
    }
}


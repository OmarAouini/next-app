import { PrismaClient } from '.prisma/client'
import { Container } from 'react-bootstrap'
import TableComp from '../../components/TableComp'

export default function Projects(projects) {

    return (
        <Container fluid className="projects-container">
            <h1>Projects</h1>
            {[].map(project => {
                return (
                    <div key={project.id}>
                        <h4>{project.title}</h4>
                    </div>
                )
            })}
        <TableComp/>
        </Container>
    )
}

const prisma = new PrismaClient()

export async function getServerSideProps(context) {

    let projects_res = await prisma.project.findMany()

    if (!projects_res) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            projects: projects_res
        }
    }
}
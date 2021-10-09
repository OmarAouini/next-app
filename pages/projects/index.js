import { PrismaClient } from '.prisma/client'
import { Container } from 'react-bootstrap'

export default function Projects(projects) {

    return (
        <Container fluid className="projects-container">
            <h1>Projects</h1>
            {projects.map(project => {
                return (
                    <div key={project.id}>
                        <h4>{project.title}</h4>
                    </div>
                )
            })}
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
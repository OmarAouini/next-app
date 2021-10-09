import { PrismaClient } from '.prisma/client'
import React from 'react'
import { Container } from 'react-bootstrap'

export default function Tasks({ tasks }) {

    return (
        <Container fluid className="tasks-container">
            <h1>tasks</h1>
            {tasks.map(task => {
                return (
                    <div key={task.id}>
                        <h4>{task.title}</h4>
                    </div>
                )
            })}
        </Container>
    )
}

const prisma = new PrismaClient()

export async function getServerSideProps(context) {

    let tasks_res = await prisma.task.findMany()

    if (!tasks_res) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            tasks: tasks_res
        }
    }
}
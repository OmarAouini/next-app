import { PrismaClient } from ".prisma/client";
import { Container } from "react-bootstrap";

export default function Task({ task }) {
  return (
    <Container fluid className="task-details-container">
      <h1>{task.title}</h1>
      <h4>{task.content}</h4>
    </Container>
  );
}

const prisma = new PrismaClient();

export async function getServerSideProps(context) {
  //get single task
  let task = await prisma.task.findUnique({
    where: {
      id: parseInt(context.query.task_id),
    },
  });

  if (!task) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      task: task,
    },
  };
}

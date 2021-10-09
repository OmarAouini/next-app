import { Table } from "react-bootstrap"
import TableRow from "./tableRow"


const TableComp = (props) => {

    const tableheader = (keys) => {
        return (
        <thead>
            <tr>
            <th>#</th>
            <th> Name</th>
            <th>Last </th>
            <th>Username</th>
            </tr>
        </thead>
        )
    }
    
    return (
        <Table striped bordered hover variant="dark">
            {tableheader()}
        <tbody>
            <TableRow/>
        </tbody>
        </Table>
    )
}

export default TableComp

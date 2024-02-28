import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, Paper } from "@mui/material";
// import { db } from '../config/firebase';
// import { getDocs, collection } from 'firebase/firestore';
import { useEffect } from "react";
// const peopleCollectionRef = collection(db, 'people');

function TableBeacon() {
    // const [ peopleList, setPeopleList ] = useState([]);
    useEffect(() => {
        const getPeopleList = async () => {
        try{
            // const data = await getDocs(peopleCollectionRef);
            // const filteredData = data.docs.map((doc) => ({
            // ...doc.data(),
            // id: doc.id
            // }))
            // setPeopleList(filteredData);
            
        }catch(error){
            console.error(error);
        }
        }
        getPeopleList();
    }, [])
  return (
    <TableContainer component={Paper} elevation={0}>
        <Table aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="right">Email</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {temp_data.map((row) => (
                <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="center">{row.first_name}</TableCell>
                <TableCell align="center">{row.last_name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default TableBeacon;

const temp_data = [
    {id: 5, first_name: 'Aspin', last_name: 'Puspin', email: 'Aspin@Puspin.net'},
    {id: 1, first_name: 'Eggs', last_name: 'Bacon', email: 'Eggs@Bacon.com'},
    {id: 69, first_name: 'Test', last_name: 'Tickles', email: 'tt@page.com'},
    {id: 15, first_name: 'Blue', last_name: 'Wand', email: 'Bluewand@redwang.org'},
    {id: 8, first_name: 'Desu', last_name: 'Knots', email: 'desuknots@mail.com'}
]

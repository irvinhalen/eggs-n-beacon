import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, Paper } from "@mui/material";
// import { db } from '../config/firebase';
// import { getDocs, collection } from 'firebase/firestore';
import { useEffect } from "react";
// const peopleCollectionRef = collection(db, 'people');

function TableBeacon({ tableData }:{ tableData:any }) {
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
                <TableCell align="left">Beacon ID</TableCell>
                <TableCell align="center">Weight Capacity of Truck</TableCell>
                <TableCell align="center">Soil Delivery Occurence</TableCell>
                <TableCell align="right">Timestamp</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {tableData.map((row:any) => (
                <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell align="left">{row.beacon_id}</TableCell>
                <TableCell align="center">{row.truck_type}</TableCell>
                <TableCell align="center">{row.times_pinged_inside}</TableCell>
                <TableCell align="right">{row.timestamp}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default TableBeacon;

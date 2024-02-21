import { Fragment, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, Paper, Box, Stack } from "@mui/material";
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';
const peopleCollectionRef = collection(db, 'people');

function Home() {
  const [ peopleList, setPeopleList ] = useState([]);
  useEffect(() => {
    const getPeopleList = async () => {
      try{
        const data = await getDocs(peopleCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }))
        console.log(filteredData);
        setPeopleList(filteredData);
      }catch(error){
        console.error(error);
      }
    }
    getPeopleList();
  }, [])

  return (
    <Fragment>
      <Navbar />
      <Stack direction='column' bgcolor={'#f4f7f9'}>
        <Box component={'h1'} marginLeft={3}>
        🌱 Soiled It
        </Box>
        <Box display={"flex"} justifyContent={"center"} paddingTop={2} paddingBottom={2}>
          <TableContainer component={Paper} elevation={3} sx={{ width: '90vw' }}>
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
                {peopleList.map((row) => (
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
        </Box>
      </Stack>
      <Footer />
    </Fragment> 
  )
}

  const tableData = [
    {"id":1,"first_name":"Clemence","last_name":"Talton","email":"ctalton0@webmd.com"},
    {"id":2,"first_name":"Sybil","last_name":"Spoerl","email":"sspoerl1@storify.com"},
    {"id":3,"first_name":"Vlad","last_name":"Bonavia","email":"vbonavia2@apache.org"},
    {"id":4,"first_name":"Corissa","last_name":"Aizlewood","email":"caizlewood3@adobe.com"},
    {"id":5,"first_name":"Douglass","last_name":"MacKeogh","email":"dmackeogh4@goo.gl"},
    {"id":6,"first_name":"Leanna","last_name":"Byard","email":"lbyard5@usatoday.com"},
    {"id":7,"first_name":"Rycca","last_name":"De Gogay","email":"rdegogay6@simplemachines.org"},
    {"id":8,"first_name":"Cthrine","last_name":"Normanville","email":"cnormanville7@lulu.com"},
    {"id":9,"first_name":"Benedikt","last_name":"Wager","email":"bwager8@youtube.com"},
    {"id":10,"first_name":"Borden","last_name":"Balle","email":"bballe9@pen.io"},
    {"id":11,"first_name":"Rabi","last_name":"Wohler","email":"rwohlera@quantcast.com"},
    {"id":12,"first_name":"Jennee","last_name":"Guiducci","email":"jguiduccib@bbc.co.uk"},
    {"id":13,"first_name":"Laurella","last_name":"Crossby","email":"lcrossbyc@noaa.gov"},
    {"id":14,"first_name":"Rowland","last_name":"Weaben","email":"rweabend@java.com"},
    {"id":15,"first_name":"Betta","last_name":"Melrose","email":"bmelrosee@youtu.be"}
  ]

  export default Home

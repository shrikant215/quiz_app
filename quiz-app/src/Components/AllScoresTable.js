import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

const columns = [
  { id: "serialNumber", label: "#", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "updatedAt", label: "Time", minWidth: 100 },
  { id: "date", label: "Date", minWidth: 100 },
  { id: "score", label: "You Scored", minWidth: 100 },
];

const AllScoresTable = () => {
  const userID = localStorage.getItem("userId");
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/get/userdata");
        console.log("Response:", response.data);
        const arr = response.data.filter((data) => data.loginId === userID);
        console.log(arr, "rrrrrrrrrrrrrrr");
        setUserData(arr);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchData();
  }, [userID]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={{height:'100vh', background:'#f4f4f4'}}>
    <div style={{margin:'25px'}}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440}} >
          <Table stickyHeader aria-label="sticky table" >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody  >
              {userData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell align="center">{index + 1}</TableCell>{" "}
                      {/* Serial number column */}
                      {columns.slice(1).map((column) => {
                        // Slice the columns array to exclude the serial number column
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align="center">
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={userData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </Paper>
    </div>
    </div>
  );
};

export default AllScoresTable;

import { useState, useEffect } from "react";
import "./App.css";
import ProgressBar from "./components/ProgressBar";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import * as signalR from "@microsoft/signalr";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import Typography from "@mui/material/Typography";

function App() {
  const [progress, SetProgress] = useState(0);
  const [id, SetId] = useState("");
  useEffect(() => {
    //
    let id = uuidv4();
    SetId(id);
    let connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7181/progress")
      .build();
    connection.start();
    connection.on(id, (data) => {
      console.log("DATA: ", data);
      SetProgress(data);
    });
  }, []);
  //
  const getdata = () => {
    fetch(`https://localhost:7181/api/Progress/send/status?Id=${id}`);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#1A2027",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <Box sx={{ width: "90%" }} p={10}>
      <Item>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} mt={5} p={10}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Button variant="contained" onClick={getdata}>
                UPDATE PROGRESS
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <ProgressBar value={progress} />
              <Box sx={{ minWidth: 35 }} p={4}>
                <Typography variant="h5" color="#9CFF2E">{`${Math.round(
                  progress
                )}%`}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Item>
    </Box>
  );
}
export default App;

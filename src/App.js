import React, { useRef, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import { Box } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Kelompok 6
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },

  boxHasil: {
    border: "1px solid black",
    borderRadius: 4,
    padding: 8,
    height: 250,
  },
}));

const databaseSementara = ["buku", "pensil", "kertas"];

const Album = () => {
  const [input, setInput] = useState("");
  const [arrKata, setArrKata] = useState([]);
  const refBoxHasil = useRef(null);

  const classes = useStyles();

  const cekTypo = () => {
    setArrKata(input.split(" "));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <EmojiObjectsIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Pendeteksi Salah Ketik Bahasa Indonesia
          </Typography>
        </Toolbar>
      </AppBar>

      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Masukkan Teks yang Akan Dideteksi
            </Typography>
            <form noValidate autoComplete="off">
              <TextField
                onChange={(e) => setInput(e.target.value)}
                id="outlined-basic"
                variant="outlined"
                multiline
                rows={12}
                fullWidth
              />
            </form>
            <div className={classes.heroButtons}>
              <Grid container justify="center">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ padding: "12px 100px" }}
                  onClick={cekTypo}
                >
                  Deteksi
                </Button>
              </Grid>
            </div>

            <Typography
              style={{ marginTop: 70 }}
              component="h3"
              variant="h3"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Hasil Deteksi
            </Typography>
            <Box
              component="div"
              m={1}
              ref={refBoxHasil}
              className={classes.boxHasil}
            >
              {arrKata.map((item, key) => {
                if (databaseSementara.includes(item)) {
                  return (
                    <span key={key} style={{ color: "black" }}>
                      {item}{" "}
                    </span>
                  );
                }
                return (
                  <span key={key} style={{ color: "red" }}>
                    {item}{" "}
                  </span>
                );
              })}
            </Box>
          </Container>
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Kelompok 6
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Tugas Workshop Produksi Perangkat Lunak
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
};

export default Album;

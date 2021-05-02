import React, { useState } from "react";
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
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/",
});

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

// const databaseSementara = ["buku", "pensil", "kertas"];

const PageCekTypo = () => {
  const [inputText, setInputText] = useState("");
  const [dataKata, setDataKata] = useState([]); // Array of Objects

  const styles = useStyles();

  const cekTypo = async (text) => {
    const arrKata = (text || inputText).split(" ");
    let newDataKata = [];
    for (let i = 0; i < arrKata.length; i++) {
      const item = arrKata[i];

      const { data: resData } = await api.get(`cekkata/${item}`);
      newDataKata = [...newDataKata, { kata: item, isValid: resData }];
    }
    // console.log(newDataKata);
    setDataKata(newDataKata);
  };

  const showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      setInputText(text);
      cekTypo(text);
    };
    reader.readAsText(e.target.files[0]);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <EmojiObjectsIcon className={styles.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Pendeteksi Salah Ketik Bahasa Indonesia
          </Typography>
        </Toolbar>
      </AppBar>

      <main>
        <div className={styles.heroContent}>
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
              <Button
                variant="contained"
                component="label"
                style={{ marginBottom: 10 }}
              >
                Txt
                <input type="file" hidden onChange={showFile} />
              </Button>
              <TextField
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                id="outlined-basic"
                variant="outlined"
                multiline
                rows={12}
                fullWidth
              />
            </form>
            <div className={styles.heroButtons}>
              <Grid container justify="center">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ padding: "12px 100px" }}
                  onClick={() => cekTypo(inputText)}
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
            <Box component="div" m={1} className={styles.boxHasil}>
              {dataKata.map((item, key) => {
                if (item.isValid) {
                  return (
                    <span key={key} style={{ color: "black", fontSize: 16 }}>
                      {item.kata}{" "}
                    </span>
                  );
                }
                return (
                  <span key={key} style={{ color: "red", fontSize: 16 }}>
                    {item.kata}{" "}
                  </span>
                );
              })}
            </Box>
          </Container>
        </div>
      </main>
      {/* Footer */}
      <footer className={styles.footer}>
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

        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="#">
            Kelompok 6
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
};

export default PageCekTypo;

import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
import { Box, InputLabel } from "@material-ui/core";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/",
});

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
    color: "black",
  },
  heroContent: {
    backgroundColor: "#f8eded",
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
    backgroundColor: "#e4bad4",
    padding: theme.spacing(1),
  },

  boxHasil: {
    border: "1px solid black",
    borderRadius: 4,
    padding: 8,
    height: 250,
  },
}));

const PageCekTypo = () => {
  const [inputText, setInputText] = useState("");
  const [dataKata, setDataKata] = useState([]); // Array of Objects
  // * Insert & Hapus kata
  const [insertKata, setInsertKata] = useState({
    password: "",
    kata: "",
  });
  const [hapusKata, setHapusKata] = useState({
    password: "",
    kata: "",
  });

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

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const listKataTypo = dataKata
      .filter((o) => !o.isValid)
      .map((o) => o.kata)
      .join(", ");
    console.log(dataKata);
    const file = new Blob(
      [
        `TEKS YANG DICEK:\n${inputText}\n\nKATA YANG SALAH KETIK:\n${listKataTypo}`,
      ],
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "Hasil Pengecekan.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
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

  const addKata = async () => {
    if (insertKata.password == "kelompok6") {
      const { data: resData } = await api.get(`insertkata/${insertKata.kata}`);
      if (resData) {
        alert(`Kata ${insertKata.kata} berhasil ditambahkan`);
      } else {
        alert(`Kata ${insertKata.kata} gagal ditambahkan`);
      }
    } else {
      alert("Kata sandi salah");
    }
  };

  const deleteKata = async () => {
    if (hapusKata.password == "kelompok6") {
      const { data: resData } = await api.get(`deletekata/${hapusKata.kata}`);
      if (resData) {
        alert(`Kata ${hapusKata.kata} berhasil ditambahkan`);
      } else {
        alert(`Kata ${hapusKata.kata} gagal ditambahkan`);
      }
    } else {
      alert("Kata sandi salah");
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar style={{ backgroundColor: "#e4bad4" }}>
          <EmojiObjectsIcon className={styles.icon} />
          <Typography variant="h6" style={{ color: "black" }} noWrap>
            Pendeteksi Salah Ketik Bahasa Indonesia
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={styles.heroContent}>
          <Container maxWidth="md">
            <Card>
              <CardContent>
                <h1>INFO dan TIPS</h1>
                <Typography
                  component="h6"
                  variant="h6"
                  align="left"
                  color="textPrimary"
                  gutterBottom
                >
                  1. Gunakan Tools ini dengan internet dengan kecepatan yang
                  stabil.
                  <br />
                  2. Anda dapat menggunggah file .txt atau dokumen pada Tools
                  ini
                  <br />
                  3. Database kami tidak menyimpan nama orang, nama jalan, nomor
                  dokumen atau angka, singkatan dan bahasa asing. Maka akan
                  ditandai dengan font berwarna merah yang berarti typo.
                  <br />
                  4. Jika pergantian paragraf maka kata sebelum tanda titik (.)
                  dan kata setelahnya akan ditandai dengan typo
                </Typography>
              </CardContent>
            </Card>
            <br />
            <Card>
              <CardContent>
                {" "}
                <h1>CARA PENGGUNAAN</h1>
                <Typography
                  component="h6"
                  variant="h6"
                  align="left"
                  color="textPrimary"
                  gutterBottom
                >
                  1. Siapkan teks berbahasa Indonesia yang akan dicek. Bisa
                  berupa teks langsung atau teks dalam file txt.
                  <br />
                  2. Inputkan pada kolom "Masukkan Teks yang Akan Dideteksi"
                  lalu tekan Test
                  <br />
                  3. Hasil Deteksi akan otomatis ditambilkan pada kolom "Hasil
                  Deteksi"
                </Typography>
              </CardContent>
            </Card>
            <Typography
              style={{ marginTop: 70 }}
              component="h3"
              variant="h3"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Masukkan Kata yang Akan Dideteksi
            </Typography>
            <form noValidate autoComplete="off" style={{ marginTop: 5 }}>
              <Button
                variant="contained"
                component="label"
                style={{ marginBottom: 10, backgroundColor: "#caf7e3" }}
              >
                Unggah File Txt
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
                  size="large"
                  style={{
                    padding: "12px 100px",
                    backgroundColor: "#caf7e3",
                    color: "black",
                  }}
                  onClick={() => cekTypo(inputText)}
                >
                  Deteksi
                </Button>
              </Grid>
            </div>

            <Typography
              style={{ marginTop: 50 }}
              component="h3"
              variant="h3"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Hasil Deteksi
            </Typography>

            {dataKata.length > 0 && (
              <Button
                variant="contained"
                component="label"
                style={{ marginBottom: 10, backgroundColor: "#caf7e3" }}
                onClick={downloadTxtFile}
              >
                Unduh Hasil Pengecekan
              </Button>
            )}
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

            {/* TAMBAH KATA */}
            <Grid container alignItems="center" style={{ marginTop: 100 }}>
              <Grid item xs={2}>
                <InputLabel>Tambah Kata</InputLabel>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  label="Kata Sandi"
                  fullWidth
                  value={insertKata.password}
                  onChange={(e) =>
                    setInsertKata((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  label="Kata yang Ditambah"
                  style={{ marginLeft: 8 }}
                  fullWidth
                  value={insertKata.kata}
                  onChange={(e) =>
                    setInsertKata((prev) => ({
                      ...prev,
                      kata: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  component="label"
                  style={{ backgroundColor: "greenyellow", marginLeft: 16 }}
                  onClick={addKata}
                >
                  Tambah
                </Button>
              </Grid>
            </Grid>

            {/* HAPUS KATA */}
            <Grid container alignItems="center" style={{ marginTop: 20 }}>
              <Grid item xs={2}>
                <InputLabel>Hapus Kata</InputLabel>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  label="Kata Sandi"
                  fullWidth
                  value={hapusKata.password}
                  onChange={(e) =>
                    setHapusKata((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  label="Kata yang Dihapus"
                  style={{ marginLeft: 8 }}
                  fullWidth
                  value={hapusKata.kata}
                  onChange={(e) =>
                    setHapusKata((prev) => ({
                      ...prev,
                      kata: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  component="label"
                  style={{ backgroundColor: "orange", marginLeft: 16 }}
                  onClick={deleteKata}
                >
                  Hapus
                </Button>
              </Grid>
            </Grid>
          </Container>
        </div>
      </main>
      {/* Footer */}
      <footer className={styles.footer}>
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
    </>
  );
};

export default PageCekTypo;

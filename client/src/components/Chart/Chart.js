import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
} from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useHistory } from "react-router-dom";
import DateMomentUtil from "@date-io/moment";
import { makeStyles } from "@material-ui/core/styles";
import { ChevronLeft } from "@material-ui/icons";
import moment from "moment";


import { getLocalStorage } from "./LocalStorage";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  acciones: {
    padding: "1em",
  },
}));

export default function Accion() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();


  const [tiempo, setTiempo] = useState("TR");
  const [intervalo, setIntervalo] = useState("");
  const [fechaHoraDesde, setFechaHoraDesde] = useState(moment());
  const [fechaHoraHasta, setFechaHoraHasta] = useState(moment());

  const [sesion, setSesion] = useState("");
  const [loadData, setLoadData] = useState(false);

  const [dataX, setDataX] = useState([]);
  const [label, setLabel] = useState([]);

 
const BASE_URL = process.env.BASE_URL;

const key = process.env.API_KEY;

function AccionService() {

  const getBySymbol = async (symbol) => {
    const { data } = await axios.get(
      `${PROC}/stocks?symbol=${symbol}&source=docs`
    );

    return data;
  };

  const getData = async (symbol, interval, start_date, end_date) => {
    let completeUrl =
      BASE_URL + `/time_series?symbol=${symbol}&interval=${interval}`;

    if (start_date) {
      completeUrl += `&start_date=${start_date}`;
    }

    if (end_date) {
      completeUrl += `&end_date=${end_date}`;
    }

    completeUrl += `&apikey=${key}`;

    const data = await axios.get(completeUrl);

    return data;
  };
}

const instance = new AccionService();

//Falta implementacion de funciones
  useEffect(() => {
    const loadData = async () => {
      let { data } = await AccionService.getBySymbol(id);

    
    };
    try {
      loadData();
      const data = JSON.parse(getLocalStorage("sesion"));
      setSesion(data.usuario);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadData(true);
    }
  }, [id]);

  const handleChange = (e) => {
    setIntervalo(e?.target?.value);
  };

  const getAccionData = async () => {
    let  NEW_DATE_HS_D;
    let  NEW_DATE_HS_H;

    if (tiempo === "HI") {
      NEW_DATE_HS_D = fechaHoraDesde.replace(" ", "%20");
      NEW_DATE_HS_H = fechaHoraHasta.replace(" ", "%20");
    } else {
      NEW_DATE_HS_D = null;
      NEW_DATE_HS_H = null;
    }

    const { data } = await AccionService.getData(
      id,
      intervalo,
      NEW_DATE_HS_D,
      NEW_DATE_HS_H
    );

    const label_x = data.values.map((d) => d.datetime);

    const data_x = data.values.map((d) => Number(d.close));

    setDataX(data_x);
    setLabel(label_x);
  };

  const handleTiempoChange = (e) => {
    setTiempo(e.target.value);
  };

  const handleDatePickerChange = (e, picker) => {
    const date = moment(e).format("yyyy/MM/D HH:mm:ss");

    if (picker === "DESDE") {
      setFechaHoraDesde(date);
    } else if (picker === "HASTA") {
      setFechaHoraHasta(date);
    }
  };

  if (!loadData) return null;

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="flex-start"
      alignItems="stretch"
     
    >
      <Grid item xs={12} sm={12} lg={12}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => history.goBack()}
            >
              <ChevronLeft />
            </IconButton>
            <Typography variant="h6" >
         
            </Typography>
            <Button color="inherit"></Button>
          </Toolbar>
        </AppBar>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={5}
    
        >
          <Grid item xs={12} sm={12} lg={12}>
            <MuiPickersUtilsProvider utils={DateMomentUtil}>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={tiempo}
                  onChange={handleTiempoChange}
                >
                  <FormControlLabel
                    value="TR"
                    control={<Radio />}
                    label="Tiempo Real"
                  />
                  <Grid container direction="row" spacing={5}>
                    <Grid item>
                      <FormControlLabel
                        value="HI"
                        control={<Radio />}
                        label="Histórico"
                      />
                    </Grid>
                    <Grid item>
                      <DateTimePicker
                        size="small"
                        label="Fecha Hora "
                        inputVariant="outlined"
                        format="yyyy/MM/D HH:mm:ss"
                        value={fechaHoraDesde}
                        onChange={(e) => handleDatePickerChange(e, "DESDE")}
                        showTodayButton
                      />
                    </Grid>
                    <Grid item>
                      <DateTimePicker
                        size="small"
                        label="Fecha Hora "
                        inputVariant="outlined"
                        value={fechaHoraHasta}
                        format="yyyy/MM/D HH:mm:ss"
                        onChange={(e) => handleDatePickerChange(e, "HASTA")}
                        showTodayButton
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
                <Grid item xs={6} sm={6} lg={6}>
                  Intervalo:
                  <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={intervalo}
                    onChange={handleChange}
                  >
                    <MenuItem value={"1min"}>1 Minutos</MenuItem>
                    <MenuItem value={"5min"}>5 Minutos</MenuItem>
                    <MenuItem value={"15min"}>15 Minutos</MenuItem>
                  </Select>
                </Grid>
              </FormControl>
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <Button
              variant="contained"
              color="primary"
              disabled={!intervalo}
              onClick={getAccionData}
            >
              Graficar
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                chart: {
                  height: 500,
                  width: 1000,
                  type: "line",
                },
                yAxis: {
                  title: {
                    text: "Cotización",
                  },
                },
                xAxis: {
                  title: {
                    text: "Intervalo",
                  },
                  categories: label,
                },
                plotOptions: {
                  line: {
                    dataLabels: {
                      enabled: true,
                    },
                    enableMouseTracking: false,
                  },
                },
                title: {
                  text: id,
                },
                series: [
                  {
                    name: "Cotización",
                    data: dataX,
                  },
                ],
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};


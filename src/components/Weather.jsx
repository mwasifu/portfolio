import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import axios from "axios";
const Weather = () => {
  const apiKey = "86ddf68890ff862711c0fc76d79c9b6e";
  let id;
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [high, setHigh] = useState("");
  const [low, setLow] = useState("");
  const [feel, setFeel] = useState("");
  const [wind, setWind] = useState("");
  const [condition, setCondition] = useState("");
  const [icon, setIcon] = useState("");
  const [location, setLocation] = useState({
    coordinates: { lat: "", lng: "" },
  });

  const success = (location) => {
    // setLocation({
    //     loaded: true,
    //     lat: location.coords.latitude, lng: location.coords.longitude})
    console.log(location);
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather/?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=imperial&appid=${apiKey}`,
    })
      .then((response) => {
        const cityX = response.data.name;
        setCity(cityX);
        const iconX = response.data.weather[0].icon;
        setIcon(iconX);
        document.getElementById("weatherIcon").src =
          "https://openweathermap.org/img/wn/" + iconX + "@2x.png";
        const tempX = response.data.main.temp;
        setTemperature(tempX + " F");
        const conditionX = response.data.weather[0].main;
        setCondition(conditionX);
        const highX = response.data.main.temp_max;
        setHigh("High: " + highX + " F");
        const lowX = response.data.main.temp_min;
        setLow("Low: " + lowX + " F");
        const feelX = response.data.main.feels_like;
        setFeel("Real Feel: " + feelX + " F");
        const windX = response.data.wind.speed;
        setWind("Wind Speed: " + windX + " mph");
        console.log(response.data);
        navigator.geolocation.clearWatch(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    console.log("from " + city);
  }, [city]);

  const failed = (error) => {
    setLocation({
      loaded: true,
      error,
    });
    console.log("reached failure");
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      failed({
        code: 0,
        message: "Geolocation not supported",
      });
    }
  }, []);

  //

  return (
    <div>
      <Row>
        <Col>
          <Card bg="dark" text="white" border="light">
            <Card.Body>
              <Col className="">
                <Row style={{ padding: "3%" }}>
                  <Card.Title
                    style={{
                      margin: "auto",
                      textAlign: "center",
                      fontSize: "2rem",
                      fontWeight: "200",
                    }}
                  >
                    How's the weather?
                  </Card.Title>
                  <Button
                    variant="secondary"
                    style={{
                      margin: "auto",
                      width: "30%",
                      justifyContent: "center",
                      marginTop: "5%",
                    }}
                    onClick={() => {
                      id = navigator.geolocation.getCurrentPosition(
                        success,
                        failed
                      );
                    }}
                  >
                    Check
                  </Button>
                </Row>
                <Row>
                  <Card.Title
                    style={{
                      marginTop: "8%",
                      fontSize: "2.3rem",
                      fontWeight: "300",
                    }}
                  >
                    {city}
                  </Card.Title>
                </Row>
                <br />
                <Row>
                  <Col xs={12} className="d-flex justify-content-center">
                    <Card.Title
                      style={{
                        fontSize: "2rem",
                        fontWeight: "200",
                        textAlign: "left",
                      }}
                    >
                      {temperature}
                    </Card.Title>
                  </Col>

                  
                </Row>
                <br />
                <Row>
                  <Col xs={12}>

                    <img id="weatherIcon" src="" alt="" />
            
                  </Col>
                  <Col xs={6} md={6}>
                    <Card.Title
                      style={{
                        paddingLeft: "11%",
                        margin: "auto",
                        marginBottom: "10%",
                        fontSize: "2rem",
                        fontWeight: "200",
                        textAlign: "left",
                      }}
                    >
                      {high}
                    </Card.Title>
                    <Card.Title
                      style={{
                        paddingLeft: "11%",
                        margin: "auto",
                        marginBottom: "10%",
                        fontSize: "2rem",
                        fontWeight: "200",
                        textAlign: "left",
                      }}
                    >
                      {low}
                    </Card.Title>
                    <Card.Title
                      style={{
                        paddingLeft: "11%",
                        margin: "auto",
                        marginBottom: "10%",
                        fontSize: "2rem",
                        fontWeight: "200",
                        textAlign: "left",
                      }}
                    >
                      {feel}
                    </Card.Title>
                  </Col>

                  <Col xs={6} md={6}>
                    <Card.Title
                      style={{
                        paddingRight: "11%",
                        margin: "auto",
                        marginBottom: "10%",
                        fontSize: "2rem",
                        fontWeight: "200",
                        textAlign: "right",
                      }}
                    >
                      {condition}
                    </Card.Title>

                    <Card.Title
                      style={{
                        paddingRight: "11%",
                        margin: "auto",
                        marginBottom: "10%",
                        fontSize: "2rem",
                        fontWeight: "200",
                        textAlign: "right",
                      }}
                    >
                      {wind}
                    </Card.Title>
                  </Col>
                </Row>

                <div>
                  <Card.Text
                    style={{
                      textAlign: "right",
                      fontSize: "0.5rem",
                      fontWeight: "100",
                    }}
                  >
                    Powered by OpenWeather
                  </Card.Text>
                </div>
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Weather;

import React, { useEffect, useState } from "react";
import './index.css';
import axios from "axios";
import { Dropdown, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios('https://api.carmart.ru/cars/temp?page=1&perPage=24&isNew%5B0%5D=1&orderBy%5B0%5D%5Bfield%5D=year&orderBy%5B0%5D%5Bdirection%5D=desc')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) return "Loading...";
  if (error) return "Error!";

  let cars = data.meta.filters.brand;
  const items = data.list;

  return (
    <div className="App">
      <main>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{width: '15rem'}}>
            Марка
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {cars.map(car => <Dropdown.Item key={car}>{car}</Dropdown.Item>)}
          </Dropdown.Menu>
        </Dropdown>
        <div className="body">
          <div className="car_Card">
            {items.map((item, index) =>
              <Card border="light" key={index} style={{ width: '21rem', marginTop: '1rem', boxShadow: "0px 0px 24px 0px rgba(34, 60, 80, 0.2)" }}>
                <Card.Body>
                  <Card.Title>{item.classifieds.description} {item.feedData.equipmentVariantName}<span className="year">{item.feedData.modelYear}</span></Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{item.vin}</Card.Subtitle>
                  <Card.Img variant="top" src="https://photobank.carmart.ru/photo/stock-default.jpg" />
                  <Card.Subtitle className="mb-2 text-muted uppercase" style={{ marginTop: '2rem', fontSize: '10px', textTransform: 'uppercase', lineHeight:'1px'}}>Двигатель</Card.Subtitle>
                  <Card.Subtitle className="mb-2" style={{fontSize: '15px'}}>{item.feedData.engine.engineName}<span className="price">{item.feedData.autoPrice}<span className="currency"> ₽</span></span></Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted" style={{ marginTop: '1rem', fontSize: '10px', textTransform: 'uppercase' }}>КПП</Card.Subtitle>
                  <Card.Subtitle className="mb-2" style={{fontSize: '15px'}}>{item.feedData.equipmentVariantTransmissionType}</Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted" style={{ marginTop: '1rem', fontSize: '10px', textTransform: 'uppercase' }}>Тип кузова</Card.Subtitle>
                  <Card.Subtitle className="mb-2" style={{fontSize: '15px'}}>{item.feedData.equipmentVariantBodyType}</Card.Subtitle>
                  <Button variant="success" style={{ marginLeft: '9rem', marginTop: '-5rem', width: '9rem', background: "linear-gradient(90deg, #11998E 0%, #38EF7D 100%)", border: 'none', textTransform: 'uppercase', fontSize: '10px', padding: '0.8rem' }}>Купить</Button>
                </Card.Body>
              </Card>)}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

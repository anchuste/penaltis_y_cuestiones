import HeaderStockInfoTable from './HeaderStockInfoTable';
import RowsStockInfoTable from './RowsStockInfoTable';
import { useEffect, useState, useRef } from 'react';
import {getTopPoints} from './../services/points-service.js'

export const Ranking = ({points, title}) => {

    const [pointsRecovered, setpointsRecovered] = useState([]);

    useEffect(() => {

        console.log("Se ejecuta el useEffect!!!")

        async function fetchData() {
          // You can await here
          console.log("Se ejecuta el fetchData")

          const response = await getTopPoints(points);
          console.info("App - useEffect - rankingPoints: " + response.response[0]);
          for (const property in response.response) {
            console.log(`${property}: ${response.response[property]}`);
          }
          setpointsRecovered(response);
    
          // ...
        }
        fetchData();
    
      }, []);
    // Esta información la recogeremos más adelante de bbdd.
    console.log('Ranking - ', points)
    return (
        <div className="ranking_table">
            <h2 style={{color: "papayawhip", marginTop: "3%", marginBottom: "5%"}}>{title}</h2>
            <table className="container">
	            <HeaderStockInfoTable></HeaderStockInfoTable>
                <RowsStockInfoTable stocksInfo={pointsRecovered}></RowsStockInfoTable>
            </table>
        </div>
    );
}
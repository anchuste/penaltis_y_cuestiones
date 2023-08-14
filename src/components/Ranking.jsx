import HeaderStockInfoTable from './HeaderStockInfoTable';
import RowsStockInfoTable from './RowsStockInfoTable';
import { useEffect, useState, useRef } from 'react';
import {getTopPoints} from './../services/points-service.js'

export const Ranking = ({points, title}) => {

    const [pointsRecovered, setpointsRecovered] = useState([]);

    useEffect(() => {

        //console.log("Se ejecuta el useEffect!!!")

        async function fetchData() {
          const response = await getTopPoints(points);
          setpointsRecovered(response);
        }
        fetchData();
    
      }, []);
    // Esta información la recogeremos más adelante de bbdd.
    //console.log('Ranking - ', points)
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
import HeaderStockInfoTable from './HeaderStockInfoTable';
import RowsStockInfoTable from './RowsStockInfoTable';
import { useEffect, useState, useRef } from 'react';
import {getTopPoints} from './../services/points-service.js'
import PuffLoader from "react-spinners/PuffLoader";

export const Ranking = ({points, title}) => {

    const [pointsRecovered, setpointsRecovered] = useState([]);
    const [showLoading, setshowLoading] = useState(false);
    //const delay = ms => new Promise(res => setTimeout(res, ms));

    const CSSProperties = {
      display: "block",
      margin: "0 auto",
      marginTop: "1em",
      borderColor: "red",
    };

    useEffect(() => {

        //console.log("Se ejecuta el useEffect!!!")

        setshowLoading(true);
        async function fetchData() {
          const response = await getTopPoints(points);
          //await delay(5000);
          setpointsRecovered(response);
          setshowLoading(false)
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
            <PuffLoader
                color={"papayawhip"}
                loading={showLoading}
                size={35}
                cssOverride={CSSProperties}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}
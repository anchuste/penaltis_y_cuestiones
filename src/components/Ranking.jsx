import HeaderStockInfoTable from './HeaderStockInfoTable';
import RowsStockInfoTable from './RowsStockInfoTable';

export const Ranking = (points) => {
    // Esta información la recogeremos más adelante de bbdd.
    console.log('Ranking - ', points)
    return (
        <div className="ranking_table">
            <h2 style={{color: "papayawhip", marginTop: "3%", marginBottom: "5%"}}>Clasificación</h2>
            <table className="container">
	            <HeaderStockInfoTable></HeaderStockInfoTable>
                <RowsStockInfoTable stocksInfo={points}></RowsStockInfoTable>
            </table>
        </div>
    );
}
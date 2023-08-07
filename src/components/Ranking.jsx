import HeaderStockInfoTable from './HeaderStockInfoTable';
import RowsStockInfoTable from './RowsStockInfoTable';

export const Ranking = (points) => {
    // Esta información la recogeremos más adelante de bbdd.
    console.log('Ranking - ', points)
    return (
        <div className="ranking_table">
            <table className="container">
	            <HeaderStockInfoTable></HeaderStockInfoTable>
                <RowsStockInfoTable stocksInfo={points}></RowsStockInfoTable>
            </table>
        </div>
    );
}
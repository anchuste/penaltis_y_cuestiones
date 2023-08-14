export default function RowsStockInfoTable(stocksInfo) {

    //console.log('stocks info: ', stocksInfo)
    const stocksInfoDestruct = stocksInfo.stocksInfo;

    if (undefined == stocksInfoDestruct || stocksInfoDestruct.length === 0){
        return(
            <>
            </>
        )
    }
    //console.log('stocksInfoDestruct: ', stocksInfoDestruct)
    return (
            <tbody>
                {stocksInfoDestruct.response.map((stock, index) => {
                const list = (
                <tr key={stock[1]}> 
                    <td>{index+1}</td>
                    <td>{stock[0]} </td>
                    <td>{stock[1]}</td>
                </tr>
                );
                return list;
            })}
          </tbody>
    );
}
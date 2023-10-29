export default function RowsStockInfoTable(stocksInfo) {

    //console.log('stocks info: ', stocksInfo)
    const stocksInfoDestruct = stocksInfo.stocksInfo;

    if (undefined == stocksInfoDestruct || stocksInfoDestruct.length === 0){
        return(
            <>
            </>
        )
    }

    //console.log('stocksInfoDestruct: ', stocksInfoDestruct);
    //console.log('example: ', stocksInfoDestruct[0].user);
    //console.log('stocksInfoDestruct: ', stocksInfoDestruct)
    return (
            <tbody>
                {stocksInfoDestruct.map((stock, index) => {
                const list = (
                <tr key={stock.id_user_points}> 
                    <td>{index+1}</td>
                    <td>{stock.user} </td>
                    <td>{stock.maxpoints}</td>
                </tr>
                );
                return list;
            })}
          </tbody>
    );
}
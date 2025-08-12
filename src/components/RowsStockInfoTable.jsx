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
            <>
            <thead>
                <tr>
                    <th>Pos.</th>
                    <th>Aciertos</th>
                    <th>Nombre</th>
                </tr>
            </thead>
            <tbody>
                {stocksInfoDestruct.map((stock, index) => {

                const list = (

                <tr key={stock.id_user_points}> 
                    {index % 2 === 0 ? <td>{index+1}</td>
                    : <td style={{backgroundColor: "black"}}>{index+1}</td>}
                    {index % 2 === 0 ? <td>{stock.maxpoints}</td>
                    : <td style={{backgroundColor: "black"}}>{stock.maxpoints}</td>}
                    {index % 2 === 0 ? <td>{stock.user} </td>
                    : <td style={{backgroundColor: "black"}}>{stock.user}</td>}
                </tr>
                );


                return list;
            })}
          </tbody>
          </>
    );
}
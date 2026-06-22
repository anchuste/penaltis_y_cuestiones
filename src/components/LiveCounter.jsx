import soccerFilled from '../assets/football.png';

export function LiveCounter({Lives}){

    const lives = Lives;

    return (
        <>
        <div>
        <div style={{ display: "block", alignItems: "left" }}>
                    {/* Texto "Vidas restantes" */}
                    <span style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#FFF", // Ajusta este color según el diseño
                      marginRight: "12px"
                    }}>
                      Vidas:
                    </span>
        
                  {
                    lives.map(
                      (live, index) => {
                      return (
        
                        <img
                          key={index}
                          src={soccerFilled}
                          style={{
                            width: "24px",
                            height: "24px",
                            marginRight: "4px",
                            opacity: live ? "1" : "0.2", // Cambia opacidad según el valor de live
                            marginTop: "8px"
                          }}
                          alt={live ? "Vida activa" : "Vida inactiva"}
                        />
                      )
                    })
                  }
                  </div>
                  </div>
        
        </>
    );
}
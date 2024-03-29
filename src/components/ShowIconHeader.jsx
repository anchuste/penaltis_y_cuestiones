import trivialLogo from './../assets/trivial_anchus_225_lila.png'
import trivialLogoHor from  './../assets/trivial_anchus_207_hor.png'

export const ShowIconHeader = ({ started, showSummary, navBarstate}) => {

  
  function goToMainPage () {
    window.location.href = '/';
  }

    return (
      <>

        {started &&  !showSummary && navBarstate === 'homeNavBarButton' &&  <img onClick={goToMainPage} src={trivialLogoHor} className='logo_img_home' style={{width: "40%", height: "30%"}} alt='Anchus logotipo' />}
        {!started && showSummary && navBarstate === 'homeNavBarButton' && <img onClick={goToMainPage} src={trivialLogoHor} className='logo_img_home' style={{width: "40%", height: "30%"}} alt='Anchus logotipo' />}
        {!started && !showSummary && navBarstate === 'homeNavBarButton' && <img onClick={goToMainPage} src={trivialLogo} className='logo_img_home' alt='Anchus logotipo' />}

        {!started && !showSummary && 
                        (navBarstate === 'supportNavBarButton' ||
                        navBarstate === 'buyaCoffeeBarButton' ||
                        navBarstate === 'rankingNavBarButton') 
                        && <img src={trivialLogo} className='logo_img_home' alt='Anchus logotipo' />}
      </>
    )
  }
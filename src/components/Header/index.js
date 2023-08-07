import logo from './../../logo_acc_512.png';

export default function Header() {
    return (
            <>
                <header>
                    <a href="/">
                        <img src={logo} alt="logo" className="Acc-logo" />
                    </a>
                </header>
            </>
        
    );
}
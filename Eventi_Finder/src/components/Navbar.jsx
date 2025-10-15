import logo from '../assets/logo.jpg'

export default function Navbar(){
    return(
        <div className='divnavbar'>
            <img src={logo} className="logo" />
            <h1>Application: Event Finder 2.0</h1>
        </div>
    );
}
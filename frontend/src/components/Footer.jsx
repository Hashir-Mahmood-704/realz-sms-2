import Logo from '../assets/logo.jpeg';

const Footer = () => {
    return (
        <footer className="flex justify-center border p-[20px] items-center">
            <div className="flex items-center justify-center gap-[10px]">
                <span className="font-medium">Powered By: </span>
                <a href="https://www.truesip.net" target="_blank">
                    <img src={Logo} alt="logo" className="w-[120px] object-cover" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;

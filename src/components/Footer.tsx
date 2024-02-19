import { useState, useEffect } from "react";

function Footer() {
    const [currentYear, setCurrentYear] = useState(0);

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <div className='footer-wrap'>
            <div className='footer-content'>
                <p className='copyleft'>The year is 20XX. Everyone plays Fox at TAS levels of perfection. Because of this, the winner of a match depends solely on port priority. The RPS metagame has evolved to ridiculous levels due to it being the only remaining factor to decide matches.</p>
                <hr />
                <p className='twentyXX'>&copy; {currentYear} Eggs & Beacon, All rights and lefts.</p>
                <hr />
            </div>
            </div>
    )
}

export default Footer

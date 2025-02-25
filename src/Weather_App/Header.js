import React from 'react'
import { useState, useEffect } from 'react'

function Header({ setCityInput, cityInput, enter, handClick, toggle, DarkMode }) {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 60000);

        return () => clearInterval(interval);
    }, []);
    return (

        <div className="box box1">
            <div className="b_inner">
                <p>{time.toLocaleDateString()}</p>
                <div className="title">
                    <h1>How's the Weather</h1>
                    <div className="search">
                        <input
                            type="text"
                            placeholder="Search the name of the city in English"
                            value={cityInput}
                            onChange={(e) => { setCityInput(e.target.value) }}
                            onKeyPress={enter}
                            className={DarkMode ? "dark" : ""}
                        />

                        <button
                            type="button"
                            onClick={handClick}
                            className={DarkMode ? "dark" : ""}>
                            search
                        </button>
                    </div>
                </div>
                <figure className="Change_Mode" onClick={toggle}>
                    <img src={DarkMode ? "./img/change-02.png" : "./img/change-01.png"} alt="change_mode" />
                </figure>
            </div>
        </div>
    )
}

export default Header;
import React from "react";
import "./MainItemsContainer.css";

export default function MainItemsContainer({ deltaY, maxDelta }) {
    let style_first = {
        transform: `translateY(-${maxDelta - deltaY}px)`
    };


    const numbers = [];
    for (let i = 0; i < 30; i++) {
        numbers.push(i + 1);
    }


    return (
        <div className="main_items_container">
            <section className="main_items_container_child">
                <div className="container-content left" style={style_first}>
                    {numbers.map(i => (
                        <div key={i} className="container-content-block">
                            LEFT {i}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

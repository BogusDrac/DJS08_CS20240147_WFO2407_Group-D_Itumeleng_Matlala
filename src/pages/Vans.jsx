import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Vans = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [vans, setVans] = useState([])

    const typeFilter = searchParams.get("type")
    
    const displayVans = typeFilter
        ? vans.filter(van => van.type === typeFilter)
        : vans

    useEffect(() => {
        fetch("/api/vans")
        .then(response => response.json())
        .then(data => setVans(data.vans))
    }, [])

    const vanElements = displayVans.map(van => (
        <div className="van-tile" key={van.id}>
            <Link to={`/vans/${van.id}`}>
                <img src={van.imageUrl} alt="" />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>{van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>
                    {van.type}
                </i>
            </Link>
        </div>
    ))
  return (
    <div className="van-list-container">
        <h1>Explore our van options</h1>
        <div className="van-list-filter-buttons">
            <button 
                onClick={() => setSearchParams({type: "simple"})}
                className="van-type simple"
            >
                Simple
            </button>

            <button 
                onClick={() => setSearchParams({type: "luxury"})}
                className="van-type luxury"
            >
                Luxury
            </button>

            <button 
                onClick={() => setSearchParams({type: "rugged"})}
                className="van-type rugged"
            >
                Rugged
            </button>

            <button 
                onClick={() => setSearchParams({})}
                className="van-type simple"
            >
                clear filter
            </button>                        
            
        </div>
        <div className="van-list">
            {vanElements}
        </div>
    </div>
  );
}

export default Vans;

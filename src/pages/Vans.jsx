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
            <Link 
                to={van.id} 
                    state={{ 
                        search: `?${searchParams.toString()}`, 
                        type: typeFilter
                    }}
            >
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



    const handleFilterChange = (key, value) => {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

  return (
    <div className="van-list-container">
        <h1>Explore our van options</h1>
        <div className="van-list-filter-buttons">
            <button 
                onClick={() => handleFilterChange({type: "simple"})}
                className={
                    `van-type simple ${typeFilter === "simple" ? "selected" : ""}`}
            >
                Simple
            </button>

            <button 
                onClick={() => setSearchParams({type: "luxury"})}
                className={
                    `van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}
            >
                Luxury
            </button>

            <button 
                onClick={() => setSearchParams({type: "rugged"})}
                className={
                    `van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}
            >
                Rugged
            </button>

            {typeFilter ? (
                <button 
                    onClick={() => setSearchParams({})}
                    className="van-type simple"
                >
                    clear filter
                </button> 
            ) : null
            }                       
            
        </div>
        <div className="van-list">
            {vanElements}
        </div>
    </div>
  );
}

export default Vans;

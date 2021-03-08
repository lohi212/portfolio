import React, { useState } from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { useHistory } from "react-router-dom";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import "@szhsin/react-menu/dist/index.css";
import { CATEGORIES } from "./constants";
import "./styles.css";

function Categories(props) {

    const [recentRoutes, setRecentRoutes] = useState(localStorage.getItem('routes') ? JSON.parse(localStorage.getItem('routes')) : []);


    const history = useHistory();

    function handleRoutesClick(subCategory) {
        const routes = localStorage.getItem('routes');
        let routesArr = [];
        let routeIndex = 0;
        if (routes) {
            routeIndex = JSON.parse(routes).indexOf(subCategory.route);
            routesArr = [...JSON.parse(routes)];
            let removedRoute = [];
            if (routeIndex !== -1) {
                removedRoute = routesArr.splice(routeIndex, 1);
                routesArr.push(subCategory.route);
            } else {
                if (routesArr.length < 3) {
                    routesArr.push(subCategory.route);
                } else {
                    removedRoute = routesArr.splice(0, 1);
                    routesArr.push(subCategory.route);
                }
            }
            if (removedRoute.length && routeIndex === -1) {
                localStorage.removeItem(removedRoute[0]);
            } 
        } else {
            routesArr = [subCategory.route]
        }

        setRecentRoutes(routesArr);
        localStorage.setItem('routes', JSON.stringify(routesArr)); 
        localStorage.setItem(subCategory.route, JSON.stringify(subCategory));
        history.push(`/${subCategory.route}`);
           
    }

    function  renderRecentRoutes() {
        return [...recentRoutes].reverse().map(route => {
            const subCat = JSON.parse(localStorage.getItem(route));
            return <MenuItem onClick={() => handleRoutesClick(subCat)}>{subCat.label}</MenuItem>
        })
    }

    return (
        <div className="categories-container">
        <p onClick={() => {
            history.push('/');
        }}>Home</p>

        {CATEGORIES.map((category) => (
            <Menu
            menuButton={
                <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                >
                <button
                    style={{
                        borderRadius: 0,
                        border: "none",
                        padding: 10,
                        background: "#fff"
                    }}
                >
                    {category.text}
                </button>
                <ArrowDropDownIcon />
                </div>
            }
            style={{ width: 200 }}
            >
            {
                category.key === 'RECENTS' && renderRecentRoutes()
            }
            {
                category.subCategories.length > 0 &&
                category.subCategories.map((subCategory) => <MenuItem onClick={() => handleRoutesClick(subCategory)} disabled={subCategory.isdisabled} >{subCategory.label}</MenuItem>)
            }
            
            </Menu>
        ))}
        </div>
    );
}

export default Categories;

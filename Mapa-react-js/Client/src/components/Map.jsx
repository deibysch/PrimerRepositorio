import { forwardRef } from "react";
import { createRef } from "react";
import { useEffect } from "react";
import {StyleDark, StyleDarkAlex, StylePurpure, StyleMarron} from './StylesForMaps'
let Static_ID = 0
const Map=forwardRef((props, ref)=> {
    const ID=++Static_ID
    console.log("creando Map"+ Static_ID);
    let map;
    useEffect(()=>{
        InitMap()
    },[])

    function InitMap() {
        map=new window.google.maps.Map(document.querySelector('#containerMap'+ID), {
            center: { lat: -17.78443767407429, lng: -63.18189476666437 },
            zoom: 11,
            zoomControl: false,
            gestureHandling: 'greedy',// 'cooperative''none'
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP,//SATELLITE,HYBRID,TERRAIN,ROADMAP
            mapTypeControlOptions: {
                style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU,//null
                mapTypeIds: [
                    "roadmap", 
                    "satellite", 
                    "hybrid", 
                    "terrain", 
                    "dark",
                    "darkalex",
                    "purpure", 
                    "marron"],
            },
        })

        map.mapTypes.set('dark', StyleDark);
        map.mapTypes.set('darkalex', StyleDarkAlex);
        map.mapTypes.set('purpure', StylePurpure);
        map.mapTypes.set('marron', StyleMarron);
        map.setMapTypeId('marron');
    }

    return(
        <div
        ref={ref}
            id={'containerMap'+ID}
            call={{map:()=>{return map}}}
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'red'
            }}
        >
        </div>
    )
})

export default Map
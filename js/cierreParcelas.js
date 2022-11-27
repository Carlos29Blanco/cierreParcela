require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Locate",
    "esri/layers/GeoJSONLayer",
    "esri/symbols/LineSymbol3DLayer",
    "esri/symbols/LineSymbol3D",
    "esri/renderers/SimpleRenderer"], (
        Map,
        MapView,
        Locate,
        GeoJSONLayer,
        LineSymbol3DLayer,
        LineSymbol3D,
        SimpleRenderer
    ) => {

        var lineSymbol = {
            type: "simple-line", // new SimpleLineSymbol()
            color: [255, 51, 51, 0.8], // RGB color values as an array
            width: 1
        };

    var rendererMiParcela = new SimpleRenderer({

        symbol: lineSymbol

    });

    /// DEFINICIÓN DEL LOS RUTA MIGRATORIA
    const miparcelasMunon = new GeoJSONLayer({
        url: "https://raw.githubusercontent.com/Carlos29Blanco/cierreParcela/main/geoJSON/miParcelaMunon.geojson",
        copyright: "UCM",
        title: "Todas las rutas",
        outFields: ["*"],
        renderer: rendererMiParcela,
        popupTemplate: {
            title: "Especie: {species}",
            /* content: [
                {
                    type: "fields",
                    fieldInfos: [
                        {
                            fieldName: "species",
                            label: "Especie",
                            visible: true
                        },
                    {
                        fieldName: "idAlerta",
                        label: "Codigo",
                        visible: true
                    },
                    ]
                }
            ] */
        },
        visible: true,
        availableFields: true,
    });

    const map = new Map({
        basemap: "satellite",
        layers: [miparcelasMunon]
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-5.8316831127998805, 43.17082014739713],
        zoom: 20
    });

    const locateBtn = new Locate({
        view: view
    });

    // Add the locate widget to the top left corner of the view
    view.ui.add(locateBtn, {
        position: "top-left"
    });
});
/**
 * Converts a binary water mask into vectorized shoreline features.
 * Performs cleaning, smoothing and vectorization of water bodies.
 *
 * @param {ee.Image} waterMask - Binary water mask to vectorize
 * @param {ee.Geometry} geometry - Area of interest for vectorization
 * @returns {ee.FeatureCollection} Shoreline as LineString features
 */
function getOceanWater(waterMask, aoi, scale) {
    var bufferWidth = scale;
    var innerAOI = aoi.buffer(-bufferWidth);
    var boundaryZone = aoi.difference(innerAOI);
    var boundaryWater = waterMask.updateMask(ee.Image.constant(1).clip(boundaryZone));

    // Create connected components with proper kernel
    var labeledWater = waterMask.connectedComponents({
        connectedness: ee.Kernel.plus(1),
        maxSize: 256
    });

    // Find water regions connected to boundary
    var boundaryLabels = labeledWater.updateMask(boundaryWater)
        .reduceRegion({
            reducer: ee.Reducer.frequencyHistogram(),
    dateRange: {
        start: null,
        end: null
    },
    cloudCover: 5
};

/**
 * Reset the state for a new run
 */
function resetState() {
    state.aoi = null;
    state.results = {
        sentinel1: null,
        sentinel2: null,
        landsat:   null
    };
    state.rawImage = null;
    state.dateRange = {
        start: null,
        end: null
    };
    state.cloudCover = 5;
}

// ─────────────────────────────────────────────────────────────────────────────
// UI SETUP
// ─────────────────────────────────────────────────────────────────────────────
var mainPanel = ui.Panel({style: {width: '400px', padding: '10px'}});
var map = ui.Map();
map.style().set('cursor', 'crosshair');
map.setControlVisibility({drawingTools: false});
ui.root.clear();
ui.root.add(ui.SplitPanel({firstPanel: map, secondPanel: mainPanel}));

// ─────────────────────────────────────────────────────────────────────────────
// SHORELINE DETECTION METHODS
// (1) Sentinel-1 Alternative (Otsu on VV/VH ratio)
// (2) Sentinel-2 MNDWI
// (3) Landsat AWEI
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Detects water bodies from SAR imagery using VV/VH polarization.
 * Uses Otsu thresholding on both VV and VH bands, plus their ratio.
 * Combines results using majority voting for robust water detection.
 *
 * @param {ee.Image} image - Sentinel-1 SAR image with VV and VH bands
 * @returns {ee.Image} Binary water mask (1 for water, 0 for non-water)
 */
function detectWaterFromSAR(image) {
    // Helper function to get Otsu threshold for any band
    var getOtsuThreshold = function(img, bandName) {
        var histogram = img.select(bandName).reduceRegion({
            reducer: ee.Reducer.histogram({
                maxBuckets: 256,
                minBucketWidth: 0.001
            }),
            geometry: state.aoi,
            scale: 30,
            maxPixels: 1e9,
            bestEffort: true
        }).get(bandName);

        // Otsu implementation
        var otsu = function(histDict) {
            var counts = ee.Array(ee.Dictionary(histDict).get('histogram'));
            var means  = ee.Array(ee.Dictionary(histDict).get('bucketMeans'));
            var size   = means.length().get([0]);
            var total  = counts.reduce(ee.Reducer.sum(), [0]).get([0]);
            var sum    = means.multiply(counts).reduce(ee.Reducer.sum(), [0]).get([0]);
            var mean   = sum.divide(total);
            var indices= ee.List.sequence(1, size.subtract(1));
            var bss    = indices.map(function(i) {
                var aCounts = counts.slice(0, 0, i);
                var aCount  = aCounts.reduce(ee.Reducer.sum(), [0]).get([0]);
                var aMeans  = means.slice(0, 0, i);
                var aMean   = aMeans.multiply(aCounts)
                    .reduce(ee.Reducer.sum(), [0]).get([0])
                    .divide(aCount);
                var bCount = total.subtract(aCount);
                var bMean  = sum.subtract(aCount.multiply(aMean)).divide(bCount);
                return aCount.multiply(aMean.subtract(mean).pow(2))
                    .add(bCount.multiply(bMean.subtract(mean).pow(2)));
            });
            var maxIndex = ee.List(bss).indexOf(ee.List(bss).reduce(ee.Reducer.max()));
            return means.get([maxIndex]);
        };

        return ee.Number(otsu(histogram));
    };

    // Process VV band
    var vvDb = image.select('VV');
    var vvThreshold = getOtsuThreshold(image, 'VV');
    var vvWater = vvDb.lt(vvThreshold);

    // Process VH band
    var vhDb = image.select('VH');
    var vhThreshold = getOtsuThreshold(image, 'VH');
    var vhWater = vhDb.lt(vhThreshold);

    // Process VV/VH ratio
    var vvLinear = ee.Image.constant(10).pow(vvDb.divide(10));
    var vhLinear = ee.Image.constant(10).pow(vhDb.divide(10));
    var ratio = vvLinear.divide(vhLinear).rename('ratio');
    var ratioThreshold = getOtsuThreshold(ratio, 'ratio');
    var ratioWater = ratio.gt(ratioThreshold);

    // Combine all three water masks using majority voting
    var waterMask = vvWater.add(vhWater).add(ratioWater)
        .gt(1)
        .rename('water');

    return waterMask.updateMask(waterMask);
}

/**
 * Converts a binary water mask into vectorized shoreline features.
 * Performs cleaning, smoothing and vectorization of water bodies.
 *
 * @param {ee.Image} waterMask - Binary water mask to vectorize
 * @param {ee.Geometry} geometry - Area of interest for vectorization
 * @returns {ee.FeatureCollection} Shoreline as LineString features
 */
function getOceanWater(waterMask, aoi, scale) {
    var bufferWidth = scale;
    var innerAOI = aoi.buffer(-bufferWidth);
    var boundaryZone = aoi.difference(innerAOI);
    var boundaryWater = waterMask.updateMask(ee.Image.constant(1).clip(boundaryZone));
    var labeledWater = waterMask.connectedComponents({
        connectedness: ee.Kernel.plus(1),
        maxSize: 256
    });

    // Find water regions connected to boundary
    var boundaryLabels = labeledWater.updateMask(boundaryWater)
        .reduceRegion({
            reducer: ee.Reducer.frequencyHistogram(),
            geometry: aoi,
            scale: scale,
            maxPixels: 1e9
        }).get('label');

    // Get label of the largest water body (most frequent)
    var oceanLabel = labeledWater.mask(labeledWater)
        .reduceRegion({
            reducer: ee.Reducer.mode(),
            geometry: aoi,
            scale: scale,
            maxPixels: 1e9
        }).get('label');
    var oceanWater = labeledWater.eq(oceanLabel);
    return oceanWater;
}

function vectorizeWaterMask(waterMask, geometry, scale) {
    // Remove small patches
    var connected = waterMask.connectedPixelCount(scale*2, true);
    var cleaned   = waterMask.updateMask(connected.gte(100 / (scale*scale)));

    // Morphological smoothing
    var kernel = ee.Kernel.circle(1);
    cleaned = cleaned.focal_max({kernel: kernel, iterations: 1})
                     .focal_min({kernel: kernel, iterations: 1});

    // Vectorize water polygons
    var polygons = cleaned.reduceToVectors({
        geometry: geometry,
        scale: 30,
        geometryType: 'polygon',
        eightConnected: true,
        maxPixels: 1e9,
        tileScale: 4
    });

    // Convert polygons to lines
    var shoreline = polygons.map(function(feature) {
        var coords = ee.List(feature.geometry().coordinates().get(0));
        var line   = ee.Geometry.LineString(coords);
        return ee.Feature(line);
    });

    return shoreline;
}

// Water indices implementations for Sentinel-2
/**
 * Calculates various water indices from optical satellite imagery.
 * Supports multiple indices: Band8, NDWI, MNDWI, AWEInsh, AWEIsh, etc.
 *
 * @param {ee.Image} image - Optical satellite image (Sentinel-2)
 * @param {string} indexName - Name of water index to calculate
 * @returns {ee.Image} Single-band image containing water index values
 */
function calculateWaterIndex(image, indexName) {
    switch(indexName) {
        case 'Band8':
            return image.select('B8').rename('water_index');
        case 'NDWI':
            return image.normalizedDifference(['B3', 'B8']).rename('water_index');
        case 'MNDWI':
            return image.normalizedDifference(['B3', 'B11']).rename('water_index');
        case 'AWEInsh':
            return image.expression(
                '4 * (GREEN - SWIR1) - (0.25 * NIR + 2.75 * SWIR2)', {
                    'GREEN': image.select('B3'),
                    'SWIR1': image.select('B11'),
                    'NIR': image.select('B8'),
                    'SWIR2': image.select('B12')
                }
            ).rename('water_index');
        case 'AWEIsh':
            return image.expression(
                'BLUE + 2.5 * GREEN - 1.5 * (NIR + SWIR1) - 0.25 * SWIR2', {
                    'BLUE': image.select('B2'),
                    'GREEN': image.select('B3'),
                    'NIR': image.select('B8'),
                    'SWIR1': image.select('B11'),
                    'SWIR2': image.select('B12')
                }
            ).rename('water_index');
        case 'SMBWI':
            return image.expression(
                '(B2 + B3 + B4) / (B8 + B11 + B12)', {
                    'B2': image.select('B2'),
                    'B3': image.select('B3'),
                    'B4': image.select('B4'),
                    'B8': image.select('B8'),
                    'B11': image.select('B11'),
                    'B12': image.select('B12')
                }
            ).rename('water_index');
        case 'WRI':
            return image.expression(
                '(GREEN + RED) / (NIR + SWIR1)', {
                    'GREEN': image.select('B3'),
                    'RED': image.select('B4'),
                    'NIR': image.select('B8'),
                    'SWIR1': image.select('B11')
                }
            ).rename('water_index');
        case 'NDWI2':
            return image.normalizedDifference(['B8', 'B11']).rename('water_index');
        default:
            // Default to MNDWI
            return image.normalizedDifference(['B3', 'B11']).rename('water_index');
    }
}

/**
 * Detects water from optical imagery using specified water index.
 * Uses Otsu thresholding for automatic water/land separation.
 *
 * @param {ee.Image} image - Optical satellite image
 * @param {string} indexName - Water index to use for detection
 * @returns {ee.Image} Binary water mask (1 for water, 0 for non-water)
 */
function detectWaterFromOptical(image, indexName) {
    var waterIndex = calculateWaterIndex(image, indexName);

    // Calculate histogram for Otsu thresholding
    var histogram = waterIndex.reduceRegion({
        reducer: ee.Reducer.histogram({
            maxBuckets: 256,
            minBucketWidth: 0.001
        }),
        geometry: state.aoi,
        scale: 30,
        maxPixels: 1e9,
        bestEffort: true
    }).get('water_index');

    // Otsu function for automatic thresholding
    var otsu = function(histDict) {
        var counts = ee.Array(ee.Dictionary(histDict).get('histogram'));
        var means  = ee.Array(ee.Dictionary(histDict).get('bucketMeans'));
        var size   = means.length().get([0]);
        var total  = counts.reduce(ee.Reducer.sum(), [0]).get([0]);
        var sum    = means.multiply(counts).reduce(ee.Reducer.sum(), [0]).get([0]);
        var mean   = sum.divide(total);
        var indices= ee.List.sequence(1, size.subtract(1));
        var bss    = indices.map(function(i) {
            var aCounts = counts.slice(0, 0, i);
            var aCount  = aCounts.reduce(ee.Reducer.sum(), [0]).get([0]);
            var aMeans  = means.slice(0, 0, i);
            var aMean   = aMeans.multiply(aCounts)
                .reduce(ee.Reducer.sum(), [0]).get([0])
                .divide(aCount);
            var bCount = total.subtract(aCount);
            var bMean  = sum.subtract(aCount.multiply(aMean)).divide(bCount);
            return aCount.multiply(aMean.subtract(mean).pow(2))
                .add(bCount.multiply(bMean.subtract(mean).pow(2)));
        });
        var maxIndex = ee.List(bss).indexOf(ee.List(bss).reduce(ee.Reducer.max()));
        return means.get([maxIndex]);
    };


    // Get threshold using Otsu method
    var threshold = ee.Number(otsu(histogram));

    // Apply appropriate comparison based on index type
    switch(indexName) {
        case 'Band8':
            return waterIndex.lt(threshold);
        default:
            return waterIndex.gt(threshold);
    }
}

/**
 * Detects water from Landsat imagery using AWEI.
 * Implements automatic thresholding via Otsu method.
 *
 * @param {ee.Image} image - Landsat 8/9 surface reflectance image
 * @returns {ee.Image} Binary water mask (1 for water, 0 for non-water)
 */
function detectWaterFromLandsat(image) {
    // AWEI
    var awei = image.expression(
        '4 * (GREEN - SWIR1) - (0.25 * NIR + 2.75 * SWIR2)', {
            'GREEN': image.select('SR_B3'),
            'NIR':   image.select('SR_B5'),
            'SWIR1': image.select('SR_B6'),
            'SWIR2': image.select('SR_B7')
        }
    ).rename('awei');

    // Otsu threshold
    var histogram = awei.reduceRegion({
        reducer: ee.Reducer.histogram({
            maxBuckets: 256,
            minBucketWidth: 0.001
        }),
        geometry: image.geometry(),
        scale: 30,
        maxPixels: 1e9,
        bestEffort: true
    }).get('awei');

    var otsu = function(histDict) {
        var counts = ee.Array(ee.Dictionary(histDict).get('histogram'));
        var means  = ee.Array(ee.Dictionary(histDict).get('bucketMeans'));
        var size   = means.length().get([0]);
        var total  = counts.reduce(ee.Reducer.sum(), [0]).get([0]);
        var sum    = means.multiply(counts).reduce(ee.Reducer.sum(), [0]).get([0]);
        var mean   = sum.divide(total);
        var indices= ee.List.sequence(1, size.subtract(1));
        var bss    = indices.map(function(i) {
            var aCounts = counts.slice(0, 0, i);
            var aCount  = aCounts.reduce(ee.Reducer.sum(), [0]).get([0]);
            var aMeans  = means.slice(0, 0, i);
            var aMean   = aMeans.multiply(aCounts)
                .reduce(ee.Reducer.sum(), [0]).get([0])
                .divide(aCount);
            var bCount = total.subtract(aCount);
            var bMean  = sum.subtract(aCount.multiply(aMean)).divide(bCount);
            return aCount.multiply(aMean.subtract(mean).pow(2))
                .add(bCount.multiply(bMean.subtract(mean).pow(2)));
        });
        var maxBss = bss.reduce(ee.Reducer.max());
        var idx = bss.indexOf(maxBss);
        return means.get([idx]);
    };

    var threshold = ee.Number(otsu(histogram));
    return awei.gt(threshold);
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN WORKFLOW AND UI
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Initializes drawing tools for AOI selection on the map.
 * Sets up polygon drawing interface and related UI controls.
 *
 * @param {ui.Map} map - Map instance to enable drawing on
 * @param {Function} callback - Function to call with drawn geometry
 * @param {ui.Panel} panel - Panel to display drawing controls
 */
function initializeDrawing(map, callback, panel) {
    map.drawingTools().setShown(true);

    var drawingTools = map.drawingTools();
    drawingTools.setShape('polygon');
    drawingTools.setDrawModes(['polygon']);
    drawingTools.layers().reset();

    var dummyGeom = ui.Map.GeometryLayer({geometries: null, name: 'AOI'});
    drawingTools.layers().add(dummyGeom);
    drawingTools.draw();

    panel.clear();
    panel.add(ui.Label('Draw Study Area', STYLES.heading));
    panel.add(ui.Label('Click points on map to draw polygon', STYLES.text));

    var confirmButton = ui.Button({
        label: 'Confirm Selection',
        onClick: function() {
            var geometry = drawingTools.layers().get(0).toGeometry();
            if (!geometry) {
                ui.alert('No Area Selected', 'Please draw an area first.');
                return;
            }
            callback(ee.Geometry(geometry));
        },
        style: STYLES.button
    });

    var clearButton = ui.Button({
        label: 'Clear Drawing',
        onClick: function() {
            drawingTools.layers().get(0).geometries().remove(0);
            drawingTools.draw();
        },
        style: STYLES.button
    });

    panel.add(confirmButton);
    panel.add(clearButton);
}

/**
 * Displays the welcome screen with app description and features.
 * Sets up initial map view and welcome UI elements.
 */
function showWelcome() {
    mainPanel.clear();
    state.currentStep = 'welcome';
    map.layers().reset();
    map.setControlVisibility({drawingTools: false});

    map.setCenter(10, 51, 4);

    mainPanel.add(ui.Label('Shoreline Detection Software', STYLES.heading));
    mainPanel.add(ui.Label('Welcome', STYLES.subheading));

    mainPanel.add(ui.Label(
        'This tool helps detect shorelines using satellite data. ' +
        'It provides multiple methods for shoreline detection.',
        STYLES.text
    ));

    mainPanel.add(ui.Label('Key Features:', STYLES.subheading));

    var features = [
        'Multi-sensor shoreline detection (Sentinel-1 SAR, Sentinel-2, Landsat)',
        'Automated shoreline extraction',
        'Interactive map interface'
    ];
    features.forEach(function(feature) {
        mainPanel.add(ui.Label('• ' + feature, STYLES.text));
    });

    mainPanel.add(ui.Label(
        'Click "Start Analysis" and draw your area of interest to begin.',
        {fontSize: '14px', margin: '15px 0 5px 0', fontStyle: 'italic'}
    ));

    mainPanel.add(ui.Button({
        label: 'Start Analysis',
        onClick: function() {
            state.currentStep = 'draw';
            showDrawAOI();
        },
        style: STYLES.button
    }));
}

/**
 * Initiates Area of Interest (AOI) drawing workflow.
 * Enables map drawing tools and sets up related UI.
 */
function showDrawAOI() {
    initializeDrawing(map, function(geometry) {
        state.aoi = geometry;
        showMethodSelection();
    }, mainPanel);
}

/**
 * Shows date range and cloud cover selection interface.
 * Configures different options based on selected satellite.
 *
 * @param {string} method - Selected satellite method ('sentinel1', 'sentinel2', or 'landsat')
 */
function showDateCloudSettings(method) {
    mainPanel.clear();
    mainPanel.add(ui.Label('Image Selection Settings', STYLES.heading));

    // Date range selection
    mainPanel.add(ui.Label('Select Date Range:', STYLES.subheading));

    var now = Date.now();
    var sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    var startDateBox = ui.Textbox({
        placeholder: 'YYYY-MM-DD',
        value: sixMonthsAgo.toISOString().split('T')[0],
        onChange: function(value) {
            state.dateRange.start = ee.Date(value);
        },
        style: {width: '150px'}
    });

    var endDateBox = ui.Textbox({
        placeholder: 'YYYY-MM-DD',
        value: new Date(now).toISOString().split('T')[0],
        onChange: function(value) {
            state.dateRange.end = ee.Date(value);
        },
        style: {width: '150px'}
    });

    // Start date panel
    var startDatePanel = ui.Panel({
        widgets: [
            ui.Label('Start:', {margin: '4px 8px 4px 0px'}),
            startDateBox
        ],
        layout: ui.Panel.Layout.flow('horizontal')
    });
    mainPanel.add(startDatePanel);

    // End date panel
    var endDatePanel = ui.Panel({
        widgets: [
            ui.Label('End:', {margin: '12px 8px 4px 0px'}),
            endDateBox
        ],
        layout: ui.Panel.Layout.flow('horizontal'),
        style: {margin: '8px 0 0 0'}
    });
    mainPanel.add(endDatePanel);

    // Cloud cover selection
    if (method !== 'sentinel1') {
        mainPanel.add(ui.Label('Cloud Cover Percentage:', STYLES.subheading));
        var cloudSlider = ui.Slider({
            min: 0,
            max: 100,
            value: state.cloudCover,
            step: 5,
            onChange: function(value) {
                state.cloudCover = value;
            },
            style: {width: '300px'}
        });
        mainPanel.add(cloudSlider);
    }

    // Proceed button
    mainPanel.add(ui.Button({
        label: 'Process Images',
        onClick: function() {
            if (method === 'sentinel2') {
                showSentinel2Options();
            } else {
                processImagery(method);
            }
        },
        style: STYLES.button
    }));

    // Back button
    mainPanel.add(ui.Button({
        label: 'Back',
        onClick: showMethodSelection,
        style: STYLES.button
    }));
}

/**
 * Displays satellite method selection interface.
 * Allows user to choose between Sentinel-1, Sentinel-2, and Landsat.
 */
function showMethodSelection() {
    mainPanel.clear();
    mainPanel.add(ui.Label('Select Detection Method', STYLES.heading));

    var methods = [
        {label: 'Sentinel-1 SAR', value: 'sentinel1'},
        {label: 'Sentinel-2 Optical', value: 'sentinel2'},
        {label: 'Landsat 8/9',    value: 'landsat'}
    ];

    methods.forEach(function(method) {
        mainPanel.add(ui.Button({
            label: method.label,
            onClick: function() {
                state.shorelineMethod = method.value;
                showDateCloudSettings(method.value);
            },
            style: STYLES.button
        }));
    });

    mainPanel.add(ui.Button({
        label: 'Back',
        onClick: showDrawAOI,
        style: STYLES.button
    }));
}

/**
 * Shows water index selection interface for Sentinel-2 processing.
 * Provides options for different water detection indices (NDWI, MNDWI, etc.).
 */
function showSentinel2Options() {
    mainPanel.clear();
    mainPanel.add(ui.Label('Select Water Index', STYLES.heading));

    var indices = [
        {label: 'Band8 (NIR Band)', value: 'Band8'},
        {label: 'MNDWI (Modified Normalized Difference Water Index)', value: 'MNDWI'},
        {label: 'NDWI (Normalized Difference Water Index)', value: 'NDWI'},
        {label: 'AWEInsh (Automated Water Extraction Index - No Shadow)', value: 'AWEInsh'},
        {label: 'AWEIsh (Automated Water Extraction Index - Shadow)', value: 'AWEIsh'},
        {label: 'SMBWI (Sentinel Multi-Band Water Index)', value: 'SMBWI'},
        {label: 'WRI (Water Ratio Index)', value: 'WRI'},
        {label: 'NDWI2 (Normalized Difference Water Index 2)', value: 'NDWI2'}
    ];

    indices.forEach(function(index) {
        mainPanel.add(ui.Button({
            label: index.label,
            onClick: function() {
                state.waterIndex = index.value;
                initializeSentinel2Processing();
            },
            style: STYLES.button
        }));
    });

    mainPanel.add(ui.Button({
        label: 'Back',
        onClick: showMethodSelection,
        style: STYLES.button
    }));
}

/**
 * Initiates satellite imagery processing based on selected method.
 * Handles different processing workflows for each satellite type.
 *
 * @param {string} method - Selected satellite method ('sentinel1', 'sentinel2', or 'landsat')
 */
function processImagery(method) {
    var startDate = state.dateRange.start || ee.Date(Date.now()).advance(-3, 'month');
    var endDate = state.dateRange.end || ee.Date(Date.now());

    var loadingLabel = ui.Label('Processing...');
    mainPanel.add(loadingLabel);

    try {
        switch(method) {
            case 'sentinel1':
                loadingLabel.setValue('Finding latest Sentinel-1 imagery...');
                processSentinel1(startDate, endDate, loadingLabel);
                break;
            case 'sentinel2':
                loadingLabel.setValue('Finding latest Sentinel-2 imagery...');
                processSentinel2(startDate, endDate, loadingLabel);
                break;
            case 'landsat':
                loadingLabel.setValue('Finding latest Landsat imagery...');
                processLandsat(startDate, endDate, loadingLabel);
                break;
        }
    } catch (e) {
        loadingLabel.setValue('Error: ' + e.message);
    }
}

/**
 * Displays processing results on the map and creates export options.
 * Shows water mask, shoreline vectors, and raw satellite imagery.
 *
 * @param {string} method - Satellite method used ('sentinel1', 'sentinel2', or 'landsat')
 * @param {ee.Image} water - Binary water mask
 * @param {ee.FeatureCollection} shoreline - Vectorized shoreline features
 * @param {ui.Label} loadingLabel - Label for displaying processing status
 */
function displayResults(method, water, shoreline, loadingLabel) {
    // Store results
    state.results[method] = {
        water: water,
        shoreline: shoreline
    };

    map.layers().reset();

    // Show raw satellite image
    if (state.rawImage) {
        switch(method) {
            case 'sentinel1':
                map.addLayer(state.rawImage, {
                    bands: ['VV'],
                    min: -25,
                    max: 0,
                    palette: ['black', 'white']
                }, method + ' Raw SAR (VV)', true);
                break;
            case 'sentinel2':
                map.addLayer(state.rawImage, {
                    bands: ['B4', 'B3', 'B2'],
                    min: 0,
                    max: 3000
                }, method + ' True Color RGB', true);

                map.addLayer(state.rawImage, {
                    bands: ['B8'],
                    min: 0,
                    max: 3000,
                    palette: ['black', 'white']
                }, method + ' Raw NIR', true);
                break;
            case 'landsat':
                map.addLayer(state.rawImage, {
                    bands: ['SR_B4', 'SR_B3', 'SR_B2'],
                    min: 7000,
                    max: 30000,
                    gamma: 1.2
                }, method + ' Raw True Color', true);
                break;
        }
    }

    // Show water
    if (water) {
        map.addLayer(water.selfMask(), {
            palette: ['#0000FF'],
            opacity: 0.5
        }, method + ' Water');
    }

    // Show shoreline
    if (shoreline) {
        map.addLayer(shoreline, {
            color: '#FF0000',
            width: 3
        }, method + ' Shoreline');
    }

    // Center map on AOI
    map.centerObject(state.aoi, 12);

    loadingLabel.setValue('Processing complete! Showing ' + method + ' results.');

    // Add export section
    mainPanel.add(ui.Label('Export Options:', {
        fontWeight: 'bold',
        margin: '20px 0 10px 0'
    }));

    // Create export panel
    var exportPanel = ui.Panel({
        style: {margin: '8px 0', padding: '10px', backgroundColor: 'white'}
    });

    // Shoreline export button
    exportPanel.add(ui.Button({
        label: 'Export Shoreline (SHP)',
        onClick: function() {
            Export.table.toDrive({
                collection: shoreline,
                description: 'Shoreline_' + method + '_' + Date.now(),
                fileFormat: 'SHP'
            });
            exportPanel.add(ui.Label('✓ Shoreline export started! Check Tasks panel.', {
                color: '#2E7D32',
                margin: '5px 0'
            }));
        },
        style: {
            margin: '5px 0',
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: 'white'
        }
    }));

    // For Sentinel-2, add image exports
    if (method === 'sentinel2') {
        // RGB Export
        exportPanel.add(ui.Button({
            label: 'Export RGB Image (GeoTIFF)',
            onClick: function() {
                Export.image.toDrive({
                    image: state.rawImage.select(['B4', 'B3', 'B2']),
                    description: 'RGB_' + method + '_' + Date.now(),
                    scale: 10,
                    region: state.aoi,
                    maxPixels: 1e9
                });
                exportPanel.add(ui.Label('✓ RGB export started! Check Tasks panel.', {
                    color: '#2E7D32',
                    margin: '5px 0'
                }));
            },
            style: {
                margin: '5px 0',
                padding: '8px 16px',
                fontSize: '14px',
                backgroundColor: 'white'
            }
        }));

        // Water Index Export
        exportPanel.add(ui.Button({
            label: 'Export ' + (state.waterIndex || 'MNDWI') + ' (GeoTIFF)',
            onClick: function() {
                Export.image.toDrive({
                    image: calculateWaterIndex(state.rawImage, state.waterIndex || 'MNDWI'),
                    description: 'WaterIndex_' + (state.waterIndex || 'MNDWI') + '_' + Date.now(),
                    scale: 10,
                    region: state.aoi,
                    maxPixels: 1e9
                });
                exportPanel.add(ui.Label('✓ Water index export started! Check Tasks panel.', {
                    color: '#2E7D32',
                    margin: '5px 0'
                }));
            },
            style: {
                margin: '5px 0',
                padding: '8px 16px',
                fontSize: '14px',
                backgroundColor: 'white'
            }
        }));
    }

    mainPanel.add(exportPanel);
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA PROCESSING FUNCTIONS FOR EACH SATELLITE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Processes Sentinel-1 SAR imagery to detect shorelines.
 * Creates median composite and handles water detection/vectorization.
 *
 * @param {ee.Date} startDate - Start of date range for imagery
 * @param {ee.Date} endDate - End of date range for imagery
 * @param {ui.Label} loadingLabel - Label for displaying processing status
 */
function processSentinel1(startDate, endDate, loadingLabel) {
    var expandedAOI = state.aoi.buffer(500);

    var collection = ee.ImageCollection('COPERNICUS/S1_GRD')
        .filterBounds(expandedAOI)
        .filterDate(startDate, endDate)
        .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
        .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
        .filter(ee.Filter.eq('instrumentMode', 'IW'));

    var count = collection.size().getInfo();
    if (count === 0) {
        print('No Sentinel-1 images found for this time range and AOI.');
        loadingLabel.setValue('No Sentinel-1 images found.');
        return;
    }

    print('Found ' + count + ' Sentinel-1 images. Using median composite...');
    var image = collection.median().clip(expandedAOI);

    // Store raw image for visualization
    state.rawImage = image;

    // Water detection
    var waterMask = detectWaterFromSAR(image);

    // Extract shoreline
    var scale = 10; // for Sentinel-1
    var oceanWater = getOceanWater(waterMask, expandedAOI, scale);
    var shoreline = vectorizeWaterMask(oceanWater, expandedAOI, scale);
    var clippedShoreline = shoreline.map(function(f) {
        return f.intersection(state.aoi);
    }).filterBounds(state.aoi);

    // Display final results
    displayResults('sentinel1', waterMask.clip(state.aoi), clippedShoreline, loadingLabel);
}

/**
 * Initializes Sentinel-2 processing with default 6-month time range.
 * Sets up UI elements and triggers main processing.
 */
function initializeSentinel2Processing() {
    var now = Date.now();
    var endDate = ee.Date(now);
    var startDate = endDate.advance(-6, 'month');

    var loadingLabel = ui.Label('Processing...');
    mainPanel.clear();
    mainPanel.add(loadingLabel);

    processSentinel2(startDate, endDate, loadingLabel);
}

/**
 * Processes Sentinel-2 imagery to detect shorelines.
 * Handles cloud filtering and water index calculations.
 *
 * @param {ee.Date} startDate - Start of date range for imagery
 * @param {ee.Date} endDate - End of date range for imagery
 * @param {ui.Label} loadingLabel - Label for displaying processing status
 */
function processSentinel2(startDate, endDate, loadingLabel) {
    var expandedAOI = state.aoi.buffer(500);

    var collection = ee.ImageCollection('COPERNICUS/S2')
        .filterBounds(expandedAOI)
        .filterDate(startDate, endDate)
        .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', state.cloudCover));

    var count = collection.size().getInfo();
    if (count === 0) {
        print('No Sentinel-2 images found for this time range and AOI.');
        loadingLabel.setValue('No Sentinel-2 images found.');
        return;
    }

    print('Found ' + count + ' Sentinel-2 images. Using median composite...');
    var image = collection.median().clip(expandedAOI);

    // Store raw image for visualization
    state.rawImage = image;

    // Water detection using selected index
    var waterMask = detectWaterFromOptical(image, state.waterIndex || 'MNDWI');

    // Shoreline
    var scale = 10; // for Sentinel-2
    var oceanWater = getOceanWater(waterMask, expandedAOI, scale);
    var shoreline = vectorizeWaterMask(oceanWater, expandedAOI, scale);
    var clippedShoreline = shoreline.map(function(f) {
        return f.intersection(state.aoi);
    }).filterBounds(state.aoi);

    // Display
    displayResults('sentinel2', waterMask.clip(state.aoi), clippedShoreline, loadingLabel);
}

/**
 * Processes Landsat imagery to detect shorelines.
 * Handles cloud filtering and AWEI-based water detection.
 *
 * @param {ee.Date} startDate - Start of date range for imagery
 * @param {ee.Date} endDate - End of date range for imagery
 * @param {ui.Label} loadingLabel - Label for displaying processing status
 */
function processLandsat(startDate, endDate, loadingLabel) {
    var expandedAOI = state.aoi.buffer(500);

    var collection = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
        .filterBounds(expandedAOI)
        .filterDate(startDate, endDate)
        .filter(ee.Filter.lt('CLOUD_COVER', state.cloudCover));

    var count = collection.size().getInfo();
    if (count === 0) {
        print('No Landsat images found for this time range and AOI.');
        loadingLabel.setValue('No Landsat images found.');
        return;
    }

    print('Found ' + count + ' Landsat images. Using median composite...');
    var image = collection.median().clip(expandedAOI);

    // Store raw image for visualization
    state.rawImage = image;

    // Water detection
    var waterMask = detectWaterFromLandsat(image);

    // Shoreline
    var scale = 30; // for Landsat
    var oceanWater = getOceanWater(waterMask, expandedAOI, scale);
    var shoreline = vectorizeWaterMask(oceanWater, expandedAOI, scale);
    var clippedShoreline = shoreline.map(function(f) {
        return f.intersection(state.aoi);
    }).filterBounds(state.aoi);

    // Display
    displayResults('landsat', waterMask.clip(state.aoi), clippedShoreline, loadingLabel);
}

// ─────────────────────────────────────────────────────────────────────────────
// KICK OFF THE APP
// ─────────────────────────────────────────────────────────────────────────────
showWelcome();

import dash
from dash import html, dcc, Input, Output, State, ALL, MATCH, callback_context
import dash_leaflet as dl
import dash_mantine_components as dmc
from dash_iconify import DashIconify
import uuid
import json

app = dash.Dash(__name__)

# Initialize default values
DEFAULT_LINE_COLOR = "#3388ff"
DEFAULT_LINE_WEIGHT = 5
DEFAULT_LINE_OPACITY = 0.8
DEFAULT_ANT_DELAY = 400
DEFAULT_ANT_DASH_ARRAY = [10, 20]
DEFAULT_ANT_PULSE_COLOR = "#FFFFFF"

app.layout = dmc.MantineProvider([
    dcc.Store(id='line-configs', data={}),
    dcc.Store(id='selected-line', data=None),
    dcc.Store(id='update-trigger', data=0),

    html.Div([
        dl.Map(
            id='map',
            center=[45.5152, -122.6784],
            zoom=13,
            style={'height': '100vh', 'width': '100%'},
            children=[
                dl.TileLayer(),
                dl.FeatureGroup(
                    id='feature-group',
                    children=[
                        dl.EditControl(
                            id='edit-control',
                            draw=dict(
                                polyline=dict(
                                    shapeOptions=dict(
                                        color=DEFAULT_LINE_COLOR,
                                        weight=DEFAULT_LINE_WEIGHT
                                    )
                                ),
                                polygon=False,
                                circle=False,
                                rectangle=False,
                                marker=False,
                                circlemarker=False
                            ),
                            edit=dict(edit=True, remove=True),
                            position='topright'
                        )
                    ]
                ),
                dl.LayerGroup(id='rendered-lines', children=[]),
                # Test polyline to verify click handling
                dl.Polyline(
                    id='test-polyline',
                    positions=[[45.51, -122.68], [45.52, -122.67], [45.53, -122.68]],
                    color='red',
                    weight=8,
                    opacity=0.8,
                    n_clicks=0,
                    children=[dl.Tooltip("Click me to test!")]
                ),
                # Test pattern matching polyline
                dl.Polyline(
                    id={'type': 'test-pattern', 'id': 'test123'},
                    positions=[[45.515, -122.685], [45.525, -122.675], [45.535, -122.685]],
                    color='green',
                    weight=8,
                    opacity=0.8,
                    n_clicks=0,
                    children=[dl.Tooltip("Pattern matching test")]
                )
            ]
        ),

        # Style configuration drawer
        dmc.Drawer(
            id='style-drawer',
            title="Edit Line",
            position="right",
            size="md",
            padding="md",
            closeButtonProps={"size": "lg"},
            zIndex=1002,
            children=[
                dmc.Stack([
                    dmc.Text("Line Type", fw=500),
                    dmc.SegmentedControl(
                        id='line-type',
                        value='polyline',
                        data=[
                            {'label': 'Regular Line', 'value': 'polyline'},
                            {'label': 'Ant Path', 'value': 'antpath'}
                        ],
                        fullWidth=True
                    ),

                    dmc.Divider(my="md"),

                    dmc.TextInput(
                        id="line-name-input",
                        placeholder="Enter line name",
                        label="Line Name",
                        size="sm",
                        value='',
                        mb="md"
                    ),

                    # Common style options
                    dmc.Stack([
                        dmc.Text("Line Color", fw=500),
                        dmc.ColorPicker(
                            id='line-color',
                            format='hex',
                            value=DEFAULT_LINE_COLOR,
                            fullWidth=True,
                            swatches=[
                                "#fa5252", "#e64980", "#be4bdb", "#7950f2",
                                "#4c6ef5", "#228be6", "#15aabf", "#12b886",
                                "#40c057", "#82c91e", "#fab005", "#fd7e14",
                            ],
                        ),
                    ]),

                    dmc.Text("Line Weight", fw=500),
                    dmc.Slider(
                        id='line-weight',
                        value=DEFAULT_LINE_WEIGHT,
                        min=1,
                        max=20,
                        marks=[{'value': v, 'label': str(v)} for v in [1, 5, 10, 15, 20]],
                        mb="xl"
                    ),

                    dmc.Text("Line Opacity", fw=500),
                    dmc.Slider(
                        id='line-opacity',
                        value=DEFAULT_LINE_OPACITY,
                        min=0.1,
                        max=1.0,
                        step=0.1,
                        marks=[{'value': v, 'label': str(v)} for v in [0.2, 0.4, 0.6, 0.8, 1.0]],
                        mb="xl"
                    ),

                    # Ant Path specific options
                    html.Div(
                        id='antpath-options',
                        children=[
                            dmc.Divider(my="md"),
                            dmc.Text("Ant Path Options", fw=700, size="lg"),

                            dmc.Text("Pulse Color", fw=500),
                            dmc.ColorPicker(
                                id='pulse-color',
                                format='hex',
                                value=DEFAULT_ANT_PULSE_COLOR,
                                fullWidth=True
                            ),

                            dmc.Text("Animation Delay (ms)", fw=500),
                            dmc.Slider(
                                id='ant-delay',
                                value=DEFAULT_ANT_DELAY,
                                min=100,
                                max=2000,
                                step=100,
                                marks=[{'value': v, 'label': str(v)} for v in [100, 500, 1000, 1500, 2000]],
                                mb="xl"
                            ),

                            dmc.Text("Dash Pattern", fw=500),
                            dmc.Group([
                                dmc.NumberInput(
                                    id='dash-size',
                                    label="Dash Size",
                                    value=DEFAULT_ANT_DASH_ARRAY[0],
                                    min=1,
                                    max=50,
                                    style={'width': '100px'}
                                ),
                                dmc.NumberInput(
                                    id='gap-size',
                                    label="Gap Size",
                                    value=DEFAULT_ANT_DASH_ARRAY[1],
                                    min=1,
                                    max=50,
                                    style={'width': '100px'}
                                )
                            ]),

                            dmc.Switch(
                                id='ant-paused',
                                label="Pause Animation",
                                checked=False,
                                mt="md"
                            ),

                            dmc.Switch(
                                id='ant-reverse',
                                label="Reverse Direction",
                                checked=False,
                                mt="md"
                            )
                        ]
                    ),

                    dmc.Group([
                        dmc.Button(
                            "Apply Changes",
                            id='apply-changes',
                            fullWidth=True,
                            variant="filled"
                        )
                    ], mt="xl")
                ])
            ]
        ),

        # Debug info panel
        dmc.Paper(
            children=[
                dmc.Text("Debug Info", fw=700),
                html.Div(id='debug-info'),
                dmc.Space(h=10),
                dmc.Group([
                    dmc.Button("Inspect Map Layers", id='inspect-map-btn', size='xs', variant='outline'),
                    dmc.Button("Force Hide EditControl", id='hide-editcontrol-btn', size='xs', variant='outline'),
                    dmc.Button("Log Config State", id='log-config-btn', size='xs', variant='outline'),
                    dmc.Button("Clean Orphaned Layers", id='clean-layers-btn', size='xs', variant='outline')
                ]),
                html.Pre(id='inspect-output', style={'fontSize': '10px', 'marginTop': '10px'})
            ],
            p="md",
            style={
                'position': 'absolute',
                'bottom': '20px',
                'left': '20px',
                'zIndex': 1000,
                'background': 'white',
                'maxWidth': '400px'
            }
        ),

        # JavaScript for handling map interactions
        html.Script('''
            console.log('=== DASH-LEAFLET MAP SCRIPT LOADED ===');

            // Store map reference globally
            window.leafletMap = null;
            window.featureGroup = null;
            window.renderedLineIds = new Set();

            // Function to hide EditControl layers
            window.hideEditControlLayers = function(lineIds) {
                if (!window.featureGroup) return;

                window.featureGroup.eachLayer((layer) => {
                    if (layer._leaflet_id && lineIds.includes(layer._leaflet_id.toString())) {
                        layer.setStyle({ opacity: 0, fillOpacity: 0 });
                    }
                });
            };

            // Function to find the map - improved version
            window.findMap = function() {
                // Method 1: Try to get from the Dash component
                try {
                    const mapElement = document.getElementById('map');
                    if (mapElement) {
                        // Check React props
                        const reactKey = Object.keys(mapElement).find(key => key.startsWith('__reactInternalInstance') || key.startsWith('__reactFiber'));
                        if (reactKey) {
                            let fiber = mapElement[reactKey];
                            while (fiber) {
                                if (fiber.memoizedProps && fiber.memoizedProps.leafletElement) {
                                    const map = fiber.memoizedProps.leafletElement;
                                    console.log('Found map via React fiber (method 1)');
                                    return map;
                                }
                                if (fiber.return) {
                                    fiber = fiber.return;
                                } else if (fiber.child) {
                                    fiber = fiber.child;
                                } else {
                                    break;
                                }
                            }
                        }
                    }
                } catch (e) {
                    console.log('React fiber method failed:', e);
                }

                // Method 2: Look for the map container directly
                const mapContainer = document.querySelector('.leaflet-container');
                if (mapContainer && mapContainer._leaflet_map) {
                    console.log('Found map via container._leaflet_map');
                    return mapContainer._leaflet_map;
                }

                // Method 3: Access through the global window.L
                if (window.L && window.L._container) {
                    console.log('Found map via window.L');
                    return window.L._container;
                }

                // Method 4: Search for Leaflet instances in the DOM
                const possibleMapElements = document.querySelectorAll('[class*="leaflet-container"]');
                for (let el of possibleMapElements) {
                    // Check all properties on the element
                    for (let prop in el) {
                        if (prop.includes('leaflet') && el[prop] && typeof el[prop] === 'object') {
                            if (el[prop]._container || el[prop].getCenter) {
                                console.log('Found map via DOM property search');
                                return el[prop];
                            }
                        }
                    }
                }

                // Method 5: Try accessing via the Dash Leaflet component
                try {
                    const mapComponent = document.querySelector('#map .leaflet-container');
                    if (mapComponent) {
                        // Try to access the map through event listeners
                        const events = mapComponent._leaflet_events || mapComponent._events;
                        if (events) {
                            console.log('Found events on map container');
                        }
                    }
                } catch (e) {}

                return null;
            };

            // Enhanced map initialization
            window.initializeMapReference = function() {
                // Try to hook into Leaflet map creation
                if (window.L && window.L.Map) {
                    const originalMapInit = window.L.Map.prototype.initialize;
                    window.L.Map.prototype.initialize = function() {
                        originalMapInit.apply(this, arguments);
                        window.leafletMap = this;
                        console.log('Map captured during initialization');
                    };
                }

                // Also try to capture via the map container when it's added to DOM
                const observer = new MutationObserver((mutations) => {
                    for (let mutation of mutations) {
                        for (let node of mutation.addedNodes) {
                            if (node.nodeType === 1) { // Element node
                                if (node.classList && node.classList.contains('leaflet-container')) {
                                    // Wait a bit for the map to be fully initialized
                                    setTimeout(() => {
                                        const map = window.findMap();
                                        if (map) {
                                            window.leafletMap = map;
                                            console.log('Map captured via mutation observer');

                                            // Find feature group
                                            map.eachLayer((layer) => {
                                                if (layer instanceof L.FeatureGroup) {
                                                    window.featureGroup = layer;
                                                    console.log('Feature group found');
                                                }
                                            });
                                        }
                                    }, 100);
                                }
                            }
                        }
                    }
                });

                observer.observe(document.body, { childList: true, subtree: true });
            };

            // Initialize map reference capture
            window.initializeMapReference();

            // Wait for map to be ready - improved version
            let attempts = 0;
            const waitForMap = setInterval(() => {
                attempts++;

                if (!window.leafletMap) {
                    const map = window.findMap();
                    if (map) {
                        window.leafletMap = map;
                        console.log('Map reference stored successfully after ' + attempts + ' attempts');

                        // Find the feature group
                        map.eachLayer((layer) => {
                            if (layer instanceof L.FeatureGroup) {
                                window.featureGroup = layer;
                                console.log('Feature group found');
                            }
                        });

                        clearInterval(waitForMap);
                    }
                }

                if (attempts > 100) {
                    console.warn('Could not find map after 100 attempts');
                    clearInterval(waitForMap);
                }
            }, 100);

            // Alternative approach: capture map when EditControl is used
            document.addEventListener('click', function(e) {
                if (!window.leafletMap && e.target) {
                    // Check if click is on a leaflet control
                    const control = e.target.closest('.leaflet-draw-toolbar');
                    if (control) {
                        // Try to find map from the control
                        let parent = control;
                        while (parent && !parent.classList.contains('leaflet-container')) {
                            parent = parent.parentElement;
                        }
                        if (parent && parent._leaflet_map) {
                            window.leafletMap = parent._leaflet_map;
                            console.log('Map found via draw toolbar click');
                        }
                    }
                }
            });
        ''', type='text/javascript')
    ])
], forceColorScheme="light")


@app.callback(
    Output('line-configs', 'data'),
    Output('update-trigger', 'data'),
    Input('edit-control', 'geojson'),
    State('line-configs', 'data'),
    State('update-trigger', 'data'),
    prevent_initial_call=True
)
def initialize_line_configs(geojson, configs, trigger):
    """Initialize configs for new lines"""
    print("\n=== INITIALIZE LINE CONFIGS ===")
    if not geojson or not geojson.get('features'):
        print("No geojson features")
        return configs, trigger

    print(f"Processing {len(geojson['features'])} features")

    updated_configs = configs.copy()

    # Initialize config for any new lines
    for idx, feature in enumerate(geojson['features']):
        props = feature.get('properties', {})
        # Check for different possible ID property names
        feature_id = props.get('leafletId') or props.get('_leaflet_id') or props.get('id')

        print(f"Feature properties: {props}")

        if feature_id and str(feature_id) not in updated_configs:
            # Create default config for new line
            updated_configs[str(feature_id)] = {
                'name': f'Line {idx + 1}',  # Default name
                'type': 'polyline',
                'color': DEFAULT_LINE_COLOR,
                'weight': DEFAULT_LINE_WEIGHT,
                'opacity': DEFAULT_LINE_OPACITY,
                'antDelay': DEFAULT_ANT_DELAY,
                'antDashArray': DEFAULT_ANT_DASH_ARRAY,
                'antPulseColor': DEFAULT_ANT_PULSE_COLOR,
                'antPaused': False,
                'antReverse': False
            }
            print(f"Initialized config for new line {feature_id}")

    # Remove configs for deleted lines
    feature_ids = {
        str(f['properties'].get('leafletId') or f['properties'].get('_leaflet_id') or f['properties'].get('id'))
        for f in geojson['features']
        if f.get('properties', {}) and (
                f['properties'].get('leafletId') or f['properties'].get('_leaflet_id') or f['properties'].get(
            'id'))}
    keys_to_remove = [key for key in updated_configs if key not in feature_ids]
    for key in keys_to_remove:
        del updated_configs[key]
        print(f"Removed config for deleted line {key}")

    print(f"Updated configs: {list(updated_configs.keys())}")
    print("===============================\n")
    return updated_configs, trigger + 1


@app.callback(
    Output('rendered-lines', 'children'),
    Input('edit-control', 'geojson'),
    Input('line-configs', 'data'),
    Input('update-trigger', 'data')
)
def render_lines(geojson, configs, trigger):
    """Render all lines based on their configurations"""
    print("\n=== RENDER LINES ===")
    print(f"GeoJSON features: {len(geojson.get('features', [])) if geojson else 0}")
    print(f"Configs: {len(configs)}")
    print(f"Update trigger: {trigger}")

    # Check if AntPath is available
    if hasattr(dl, 'AntPath'):
        print("AntPath component is available")
    else:
        print("WARNING: AntPath component not found!")

    if not geojson or not geojson.get('features'):
        print("No features to render")
        print("====================\n")
        return []

    lines = []
    for feature in geojson['features']:
        props = feature.get('properties', {})
        # Check for different possible ID property names
        feature_id = props.get('leafletId') or props.get('_leaflet_id') or props.get('id')

        if not feature_id:
            print(f"Warning: Feature has no ID. Properties: {props}")
            continue

        feature_id = str(feature_id)  # Ensure it's a string

        # Get config or use defaults
        config = configs.get(feature_id, {
            'name': 'Unnamed Line',
            'type': 'polyline',
            'color': DEFAULT_LINE_COLOR,
            'weight': DEFAULT_LINE_WEIGHT,
            'opacity': DEFAULT_LINE_OPACITY
        })

        positions = feature['geometry']['coordinates']
        # Convert from GeoJSON [lng, lat] to Leaflet [lat, lng]
        positions = [[coord[1], coord[0]] for coord in positions]

        print(f"Rendering line {feature_id} ({config.get('name', 'Unnamed')}):")
        print(f"  Type: {config.get('type', 'polyline')}")
        print(f"  Color: {config.get('color')}")
        print(f"  Weight: {config.get('weight')}")
        print(f"  Opacity: {config.get('opacity')}")

        # Create tooltip with line name
        tooltip = dl.Popup(config.get('name', 'Unnamed Line'))

        if config.get('type') == 'antpath' and hasattr(dl, 'AntPath'):
            # Render as AntPath
            line = dl.AntPath(
                id={'type': 'rendered-line', 'id': feature_id},
                positions=positions,
                color=config.get('color', DEFAULT_LINE_COLOR),
                weight=config.get('weight', DEFAULT_LINE_WEIGHT),
                opacity=config.get('opacity', DEFAULT_LINE_OPACITY),
                pulseColor=config.get('antPulseColor', DEFAULT_ANT_PULSE_COLOR),
                delay=config.get('antDelay', DEFAULT_ANT_DELAY),
                dashArray=config.get('antDashArray', DEFAULT_ANT_DASH_ARRAY),
                paused=config.get('antPaused', False),
                reverse=config.get('antReverse', False),
                n_clicks=0,
                children=[tooltip]
            )
            print(f"  Created AntPath with id: {{'type': 'rendered-line', 'id': '{feature_id}'}}")
        else:
            # Render as regular Polyline
            line = dl.Polyline(
                id={'type': 'rendered-line', 'id': feature_id},
                positions=positions,
                color=config.get('color', DEFAULT_LINE_COLOR),
                weight=config.get('weight', DEFAULT_LINE_WEIGHT),
                opacity=config.get('opacity', DEFAULT_LINE_OPACITY),
                n_clicks=0,
                children=[tooltip]
            )
            print(f"  Created Polyline with id: {{'type': 'rendered-line', 'id': '{feature_id}'}}")

        lines.append(line)

    print(f"Total lines rendered: {len(lines)}")
    print("====================\n")
    return lines


@app.callback(
    Output('selected-line', 'data'),
    Output('style-drawer', 'opened'),
    Input({'type': 'rendered-line', 'id': ALL}, 'n_clicks'),
    State({'type': 'rendered-line', 'id': ALL}, 'id'),
    State('selected-line', 'data'),
    prevent_initial_call=True
)
def handle_line_selection(n_clicks_list, id_list, current_selection):
    """Handle clicks on rendered lines"""
    print("\n=== HANDLE LINE SELECTION ===")
    print(f"Click counts: {n_clicks_list}")
    print(f"IDs: {id_list}")
    print(f"Current selection: {current_selection}")

    # Check if any line was clicked
    if not n_clicks_list or not any(n_clicks_list):
        print("No clicks detected")
        print("=============================\n")
        return current_selection, False

    ctx = callback_context

    if ctx.triggered:
        # Get the clicked element from the context
        prop_id = ctx.triggered[0]['prop_id']
        try:
            # Extract the ID from the pattern matching prop_id
            id_part = prop_id.split('.')[0]
            if '{' in id_part:
                id_dict = json.loads(id_part)
                line_id = str(id_dict['id'])
                print(f"Selected line from context: {line_id}")
                print("=============================\n")
                return line_id, True
        except Exception as e:
            print(f"Error parsing context: {e}")

    # Fallback: Find the line with the highest click count
    max_clicks = max(n_clicks_list)
    if max_clicks > 0:
        idx = n_clicks_list.index(max_clicks)
        if idx < len(id_list):
            line_id = id_list[idx]['id'] if isinstance(id_list[idx], dict) else id_list[idx]
            print(f"Selected line by max clicks: {line_id}")
            print("=============================\n")
            return str(line_id), True

    print("No line selected")
    print("=============================\n")
    return current_selection, False


@app.callback(
    Output('line-name-input', 'value'),
    Output('line-type', 'value'),
    Output('line-color', 'value'),
    Output('line-weight', 'value'),
    Output('line-opacity', 'value'),
    Output('pulse-color', 'value'),
    Output('ant-delay', 'value'),
    Output('dash-size', 'value'),
    Output('gap-size', 'value'),
    Output('ant-paused', 'checked'),
    Output('ant-reverse', 'checked'),
    Input('selected-line', 'data'),
    State('line-configs', 'data')
)
def load_line_config(selected_line, configs):
    """Load configuration for selected line"""
    if not selected_line or selected_line not in configs:
        return ('', 'polyline', DEFAULT_LINE_COLOR, DEFAULT_LINE_WEIGHT, DEFAULT_LINE_OPACITY,
                DEFAULT_ANT_PULSE_COLOR, DEFAULT_ANT_DELAY,
                DEFAULT_ANT_DASH_ARRAY[0], DEFAULT_ANT_DASH_ARRAY[1],
                False, False)

    config = configs[selected_line]
    return (
        config.get('name', ''),
        config.get('type', 'polyline'),
        config.get('color', DEFAULT_LINE_COLOR),
        config.get('weight', DEFAULT_LINE_WEIGHT),
        config.get('opacity', DEFAULT_LINE_OPACITY),
        config.get('antPulseColor', DEFAULT_ANT_PULSE_COLOR),
        config.get('antDelay', DEFAULT_ANT_DELAY),
        config.get('antDashArray', DEFAULT_ANT_DASH_ARRAY)[0],
        config.get('antDashArray', DEFAULT_ANT_DASH_ARRAY)[1],
        config.get('antPaused', False),
        config.get('antReverse', False)
    )


@app.callback(
    Output('antpath-options', 'style'),
    Input('line-type', 'value')
)
def toggle_antpath_options(line_type):
    """Show/hide AntPath options based on line type"""
    if line_type == 'antpath':
        return {'display': 'block'}
    return {'display': 'none'}


@app.callback(
    Output('line-configs', 'data', allow_duplicate=True),
    Output('update-trigger', 'data', allow_duplicate=True),
    Input('apply-changes', 'n_clicks'),
    State('selected-line', 'data'),
    State('line-name-input', 'value'),
    State('line-type', 'value'),
    State('line-color', 'value'),
    State('line-weight', 'value'),
    State('line-opacity', 'value'),
    State('pulse-color', 'value'),
    State('ant-delay', 'value'),
    State('dash-size', 'value'),
    State('gap-size', 'value'),
    State('ant-paused', 'checked'),
    State('ant-reverse', 'checked'),
    State('line-configs', 'data'),
    State('update-trigger', 'data'),
    prevent_initial_call=True
)
def apply_style_changes(n_clicks, selected_line, name, line_type, color, weight, opacity,
                        pulse_color, delay, dash_size, gap_size, paused, reverse,
                        configs, trigger):
    """Apply style changes to selected line"""
    if not n_clicks or not selected_line:
        return configs, trigger

    updated_configs = configs.copy()
    updated_configs[selected_line] = {
        'name': name or f'Line {selected_line}',
        'type': line_type,
        'color': color,
        'weight': weight,
        'opacity': opacity,
        'antPulseColor': pulse_color,
        'antDelay': delay,
        'antDashArray': [dash_size, gap_size],
        'antPaused': paused,
        'antReverse': reverse
    }

    print(f"\nUpdated config for line {selected_line}: {updated_configs[selected_line]}")

    return updated_configs, trigger + 1


@app.callback(
    Output('debug-info', 'children'),
    Input('edit-control', 'geojson'),
    Input('line-configs', 'data'),
    Input('rendered-lines', 'children')
)
def update_debug_info(geojson, configs, rendered_lines):
    """Update debug information display"""
    feature_count = len(geojson.get('features', [])) if geojson else 0
    feature_ids = []

    config_info = []
    for line_id, config in configs.items():
        config_info.append(f"{line_id}: {config.get('name', 'Unnamed')} ({config.get('type', 'unknown')})")

    if geojson and geojson.get('features'):
        for f in geojson['features']:
            props = f.get('properties', {})
            fid = props.get('leafletId') or props.get('_leaflet_id') or props.get('id')
            if fid:
                feature_ids.append(fid)

    debug_text = (
        f"Total features: {feature_count}\n"
        f"Lines rendered: {len(rendered_lines)}\n"
        f"Configs: {len(configs)}\n"
        f"Feature IDs: {feature_ids}\n"
        f"Lines: {', '.join(config_info)}\n"
        f"AntPath available: {hasattr(dl, 'AntPath')}"
    )

    return html.Pre(debug_text, style={'fontSize': '10px'})


# Client-side callbacks for debugging
app.clientside_callback(
    """
    function(n_clicks) {
        if (!n_clicks) return "";

        console.log('=== INSPECT MAP LAYERS ===');

        // Try multiple methods to find the map
        let map = window.leafletMap;

        if (!map && window.findMap) {
            map = window.findMap();
            if (map) {
                window.leafletMap = map;
            }
        }

        // Final attempt: try to get map from any leaflet container
        if (!map) {
            const containers = document.querySelectorAll('.leaflet-container');
            for (let container of containers) {
                // Try various properties
                for (let prop in container) {
                    if (container[prop] && container[prop].getCenter) {
                        map = container[prop];
                        window.leafletMap = map;
                        console.log('Found map via container property scan');
                        break;
                    }
                }
                if (map) break;
            }
        }

        if (!map) {
            return JSON.stringify({
                error: "Map not found - this is a known issue with Dash Leaflet map access",
                diagnostics: {
                    mapElementExists: !!document.getElementById('map'),
                    leafletContainerExists: !!document.querySelector('.leaflet-container'),
                    windowLeafletMapStored: !!window.leafletMap,
                    suggestion: "The map exists but we cannot access it due to React encapsulation. Try using the EditControl features which work correctly."
                }
            }, null, 2);
        }

        const layers = [];
        map.eachLayer((layer) => {
            const info = {
                type: layer.constructor.name,
                leafletId: layer._leaflet_id
            };

            if (layer instanceof L.Polyline) {
                info.isPolyline = true;
                info.latlngs = layer.getLatLngs();
                info.options = {
                    color: layer.options.color,
                    weight: layer.options.weight,
                    opacity: layer.options.opacity
                };
            }

            if (layer instanceof L.FeatureGroup) {
                info.isFeatureGroup = true;
                info.childCount = Object.keys(layer._layers || {}).length;
                info.children = [];
                layer.eachLayer((child) => {
                    info.children.push({
                        type: child.constructor.name,
                        leafletId: child._leaflet_id
                    });
                });
            }

            layers.push(info);
        });

        return JSON.stringify({
            mapFound: true,
            totalLayers: layers.length,
            layers: layers
        }, null, 2);
    }
    """,
    Output('inspect-output', 'children'),
    Input('inspect-map-btn', 'n_clicks')
)

app.clientside_callback(
    """
    function(n_clicks) {
        if (!n_clicks) return "";

        console.log('Attempting to hide EditControl layers...');

        // This is a limitation of Dash Leaflet - we cannot easily access the map instance
        // from clientside callbacks due to React's encapsulation

        // Try to hide via CSS as a workaround
        const editLayers = document.querySelectorAll('.leaflet-interactive');
        let hidden = 0;
        editLayers.forEach(layer => {
            if (layer.style.opacity !== '0') {
                layer.style.opacity = '0';
                hidden++;
            }
        });

        return `Hidden ${hidden} interactive layers via CSS. Note: This is a workaround due to Dash Leaflet limitations.`;
    }
    """,
    Output('inspect-output', 'children', allow_duplicate=True),
    Input('hide-editcontrol-btn', 'n_clicks'),
    prevent_initial_call=True
)

app.clientside_callback(
    """
    function(n_clicks) {
        if (!n_clicks) return "";

        // Since we cannot access the map directly, we'll remove orphaned DOM elements
        const paths = document.querySelectorAll('.leaflet-interactive');
        let removed = 0;

        paths.forEach(path => {
            // Check if this path is orphaned (not part of a proper layer group)
            const parent = path.closest('.leaflet-pane');
            if (parent && parent.classList.contains('leaflet-overlay-pane')) {
                // Check if it has opacity 0 (hidden EditControl layer)
                if (path.style.opacity === '0') {
                    path.remove();
                    removed++;
                }
            }
        });

        return `Removed ${removed} hidden/orphaned path elements from DOM. Note: This is a CSS/DOM workaround.`;
    }
    """,
    Output('inspect-output', 'children', allow_duplicate=True),
    Input('clean-layers-btn', 'n_clicks'),
    prevent_initial_call=True
)


@app.callback(
    Output('inspect-output', 'children', allow_duplicate=True),
    Input('log-config-btn', 'n_clicks'),
    State('selected-line', 'data'),
    State('line-configs', 'data'),
    State('edit-control', 'geojson'),
    prevent_initial_call=True
)
def log_config_state(n_clicks, selected_line, configs, geojson):
    """Log the current configuration state"""
    feature_count = len(geojson.get('features', [])) if geojson else 0
    feature_ids = []

    if geojson and geojson.get('features'):
        for f in geojson['features']:
            props = f.get('properties', {})
            fid = props.get('leafletId') or props.get('_leaflet_id') or props.get('id')
            if fid:
                feature_ids.append(fid)

    return json.dumps({
        'selected_line': selected_line,
        'configs': configs,
        'num_configs': len(configs),
        'geojson_features': feature_count,
        'feature_ids': feature_ids
    }, indent=2)


@app.callback(
    Output('inspect-output', 'children', allow_duplicate=True),
    Input('test-polyline', 'n_clicks'),
    prevent_initial_call=True
)
def test_polyline_click(n_clicks):
    """Test basic polyline click functionality"""
    return f"Test polyline clicked {n_clicks} times!"


@app.callback(
    Output('inspect-output', 'children', allow_duplicate=True),
    Input({'type': 'test-pattern', 'id': ALL}, 'n_clicks'),
    prevent_initial_call=True
)
def test_pattern_click(n_clicks_list):
    """Test pattern matching click functionality"""
    return f"Pattern test clicked: {n_clicks_list}"


if __name__ == '__main__':
    app.run(debug=True, port=8002)
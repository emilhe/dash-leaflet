from dash import html # Kept for consistency, though not directly used in the modified part
from dash_leaflet import Popup, TileLayer
from tests.stubs import event_app_stub
import dash_mantine_components as dmc
from dash_emoji_mart import DashEmojiMart
from dash_iconify import DashIconify

target_id = "popup-dmc-button"

custom_emojis = [
    {
        'id': 'custom',
        'name': 'Custom Icons',
        'emojis': [
            {
                'id': 'home',
                'name': 'Home',
                'short_names': ['home'],
                'keywords': ['house', 'building'],
                'skins': [{'src': 'https://cdn-icons-png.flaticon.com/512/25/25694.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'office',
                'name': 'Office',
                'short_names': ['office'],
                'keywords': ['work', 'building'],
                'skins': [{'src': 'https://cdn-icons-png.flaticon.com/512/2098/2098316.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'restaurant',
                'name': 'Restaurant',
                'short_names': ['restaurant'],
                'keywords': ['food', 'dining'],
                'skins': [{'src': 'https://cdn-icons-png.flaticon.com/512/3448/3448609.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'park',
                'name': 'Park',
                'short_names': ['park'],
                'keywords': ['nature', 'trees'],
                'skins': [{'src': 'https://cdn-icons-png.flaticon.com/512/2926/2926989.png'}],
                'native': '',
                'unified': 'custom',
            },
        ],
    },
]

# Create the Popup with the dmc.Button as its child
popup_component = Popup(position=[56, 10], children=[dmc.Group([dmc.TextInput(
                placeholder="Name",
                size="sm",
                radius="sm",
                required=True,
            ),
    dmc.Popover(
    [
dmc.PopoverTarget(
dmc.Tooltip(
    label="Line Animation Settings",
    position="top",
    transitionProps={
            "transition": "scale-x",
            "duration": 200,
            "timingFunction": "ease"
    },
    withArrow=True,
    children=dmc.ActionIcon(
                DashIconify(icon="line-md:roundabout-right", width=20),
                size="lg",
                variant="filled",
                id="action-icon",
                n_clicks=0,

            ),
    zIndex=1010,
)
    ),
        dmc.PopoverDropdown(
            [

                dmc.Group([
dmc.SegmentedControl(
            data=[{
                    "value": 'create_line_segment',
                    "label": dmc.Center(
                        DashIconify(icon="material-symbols-light:shape-line", width=16),
                        style={"gap": 10},
                    ),
                },
            {
                    "value": 'ant_path_segment',
                    "label": dmc.Center(
                        DashIconify(icon="svg-spinners:3-dots-bounce", width=16),
                        style={"gap": 10},
                    ),
                },
            ], orientation="vertical"
        ),
                    # show only if create_line_segment SegmentedControl value is selected
                    dmc.ColorPicker(
                            id="create_line_segment_color_picker",
                            format="hex",
                            value="#3388ff",
                            fullWidth=True,
                            swatches=[
                                "#fa5252", "#e64980", "#be4bdb", "#7950f2",
                                "#4c6ef5", "#228be6", "#15aabf", "#12b886",
                                "#40c057", "#82c91e", "#fab005", "#fd7e14",
                            ]
                        ),

                    # show only if ant_path_segment SegmentedControl value is selected
    dmc.Stack([
                dmc.Grid([
                    dmc.GridCol(dmc.Stack([html.Label('Base Color'),
                        dmc.ColorPicker(id='color-picker', value='#0000FF', w='100%'),]),
                        span={"base": 6, "md": 3, "lg":3}),
                    dmc.GridCol(dmc.Stack([html.Label('Pulse Color'),
                        dmc.ColorPicker(id='pulse-color-picker', value='#FFFFFF', w='100%')]), span={"base": 6, "md": 3, "lg":3}),
                    dmc.GridCol(dmc.Stack([
                        dmc.NumberInput(id='delay-input', value=400, min=100, max=2000, step=100, label="Delay", w='100%'),
                        dmc.NumberInput(id='weight-input', value=3, min=1, max=10, label="Line Weight", w='100%'),
                        dmc.Switch(id='pause-switch', label='Pause Animation', offLabel=DashIconify(icon="line-md:pause", width=20),
    onLabel=DashIconify(icon="line-md:play-twotone", width=20),),
                    ]), span={"base": 6, "md": 3, "lg":3}),
                    dmc.GridCol(dmc.Stack([
                        dmc.NumberInput(id='dash-size-input', value=10, min=1, max=50, label="Dash Size", w='100%'),
                        dmc.NumberInput(id='gap-size-input', value=20, min=1, max=50, label="Gap Size", w='100%'),
                        dmc.Switch(id='reverse-switch', label='Reverse Animation', offLabel=DashIconify(icon="line-md:arrow-align-left", width=20),
    onLabel=DashIconify(icon="line-md:arrow-align-right", width=20)),
                    ]), span={"base": 6, "md": 3, "lg":3}),
                ], grow=True, justify='center'),
            ], id="ant-path-segment-settings", style={"display": "none"}),
                ])
            ]
        ),
    ],

    width=700,
    position="top",
    withArrow=False,
    trapFocus=True,
    shadow="md",
    id=target_id,
    offset=30,
    zIndex=1000,
    transitionProps={
                "transition": "skew-up",
                "duration": 200,
                "timingFunction": "ease"
        },

),


])], minWidth=240, maxWidth=240)

# Wrap the Popup component with MantineProvider
# This ensures the dmc.Button inside the Popup has the Mantine context.
component_with_provider = dmc.MantineProvider(children=[popup_component], forceColorScheme="dark",)

# Pass the MantineProvider-wrapped component to the event_app_stub
app, selector = event_app_stub(target_id=target_id, components=[TileLayer(), component_with_provider])

if __name__ == "__main__":
    app.run(port=9997)
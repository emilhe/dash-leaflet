import importlib
import pytest
from dash.testing.application_runners import import_app
from selenium.webdriver.common.action_chains import ActionChains


def component_path(component: str):
    """
    Given component name, returns component path.
    """
    return f"tests.components.{component}"


def import_selector(component: str):
    """
    Given component name, returns component selector.
    """
    module_path = component_path(component)
    m = importlib.import_module(module_path)
    if hasattr(m, "selector"):
        return m.selector
    return ".leaflet-interactive"


@pytest.mark.parametrize("component", ["map_container", "marker", "popup", "image_overlay", "video_overlay", "circle",
                                       "circle_marker", "polyline", "polygon", "rectangle", "svg_overlay",
                                       "layer_group", "feature_group", "pane", "polyline_decorator", "div_marker"])
def test_click_event(dash_duo, component):
    """
    Basic test that (1) a component renders and (2) that click events work.
    """
    app = import_app(component_path(component))
    selector = import_selector(component)
    dash_duo.start_server(app)
    assert dash_duo.find_element("#log").text == "null"
    dash_duo.find_element(selector).click()
    dash_duo.wait_for_contains_text("#log", "1", timeout=1)


@pytest.mark.parametrize("component", ["tile_layer", "wms_tile_layer"])
def test_load_event(dash_duo, component):
    """
    Basic test that (1) a component renders and (2) that the load event fires.
    """
    app = import_app(component_path(component))
    dash_duo.start_server(app)
    assert dash_duo.find_element("#log").text == "null"
    dash_duo.wait_for_contains_text("#log", "timestamp", timeout=5)


@pytest.mark.parametrize("component", ["zoom_control", "attribution_control", "scale_control", "gesture_handling", "colorbar", "measure_control", "edit_control"])
def test_render(dash_duo, component):
    """
    Basic test that a component renders without errors.
    """
    app = import_app(component_path(component))
    dash_duo.start_server(app)


def test_tooltip(dash_duo):
    """
    Basic rendering test for the tooltip component (requires special treatment).
    """
    app = import_app(component_path("tooltip"))
    dash_duo.start_server(app)
    ActionChains(dash_duo.driver).move_to_element(dash_duo.find_element(".leaflet-marker-icon")).perform()
    dash_duo.wait_for_contains_text(".leaflet-tooltip", "Hello world!", timeout=1)

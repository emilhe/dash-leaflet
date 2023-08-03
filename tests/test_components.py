import importlib
import pytest
import time
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
    return m.selector


@pytest.mark.parametrize("component", ["map_container", "marker", "popup", "image_overlay", "video_overlay", "circle",
                                       "circle_marker", "polyline", "polygon", "rectangle", "svg_overlay",
                                       "layer_group", "feature_group", "pane"])
def test_click_event(dash_duo, component):
    """
    Basic test that (1) a component renders and (2) that click events work.
    """
    app = import_app(component_path(component))
    selector = import_selector(component)
    dash_duo.start_server(app)
    log = dash_duo.find_element("#log")
    assert log.text == "null"
    dash_duo.find_element(selector).click()
    time.sleep(0.1)
    assert log.text != "null"


@pytest.mark.parametrize("component", ["tile_layer", "wms_tile_layer"])
def test_load_event(dash_duo, component):
    """
    Basic test that (1) a component renders and (2) that the load event fires.
    """
    app = import_app(component_path(component))
    dash_duo.start_server(app)
    log = dash_duo.find_element("#log")
    assert log.text == "null"
    time.sleep(1)
    assert log.text != "null"


@pytest.mark.parametrize("component", ["zoom_control", "attribution_control", "scale_control"])
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
    tooltip = dash_duo.find_element(".leaflet-tooltip")
    assert tooltip.text == "Hello world!"
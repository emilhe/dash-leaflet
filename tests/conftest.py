import os
import sys
from selenium.webdriver.chrome.options import Options

sys.path.insert(0, os.path.abspath('..'))

def pytest_setup_options():
    """
    Set up some options for how we want the Chrome webdriver to be configured.
    """
    options = Options()
    options.add_argument("--disable-gpu")
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    return options

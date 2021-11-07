import json
import os
import pathlib

from setuptools import setup, find_namespace_packages

# The directory containing this file
HERE = pathlib.Path(__file__).parent

# The text of the README file
README = (HERE / "README.md").read_text()

with open(os.path.join(HERE, 'package.json')) as f:
    package = json.load(f)

package_name = package["name"].replace(" ", "_").replace("-", "_")
packages = [package_name] + \
           [f"{package_name}.{subpackage_name}" for subpackage_name in find_namespace_packages(package_name)]

setup(
    name=package_name,
    version=package["version"],
    author=package['author'],
    packages=packages,
    include_package_data=True,
    license=package['license'],
    description=package['description'] if 'description' in package else package_name,
    long_description=README,
    long_description_content_type="text/markdown",
    url="https://github.com/thedirtyfew/dash-leaflet",
    install_requires=["geobuf"]
)

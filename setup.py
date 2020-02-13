import json
import os
import pathlib

from setuptools import setup

# The directory containing this file
HERE = pathlib.Path(__file__).parent

# The text of the README file
README = (HERE / "README.md").read_text()

with open(os.path.join('dash_leaflet', 'package.json')) as f:
    package = json.load(f)

package_name = package["name"].replace(" ", "_").replace("-", "_")

setup(
    name=package_name,
    version=package["version"],
    author=package['author'],
    author_email="emil.h.eriksen@gmail.com",
    packages=[package_name],
    include_package_data=True,
    license=package['license'],
    description=package['description'] if 'description' in package else package_name,
    long_description=README,
    long_description_content_type="text/markdown",
    url="https://github.com/thedirtyfew/dash-leaflet",
    install_requires=[]
)

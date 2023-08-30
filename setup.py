import json
import os
import pathlib

from setuptools import setup

# The directory containing this file
HERE = pathlib.Path(__file__).parent

# The text of the README file
README = (HERE / "README.md").read_text()

with open(os.path.join(HERE, 'package.json')) as f:
    package = json.load(f)

package_name = package["name"].replace(" ", "_").replace("-", "_")

setup(
    name=package_name,
    version=package["version"],
    author=package['author'],
    packages=[package_name],
    include_package_data=True,
    license=package['license'],
    description=package['description'] if 'description' in package else package_name,
    long_description=README,
    long_description_content_type="text/markdown",
    url="https://github.com/thedirtyfew/dash-leaflet",
    install_requires=[
        "dash>=2.13.0",
    ],
    extras_require={
        "svg": ["dash-svg"],
        "geobuf": ["protobuf==3.20.0", "geobuf==1.1.1"],
        "all": ["dash-svg", "protobuf==3.20.0", "geobuf==1.1.1", "dash-extensions>=1.0.3"]
    },
    classifiers=[
        'Framework :: Dash',
    ],
)

# Dash Leaflet

Dash Leaflet is a light wrapper around React-Leaflet. The syntax is similar to other Dash components, with naming conventions following the React-Leaflet API.

## Getting started

The easiest way to get started is to install the latest version of Dash and Dash Leaflet via pip.

```
pip install dash
pip install dash-leaflet
```

Once the installation is completed, paste the following lines of code into a .py file and run it.

````
from dash import Dash
import dash_leaflet as dl

app = Dash()
app.layout = dl.Map(dl.TileLayer(), style={'height': '50vh'}, center=[56, 10], zoom=6)

if __name__ == '__main__':
    app.run_server()
````

That's it! If you visit http://127.0.0.1:8050/ in your browser, you should see a Leaflet map.

## Documentation

The documentation has been moved to [a separate page](https://dash-leaflet.com) to enable an interactive example gallery.

NB: The 1.0.0 release contains a wide range of breaking changes, please refer to the migration guidelines

## Support

Please ask questions on [StackOverflow](https://stackoverflow.com/) using the [`dash-leaflet` tag](https://stackoverflow.com/questions/tagged/dash-leaflet), use GitHub issues only for bug reports.

## Build instructions

Start by cloning this repository,

````
git clone git@github.com:thedirtyfew/dash-leaflet.git
cd dash-leaflet
````

Next, create a virtual environment and install the python dependencies,

````
python3 -m venv venv && . venv/bin/activate
pip install -r requirements.txt
````

Finally, install packages via npm (ignore errors) and run the build script,

````
npm i --ignore-scripts
npm run build
````

## Donation

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=Z9RXT5HVPK3B8&currency_code=DKK&source=url)



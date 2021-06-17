Dash Leaflet is a light wrapper around React-Leaflet. The syntax is similar to other Dash components, with naming conventions following the React-Leaflet API. 

## Getting started

The easiest way to get started is to install the latest version of Dash and Dash Leaflet via pip.

```
pip install dash==1.20.0
pip install dash-leaflet
```

Once the installation is completed, paste the following lines of code into a .py file and run it.

````
import dash
import dash_leaflet as dl

app = dash.Dash()
app.layout = dl.Map(dl.TileLayer(), style={'width': '1000px', 'height': '500px'})

if __name__ == '__main__':
    app.run_server()    
````

If you visit http://127.0.0.1:8050/ in your browser, you should see a Leaflet map.

## Documentation

The documentation has been moved to [Heroku](https://dash-leaflet.herokuapp.com/) to enable an interactive example gallery. 

NB: The 0.1.0 release contains a number breaking changes, most prominently merging of the `SuperCluster` and `GeoJSON` components into a new `GeoJSON` component powered by [functional properties](https://dash-leaflet.herokuapp.com/#func_props).  

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
npm run build:all
````

## Donation

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=Z9RXT5HVPK3B8&currency_code=DKK&source=url)



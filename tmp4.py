# -*- coding: utf-8 -*-
import dash_bootstrap_components as dbc
from dash.dependencies import Input, Output, State
import dash_core_components as dcc
import dash_html_components as html
import dash_leaflet as dl
import os
import dash

# import plotly.express as px
import pandas as pd
import sqlite3
import dash_table
import datetime as dt
import math
import copy


script_dir = os.path.dirname(os.path.abspath(__file__))

app = dash.Dash(__name__,
                serve_locally=False,
                external_stylesheets=[dbc.themes.BOOTSTRAP],
                external_scripts=['https://cdn.plot.ly/plotly-basic-1.54.6.min.js'])
        # meta_tags=[{"name": "viewport", "content": "width=device-width, initial-scale=1"}])

#%% uncomment this when migrating to production
# con = sqlite3.connect(os.path.join(script_dir,'evictions.sqlite'))

#%% delete this when migrating to production
from pathlib import Path
script_dir = str(Path(__file__).parents[0]) 
project_dir =  str(Path(__file__).parents[1])
data_dir = "/tmp/data" # os.path.join(project_dir, 'data')
con = sqlite3.connect(os.path.join(data_dir,'evictions.sqlite'))

#%% Load data
df = pd.read_sql('SELECT * FROM peoria_illinois', con=con)
df['judgement_date'] = pd.to_datetime(df['judgement_date'], errors='coerce')
df['filed_date'] = pd.to_datetime(df['filed_date'], errors='coerce')

# table 
PAGE_SIZE = 100
columns = ['case_number','party_type','name','filed_date','judgement_date','favor_party_type','amount','additional','full_address']

# Create marker cluster.
import pickle
positions = df[(df['latitude']!=0) & (df['party_type']!='A')].apply(lambda row: [row["latitude"],row["longitude"]],axis=1).to_list()
with open("positions.pkl", 'wb') as f:
    pickle.dump(positions, f)

# markers = df[(df['latitude']!=0) & (df['party_type']!='A')].apply(lambda row: dl.Marker(dl.Tooltip(row["name"].title() + ' at ' + row["full_address"]), position=[row["latitude"],row["longitude"]]),axis=1).to_list()
cluster = dl.MarkerClusterGroupTest(id="markers",
                                positions=positions,
                                options={
                                    "polygonOptions": {"color": "red"},
                                    "chunkedLoading": True,
                                    }
                                )

#%% Create global chart template
mapbox_access_token = 'pk.eyJ1IjoiamFja2x1byIsImEiOiJjajNlcnh3MzEwMHZtMzNueGw3NWw5ZXF5In0.fk8k06T96Ml9CLGgKmk81w'

layout = dict(
    autosize=True,
    automargin=True,
    margin=dict(
        l=30,
        r=30,
        b=20,
        t=40
    ),
    hovermode="closest",
    plot_bgcolor="#F9F9F9",
    paper_bgcolor="#F9F9F9",
    legend=dict(font=dict(size=10), orientation='h'),
    title='Satellite Overview',
    mapbox=dict(
        accesstoken=mapbox_access_token,
        style="light",
        center=dict(
            lon=-78.05,
            lat=42.54
        ),
        zoom=7,
    )
)


#%% Create app layout
app.layout = html.Div(
    [
        dbc.NavbarSimple(
            children=[
                dbc.NavItem(dbc.NavLink("Read blog article: Eviction in Peoria", href="#")),
                dbc.DropdownMenu(
                    children=[
                        dbc.DropdownMenuItem("More pages", header=True),
                        dbc.DropdownMenuItem("Page 2", href="#"),
                        dbc.DropdownMenuItem("Page 3", href="#"),
                    ],
                    nav=True,
                    in_navbar=True,
                    label="More",
                ),
            ],
            brand="￩ Dashboards",
            # brand="← Dashboards",
            brand_href="#",
            color="#090A0B",
            dark=True,
        ),
        dbc.Container([
            html.Div(
                [
                    # dbc.Button("Modal with scrollable body", id="open-body-scroll"),
                    dbc.Modal(
                        [
                            dbc.ModalHeader("Eviction in Peoria"),
                            dbc.ModalBody(dcc.Markdown('''
                                In 2016, Peoria Illinois was only the 244th most populus city in America but it had the 85th highest rate of eviction.
    
                                >
                                > *Why do so many people get evicted here?*
                                >
                                > *Are we okay with the consequences?*
                                >
    
                                The data on this page gives perspective: we show the landlords, attorneys, and more than 22,000 tenants who have been evicted in Peoria County since 2005.
    
                                This page is just one part of a months long investigation into Peoria’s eviction crisis. Learn more here
                                ''')
                            ),
                            dbc.ModalFooter(
                                dbc.Button(
                                    "Show me the data", id="close-body-scroll"
                                )
                            ),
                        ],
                        id="modal-body-scroll",
                        scrollable=True,
                        centered=True,
                    ),
                ]
            ),
            dbc.Row(
                [
                    dbc.Col(
                        [
                            dbc.Card(dbc.CardBody([
                                html.P(
                                    'Filter by judgement date (or select range in histogram):',
                                    className="control_label"),
                                dcc.RangeSlider(
                                    id='year_slider',
                                    min=2005,
                                    max=pd.DatetimeIndex(df['judgement_date']).year.max(),
                                    value=[2005, pd.DatetimeIndex(df['judgement_date']).year.max()],
                                    marks={str(year): str(year) for year in list(pd.DatetimeIndex(df['judgement_date']).year.unique().sort_values())},
                                    updatemode='drag'
                                    )
                            
                            ]))
                        ],
                        # className="pretty_container",
                    ),
                ]
            ),
            dbc.Row(
                [
                    dbc.Col(dbc.Card(
                            dbc.CardBody(
                                [
                                    html.H6("Cases", className="card-title"),
                                    html.H4("", className="card-subtitle", id="case_count"),
                                ]
                            ),
                    ), width="auto"),
                    dbc.Col(dbc.Card(
                            dbc.CardBody(
                                [
                                    html.H6("Defendants", className="card-title"),
                                    html.H4("", className="card-subtitle", id="defendant_count"),
                                ]
                            ),
                    ), width="auto"),
                    dbc.Col(dbc.Card(
                            dbc.CardBody(
                                [
                                    html.H6("Plaintiffs", className="card-title"),
                                    html.H4("", className="card-subtitle", id="plaintiff_count"),
                                ]
                            ),
                    ), width="auto"),
                    dbc.Col(dbc.Card(
                            dbc.CardBody(
                                [
                                                                      
                                    html.H6(
                                            [
                                                "Share of cases resulting in eviction",
                                                html.Span(
                                                    " ⓘ",
                                                    id="tooltip-share-of-cases",
                                                    style={"cursor": "pointer"},
                                                )
                                            ], className="card-title"),
                                    html.H4("", className="card-subtitle", id="share_of_evictions"), 
                                    dbc.Tooltip(
                                        "County data prior to 2014 contain very few recorded verdicts due to lost data",
                                        target="tooltip-share-of-cases",
                                    ),
                                ]
                            ),
                    ), width="auto"),
                    dbc.Col(dbc.Card(dbc.CardBody(
                                [
                                    html.H6(
                                            [
                                                "Average rent owed",
                                                html.Span(
                                                    " ⓘ",
                                                    id="tooltip-average-amount-owed",
                                                    style={"cursor": "pointer"},
                                                )
                                            ], className="card-title"),
                                    dbc.Tooltip(
                                        "County data prior to 2014 contain very few recorded verdicts due to the data being lost",
                                        target="tooltip-average-amount-owed",
                                    ),
                                    html.H4("", className="card-subtitle", id="average_amount_owed"),
                                ]
                            ),
                    ), width="auto"),
                ],
                no_gutters=True,
                justify="between",
            ),
            dbc.Row(
                html.Div(
                    
                    className="twelve columns pretty_container",
                ),
            ),
            dbc.Row(
                dbc.Col(
                    dbc.Card(dbc.CardBody(
                        [
                            dcc.Graph(
                                id='count_graph',
                            )
                        ],
                    )),
                ),
            ),
            dbc.Row(
                dbc.Col(
                    dbc.Card(dbc.CardBody(            
                        dl.Map([
                            dl.TileLayer(), cluster],
                            zoom=12,
                            # minZoom=12,
                            center=(40.6936, -89.670),
                            #preferCanvas=True,
                            style={ 'height': '500px'})
                        ))
                ),
            ),
            dbc.Row(
                dbc.Col(
                    dbc.Card(dbc.CardBody(
                        dash_table.DataTable(
                            id='datatable-paging',
                            columns=[{"name": i, "id": i} for i in columns],
                            page_current=0,
                            page_size=PAGE_SIZE,
                            page_action='custom',
                            style_table={'height': '320px', 'overflowY': 'auto'},
                            style_data={
                                'whiteSpace': 'normal',
                                'height': 'auto',
                                # all three widths are needed
                                'minWidth': '180px', 'width': '180px', 'maxWidth': '180px',
                            },
                            sort_action='custom',
                            sort_mode='single',
                            sort_by=[],
                        ),
                    )),
                ),
            ),
        ],
        )
    ]
)
                                      
# Helper functions

# def filter_dataframe(df, party_type, city_types, year_slider):
#     dff = df[df['party_type'].isin(party_type)
#              & df['city'].isin(city_types)
#              & (df['judgment_date'] > dt.datetime(year_slider[0], 1, 1))
#              & (df['judgment_date'] < dt.datetime(year_slider[1], 1, 1))]
#     return dff
def filter_dataframe(df, year_slider):
    dff = df[(df['judgement_date'] > dt.datetime(year_slider[0], 1, 1))
             & (df['judgement_date'] < dt.datetime(year_slider[1], 1, 1))]
    return dff



#%% callbacks

# Selectors -> count graph
@app.callback(Output('count_graph', 'figure'),
              [Input('year_slider', 'value')])
def make_count_figure(year_slider):
    layout_count = copy.deepcopy(layout)

    dff = filter_dataframe(df, [2005, 2020])
    g = dff[['case_number', 'judgement_date']]
    g.index = g['judgement_date']
    g = g.resample('M').count()

    colors = []
    for i in range(2005*12, 2020*12):
        if i >= int(year_slider[0]*12) and i < int(year_slider[1]*12):
            colors.append('rgb(123, 199, 255)')
        else:
            colors.append('rgba(123, 199, 255, 0.2)')

    data = [
        dict(
            type='scatter',
            mode='markers',
            x=g.index,
            y=g['case_number'],
            name='All cases',
            opacity=0,
            hoverinfo='skip'
        ),
        dict(
            type='bar',
            x=g.index,
            y=g['case_number'],
            name='All cases',
            marker=dict(
                color=colors
            ),
        ),
    ]

    layout_count['title'] = 'Eviction Cases/Month'
    layout_count['dragmode'] = 'select'
    layout_count['showlegend'] = False
    layout_count['autosize'] = True

    figure = dict(data=data, layout=layout_count)
    return figure


@app.callback(
    [Output('datatable-paging', 'data'),
     Output('datatable-paging', 'page_count')],
    [Input('datatable-paging', "page_current"),
     Input('datatable-paging', "page_size"),
     Input('datatable-paging', 'sort_by'),
     Input('year_slider', 'value')])
def update_table(page_current, page_size, sort_by, year_slider):
    if len(sort_by):
        # apply sorting
        dff = df.sort_values(
            sort_by[0]['column_id'],
            ascending=sort_by[0]['direction'] == 'asc',
            inplace=False
        )
    elif year_slider:
        dff = df[(df['judgement_date'] > dt.datetime(year_slider[0], 1, 1))
             & (df['judgement_date'] < dt.datetime(year_slider[1], 1, 1))]
        dff = dff.sort_values('judgement_date',ascending=True)
    else:
        # No sort is applied
        dff = df.sort_values('judgement_date',ascending=True)

    return [dff.iloc[page_current*page_size:(page_current+ 1)*page_size].to_dict('records'),
            int(len(dff)/PAGE_SIZE)+1]

# Selectors -> cases text
@app.callback(Output('case_count', 'children'),
              [Input('year_slider', 'value')])
def update_case_count(year_slider):
    dff = filter_dataframe(df, year_slider)
    return "{:,}".format(len(dff['case_number'].unique()))

# Selectors -> defendants text
@app.callback(Output('defendant_count', 'children'),
              [Input('year_slider', 'value')])
def update_defendant_count(year_slider):
    dff = filter_dataframe(df, year_slider)
    return "{:,}".format(dff[dff['party_type']=='D'].shape[0])

# Selectors -> plaintiff text
@app.callback(Output('plaintiff_count', 'children'),
              [Input('year_slider', 'value')])
def update_plaintiff_count(year_slider):
    dff = filter_dataframe(df, year_slider)
    return "{:,}".format(dff[dff['party_type']=='P'].shape[0])

# Selectors -> share of evictions text
@app.callback(Output('share_of_evictions', 'children'),
              [Input('year_slider', 'value')])
def update_share_of_evictions(year_slider):
    dff = filter_dataframe(df, year_slider)
    case_results = dff.groupby(['case_number','favor_party_type']).size().reset_index().favor_party_type
    case_count_with_verdict = case_results.value_counts().sum()
    if case_count_with_verdict > 0:
        share_of_cases_resulting_in_eviction = case_results.value_counts(normalize=True)['P']*100
        share_of_cases_resulting_in_eviction = str(share_of_cases_resulting_in_eviction.round(2)) + '%% out of %s verdicts' % "{:,}".format(case_count_with_verdict)
    else:
        share_of_cases_resulting_in_eviction = "Data not available"
    return share_of_cases_resulting_in_eviction

# Selectors -> average rent owed text
@app.callback(Output('average_amount_owed', 'children'),
              [Input('year_slider', 'value')])
def update_average_rent_owed(year_slider):
    dff = filter_dataframe(df, year_slider)
    mean = dff.amount.mean()
    if math.isnan(mean):
        mean = 'Data not available'
    else:
        mean = "${:,}".format(round(mean,2))
    return mean



@app.callback(
    Output("modal-body-scroll", "is_open"),
    [# Input("open-body-scroll", "n_clicks"),
     Input("close-body-scroll", "n_clicks")],
    [State("modal-body-scroll", "is_open")],)
def toggle_modal(n2, is_open):
    return not is_open



if __name__ == '__main__':
    app.run_server(debug=False)
from tests.stubs import event_app_stub

app, selector  = event_app_stub()

if __name__ == "__main__":
    app.run(port=9997)

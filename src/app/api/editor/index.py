from modals import Editor
import json

def save_data(request):
    try:
        # Get data from request body
        data = request.json
        print(data)
        # Save the data to the in-memory storage
        Editor.add(data)
        return ({'message': 'Data saved successfully'})
    except Exception as e:
        return ({'error': str(e)})

def retrieve_data():
    try:
        # Retrieve the data from the in-memory storage
        data = Editor.get()
        if data:
            return json.loads(data)
        else:
            return ({'error': 'No data found'})
    except Exception as e:
        return ({'error': str(e)})

def index(request):
    print("inside api")
    if request.method == 'POST':
        return save_data(request)
    elif request.method == 'GET':
        return retrieve_data()
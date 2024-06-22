import json
from modals import Editor

def index(request):
    return {
        "blocksData":json.loads(Editor.get()) or []
    }
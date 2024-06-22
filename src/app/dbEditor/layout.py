import json
from modals import Editor

def layout(request):
    return {
        "blocksData":json.loads(Editor.get()) or []
    }
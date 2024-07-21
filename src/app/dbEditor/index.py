import json
from modals import Editor

async def index(request):
    return {
        "blocksData":json.loads(Editor.get()) or []
    }

async def layout(request):
    print("from layout")
    return {
        "blocksData":json.loads(Editor.get()) or []
    }
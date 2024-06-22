from .DbEditor import read_from_file,write_to_file
import json

class EditorModal():
    def __init__(self,):
        self.name = "db_editor"

    def add(self, data):
        write_to_file(json.dumps(data))
    
    def get(self):
        return read_from_file()
    

Editor = EditorModal()
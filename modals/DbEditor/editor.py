import os
dir_path = os.path.dirname(os.path.abspath(__file__))

def write_to_file(data):
    with open(os.path.join(dir_path,"editor.txt"), 'w') as file:
        file.write(str(data))
    print(f"Data written to editor.txt")


def read_from_file():
    with open(os.path.join(dir_path,"editor.txt"), 'r') as file:
        data = file.read()
    return data
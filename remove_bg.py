from PIL import Image

def remove_white_bg(image_path, output_path):
    img = Image.open(image_path)
    img = img.convert("RGBA")
    datas = img.getdata()
    
    newData = []
    # Using a tolerance to catch off-white pixels near edges
    for item in datas:
        # Check if pixel is close to white (e.g. RGB all > 240)
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            # Change to transparent
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")

remove_white_bg("assets/mascot.png", "assets/mascot.png")

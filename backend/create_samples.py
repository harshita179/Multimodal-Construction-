from PIL import Image, ImageDraw, ImageFont
import os

samples_dir = os.path.join(os.path.dirname(__file__), "sample_images")
os.makedirs(samples_dir, exist_ok=True)

# 1. Generate Concrete Crack Sample Image
def generate_crack_image():
    width, height = 800, 600
    img = Image.new("RGB", (width, height), color=(185, 188, 192))
    draw = ImageDraw.Draw(img)

    # Add concrete texture noise
    import random
    for _ in range(5000):
        x = random.randint(0, width - 1)
        y = random.randint(0, height - 1)
        c = random.randint(150, 210)
        img.putpixel((x, y), (c, c, c))

    # Draw structural concrete beam lines
    draw.rectangle([50, 50, 750, 550], outline=(120, 120, 125), width=4)
    draw.line([50, 200, 750, 200], fill=(130, 130, 135), width=3) # Joint

    # Draw prominent diagonal shear crack
    crack_points = [
        (180, 120), (220, 160), (250, 210), (290, 240),
        (330, 310), (370, 360), (430, 410), (480, 470), (520, 530)
    ]
    # Add minor branch cracks
    draw.line(crack_points, fill=(35, 30, 30), width=5)
    draw.line([(330, 310), (380, 320), (410, 345)], fill=(50, 45, 45), width=2)
    draw.line([(250, 210), (280, 190), (310, 180)], fill=(55, 50, 50), width=2)

    # Text label on image
    draw.text((70, 70), "STRUCTURAL BEAM B-14 / WEST ELEVATION", fill=(60, 60, 65))
    draw.text((70, 95), "INSPECTION REF: SB-CRK-084", fill=(90, 90, 95))

    out_path = os.path.join(samples_dir, "concrete_crack_sample.jpg")
    img.save(out_path, quality=92)
    print(f"Created {out_path}")

# 2. Generate Construction Site Safety Sample Image
def generate_safety_image():
    width, height = 800, 600
    img = Image.new("RGB", (width, height), color=(135, 190, 235)) # Sky
    draw = ImageDraw.Draw(img)

    # Building concrete structure under construction
    draw.rectangle([150, 180, 720, 580], fill=(160, 165, 175), outline=(100, 105, 115), width=3)
    # Floor slabs
    draw.rectangle([140, 260, 730, 290], fill=(120, 125, 135))
    draw.rectangle([140, 400, 730, 430], fill=(120, 125, 135))
    # Scaffolding pipes (metallic grid)
    for x in range(60, 220, 35):
        draw.line([x, 150, x, 580], fill=(190, 195, 205), width=4)
    for y in range(180, 580, 50):
        draw.line([50, y, 220, y], fill=(190, 195, 205), width=4)
        # diagonal braces
        draw.line([50, y, 120, y+50], fill=(180, 180, 190), width=2)

    # Ground terrain
    draw.rectangle([0, 540, 800, 600], fill=(140, 120, 90))

    # Workers on site (silhouette representation with PPE colors)
    # Worker 1: Wearing Yellow Helmet & Orange Vest
    draw.ellipse([300, 330, 324, 354], fill=(255, 215, 0)) # Yellow Hard Hat
    draw.rectangle([298, 354, 326, 385], fill=(255, 90, 0)) # Orange Hi-Vis Vest
    draw.rectangle([302, 385, 322, 400], fill=(40, 50, 80)) # Blue Pants

    # Worker 2: Missing Helmet! (Violation)
    draw.ellipse([460, 330, 484, 354], fill=(80, 50, 30)) # Brown hair (NO HELMET)
    draw.rectangle([458, 354, 486, 385], fill=(255, 90, 0)) # Hi-vis vest
    draw.rectangle([462, 385, 482, 400], fill=(50, 50, 50)) # Pants

    # Warning perimeter missing guardrail area
    draw.rectangle([400, 255, 550, 260], fill=(240, 50, 50)) # Open edge zone marker
    draw.text((410, 235), "UNPROTECTED EDGE", fill=(220, 30, 30))

    # Text Header
    draw.text((20, 20), "SITE SAFETY MONITORING FEED - SECTOR 4B", fill=(20, 40, 70))
    draw.text((20, 45), "CAMERA: TOWER-02 [ACTIVE SURVEILLANCE]", fill=(50, 70, 100))

    out_path = os.path.join(samples_dir, "construction_safety_sample.jpg")
    img.save(out_path, quality=92)
    print(f"Created {out_path}")

if __name__ == "__main__":
    generate_crack_image()
    generate_safety_image()

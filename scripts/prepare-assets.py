"""Convert the selected design frames into web-optimized WebP assets.

Run from the project root:
    python scripts/prepare-assets.py

Source frames stay untouched in LD_JEJAK_DIGITALKU_DESIGN/.
Output goes to public/scenarios/ and public/hero.webp.
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
DESIGN = ROOT / "LD_JEJAK_DIGITALKU_DESIGN"
OUT = ROOT / "public" / "scenarios"

S1 = DESIGN / "Skenario 1"
S2 = DESIGN / "Skenario 2"
S3 = DESIGN / "Skenario 3"

# (source file, output file, max width, quality)
JOBS = [
    # Skenario 1 - Penipuan Online
    (S1 / "Scene 1 bagian 1.png", "s1/s1-01.webp", 1280, 80),
    (S1 / "Scane 1 bagian 2.png", "s1/s1-02.webp", 1280, 80),
    (S1 / "Scene 2 bagian 1.png", "s1/s1-03.webp", 1280, 80),
    (S1 / "Scane 2 bagian 2.png", "s1/s1-04.webp", 1280, 80),
    (S1 / "Scane 2 bagian 3.png", "s1/s1-05.webp", 1280, 80),
    (S1 / "Scene-3.png", "s1/s1-06.webp", 1280, 80),
    (S1 / "Scene-4-1.png", "s1/s1-07.webp", 1280, 80),
    (S1 / "Scene-4-2.png", "s1/s1-08.webp", 1280, 80),
    (S1 / "Scene-4-3.png", "s1/s1-09.webp", 1280, 80),
    (S1 / "Scene-4-4.png", "s1/s1-10.webp", 1280, 80),
    (S1 / "Scene-4-5.png", "s1/s1-11.webp", 1280, 80),
    (S1 / "Scene-4-6.png", "s1/s1-12.webp", 1280, 80),
    (S1 / "Scene-4-7.png", "s1/s1-13.webp", 1280, 80),
    (S1 / "Scene-4-8.png", "s1/s1-14.webp", 1280, 80),
    (S1 / "Scene-5-4.png", "s1/s1-decision.webp", 1280, 80),
    (S1 / "Scene-5-1.png", "s1/s1-opt-a.webp", 960, 78),
    (S1 / "Scene-5-2.png", "s1/s1-opt-b.webp", 960, 78),
    (S1 / "Scene-5-3.png", "s1/s1-opt-c.webp", 960, 78),
    (S1 / "Scene-6-1.png", "s1/s1-refl-1.webp", 1280, 80),
    (S1 / "Scene-6-2.png", "s1/s1-refl-2.webp", 1280, 80),
    (S1 / "Scene-6-3.png", "s1/s1-refl-3.webp", 1280, 80),
    (S1 / "Scene-6-4.png", "s1/s1-refl-4.webp", 1280, 80),
    (S1 / "Scene-6-5.png", "s1/s1-refl-5.webp", 1280, 80),
    # Skenario 2 - Hoaks
    (S2 / "Scane 1.png", "s2/s2-01.webp", 1280, 80),
    (S2 / "Scane 2.png", "s2/s2-02.webp", 1280, 80),
    (S2 / "Scane 3.png", "s2/s2-03.webp", 1280, 80),
    (S2 / "Scane 4.png", "s2/s2-04.webp", 1280, 80),
    (S2 / "Scane 5.png", "s2/s2-decision.webp", 1280, 80),
    (S2 / "Scane 6.png", "s2/s2-06.webp", 1280, 80),
    # Skenario 3 - Privasi
    (S3 / "Scene 1 Bagian 1.png", "s3/s3-01.webp", 1280, 80),
    (S3 / "Scene 1 Bagian 2.png", "s3/s3-02.webp", 1280, 80),
    (S3 / "Scene 1 Bagian 3.png", "s3/s3-03.webp", 1280, 80),
    (S3 / "Scene 1 Bagian 4.png", "s3/s3-04.webp", 1280, 80),
    (S3 / "Scene 2 Bagian 1.png", "s3/s3-05.webp", 1280, 80),
    (S3 / "Scene 2 Bagian 2.png", "s3/s3-06.webp", 1280, 80),
    (S3 / "Scene 2 Bagian 3.png", "s3/s3-07.webp", 1280, 80),
    (S3 / "Scene 2 Bagian 4.png", "s3/s3-08.webp", 1280, 80),
    (S3 / "Scene 3 Bagian 1.png", "s3/s3-09.webp", 1280, 80),
    (S3 / "Scene 3 Bagian 2.png", "s3/s3-10.webp", 1280, 80),
    (S3 / "Scene 3 Bagian 3.png", "s3/s3-11.webp", 1280, 80),
    (S3 / "Scene 3 Bagian 4.png", "s3/s3-12.webp", 1280, 80),
    (S3 / "Scene 4 Bagian 1.png", "s3/s3-13.webp", 1280, 80),
    (S3 / "Scene 4 Bagian 2.png", "s3/s3-14.webp", 1280, 80),
    (S3 / "Scene 4 Bagian 3.png", "s3/s3-15.webp", 1280, 80),
    (S3 / "Scene 4 Bagian 4.png", "s3/s3-16.webp", 1280, 80),
    (S3 / "Scene 5 bagian 1.png", "s3/s3-17.webp", 1280, 80),
    (S3 / "Scene 5 bagian 2.png", "s3/s3-18.webp", 1280, 80),
    (S3 / "Scene 5 bagian 3.png", "s3/s3-19.webp", 1280, 80),
    (S3 / "Scene 5 bagian 4.png", "s3/s3-20.webp", 1280, 80),
]


def convert(src: Path, rel_out: str, max_width: int, quality: int) -> None:
    if not src.exists():
        raise FileNotFoundError(src)
    dest = OUT / rel_out
    dest.parent.mkdir(parents=True, exist_ok=True)
    image = Image.open(src).convert("RGB")
    if image.width > max_width:
        height = round(image.height * max_width / image.width)
        image = image.resize((max_width, height), Image.Resampling.LANCZOS)
    image.save(dest, "WEBP", quality=quality, method=6)
    print(f"{rel_out:28} {dest.stat().st_size // 1024:>4} KB")


def make_hero() -> None:
    src = DESIGN / "Landing Page.png"
    image = Image.open(src).convert("RGB")
    # Right-hand illustration of the hero, without the headline text on the left.
    image = image.crop((740, 160, 1400, 875))
    dest = ROOT / "public" / "hero.webp"
    image.save(dest, "WEBP", quality=86, method=6)
    print(f"{'hero.webp':28} {dest.stat().st_size // 1024:>4} KB")


def make_covers() -> None:
    # Card covers crop away the baked-in dialogue box so the card title stays readable.
    covers = [
        (S1 / "Scene 1 bagian 1.png", "s1/s1-cover.webp", (240, 0, 1680, 810)),
        (S2 / "Scane 1.png", "s2/s2-cover.webp", (480, 0, 1920, 810)),
        (S3 / "Scene 1 Bagian 1.png", "s3/s3-cover.webp", (560, 255, 1600, 840)),
    ]

    for src, rel_out, box in covers:
        dest = OUT / rel_out
        image = Image.open(src).convert("RGB").crop(box)
        image = image.resize((1280, 720), Image.Resampling.LANCZOS)
        image.save(dest, "WEBP", quality=82, method=6)
        print(f"{rel_out:28} {dest.stat().st_size // 1024:>4} KB")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    for job in JOBS:
        convert(*job)
    make_covers()
    make_hero()

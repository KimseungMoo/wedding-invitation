#!/usr/bin/env python3
"""Paper invitation inner + back pages.

Research-backed layout:
- left: greeting, hosts (blanks), names, date/venue
- right: schematic map + transit/parking (no decorative illustration)
- back: primary QR placement
"""

from __future__ import annotations

from pathlib import Path

import segno
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
FONT_DIR = ROOT / "fonts"
URL = "https://seungmoo-eunji-wedding-invitation.vercel.app/"

W, H = 1536, 2048
INK = (52, 48, 42)
MUTED = (110, 102, 90)
CREAM = (247, 240, 214)
RULE = (150, 140, 122)
ROAD = (160, 145, 120)
PIN = (90, 75, 55)
STATION = (80, 120, 50)

LEFT_GREETING = [
    "서로 다른 길로 걷다가",
    "같은 자리에서 멈춘",
    "두 사람입니다.",
    "",
    "오는 길에",
    "꽃 한 송이 없어도 됩니다.",
    "얼굴만 보여 주세요.",
]
HOSTS = [
    "김○○ · ○○○의 아들  승무",
    "성○○ · ○○○의 딸  은지",
]
DATE_BLOCK = [
    "2027년 2월 21일 일요일",
    "오전 11시 30분",
]
VENUE_BLOCK = [
    "더채플앳청담  채플홀 6층",
    "서울 강남구 선릉로 757",
]

TRANSIT = [
    ("지하철", "강남구청역 3번 출구 앞 셔틀"),
    ("버스", "간선 301 · 342 · 472"),
    ("", "지선 3011 · 4212 · 4312"),
    ("주차", "1시간 30분 무료 · 접수대 등록"),
]

BACK_LINES = [
    "모바일 청첩장",
    "",
    "QR코드를 스캔하시면",
    "오시는 길과 안내를",
    "확인하실 수 있습니다.",
]

KR_FONT = "Gaegu-Regular.ttf"
FONT_URL = "https://github.com/google/fonts/raw/main/ofl/gaegu/Gaegu-Regular.ttf"


def ensure_font() -> None:
    FONT_DIR.mkdir(exist_ok=True)
    dest = FONT_DIR / KR_FONT
    if dest.exists() and dest.stat().st_size > 100_000:
        return
    from urllib.request import urlretrieve

    urlretrieve(FONT_URL, dest)


def font(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_DIR / KR_FONT), size)


def blank() -> Image.Image:
    return Image.new("RGB", (W, H), CREAM)


def text_size(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.FreeTypeFont) -> tuple[int, int]:
    box = draw.textbbox((0, 0), text, font=fnt)
    return box[2] - box[0], box[3] - box[1]


def draw_centered(
    draw: ImageDraw.ImageDraw,
    lines: list[str],
    cx: int,
    top: int,
    fnt: ImageFont.FreeTypeFont,
    gap: int = 4,
    fill: tuple[int, int, int] = INK,
) -> int:
    y = top
    for line in lines:
        if line:
            w, h = text_size(draw, line, fnt)
            draw.text((cx - w / 2, y), line, font=fnt, fill=fill)
            y += h + gap
        else:
            y += max(24, int(getattr(fnt, "size", 48) * 0.45))
    return y


def rule(draw: ImageDraw.ImageDraw, y: int, half: int = 140) -> None:
    cx = W // 2
    draw.line([(cx - half, y), (cx + half, y)], fill=RULE, width=2)


def dashed_rect(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    width: int = 2,
    dash: int = 12,
    gap: int = 8,
    fill: tuple[int, int, int] = RULE,
) -> None:
    x0, y0, x1, y1 = box

    def segments(a: int, b: int) -> list[tuple[int, int]]:
        out = []
        x = a
        while x < b:
            out.append((x, min(x + dash, b)))
            x += dash + gap
        return out

    for x_s, x_e in segments(x0, x1):
        draw.line([(x_s, y0), (x_e, y0)], fill=fill, width=width)
        draw.line([(x_s, y1), (x_e, y1)], fill=fill, width=width)
    for y_s, y_e in segments(y0, y1):
        draw.line([(x0, y_s), (x0, y_e)], fill=fill, width=width)
        draw.line([(x1, y_s), (x1, y_e)], fill=fill, width=width)


def make_qr(size: int) -> Image.Image:
    path = ROOT / "_qr_tmp.png"
    qr = segno.make(URL, error="h")
    qr.save(path, scale=16, border=3, dark="#2b2b2b", light="white")
    im = Image.open(path).convert("RGB")
    path.unlink(missing_ok=True)
    return im.resize((size, size), Image.Resampling.NEAREST)


def draw_map(draw: ImageDraw.ImageDraw, ox: int, oy: int, mw: int, mh: int) -> None:
    """Schematic map adapted from web Location.tsx — functional, not decorative."""
    # frame
    draw.rectangle([ox, oy, ox + mw, oy + mh], outline=RULE, width=2)

    def sx(x: float) -> int:
        return ox + int(x / 340 * mw)

    def sy(y: float) -> int:
        return oy + int(y / 310 * mh)

    # minor roads
    draw.line([(sx(85), sy(10)), (sx(85), sy(300))], fill=(220, 210, 190), width=2)
    draw.line([(sx(285), sy(10)), (sx(285), sy(300))], fill=(220, 210, 190), width=2)
    draw.line([(sx(10), sy(155)), (sx(330), sy(155))], fill=(220, 210, 190), width=2)
    # main roads
    draw.line([(sx(195), sy(10)), (sx(195), sy(258))], fill=ROAD, width=5)
    draw.line([(sx(10), sy(80)), (sx(330), sy(80))], fill=ROAD, width=5)

    small = font(28)
    draw.text((sx(203), sy(18)), "선릉로", font=small, fill=MUTED)
    draw.text((sx(250), sy(62)), "도산대로", font=small, fill=MUTED)
    draw.text((sx(205), sy(90)), "학동사거리", font=small, fill=MUTED)

    # venue pin
    cx, cy = sx(178), sy(118)
    draw.ellipse([cx - 10, cy - 10, cx + 10, cy + 10], outline=PIN, width=3)
    draw.ellipse([cx - 4, cy - 4, cx + 4, cy + 4], fill=PIN)

    label = font(32)
    lw, lh = text_size(draw, "더채플앳청담", label)
    lx, ly = sx(95), sy(145)
    draw.rectangle([lx - 8, ly - 4, lx + lw + 8, ly + lh + 4], fill=(70, 55, 40))
    draw.text((lx, ly), "더채플앳청담", font=label, fill=(255, 255, 255))
    draw.line([(lx + lw // 2, ly - 4), (lx + lw // 2, cy), (cx - 12, cy)], fill=PIN, width=2)

    # landmarks
    def dot(x: float, y: float, name: str, anchor: str = "left") -> None:
        dx, dy = sx(x), sy(y)
        draw.ellipse([dx - 4, dy - 4, dx + 4, dy + 4], fill=ROAD)
        tw, _ = text_size(draw, name, small)
        tx = dx + 8 if anchor == "left" else dx - tw - 8
        draw.text((tx, dy - 12), name, font=small, fill=MUTED)

    dot(38, 45, "도산공원")
    dot(120, 62, "CGV")
    dot(182, 92, "삼성스토어", "right")
    dot(220, 185, "영동고")

    # station
    scx, scy = sx(195), sy(272)
    draw.ellipse([scx - 18, scy - 18, scx + 18, scy + 18], outline=STATION, width=3, fill=CREAM)
    seven = font(34)
    w7, h7 = text_size(draw, "7", seven)
    draw.text((scx - w7 / 2, scy - h7 / 2 - 2), "7", font=seven, fill=STATION)
    st = font(30)
    for i, line in enumerate(["강남구청역", "3번 출구 · 셔틀"]):
        ww, _ = text_size(draw, line, st)
        draw.text((scx - ww / 2, scy + 22 + i * 28), line, font=st, fill=INK)


def compose_left(dest: Path) -> None:
    im = blank()
    draw = ImageDraw.Draw(im)
    cx = W // 2

    y = draw_centered(draw, LEFT_GREETING, cx, int(H * 0.10), font(64), gap=2)
    y = draw_centered(draw, HOSTS, cx, y + 36, font(48), gap=6, fill=MUTED)
    rule(draw, y + 28, 160)
    y = draw_centered(draw, DATE_BLOCK, cx, y + 52, font(60), gap=2)
    draw_centered(draw, VENUE_BLOCK, cx, y + 16, font(48), gap=2, fill=MUTED)
    note = font(36)
    tip = "자세한 길 안내는 오른쪽 약도를 봐 주세요"
    tw, _ = text_size(draw, tip, note)
    draw.text(((W - tw) / 2, H - 120), tip, font=note, fill=MUTED)
    im.save(dest, "PNG")


def compose_right(dest: Path) -> None:
    im = blank()
    draw = ImageDraw.Draw(im)
    cx = W // 2

    draw_centered(draw, ["오시는 길"], cx, int(H * 0.05), font(52), gap=0)
    map_top = int(H * 0.11)
    map_h = int(H * 0.48)
    map_w = int(W * 0.86)
    map_x = (W - map_w) // 2
    draw_map(draw, map_x, map_top, map_w, map_h)

    y = map_top + map_h + 36
    label_f = font(42)
    body_f = font(40)
    for kind, text in TRANSIT:
        if kind:
            kw, kh = text_size(draw, kind, label_f)
            draw.text((cx - 280, y), kind, font=label_f, fill=INK)
            draw.text((cx - 280 + kw + 24, y), text, font=body_f, fill=MUTED)
            y += max(kh, text_size(draw, text, body_f)[1]) + 10
        else:
            draw.text((cx - 280 + 24 + text_size(draw, "버스", label_f)[0], y), text, font=body_f, fill=MUTED)
            y += text_size(draw, text, body_f)[1] + 10

    tip = font(34)
    line = "자세한 지도 · 안내는 뒷면 QR"
    tw, _ = text_size(draw, line, tip)
    draw.text(((W - tw) / 2, H - 100), line, font=tip, fill=MUTED)
    im.save(dest, "PNG")


def compose_back(dest: Path) -> None:
    im = blank()
    draw = ImageDraw.Draw(im)
    cx = W // 2

    y = draw_centered(draw, BACK_LINES, cx, int(H * 0.18), font(56), gap=4)
    qr_size = 420
    pad = 28
    stamp = qr_size + pad * 2
    sx = (W - stamp) // 2
    sy = y + 40
    im.paste(make_qr(qr_size), (sx + pad, sy + pad))
    draw = ImageDraw.Draw(im)
    dashed_rect(draw, (sx, sy, sx + stamp, sy + stamp))

    url_f = font(32)
    # wrap long url lightly
    url = URL.rstrip("/")
    uw, _ = text_size(draw, url, url_f)
    if uw > W - 80:
        # split after domain
        mid = url.find("/", 8)
        lines = [url[:mid], url[mid:]] if mid > 0 else [url]
    else:
        lines = [url]
    uy = sy + stamp + 28
    for line in lines:
        ww, hh = text_size(draw, line, url_f)
        draw.text(((W - ww) / 2, uy), line, font=url_f, fill=MUTED)
        uy += hh + 4

    names = font(44)
    draw_centered(draw, ["승무 · 은지"], cx, H - 160, names, gap=0)
    im.save(dest, "PNG")


def make_spread(left: Path, right: Path, dest: Path) -> None:
    a = Image.open(left).convert("RGB")
    b = Image.open(right).convert("RGB")
    h = max(a.height, b.height)
    gap = 24
    out = Image.new("RGB", (a.width + b.width + gap, h), (255, 255, 255))
    out.paste(a, (0, 0))
    out.paste(b, (a.width + gap, 0))
    preview = out.copy()
    preview.thumbnail((1600, 1100), Image.Resampling.LANCZOS)
    preview.save(dest, "PNG")


def make_quad(front_note: Path | None, left: Path, right: Path, back: Path, dest: Path) -> None:
    """Preview strip: left | right | back."""
    pages = [Image.open(p).convert("RGB") for p in (left, right, back)]
    h = max(p.height for p in pages)
    gap = 20
    w = sum(p.width for p in pages) + gap * (len(pages) - 1)
    out = Image.new("RGB", (w, h + 60), (255, 255, 255))
    draw = ImageDraw.Draw(out)
    labels = ["안쪽 왼쪽", "안쪽 오른쪽 · 약도", "뒷면 · QR"]
    x = 0
    lab = font(36)
    for i, p in enumerate(pages):
        out.paste(p, (x, 50))
        tw, _ = text_size(draw, labels[i], lab)
        draw.text((x + (p.width - tw) / 2, 8), labels[i], font=lab, fill=INK)
        x += p.width + gap
    preview = out.copy()
    preview.thumbnail((1800, 900), Image.Resampling.LANCZOS)
    preview.save(dest, "PNG")


def main() -> None:
    ensure_font()
    left = ROOT / "inner-left-ko.png"
    right = ROOT / "inner-right-ko.png"
    back = ROOT / "back-ko.png"
    compose_left(left)
    compose_right(right)
    compose_back(back)
    make_spread(left, right, ROOT / "inner-spread-ko.png")
    make_quad(None, left, right, back, ROOT / "preview-ko.png")
    _compose_en()

    qr = segno.make(URL, error="h")
    qr.save(ROOT / "qr.svg", scale=8, border=4, dark="#2b2b2b", light="#fffdf6")
    qr.save(ROOT / "qr.png", scale=12, border=4, dark="#2b2b2b", light="#fffdf6")
    qr.save(ROOT / "qr-print.png", scale=16, border=4, dark="#111111", light="white")
    print("ok", left, right, back)


def _compose_en() -> None:
    """English pages mirroring KO structure."""
    global LEFT_GREETING, HOSTS, DATE_BLOCK, VENUE_BLOCK, TRANSIT, BACK_LINES
    LEFT_GREETING = [
        "We were walking different roads",
        "and stopped in the same place.",
        "",
        "No flowers needed.",
        "Just come.",
    ]
    HOSTS = [
        "Son of Kim ○○ · ○○○  Seungmoo",
        "Daughter of Sung ○○ · ○○○  Eunji",
    ]
    DATE_BLOCK = ["Sunday, February 21, 2027", "11:30 AM"]
    VENUE_BLOCK = [
        "The Chapel at Cheongdam · Chapel Hall 6F",
        "757 Seolleung-ro, Gangnam, Seoul",
    ]
    TRANSIT = [
        ("Subway", "Gangnam-gu Office Stn Exit 3 · shuttle"),
        ("Bus", "Main 301 · 342 · 472"),
        ("", "Local 3011 · 4212 · 4312"),
        ("Parking", "90 min free · register at desk"),
    ]
    BACK_LINES = [
        "Mobile invitation",
        "",
        "Scan the QR code",
        "for directions and details.",
    ]

    # Temporarily patch compose helpers that hardcode Korean tip strings
    left = ROOT / "inner-left-en.png"
    right = ROOT / "inner-right-en.png"
    back = ROOT / "back-en.png"

    im = blank()
    draw = ImageDraw.Draw(im)
    cx = W // 2
    y = draw_centered(draw, LEFT_GREETING, cx, int(H * 0.12), font(58), gap=2)
    y = draw_centered(draw, HOSTS, cx, y + 36, font(42), gap=6, fill=MUTED)
    rule(draw, y + 28, 160)
    y = draw_centered(draw, DATE_BLOCK, cx, y + 52, font(56), gap=2)
    draw_centered(draw, VENUE_BLOCK, cx, y + 16, font(40), gap=2, fill=MUTED)
    tip = font(34)
    line = "See the map on the right for directions"
    tw, _ = text_size(draw, line, tip)
    draw.text(((W - tw) / 2, H - 120), line, font=tip, fill=MUTED)
    im.save(left, "PNG")

    im = blank()
    draw = ImageDraw.Draw(im)
    draw_centered(draw, ["Directions"], cx, int(H * 0.05), font(52), gap=0)
    map_top = int(H * 0.11)
    map_h = int(H * 0.48)
    map_w = int(W * 0.86)
    map_x = (W - map_w) // 2
    draw_map(draw, map_x, map_top, map_w, map_h)
    # English landmark labels overlay poorly on KO map text — keep KO map labels;
    # transit block in English below.
    y = map_top + map_h + 36
    label_f = font(40)
    body_f = font(36)
    for kind, text in TRANSIT:
        if kind:
            kw, kh = text_size(draw, kind, label_f)
            draw.text((cx - 320, y), kind, font=label_f, fill=INK)
            draw.text((cx - 320 + kw + 20, y), text, font=body_f, fill=MUTED)
            y += max(kh, text_size(draw, text, body_f)[1]) + 8
        else:
            draw.text((cx - 320 + 20 + text_size(draw, "Bus", label_f)[0], y), text, font=body_f, fill=MUTED)
            y += text_size(draw, text, body_f)[1] + 8
    tip = font(32)
    line = "More details on the back QR"
    tw, _ = text_size(draw, line, tip)
    draw.text(((W - tw) / 2, H - 100), line, font=tip, fill=MUTED)
    im.save(right, "PNG")

    im = blank()
    draw = ImageDraw.Draw(im)
    y = draw_centered(draw, BACK_LINES, cx, int(H * 0.18), font(52), gap=4)
    qr_size = 420
    pad = 28
    stamp = qr_size + pad * 2
    sx = (W - stamp) // 2
    sy = y + 40
    im.paste(make_qr(qr_size), (sx + pad, sy + pad))
    draw = ImageDraw.Draw(im)
    dashed_rect(draw, (sx, sy, sx + stamp, sy + stamp))
    url_f = font(30)
    url = URL.rstrip("/")
    mid = url.find("/", 8)
    lines = [url[:mid], url[mid:]] if mid > 0 else [url]
    uy = sy + stamp + 28
    for line in lines:
        ww, hh = text_size(draw, line, url_f)
        draw.text(((W - ww) / 2, uy), line, font=url_f, fill=MUTED)
        uy += hh + 4
    draw_centered(draw, ["Seungmoo · Eunji"], cx, H - 160, font(44), gap=0)
    im.save(back, "PNG")

    make_spread(left, right, ROOT / "inner-spread-en.png")


if __name__ == "__main__":
    main()

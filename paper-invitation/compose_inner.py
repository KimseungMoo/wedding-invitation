#!/usr/bin/env python3
"""Paper invitation pages with a shared layout grid.

Left: greeting · hosts · February 2027 calendar · venue
Right: map · transit table (aligned columns)
Back: QR block

No decorative illustration — structural blocks only.
"""

from __future__ import annotations

from pathlib import Path

import segno
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
FONT_DIR = ROOT / "fonts"
URL = "https://seungmoo-eunji-wedding-invitation.vercel.app/"

# ~130×174mm @ 300dpi-ish working canvas
W, H = 1536, 2048
MARGIN = 128
CONTENT_W = W - MARGIN * 2
CX = W // 2

INK = (48, 44, 38)
MUTED = (118, 108, 94)
SOFT = (180, 170, 150)
CREAM = (248, 242, 220)
PANEL = (252, 248, 232)
RULE = (168, 156, 136)
ACCENT = (196, 150, 150)  # soft wedding day mark
ROAD = (168, 152, 126)
PIN = (92, 76, 56)
STATION = (90, 128, 70)

KR_FONT = "Gaegu-Regular.ttf"
FONT_URL = "https://github.com/google/fonts/raw/main/ofl/gaegu/Gaegu-Regular.ttf"

# Vertical rhythm (shared on left/right)
Y_EYEBROW = MARGIN + 4
Y_BODY = MARGIN + 78
Y_BLOCK = 820  # calendar / map top — locked so left/right align in the spread
Y_FOOT = H - MARGIN - 36
BLOCK_X0 = MARGIN + 16
BLOCK_X1 = W - MARGIN - 16
BLOCK_W = BLOCK_X1 - BLOCK_X0
MAP_H = 560


def ensure_font() -> None:
    FONT_DIR.mkdir(exist_ok=True)
    dest = FONT_DIR / KR_FONT
    if dest.exists() and dest.stat().st_size > 100_000:
        return
    from urllib.request import urlretrieve

    urlretrieve(FONT_URL, dest)


def f(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_DIR / KR_FONT), size)


def blank() -> Image.Image:
    return Image.new("RGB", (W, H), CREAM)


def measure(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont) -> tuple[int, int]:
    box = draw.textbbox((0, 0), text, font=font)
    return box[2] - box[0], box[3] - box[1]


def center_text(
    draw: ImageDraw.ImageDraw,
    text: str,
    y: int,
    font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int] = INK,
) -> int:
    w, h = measure(draw, text, font)
    draw.text((CX - w / 2, y), text, font=font, fill=fill)
    return y + h


def center_lines(
    draw: ImageDraw.ImageDraw,
    lines: list[str],
    y: int,
    font: ImageFont.FreeTypeFont,
    gap: int = 6,
    fill: tuple[int, int, int] = INK,
) -> int:
    for line in lines:
        if not line:
            y += gap + 10
            continue
        y = center_text(draw, line, y, font, fill) + gap
    return y


def hairline(draw: ImageDraw.ImageDraw, y: int, half: int = 160) -> None:
    draw.line([(CX - half, y), (CX + half, y)], fill=RULE, width=2)
    # small diamond center
    d = 5
    draw.polygon(
        [(CX, y - d), (CX + d, y), (CX, y + d), (CX - d, y)],
        outline=RULE,
    )


def eyebrow(draw: ImageDraw.ImageDraw, label: str) -> None:
    font = f(34)
    # tracked small label
    spaced = "  ".join(list(label))
    center_text(draw, spaced, Y_EYEBROW, font, MUTED)
    hairline(draw, Y_EYEBROW + 52, 100)


def panel(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int]) -> None:
    x0, y0, x1, y1 = box
    draw.rounded_rectangle([x0, y0, x1, y1], radius=18, fill=PANEL, outline=RULE, width=2)


def dashed_rect(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    width: int = 2,
    dash: int = 10,
    gap: int = 7,
) -> None:
    x0, y0, x1, y1 = box

    def segs(a: int, b: int) -> list[tuple[int, int]]:
        out = []
        x = a
        while x < b:
            out.append((x, min(x + dash, b)))
            x += dash + gap
        return out

    for a, b in segs(x0, x1):
        draw.line([(a, y0), (b, y0)], fill=RULE, width=width)
        draw.line([(a, y1), (b, y1)], fill=RULE, width=width)
    for a, b in segs(y0, y1):
        draw.line([(x0, a), (x0, b)], fill=RULE, width=width)
        draw.line([(x1, a), (x1, b)], fill=RULE, width=width)


def make_qr(size: int) -> Image.Image:
    path = ROOT / "_qr_tmp.png"
    segno.make(URL, error="h").save(path, scale=16, border=3, dark="#2b2b2b", light="white")
    im = Image.open(path).convert("RGB")
    path.unlink(missing_ok=True)
    return im.resize((size, size), Image.Resampling.NEAREST)


# ---------- calendar ----------

def draw_calendar(draw: ImageDraw.ImageDraw, top: int) -> int:
    """February 2027 calendar (Sunday-first). Returns bottom y."""
    cal_x = BLOCK_X0
    cal_w = BLOCK_W
    cell = cal_w // 7
    header_h = 64
    row_h = 52
    # Sunday-first weeks — matches 일 월 화 … labels
    weeks = calendar_sunday_first(2027, 2)
    cal_h = header_h + 34 + row_h * len(weeks) + 24
    panel(draw, (cal_x, top, cal_x + cal_w, top + cal_h))

    title = f(44)
    center_text(draw, "2027. 02", top + 14, title, INK)

    days = ["일", "월", "화", "수", "목", "금", "토"]
    day_f = f(30)
    y = top + header_h
    for i, d in enumerate(days):
        fill = ACCENT if i == 0 else ((110, 140, 180) if i == 6 else MUTED)
        tw, th = measure(draw, d, day_f)
        draw.text((cal_x + i * cell + (cell - tw) / 2, y), d, font=day_f, fill=fill)

    y += 36
    num_f = f(36)
    for week in weeks:
        for i, day in enumerate(week):
            if day == 0:
                continue
            cx = cal_x + i * cell + cell // 2
            cy = y + row_h // 2
            label = str(day)
            tw, th = measure(draw, label, num_f)
            if day == 21:
                r = 22
                draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=ACCENT)
                draw.text((cx - tw / 2, cy - th / 2 - 2), label, font=num_f, fill=(255, 255, 255))
            else:
                fill = ACCENT if i == 0 else ((110, 140, 180) if i == 6 else INK)
                draw.text((cx - tw / 2, cy - th / 2 - 2), label, font=num_f, fill=fill)
        y += row_h
    return top + cal_h


def calendar_sunday_first(year: int, month: int) -> list[list[int]]:
    """monthcalendar with Sunday as first weekday."""
    import calendar as cal

    c = cal.Calendar(firstweekday=cal.SUNDAY)
    return c.monthdayscalendar(year, month)


# ---------- map ----------

def draw_map(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int]) -> None:
    x0, y0, x1, y1 = box
    mw, mh = x1 - x0, y1 - y0
    panel(draw, box)

    def sx(x: float) -> int:
        return x0 + int(18 + x / 340 * (mw - 36))

    def sy(y: float) -> int:
        return y0 + int(16 + y / 310 * (mh - 32))

    draw.line([(sx(85), sy(10)), (sx(85), sy(300))], fill=(225, 215, 195), width=2)
    draw.line([(sx(285), sy(10)), (sx(285), sy(300))], fill=(225, 215, 195), width=2)
    draw.line([(sx(10), sy(155)), (sx(330), sy(155))], fill=(225, 215, 195), width=2)
    draw.line([(sx(195), sy(10)), (sx(195), sy(258))], fill=ROAD, width=5)
    draw.line([(sx(10), sy(80)), (sx(330), sy(80))], fill=ROAD, width=5)

    small = f(26)
    draw.text((sx(203), sy(16)), "선릉로", font=small, fill=MUTED)
    draw.text((sx(248), sy(60)), "도산대로", font=small, fill=MUTED)
    draw.text((sx(205), sy(88)), "학동사거리", font=small, fill=MUTED)

    cx, cy = sx(178), sy(118)
    draw.ellipse([cx - 11, cy - 11, cx + 11, cy + 11], outline=PIN, width=3)
    draw.ellipse([cx - 4, cy - 4, cx + 4, cy + 4], fill=PIN)

    label = f(30)
    name = "더채플앳청담"
    lw, lh = measure(draw, name, label)
    lx, ly = sx(88), sy(148)
    draw.rounded_rectangle([lx - 10, ly - 6, lx + lw + 10, ly + lh + 6], radius=6, fill=PIN)
    draw.text((lx, ly), name, font=label, fill=(255, 255, 255))
    draw.line([(lx + lw // 2, ly - 6), (lx + lw // 2, cy), (cx - 12, cy)], fill=PIN, width=2)

    def dot(x: float, y: float, name: str, left: bool = True) -> None:
        dx, dy = sx(x), sy(y)
        draw.ellipse([dx - 3, dy - 3, dx + 3, dy + 3], fill=ROAD)
        tw, _ = measure(draw, name, small)
        tx = dx + 8 if left else dx - tw - 8
        draw.text((tx, dy - 11), name, font=small, fill=MUTED)

    dot(38, 45, "도산공원")
    dot(120, 62, "CGV")
    dot(182, 92, "삼성스토어", left=False)
    dot(220, 185, "영동고")

    scx, scy = sx(195), sy(268)
    draw.ellipse([scx - 16, scy - 16, scx + 16, scy + 16], outline=STATION, width=3, fill=PANEL)
    seven = f(30)
    w7, h7 = measure(draw, "7", seven)
    draw.text((scx - w7 / 2, scy - h7 / 2 - 2), "7", font=seven, fill=STATION)
    st = f(26)
    for i, line in enumerate(["강남구청역", "3번 출구 · 셔틀"]):
        ww, _ = measure(draw, line, st)
        draw.text((scx - ww / 2, scy + 20 + i * 26), line, font=st, fill=INK)


def draw_transit_table(draw: ImageDraw.ImageDraw, top: int) -> int:
    """Compact two-column rows inside the shared content panel width."""
    rows = [
        ("지하철", "강남구청역 3번 출구 앞 셔틀"),
        ("버스", "간선 301 · 342 · 472  /  지선 3011 · 4212 · 4312"),
        ("주차", "1시간 30분 무료 · 접수대 등록"),
    ]
    label_f = f(40)
    body_f = f(36)
    pad = 28
    row_h = 56
    box = (BLOCK_X0, top, BLOCK_X1, top + pad * 2 + row_h * len(rows) - 8)
    panel(draw, box)
    label_w = 120
    x_label = BLOCK_X0 + pad
    x_body = x_label + label_w
    y = top + pad - 4
    for i, (kind, text) in enumerate(rows):
        draw.text((x_label, y), kind, font=label_f, fill=INK)
        draw.text((x_body, y), text, font=body_f, fill=MUTED)
        if i < len(rows) - 1:
            ly = y + row_h - 10
            draw.line([(x_label, ly), (BLOCK_X1 - pad, ly)], fill=(220, 210, 190), width=1)
        y += row_h
    return box[3]


# ---------- pages ----------

def draw_hosts(draw: ImageDraw.ImageDraw, top: int) -> int:
    """Two-column host block: groom | bride — fills width without looking sparse."""
    box_h = 150
    panel(draw, (BLOCK_X0, top, BLOCK_X1, top + box_h))
    mid = CX
    draw.line([(mid, top + 24), (mid, top + box_h - 24)], fill=(220, 210, 190), width=2)

    head = f(30)
    body = f(36)
    name = f(48)
    # left: groom
    for label, x in (("신랑", BLOCK_X0 + BLOCK_W // 4), ("신부", BLOCK_X0 + 3 * BLOCK_W // 4)):
        tw, _ = measure(draw, label, head)
        draw.text((x - tw / 2, top + 18), label, font=head, fill=MUTED)

    g_lines = ["김○○ · ○○○의 아들", "승무"]
    b_lines = ["성○○ · ○○○의 딸", "은지"]
    for lines, x, fonts in (
        (g_lines, BLOCK_X0 + BLOCK_W // 4, (body, name)),
        (b_lines, BLOCK_X0 + 3 * BLOCK_W // 4, (body, name)),
    ):
        y = top + 54
        for i, line in enumerate(lines):
            font = fonts[i]
            tw, th = measure(draw, line, font)
            draw.text((x - tw / 2, y), line, font=font, fill=INK)
            y += th + 4
    return top + box_h


def compose_left(dest: Path) -> None:
    im = blank()
    draw = ImageDraw.Draw(im)
    eyebrow(draw, "모시는 글")

    y = center_lines(
        draw,
        [
            "서로 다른 길로 걷다가",
            "같은 자리에서 멈춘",
            "두 사람입니다.",
        ],
        Y_BODY,
        f(56),
        gap=2,
    )
    y = center_lines(
        draw,
        [
            "오는 길에 꽃 한 송이 없어도 됩니다.",
            "얼굴만 보여 주세요.",
        ],
        y + 12,
        f(42),
        gap=2,
        fill=MUTED,
    )

    hosts_bottom = draw_hosts(draw, min(y + 24, Y_BLOCK - 178))
    cal_bottom = draw_calendar(draw, Y_BLOCK)
    y = center_lines(
        draw,
        ["2027년 2월 21일 일요일  ·  오전 11시 30분"],
        cal_bottom + 22,
        f(40),
        gap=2,
    )
    center_lines(
        draw,
        [
            "더채플앳청담  채플홀 6층",
            "서울 강남구 선릉로 757",
        ],
        y + 4,
        f(36),
        gap=2,
        fill=MUTED,
    )
    im.save(dest, "PNG")


def compose_right(dest: Path) -> None:
    im = blank()
    draw = ImageDraw.Draw(im)
    eyebrow(draw, "오시는 길")

    y = center_lines(
        draw,
        [
            "더채플앳청담  채플홀 6층",
            "서울 강남구 선릉로 757",
            "TEL  02-421-1121",
        ],
        Y_BODY,
        f(42),
        gap=4,
    )

    # map shares BLOCK_X0/X1 and Y_BLOCK with left calendar
    draw_map(draw, (BLOCK_X0, Y_BLOCK, BLOCK_X1, Y_BLOCK + MAP_H))
    draw_transit_table(draw, Y_BLOCK + MAP_H + 28)

    tip = f(32)
    line = "자세한 지도는 뒷면 QR에서 확인하세요"
    tw, _ = measure(draw, line, tip)
    draw.text(((W - tw) / 2, Y_FOOT), line, font=tip, fill=SOFT)
    im.save(dest, "PNG")


def compose_back(dest: Path) -> None:
    im = blank()
    draw = ImageDraw.Draw(im)
    eyebrow(draw, "모바일 청첩장")

    y = center_lines(
        draw,
        [
            "QR코드를 스캔하시면",
            "오시는 길과 안내를",
            "확인하실 수 있습니다.",
        ],
        Y_BODY + 40,
        f(52),
        gap=8,
    )

    qr_size = 400
    pad = 26
    stamp = qr_size + pad * 2
    sx = CX - stamp // 2
    sy = y + 48
    # soft panel behind stamp for structure
    panel(draw, (sx - 36, sy - 36, sx + stamp + 36, sy + stamp + 110))
    im.paste(make_qr(qr_size), (sx + pad, sy + pad))
    draw = ImageDraw.Draw(im)
    dashed_rect(draw, (sx, sy, sx + stamp, sy + stamp))

    url_f = f(30)
    url = URL.rstrip("/")
    mid = url.find("/", 8)
    lines = [url[:mid], url[mid:]] if mid > 0 else [url]
    uy = sy + stamp + 24
    for line in lines:
        ww, hh = measure(draw, line, url_f)
        draw.text(((W - ww) / 2, uy), line, font=url_f, fill=MUTED)
        uy += hh + 2

    center_text(draw, "승무  ·  은지", H - MARGIN - 50, f(48), INK)
    im.save(dest, "PNG")


def make_spread(left: Path, right: Path, dest: Path) -> None:
    a = Image.open(left).convert("RGB")
    b = Image.open(right).convert("RGB")
    gap = 28
    out = Image.new("RGB", (a.width + b.width + gap, a.height), (255, 255, 255))
    out.paste(a, (0, 0))
    out.paste(b, (a.width + gap, 0))
    preview = out.copy()
    preview.thumbnail((1600, 1100), Image.Resampling.LANCZOS)
    preview.save(dest, "PNG")


def make_preview(left: Path, right: Path, back: Path, dest: Path) -> None:
    pages = [Image.open(p).convert("RGB") for p in (left, right, back)]
    labels = ["안쪽 왼쪽", "안쪽 오른쪽", "뒷면"]
    gap = 24
    lab_f = f(34)
    # scale pages for strip
    thumbs = []
    for p in pages:
        t = p.copy()
        t.thumbnail((520, 700), Image.Resampling.LANCZOS)
        thumbs.append(t)
    h = max(t.height for t in thumbs) + 56
    w = sum(t.width for t in thumbs) + gap * 2
    out = Image.new("RGB", (w, h), (255, 255, 255))
    draw = ImageDraw.Draw(out)
    x = 0
    for i, t in enumerate(thumbs):
        out.paste(t, (x, 48))
        tw, _ = measure(draw, labels[i], lab_f)
        draw.text((x + (t.width - tw) / 2, 10), labels[i], font=lab_f, fill=INK)
        x += t.width + gap
    out.save(dest, "PNG")


def main() -> None:
    ensure_font()
    left = ROOT / "inner-left-ko.png"
    right = ROOT / "inner-right-ko.png"
    back = ROOT / "back-ko.png"
    compose_left(left)
    compose_right(right)
    compose_back(back)
    make_spread(left, right, ROOT / "inner-spread-ko.png")
    make_preview(left, right, back, ROOT / "preview-ko.png")

    # English: keep structural parity with KO for now (KO is source of truth)
    # Simple EN overlays would need separate copy — regenerate KO-structure EN stubs
    # by translating key strings inline
    _compose_en_pages()

    qr = segno.make(URL, error="h")
    qr.save(ROOT / "qr.svg", scale=8, border=4, dark="#2b2b2b", light="#fffdf6")
    qr.save(ROOT / "qr.png", scale=12, border=4, dark="#2b2b2b", light="#fffdf6")
    qr.save(ROOT / "qr-print.png", scale=16, border=4, dark="#111111", light="white")
    print("composed", left, right, back)


def _compose_en_pages() -> None:
    """English pages — same grid; KO is source of truth for print."""
    # For now mirror KO pages (print language is Korean).
    for src, dst in (
        ("inner-left-ko.png", "inner-left-en.png"),
        ("inner-right-ko.png", "inner-right-en.png"),
        ("back-ko.png", "back-en.png"),
        ("inner-spread-ko.png", "inner-spread-en.png"),
    ):
        Image.open(ROOT / src).save(ROOT / dst)


if __name__ == "__main__":
    main()

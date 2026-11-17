#!/usr/bin/env python3
"""Generate alternative paper-invitation layouts for comparison.

All variants keep the current constraints:
- no decorative illustration on the inside
- use the functional schematic map
- exact date, venue, transit, and QR URL

Run from the repository root:
    python3 paper-invitation/compose_variants.py
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

from compose_inner import (
    ACCENT,
    BLOCK_W,
    BLOCK_X0,
    BLOCK_X1,
    CREAM,
    CX,
    H,
    INK,
    MAP_H,
    MARGIN,
    MUTED,
    PANEL,
    PIN,
    RULE,
    SOFT,
    STATION,
    URL,
    W,
    blank,
    center_lines,
    center_text,
    dashed_rect,
    draw_calendar,
    draw_map,
    draw_transit_table,
    ensure_font,
    f,
    hairline,
    make_qr,
    measure,
    panel,
)

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "variants"


GREETING = [
    "서로 다른 길로 걷다가",
    "같은 자리에서 멈춘",
    "두 사람입니다.",
]

GREETING_SHORT = [
    "오는 길에 꽃 한 송이 없어도 됩니다.",
    "얼굴만 보여 주세요.",
]

HOSTS = [
    "김○○ · ○○○의 아들  승무",
    "성○○ · ○○○의 딸  은지",
]

VENUE = [
    "더채플앳청담  채플홀 6층",
    "서울 강남구 선릉로 757",
]


def heading(draw: ImageDraw.ImageDraw, eyebrow_text: str, title: str) -> None:
    """Shared heading with a small label and an anchored title."""
    small = f(30)
    spaced = "  ".join(list(eyebrow_text))
    center_text(draw, spaced, 116, small, MUTED)
    hairline(draw, 166, 100)
    center_text(draw, title, 196, f(64), INK)


def footer(draw: ImageDraw.ImageDraw, text: str) -> None:
    font = f(30)
    w, _ = measure(draw, text, font)
    draw.text(((W - w) / 2, H - 105), text, font=font, fill=SOFT)


def host_columns(draw: ImageDraw.ImageDraw, top: int, height: int = 164) -> None:
    """Balanced two-column host block, used by variants A and B."""
    panel(draw, (BLOCK_X0, top, BLOCK_X1, top + height))
    mid = CX
    draw.line([(mid, top + 22), (mid, top + height - 22)], fill=(220, 210, 190), width=2)
    label = f(28)
    body = f(38)
    name = f(52)
    centers = [BLOCK_X0 + BLOCK_W // 4, BLOCK_X0 + BLOCK_W * 3 // 4]
    for i, (side, relation, person) in enumerate(
        [
            ("신랑", "김○○ · ○○○의 아들", "승무"),
            ("신부", "성○○ · ○○○의 딸", "은지"),
        ]
    ):
        x = centers[i]
        tw, _ = measure(draw, side, label)
        draw.text((x - tw / 2, top + 18), side, font=label, fill=MUTED)
        tw, _ = measure(draw, relation, body)
        draw.text((x - tw / 2, top + 54), relation, font=body, fill=INK)
        tw, _ = measure(draw, person, name)
        draw.text((x - tw / 2, top + 94), person, font=name, fill=INK)


def info_card(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    label: str,
    lines: list[str],
    *,
    accent: bool = False,
) -> None:
    x0, y0, x1, y1 = box
    panel(draw, box)
    tag = f(28)
    body = f(38)
    draw.text((x0 + 24, y0 + 20), label, font=tag, fill=ACCENT if accent else MUTED)
    y = y0 + 54
    for line in lines:
        draw.text((x0 + 24, y), line, font=body, fill=INK)
        y += 44


def draw_transit_compact(draw: ImageDraw.ImageDraw, top: int, height: int = 222) -> None:
    """A more editorial transport block than the default table."""
    box = (BLOCK_X0, top, BLOCK_X1, top + height)
    panel(draw, box)
    title = f(32)
    draw.text((box[0] + 26, top + 20), "교통 · 주차", font=title, fill=MUTED)
    rows = [
        ("지하철", "강남구청역 3번 출구 앞 셔틀"),
        ("버스", "301 · 342 · 472  /  3011 · 4212 · 4312"),
        ("주차", "1시간 30분 무료 · 접수대 등록"),
    ]
    label = f(34)
    body = f(34)
    y = top + 66
    label_w = 120
    for i, (name, text) in enumerate(rows):
        draw.text((box[0] + 26, y), name, font=label, fill=INK)
        draw.text((box[0] + 26 + label_w, y), text, font=body, fill=MUTED)
        if i != len(rows) - 1:
            draw.line(
                [(box[0] + 26, y + 42), (box[2] - 26, y + 42)],
                fill=(224, 214, 194),
                width=1,
            )
        y += 50


def qr_block(
    draw: ImageDraw.ImageDraw,
    im: Image.Image,
    top: int,
    *,
    size: int = 360,
    title: str = "모바일 청첩장",
    instruction: list[str] | None = None,
) -> int:
    """Paste a real QR inside a stable square block and return its bottom."""
    y = top
    if title:
        y = center_lines(draw, [title], y, f(56), gap=4)
        y += 28
    if instruction:
        y = center_lines(draw, instruction, y, f(38), gap=2, fill=MUTED)
    pad = 26
    stamp = size + pad * 2
    sx = CX - stamp // 2
    sy = y + 28
    panel(draw, (sx - 30, sy - 30, sx + stamp + 30, sy + stamp + 92))
    im.paste(make_qr(size), (sx + pad, sy + pad))
    draw = ImageDraw.Draw(im)
    dashed_rect(draw, (sx, sy, sx + stamp, sy + stamp), dash=10, gap=7)
    url_font = f(27)
    # The QR carries the full URL; print the domain only as a clean fallback.
    lines = [URL.removeprefix("https://").rstrip("/")]
    url_y = sy + stamp + 18
    for line in lines:
        tw, th = measure(draw, line, url_font)
        draw.text(((W - tw) / 2, url_y), line, font=url_font, fill=MUTED)
        url_y += th + 2
    return sy + stamp + 72


def variant_a() -> tuple[Path, Path, Path]:
    """A — editorial standard: message, hosts, date; map and transport."""
    left = blank()
    draw = ImageDraw.Draw(left)
    heading(draw, "INVITATION", "모시는 글")
    y = center_lines(draw, GREETING, 304, f(58), gap=2)
    y = center_lines(draw, GREETING_SHORT, y + 18, f(40), gap=2, fill=MUTED)
    host_columns(draw, y + 34)
    bottom = draw_calendar(draw, 820)
    y = center_lines(draw, ["2027년 2월 21일 일요일  ·  오전 11시 30분"], bottom + 24, f(38), gap=2)
    center_lines(draw, VENUE, y + 4, f(34), gap=2, fill=MUTED)
    left_path = OUT / "variant-a-editorial-left.png"
    left.save(left_path)

    right = blank()
    draw = ImageDraw.Draw(right)
    heading(draw, "DIRECTIONS", "오시는 길")
    center_lines(draw, VENUE + ["TEL  02-421-1121"], 300, f(40), gap=3, fill=MUTED)
    draw_map(draw, (BLOCK_X0, 520, BLOCK_X1, 1080))
    draw_transit_compact(draw, 1120)
    footer(draw, "자세한 안내는 뒷면 QR에서 확인하세요")
    right_path = OUT / "variant-a-editorial-right.png"
    right.save(right_path)

    back = blank()
    draw = ImageDraw.Draw(back)
    heading(draw, "MOBILE INVITE", "모바일 청첩장")
    qr_block(
        draw,
        back,
        360,
        size=400,
        title="",
        instruction=["QR코드를 스캔하시면", "오시는 길과 안내를 확인하실 수 있습니다."],
    )
    center_text(draw, "승무  ·  은지", H - 140, f(46), INK)
    back_path = OUT / "variant-a-editorial-back.png"
    back.save(back_path)
    return left_path, right_path, back_path


def variant_b() -> tuple[Path, Path, Path]:
    """B — calendar-first: calendar carries the visual weight on the left."""
    left = blank()
    draw = ImageDraw.Draw(left)
    heading(draw, "SAVE THE DATE", "우리의 날")
    center_lines(draw, ["2027년 2월 21일 일요일", "오전 11시 30분"], 300, f(52), gap=2)
    draw_calendar(draw, 520)
    info_card(
        draw,
        (BLOCK_X0, 1148, BLOCK_X1, 1322),
        "INVITATION",
        ["서로 다른 길로 걷다가 같은 자리에서 멈춘 두 사람입니다.", "얼굴만 보여 주세요."],
    )
    host_columns(draw, 1370, height=154)
    center_lines(draw, VENUE, 1580, f(36), gap=2, fill=MUTED)
    footer(draw, "승무 · 은지")
    left_path = OUT / "variant-b-calendar-left.png"
    left.save(left_path)

    right = blank()
    draw = ImageDraw.Draw(right)
    heading(draw, "LOCATION", "길을 안내할게요")
    draw_map(draw, (BLOCK_X0, 340, BLOCK_X1, 1110))
    draw_transit_compact(draw, 1160, height=222)
    center_lines(draw, ["더채플앳청담  채플홀 6층", "서울 강남구 선릉로 757"], 1450, f(36), gap=2, fill=MUTED)
    footer(draw, "자세한 모바일 안내는 뒷면 QR")
    right_path = OUT / "variant-b-calendar-right.png"
    right.save(right_path)

    back = blank()
    draw = ImageDraw.Draw(back)
    heading(draw, "MOBILE INVITE", "종이에서 화면으로")
    qr_block(
        draw,
        back,
        360,
        size=360,
        title="",
        instruction=["예식 정보와 오시는 길을", "휴대폰에서 확인해 주세요."],
    )
    center_text(draw, "Seungmoo  ·  Eunji", H - 140, f(42), INK)
    back_path = OUT / "variant-b-calendar-back.png"
    back.save(back_path)
    return left_path, right_path, back_path


def variant_c() -> tuple[Path, Path, Path]:
    """C — ticket grid: stronger information hierarchy and more visible blocks."""
    left = blank()
    draw = ImageDraw.Draw(left)
    heading(draw, "OUR DAY", "함께해 주세요")
    # Strong date strip gives the text-only left page a visual anchor.
    date_box = (BLOCK_X0, 310, BLOCK_X1, 620)
    panel(draw, date_box)
    center_text(draw, "02", 348, f(170), ACCENT)
    center_text(draw, "FEBRUARY  ·  2027", 520, f(30), MUTED)
    center_text(draw, "일요일  오전 11시 30분", 566, f(44), INK)

    info_card(draw, (BLOCK_X0, 674, CX - 14, 906), "GROOM", ["김○○ · ○○○의 아들", "승무"], accent=True)
    info_card(draw, (CX + 14, 674, BLOCK_X1, 906), "BRIDE", ["성○○ · ○○○의 딸", "은지"], accent=True)
    info_card(draw, (BLOCK_X0, 956, BLOCK_X1, 1192), "INVITATION", GREETING + ["얼굴만 보여 주세요."])
    info_card(draw, (BLOCK_X0, 1244, BLOCK_X1, 1468), "VENUE", VENUE + ["TEL  02-421-1121"])
    center_lines(draw, ["이 날의 자리에", "당신을 초대합니다."], 1570, f(46), gap=3, fill=MUTED)
    left_path = OUT / "variant-c-ticket-left.png"
    left.save(left_path)

    right = blank()
    draw = ImageDraw.Draw(right)
    heading(draw, "LOCATION", "찾아오시는 길")
    draw_map(draw, (BLOCK_X0, 320, BLOCK_X1, 1150))
    info_card(
        draw,
        (BLOCK_X0, 1200, BLOCK_X1, 1460),
        "BY PUBLIC TRANSIT",
        ["강남구청역 3번 출구 앞 셔틀", "간선 301 · 342 · 472", "지선 3011 · 4212 · 4312"],
    )
    info_card(
        draw,
        (BLOCK_X0, 1500, BLOCK_X1, 1670),
        "PARKING",
        ["1시간 30분 무료 · 접수대 등록"],
    )
    footer(draw, "모바일 청첩장 QR은 뒷면")
    right_path = OUT / "variant-c-ticket-right.png"
    right.save(right_path)

    back = blank()
    draw = ImageDraw.Draw(back)
    heading(draw, "DETAILS", "모바일 청첩장")
    center_lines(draw, ["지도 · 주차 · 교통 안내", "QR코드를 스캔해 확인하세요."], 330, f(44), gap=4, fill=MUTED)
    qr_block(draw, back, 530, size=330, title="", instruction=[])
    center_text(draw, "승무 · 은지", H - 140, f(46), INK)
    back_path = OUT / "variant-c-ticket-back.png"
    back.save(back_path)
    return left_path, right_path, back_path


def variant_d() -> tuple[Path, Path, Path]:
    """D — QR-in: code lives on the inside; back becomes a quiet name page."""
    left = blank()
    draw = ImageDraw.Draw(left)
    heading(draw, "A NEW CHAPTER", "우리의 초대")
    y = 330
    # Left-aligned copy creates a different rhythm without adding illustration.
    for line in GREETING + ["", "오는 길에 꽃 한 송이 없어도 됩니다.", "얼굴만 보여 주세요."]:
        if line:
            draw.text((BLOCK_X0 + 20, y), line, font=f(56 if y < 500 else 40), fill=INK if y < 500 else MUTED)
            y += 70 if y < 500 else 54
        else:
            y += 26
    draw.line([(BLOCK_X0 + 20, 760), (BLOCK_X1 - 20, 760)], fill=RULE, width=2)
    center_lines(draw, HOSTS, 810, f(40), gap=8)
    info_card(draw, (BLOCK_X0, 1050, BLOCK_X1, 1290), "THE DAY", ["2027년 2월 21일 일요일", "오전 11시 30분"])
    info_card(draw, (BLOCK_X0, 1340, BLOCK_X1, 1574), "THE PLACE", VENUE)
    center_text(draw, "승무 · 은지", 1710, f(58), INK)
    left_path = OUT / "variant-d-qr-in-left.png"
    left.save(left_path)

    right = blank()
    draw = ImageDraw.Draw(right)
    heading(draw, "LOCATION + MOBILE", "한 장에 담았습니다")
    draw_map(draw, (BLOCK_X0, 330, BLOCK_X1, 930))
    draw_transit_compact(draw, 970, height=218)
    # QR is intentionally inside, under the practical directions.
    qr_size = 230
    pad = 18
    stamp = qr_size + pad * 2
    sx = CX - stamp // 2
    sy = 1240
    panel(draw, (sx - 22, sy - 22, sx + stamp + 22, sy + stamp + 72))
    draw.text((BLOCK_X0 + 20, sy - 4), "모바일 청첩장", font=f(32), fill=MUTED)
    right.paste(make_qr(qr_size), (sx + pad, sy + pad))
    draw = ImageDraw.Draw(right)
    dashed_rect(draw, (sx, sy, sx + stamp, sy + stamp), dash=9, gap=6)
    footer(draw, "QR을 스캔하면 상세 안내가 열립니다")
    right_path = OUT / "variant-d-qr-in-right.png"
    right.save(right_path)

    # Quiet back: no QR, only a short link cue and names.
    back = blank()
    draw = ImageDraw.Draw(back)
    heading(draw, "THANK YOU", "승무 · 은지")
    center_lines(
        draw,
        ["귀한 걸음으로 함께해 주시면", "더없는 기쁨으로 간직하겠습니다."],
        420,
        f(48),
        gap=8,
        fill=MUTED,
    )
    hairline(draw, 720, 200)
    center_lines(draw, ["2027년 2월 21일", "더채플앳청담"], 790, f(46), gap=5)
    center_lines(draw, ["모바일 청첩장은", "안쪽 QR에서 확인해 주세요."], 1120, f(38), gap=5, fill=MUTED)
    center_text(draw, "Seungmoo  ·  Eunji", H - 140, f(42), INK)
    back_path = OUT / "variant-d-qr-in-back.png"
    back.save(back_path)
    return left_path, right_path, back_path


def spread(left: Path, right: Path, out: Path) -> None:
    a = Image.open(left).convert("RGB")
    b = Image.open(right).convert("RGB")
    gap = 28
    image = Image.new("RGB", (a.width + b.width + gap, a.height), (255, 255, 255))
    image.paste(a, (0, 0))
    image.paste(b, (a.width + gap, 0))
    preview = image.copy()
    preview.thumbnail((1600, 1100), Image.Resampling.LANCZOS)
    preview.save(out, "PNG")


def labeled_thumbnail(path: Path, label: str, width: int = 360) -> Image.Image:
    image = Image.open(path).convert("RGB")
    ratio = width / image.width
    image = image.resize((width, int(image.height * ratio)), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (width, image.height + 54), (255, 255, 255))
    canvas.paste(image, (0, 54))
    draw = ImageDraw.Draw(canvas)
    label_font = f(30)
    tw, _ = measure(draw, label, label_font)
    draw.text(((width - tw) / 2, 12), label, font=label_font, fill=INK)
    return canvas


def make_overview(groups: list[tuple[str, Path, Path, Path]]) -> None:
    """One comparison sheet: each row is inside spread + back."""
    rows: list[Image.Image] = []
    for label, left, right, back in groups:
        inside = Image.open(left).convert("RGB")
        right_im = Image.open(right).convert("RGB")
        gap = 12
        inside = Image.new("RGB", (inside.width + right_im.width + gap, inside.height), (255, 255, 255))
        inside.paste(Image.open(left).convert("RGB"), (0, 0))
        inside.paste(right_im, (inside.width - right_im.width, 0))
        inside.thumbnail((700, 850), Image.Resampling.LANCZOS)
        inside_labeled = Image.new("RGB", (inside.width, inside.height + 50), (255, 255, 255))
        inside_labeled.paste(inside, (0, 50))
        draw = ImageDraw.Draw(inside_labeled)
        draw.text((12, 12), f"{label} · 안쪽", font=f(30), fill=INK)

        back_thumb = labeled_thumbnail(back, f"{label} · 뒷면", width=310)
        row_h = max(inside_labeled.height, back_thumb.height)
        row = Image.new("RGB", (inside_labeled.width + 28 + back_thumb.width, row_h), (255, 255, 255))
        row.paste(inside_labeled, (0, 0))
        row.paste(back_thumb, (inside_labeled.width + 28, 0))
        rows.append(row)

    width = max(row.width for row in rows)
    height = sum(row.height for row in rows) + 30 * (len(rows) - 1)
    sheet = Image.new("RGB", (width, height), (240, 236, 224))
    y = 0
    for row in rows:
        sheet.paste(row, (0, y))
        y += row.height + 30
    sheet.save(OUT / "overview.png", "PNG")


def main() -> None:
    ensure_font()
    OUT.mkdir(exist_ok=True)
    groups = [
        ("A 정석 정보형", *variant_a()),
        ("B 달력 중심형", *variant_b()),
        ("C 티켓 그리드형", *variant_c()),
        ("D QR 안쪽 배치형", *variant_d()),
    ]
    for label, left, right, back in groups:
        spread(left, right, OUT / f"{left.stem.replace('-left', '')}-spread.png")
    make_overview(groups)
    print("generated", len(groups), "variants in", OUT)


if __name__ == "__main__":
    main()

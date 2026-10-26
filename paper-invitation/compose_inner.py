#!/usr/bin/env python3
"""Compose text-only inner pages with a scannable postage-stamp QR.

No illustrations — cream paper, copy, and QR only.
"""

from __future__ import annotations

from pathlib import Path

import segno
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
FONT_DIR = ROOT / "fonts"
URL = "https://seungmoo-eunji-wedding-invitation.vercel.app/"

# Print-friendly at ~300dpi for ~130×174mm cards
W, H = 1536, 2048
INK = (52, 48, 42)
CREAM = (247, 240, 214)
RULE = (120, 112, 98)

LEFT_GREETING_KO = [
    "서로 다른 길로 걷다가",
    "같은 자리에서 멈춘",
    "두 사람입니다.",
    "",
    "오는 길에",
    "꽃 한 송이 없어도 됩니다.",
    "얼굴만 보여 주세요.",
]
LEFT_NAMES_KO = "승무 · 은지"

LEFT_GREETING_EN = [
    "We were walking different roads",
    "and stopped in the same place.",
    "",
    "No flowers needed.",
    "Just come.",
]
LEFT_NAMES_EN = "Seungmoo · Eunji"

RIGHT_DATE_KO = [
    "예식",
    "",
    "2027년 2월 21일 일요일",
    "오전 11시 30분",
]
RIGHT_VENUE_KO = [
    "더채플앳청담",
    "채플홀 6층",
    "서울 강남구 선릉로 757",
    "강남구청역 3번 출구 셔틀",
]
RIGHT_CAPTION_KO = "모바일 청첩장"

RIGHT_DATE_EN = [
    "Ceremony",
    "",
    "Sunday, February 21, 2027",
    "11:30 AM",
]
RIGHT_VENUE_EN = [
    "The Chapel at Cheongdam",
    "Chapel Hall, 6F",
    "757 Seolleung-ro, Gangnam, Seoul",
    "Shuttle at Gangnam-gu Office Stn Exit 3",
]
RIGHT_CAPTION_EN = "Mobile invitation"

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


def draw_centered_lines(
    draw: ImageDraw.ImageDraw,
    lines: list[str],
    center_x: int,
    top: int,
    fnt: ImageFont.FreeTypeFont,
    gap: int,
    fill: tuple[int, int, int] = INK,
) -> int:
    y = top
    for line in lines:
        if line:
            w, h = text_size(draw, line, fnt)
            draw.text((center_x - w / 2, y), line, font=fnt, fill=fill)
            y += h + gap
        else:
            y += max(28, int(getattr(fnt, "size", 64) * 0.55))
    return y


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


def compose_left(greeting: list[str], names: str, dest: Path) -> None:
    im = blank()
    draw = ImageDraw.Draw(im)
    cx = W // 2
    body = font(78)
    name_f = font(64)
    y = draw_centered_lines(draw, greeting, cx, top=int(H * 0.22), fnt=body, gap=6)
    # thin rule, then names — no doodles
    rule_y = max(y + 80, int(H * 0.72))
    draw.line([(cx - 90, rule_y), (cx + 90, rule_y)], fill=RULE, width=2)
    draw_centered_lines(draw, [names], cx, top=rule_y + 36, fnt=name_f, gap=0)
    im.save(dest, "PNG")


def compose_right(
    date_lines: list[str],
    venue_lines: list[str],
    caption: str,
    dest: Path,
) -> None:
    im = blank()
    draw = ImageDraw.Draw(im)
    cx = W // 2
    label = font(48)
    date_f = font(72)
    venue_f = font(56)
    cap = font(40)

    y = draw_centered_lines(draw, [date_lines[0]], cx, top=int(H * 0.12), fnt=label, gap=0)
    y = draw_centered_lines(draw, date_lines[2:], cx, top=y + 18, fnt=date_f, gap=4)
    draw.line([(cx - 120, y + 40), (cx + 120, y + 40)], fill=RULE, width=2)
    draw_centered_lines(draw, venue_lines, cx, top=y + 72, fnt=venue_f, gap=4)

    qr_size = 320
    pad = 22
    stamp = qr_size + pad * 2
    sx = (W - stamp) // 2
    sy = int(H * 0.68)
    im.paste(make_qr(qr_size), (sx + pad, sy + pad))
    draw = ImageDraw.Draw(im)
    dashed_rect(draw, (sx, sy, sx + stamp, sy + stamp))
    w, _ = text_size(draw, caption, cap)
    draw.text(((W - w) / 2, sy + stamp + 16), caption, font=cap, fill=INK)
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


def main() -> None:
    ensure_font()
    left_ko = ROOT / "inner-left-ko.png"
    right_ko = ROOT / "inner-right-ko.png"
    left_en = ROOT / "inner-left-en.png"
    right_en = ROOT / "inner-right-en.png"

    compose_left(LEFT_GREETING_KO, LEFT_NAMES_KO, left_ko)
    compose_right(RIGHT_DATE_KO, RIGHT_VENUE_KO, RIGHT_CAPTION_KO, right_ko)
    compose_left(LEFT_GREETING_EN, LEFT_NAMES_EN, left_en)
    compose_right(RIGHT_DATE_EN, RIGHT_VENUE_EN, RIGHT_CAPTION_EN, right_en)
    make_spread(left_ko, right_ko, ROOT / "inner-spread-ko.png")
    make_spread(left_en, right_en, ROOT / "inner-spread-en.png")

    qr = segno.make(URL, error="h")
    qr.save(ROOT / "qr.svg", scale=8, border=4, dark="#2b2b2b", light="#fffdf6")
    qr.save(ROOT / "qr.png", scale=12, border=4, dark="#2b2b2b", light="#fffdf6")
    qr.save(ROOT / "qr-print.png", scale=16, border=4, dark="#111111", light="white")
    print("composed", left_ko, right_ko, left_en, right_en)


if __name__ == "__main__":
    main()

// כל התוכן שמתעדכן ידנית נמצא כאן. prices ריק = "בדקו בחנות". רק מוצרים שבמלאי / בהזמנה מוקדמת.
const SITE = {
  whatsapp: "", // למשל "9725XXXXXXXX" — ריק = הכפתור מוסתר
  pricesChecked: "19.9.2026",
};

const BOTX = "https://www.3dbotx.co.il/product-page/", BUG = "https://www.bug.co.il/brand/";

// tags: open/enclosed, color (רב-צבעי זמין), big (משטח ≥300), eng (חומרים הנדסיים), easy (עובד מהקופסה), tinker (פתוח לשינויים), quiet
const PRINTERS = [
  { id: "a1-mini", name: "Bambu Lab A1 mini", build: "180×180×180", tags: ["open", "color", "easy", "quiet"],
    why: "הכניסה הכי זולה והכי חלקה לתחום. משטח קטן — מספיק לרוב ההדפסות הביתיות.",
    watch: "משטח 18 ס\"מ מגביל. פתוחה — PLA/PETG בלבד בפועל.",
    zap: "https://www.zap.co.il/model.aspx?modelid=1243156", prices: [
      { store: "Bug", label: "הזמנה מוקדמת", ils: 890, url: BUG + "bambulab/a1/mini" },
      { store: "3DbotX", ils: 990, url: BOTX + "bambulab-a1-mini-3d-printer" },
      { store: "Bug", label: "קומבו AMS lite", ils: 1449, url: BUG + "bambulab/a1/mini/combo" },
      { store: "3DbotX", label: "קומבו AMS lite", ils: 1890, url: BOTX + "bambulab-a1-mini-combo-3d-printer" }] },
  { id: "a1", name: "Bambu Lab A1", build: "256×256×256", tags: ["open", "color", "easy", "quiet"],
    why: "אותה חוויה של ה-mini עם משטח בגודל סטנדרטי. ברירת המחדל למתחיל.",
    watch: "פתוחה — לא ל-ABS/ASA. תופסת עומק על השולחן (המשטח נע קדימה-אחורה).",
    zap: null, prices: [
      { store: "Bug", ils: 1299, url: BUG + "bambulab/a1" },
      { store: "3DbotX", ils: 1550, url: BOTX + "bambulab-a1-3d-printer" },
      { store: "Bug", label: "קומבו AMS lite", ils: 1899, url: BUG + "bambulab/a1/combo" },
      { store: "3DbotX", label: "קומבו AMS lite", ils: 2290, url: BOTX + "bambulab-a1-combo-3d-printer" }] },
  { id: "a2l", name: "Bambu Lab A2L", build: "330×320×325", tags: ["open", "color", "big", "easy"],
    why: "משטח 33 ס\"מ במחיר של מדפסת בינונית, עם אותה חוויית שימוש של Bambu. תומכת גם ב-AMS 2 Pro.",
    watch: "פתוחה, והמשטח מגיע רק ל-80°C — לא ל-ABS/ASA. משטח נע גדול: צריכה שולחן יציב ועמוק. דגם חדש — עדיין מעט ניסיון מצטבר.",
    zap: null, prices: [
      { store: "Bug", label: "הזמנה מוקדמת", ils: 1699, url: BUG + "bambulab/a2l" },
      { store: "Bug", label: "קומבו AMS lite, הזמנה מוקדמת", ils: 2299, url: BUG + "bambulab/a2l/combo" },
      { store: "3DbotX", label: "קומבו AMS lite", ils: 2590, url: BOTX + "bambu-lab-a2l-combo-3d-printer" }] },
  { id: "centauri", name: "Elegoo Centauri Carbon / Carbon 2", build: "256×256×256", tags: ["enclosed", "color", "eng", "easy"],
    why: "סגורה ומהירה במחיר של פתוחה. הכי הרבה מדפסת לשקל.",
    watch: "רב-צבעי רק בגרסת Carbon 2 Combo. קהילה ותמיכה בארץ קטנות יותר משל Bambu, ומעט משווקים.",
    zap: null, prices: [
      { store: "Beyond3D", label: "מחיר מבצע", ils: 1800, url: "https://beyond3d.co.il/product/elegoo-centauri-carbon-2/" },
      { store: "Beyond3D", label: "Carbon 2 קומבו 4 צבעים, מבצע", ils: 2450, url: "https://beyond3d.co.il/product/elegoo-centauri-carbon-2-2/" }] },
  { id: "p2s", name: "Bambu Lab P2S", build: "256×256×256", tags: ["enclosed", "color", "eng", "easy"],
    why: "סגורה, שקטה יחסית, רב-צבעי עם AMS. מתאימה גם לחלקים פונקציונליים ב-ABS/ASA.",
    watch: "עם AMS המחיר קופץ משמעותית.",
    zap: "https://www.zap.co.il/model.aspx?modelid=1263756", prices: [
      { store: "3DbotX", ils: 3490, url: BOTX + "bambu-lab-p2s" },
      { store: "Copytech", label: "קומבו AMS 2 Pro", ils: 3980, url: "https://www.copytech.co.il/items/8717414" },
      { store: "Bug", label: "קומבו AMS 2 Pro, הזמנה מוקדמת", ils: 3990, url: BUG + "bambulab/p2s/ams2/pro/combo" },
      { store: "3DbotX", label: "קומבו AMS 2 Pro", ils: 4290, url: BOTX + "bambu-lab-p2s-ams-2-pro-combo" }] },
  { id: "x2d", name: "Bambu Lab X2D", build: "256×256×260", tags: ["enclosed", "color", "eng", "easy"],
    why: "סגורה עם תא מחומם אקטיבית (65°C) ושתי דיזות — חומר תמיכה נפרד או שני צבעים בלי בזבוז של החלפות. בנויה לחומרים הנדסיים.",
    watch: "לפי Bambu עצמה הדיזה השנייה איטית יותר ובאיכות מעט נמוכה. בקומבו ה-AMS מזין רק דיזה אחת. בארץ נמכרת כרגע רק כקומבו. דגם חדש.",
    zap: null, prices: [
      { store: "Bug", label: "קומבו AMS 2 Pro", ils: 4890, url: BUG + "bambulab/x2d/combo" },
      { store: "Copytech", label: "קומבו AMS 2 Pro", ils: 5080, url: "https://www.copytech.co.il/items/9107683" },
      { store: "3DbotX", label: "קומבו AMS 2 Pro", ils: 5090, url: BOTX + "bambu-lab-x2d-combo-3d-printer" }] },
  { id: "creality-hi", name: "Creality Hi", build: "260×260×300", tags: ["open", "color", "tinker"],
    why: "רב-צבעי זול עם CFS, מערכת פתוחה יותר לשינויים.",
    watch: "פחות מלוטשת מ-Bambu. נכון לבדיקה האחרונה אזלה אצל המשווקים בארץ — לבדוק זמינות ואחריות לפני שמתאהבים.",
    zap: null, prices: [] },
  { id: "core-one", name: "Prusa CORE One+", build: "250×220×270", tags: ["enclosed", "eng", "tinker", "quiet"],
    why: "קוד פתוח, חלפים לשנים, עובדת מלאה בלי ענן. למי שרוצה לשלוט במכונה.",
    watch: "יקרה ביחס למפרט. רב-צבעי (MMU3) נמכר בנפרד ודורש סבלנות.",
    zap: null, prices: [
      { store: "Copytech", label: "מורכבת", ils: 6440, url: "https://www.copytech.co.il/items/8350644" },
      { store: "Yizmaco", label: "CORE One, מורכבת", ils: 6599, url: "https://3dny.co.il/product/prusa-core-one-%d7%9e%d7%93%d7%a4%d7%a1%d7%aa-%d7%aa%d7%9c%d7%aa-%d7%9e%d7%99%d7%9e%d7%93/" }] },
  { id: "k2-plus", name: "Creality K2 Plus", build: "350×350×350", tags: ["enclosed", "color", "big", "eng", "tinker"],
    why: "משטח ענק סגור עם רב-צבעי. Klipper מתחת למכסה.",
    watch: "גדולה וכבדה. בקרת איכות פחות עקבית — לקנות ממשווק עם אחריות בארץ.",
    zap: null, prices: [
      { store: "KSP", ils: 5990, url: "https://ksp.co.il/web/item/468670" },
      { store: "KSP", label: "קומבו CFS", ils: 6979, url: "https://ksp.co.il/web/item/409012" },
      { store: "Spider3D", label: "קומבו CFS", ils: 6990, url: "https://www.spider3d.co.il/creality-k2-plus-cfs-combo/" }] },
  { id: "h2s", name: "Bambu Lab H2S", build: "340×320×340", tags: ["enclosed", "color", "big", "eng", "easy", "quiet"],
    why: "משטח גדול, סגורה, אמינות של Bambu. למי שיודע שיצטרך גודל.",
    watch: "מחיר. בארץ נמכרת רק כקומבו. למתחיל שלא בטוח — A1 או P2S קודם.",
    zap: "https://www.zap.co.il/model.aspx?modelid=1263757", prices: [
      { store: "Copytech", label: "קומבו AMS 2 Pro", ils: 6950, url: "https://www.copytech.co.il/items/8484289" },
      { store: "3DbotX", label: "קומבו AMS 2 Pro", ils: 6990, url: BOTX + "bambu-lab-h2s-ams-2-pro-combo" },
      { store: "Bug", label: "קומבו AMS 2 Pro", ils: 6990, url: BUG + "bambulab/h2s/ams/combo" }] },
];

// התקציב מסנן לפי המחיר הזול ביותר בארץ (prices). דגם בלי מחיר לא מופיע בהמלצות.
const QUESTIONS = [
  { id: "budget", q: "מה התקציב למדפסת עצמה?", a: [
    // min = רצפה רכה (~75% מתחתית הטווח; 60% בטווח העליון כדי לא לחתוך דגמים של ₪6,000): מי שהקצה ₪8,000 לא צריך מדפסת של ₪900
    ["עד ₪1,200", { min: 0, max: 1200 }], ["₪1,200 עד ₪2,500", { min: 900, max: 2500 }],
    ["₪2,500 עד ₪5,000", { min: 1875, max: 5000 }], ["₪5,000 עד ₪8,000", { min: 3750, max: 8000 }], ["מעל ₪8,000", { min: 4800, max: Infinity }]] },
  { id: "use", q: "מה בעיקר תדפיסו?", a: [
    ["צעצועים, קישוטים, גאדג'טים לבית", { want: ["easy"] }],
    ["חלקים פונקציונליים — לרכב, לכלים, לחוץ", { want: ["enclosed", "eng"] }],
    // גודל משטח הוא מגבלה פיזית, לא העדפה — משקל גבוה כדי שלא יפסיד לנוחות (test/quiz.test.js)
    ["דברים גדולים — קסדות, קוספליי, ארגוניות", { want: ["big", "big", "big"] }],
    ["מיניאטורות ופרטים זעירים", { want: ["easy"], resin: true }]] },
  { id: "color", q: "כמה חשוב לכם רב-צבעי?", a: [
    ["חובה", { want: ["color", "color"] }], ["נחמד שיהיה בעתיד", { want: ["color"] }], ["לא מעניין", {}]] },
  { id: "place", q: "איפה המדפסת תעמוד?", a: [
    ["חדר מגורים / חדר ילדים", { want: ["enclosed", "quiet"] }],
    ["חדר עבודה", { want: ["quiet"] }], ["מחסן / מרפסת / סדנה", {}]] },
  { id: "style", q: "מה מתאר אתכם יותר?", a: [
    ["רוצה שזה פשוט יעבוד", { want: ["easy", "easy"] }],
    ["נהנה לפרק, לשדרג ולכוונן", { want: ["tinker", "tinker"] }]] },
];

const SLICERS = [
  { brand: "Bambu Lab", name: "Bambu Studio", url: "https://bambulab.com/en/download/studio" },
  { brand: "Creality / Elegoo / כללי", name: "OrcaSlicer", url: "https://github.com/OrcaSlicer/OrcaSlicer/releases" },
  { brand: "Prusa", name: "PrusaSlicer", url: "https://www.prusa3d.com/p/prusaslicer/" },
  { brand: "Creality", name: "Creality Print", url: "https://www.creality.com/download" },
];
if (typeof module !== "undefined") module.exports = { SITE, PRINTERS, QUESTIONS, SLICERS };

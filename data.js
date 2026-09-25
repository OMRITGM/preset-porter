// כל התוכן שמתעדכן ידנית נמצא כאן. כל המדפסות שנמכרות בארץ — רק מוצרים שבמלאי / בהזמנה מוקדמת.
const SITE = {
  whatsapp: "", // למשל "9725XXXXXXXX" — ריק = הכפתור מוסתר
  pricesChecked: "19–21.9.2026",
};

const BOTX = "https://www.3dbotx.co.il/product-page/", BUG = "https://www.bug.co.il/brand/";

// colorBuiltIn = רב-צבעי כלול במדפסת עצמה (בלי קומבו/תוסף)
// colorAddon = מחיר תוסף רב-צבעי שנמכר בנפרד (כשאין קומבו) — נוסף למחיר כשרב-צבעי חובה
// g = דירוג מדורג 0–1 לכל תכונה — לפיו מחושבת ההתאמה (quiz-core.js). tags = מה שמוצג בכרטיס: תגית ⇔ דירוג ≥ 0.7 (נבדק ב-test/quiz.test.js).
//   enclosed: פתוחה 0 · חצי-סגורה 0.4 · סגורה 0.8 · תא שמתחמם מהמשטח ומאווררים (Prusa) 0.9 · תא מחומם אקטיבית 1 | color: תוסף בנפרד ~0.4 · AMS 0.7–0.85 · הרבה ראשים/דיזות 0.9–1
//   nowaste: AMS 0 · שתי דיזות 0.5 · מחליף דיזות 0.8 · מחליף ראשים 1 | big: 18 ס"מ 0 · 25 ס"מ 0.15 (קסדה לא נכנסת) · 32 ס"מ ומעלה 1
// tags: open/enclosed, color (רב-צבעי זמין), big (משטח ≥300), eng (חומרים הנדסיים), easy (עובד מהקופסה), tinker (פתוח לשינויים), quiet
const PRINTERS = [
  { id: "a1-mini", name: "Bambu Lab A1 mini", build: "180×180×180", tags: ["open", "color", "easy", "quiet"],
    g: { enclosed: 0, eng: 0.1, color: 0.7, nowaste: 0, big: 0, easy: 1, quiet: 0.8, tinker: 0.2 },
    why: "הכניסה הכי זולה והכי חלקה לתחום. משטח קטן — מספיק לרוב ההדפסות הביתיות.",
    watch: "משטח 18 ס\"מ מגביל. פתוחה — PLA/PETG בלבד בפועל.",
    zap: "https://www.zap.co.il/model.aspx?modelid=1243156", prices: [
      { store: "Bug", label: "הזמנה מוקדמת", ils: 890, url: BUG + "bambulab/a1/mini" },
      { store: "3DbotX", ils: 990, url: BOTX + "bambulab-a1-mini-3d-printer" },
      { store: "Bug", label: "קומבו AMS lite", ils: 1449, url: BUG + "bambulab/a1/mini/combo" },
      { store: "3DbotX", label: "קומבו AMS lite", ils: 1890, url: BOTX + "bambulab-a1-mini-combo-3d-printer" },
      { store: "ProMaker", ils: 1190, url: "https://promaker.co.il/product/%D7%9E%D7%93%D7%A4%D7%A1%D7%AA-%D7%AA%D7%9C%D7%AA-%D7%9E%D7%99%D7%9E%D7%93-bambu-lab-a1-mini-%D7%94%D7%9E%D7%93%D7%A4%D7%A1%D7%AA-%D7%94%D7%A7%D7%98%D7%A0%D7%94-%D7%94%D7%90%D7%95%D7%9C%D7%98%D7%99/" },
      { store: "ProMaker", label: "קומבו AMS lite", ils: 1990, url: "https://promaker.co.il/product/%D7%9E%D7%93%D7%A4%D7%A1%D7%AA-%D7%AA%D7%9C%D7%AA-%D7%9E%D7%99%D7%9E%D7%93-bambulab-a1-mini-combo-%D7%94%D7%97%D7%93%D7%A9%D7%94/" }] },
  { id: "a1", name: "Bambu Lab A1", build: "256×256×256", tags: ["open", "color", "easy"],
    g: { enclosed: 0, eng: 0.1, color: 0.7, nowaste: 0, big: 0.15, easy: 1, quiet: 0.6, tinker: 0.2 },
    why: "אותה חוויה של ה-mini עם משטח בגודל סטנדרטי. ברירת המחדל למתחיל.",
    watch: "פתוחה — לא ל-ABS/ASA. תופסת עומק על השולחן (המשטח נע קדימה-אחורה).",
    zap: null, prices: [
      { store: "Bug", ils: 1299, url: BUG + "bambulab/a1" },
      { store: "3DbotX", ils: 1550, url: BOTX + "bambulab-a1-3d-printer" },
      { store: "Bug", label: "קומבו AMS lite", ils: 1899, url: BUG + "bambulab/a1/combo" },
      { store: "3DbotX", label: "קומבו AMS lite", ils: 2290, url: BOTX + "bambulab-a1-combo-3d-printer" },
      { store: "ProMaker", ils: 1590, url: "https://promaker.co.il/product/%D7%9E%D7%93%D7%A4%D7%A1%D7%AA-%D7%AA%D7%9C%D7%AA-%D7%9E%D7%99%D7%9E%D7%93-bambulab-a1-%D7%94%D7%97%D7%93%D7%A9%D7%94/" },
      { store: "ProMaker", label: "קומבו AMS lite", ils: 2099, url: "https://promaker.co.il/product/%D7%9E%D7%93%D7%A4%D7%A1%D7%AA-%D7%AA%D7%9C%D7%AA-%D7%9E%D7%99%D7%9E%D7%93-bambulab-a1-combo-%D7%A2%D7%9D-%D7%99%D7%97%D7%99%D7%93%D7%AA-ams-%D7%94%D7%9E%D7%90%D7%A4%D7%A9%D7%A8%D7%AA-%D7%94%D7%93/" }] },
  { id: "a2l", name: "Bambu Lab A2L", build: "330×320×325", tags: ["open", "color", "big", "easy"],
    g: { enclosed: 0, eng: 0.2, color: 0.8, nowaste: 0, big: 1, easy: 0.9, quiet: 0.5, tinker: 0.2 },
    why: "משטח 33 ס\"מ במחיר של מדפסת בינונית, עם אותה חוויית שימוש של Bambu. תומכת גם ב-AMS 2 Pro.",
    watch: "פתוחה, והמשטח מגיע רק ל-80°C — לא ל-ABS/ASA. משטח נע גדול: צריכה שולחן יציב ועמוק. דגם חדש — עדיין מעט ניסיון מצטבר.",
    zap: null, prices: [
      { store: "Bug", label: "הזמנה מוקדמת", ils: 1699, url: BUG + "bambulab/a2l" },
      { store: "Bug", label: "קומבו AMS lite, הזמנה מוקדמת", ils: 2299, url: BUG + "bambulab/a2l/combo" },
      { store: "3DbotX", label: "קומבו AMS lite", ils: 2590, url: BOTX + "bambu-lab-a2l-combo-3d-printer" },
      { store: "ProMaker", label: "קומבו AMS lite", ils: 2390, url: "https://promaker.co.il/product/bambu-lab-a2l-combo-%D7%92%D7%93%D7%95%D7%9C%D7%94-%D7%99%D7%95%D7%AA%D7%A8-%D7%97%D7%9B%D7%9E%D7%94-%D7%99%D7%95%D7%AA%D7%A8-%D7%95%D7%A4%D7%A9%D7%95%D7%98%D7%94-%D7%99%D7%95%D7%AA%D7%A8-%D7%9C/" }] },
  { id: "centauri", name: "Elegoo Centauri Carbon", build: "256×256×256", tags: ["enclosed", "eng", "easy"], colorAddon: 499, colorNote: "CANVAS (לא כלול, כ-₪499)", // CANVAS נמכר בנפרד
    g: { enclosed: 0.8, eng: 0.7, color: 0.4, nowaste: 0, big: 0.15, easy: 0.8, quiet: 0.4, tinker: 0.4 },
    why: "סגורה ומהירה (CoreXY) במחיר של מדפסת פתוחה. הכי הרבה מדפסת לשקל.",
    watch: "רב-צבעי רק עם תוסף CANVAS שנקנה בנפרד (כ-₪499 בארץ). קהילה ותמיכה בארץ קטנות יותר משל Bambu. היצרן כבר לא מוכר אותה רשמית — בודקים שנשארה אחריות בארץ.",
    zap: null, prices: [
      { store: "ProMaker", ils: 1799, url: "https://promaker.co.il/product/elegoo-centauri-carbon-%D7%90%D7%9C%D7%92%D7%95-%D7%A1%D7%A0%D7%98%D7%95%D7%A8%D7%99-%D7%9E%D7%A6%D7%99%D7%91%D7%94-%D7%A1%D7%98%D7%A0%D7%93%D7%A8%D7%98-%D7%97%D7%93%D7%A9-%D7%91%D7%A9%D7%95%D7%A7/" },
      { store: "Beyond3D", label: "מחיר מבצע", ils: 1800, url: "https://beyond3d.co.il/product/elegoo-centauri-carbon-2/" }] },
  { id: "cc2", name: "Elegoo Centauri Carbon 2", build: "256×256×256", tags: ["enclosed", "color", "eng", "easy"],
    g: { enclosed: 0.8, eng: 0.75, color: 0.8, nowaste: 0, big: 0.15, easy: 0.75, quiet: 0.5, tinker: 0.4 },
    why: "הדור השני: דיזה מוקשחת עד 350°C, סינון אוויר, ובקומבו מגיעה עם CANVAS — רב-צבעי של 4 גלילים. סגורה ורב-צבעית במחיר של מדפסת פתוחה.",
    watch: "בארץ נמכרת כרגע רק כקומבו. דגם חדש — פחות ניסיון מצטבר, וקהילה בארץ קטנה יותר משל Bambu.",
    zap: null, prices: [
      { store: "Beyond3D", label: "קומבו CANVAS, מבצע", ils: 2450, url: "https://beyond3d.co.il/product/elegoo-centauri-carbon-2-2/" },
      { store: "ProMaker", label: "קומבו CANVAS", ils: 2490, url: "https://promaker.co.il/product/%D7%9E%D7%93%D7%A4%D7%A1%D7%AA-%D7%AA%D7%9C%D7%AA-%D7%9E%D7%99%D7%9E%D7%93-%D7%90%D7%9C%D7%92%D7%95-%D7%A1%D7%98%D7%A0%D7%98%D7%95%D7%A8%D7%99-elegoo-centauri-carbon-2-combo-%D7%A2%D7%9D-%D7%9E%D7%A2/" },
      { store: "Panda3D", label: "קומבו CANVAS", ils: 2899, url: "https://panda3d.co.il/products/elegoo-centauri-carbon-2" }] },
  { id: "p2s", name: "Bambu Lab P2S", build: "256×256×256", tags: ["enclosed", "color", "eng", "easy", "quiet"],
    g: { enclosed: 0.8, eng: 0.75, color: 0.85, nowaste: 0, big: 0.15, easy: 1, quiet: 0.7, tinker: 0.2 },
    why: "סגורה, שקטה יחסית, רב-צבעי עם AMS. מתאימה גם לחלקים פונקציונליים ב-ABS/ASA.",
    watch: "הקומבו עם AMS 2 Pro מוסיף כמה מאות שקלים — כדאי אם יש סיכוי שתרצו רב-צבעי.",
    zap: "https://www.zap.co.il/model.aspx?modelid=1263756", prices: [
      { store: "3DbotX", ils: 3490, url: BOTX + "bambu-lab-p2s" },
      { store: "Copytech", label: "קומבו AMS 2 Pro", ils: 3980, url: "https://www.copytech.co.il/items/8717414" },
      { store: "Bug", label: "קומבו AMS 2 Pro, הזמנה מוקדמת", ils: 3990, url: BUG + "bambulab/p2s/ams2/pro/combo" },
      { store: "3DbotX", label: "קומבו AMS 2 Pro", ils: 4290, url: BOTX + "bambu-lab-p2s-ams-2-pro-combo" },
      { store: "Yazamco", label: "קומבו AMS 2 Pro", ils: 4557, url: "https://3dny.co.il/product/%d7%9e%d7%93%d7%a4%d7%a1%d7%aa-%d7%aa%d7%9c%d7%aa-%d7%9e%d7%99%d7%9e%d7%93-bambu-lab-p2s/" },
      { store: "ProMaker", ils: 3390, url: "https://promaker.co.il/product/bambu-lab-p2s-%D7%94%D7%93%D7%95%D7%A8-%D7%94%D7%97%D7%93%D7%A9-%D7%A9%D7%9C-%D7%A1%D7%93%D7%A8%D7%AA-p-%D7%9E%D7%91%D7%A0%D7%94-%D7%A1%D7%92%D7%95%D7%A8-%D7%90%D7%A7%D7%A1%D7%98%D7%A8%D7%95%D7%93/" },
      { store: "ProMaker", label: "קומבו AMS 2 Pro", ils: 3990, url: "https://promaker.co.il/product/%D7%9E%D7%93%D7%A4%D7%A1%D7%AA-%D7%AA%D7%9C%D7%AA-%D7%9E%D7%99%D7%9E%D7%93-bambu-lab-p2s-ams-2-pro-combo-%D7%91%D7%A2%D7%9C%D7%AA-%D7%90%D7%A7%D7%A1%D7%98%D7%A8%D7%95%D7%93%D7%A8-servo-%D7%95%D7%9E/" },
      { store: "Spider3D", label: "קומבו AMS 2 Pro, הזמנה מוקדמת", ils: 5190, url: "https://www.spider3d.co.il/bambu-lab-p2s/" }] },
  { id: "x2d", name: "Bambu Lab X2D", build: "256×256×260", tags: ["enclosed", "color", "eng", "easy", "quiet"],
    g: { enclosed: 1, eng: 1, color: 0.9, nowaste: 0.5, big: 0.15, easy: 0.85, quiet: 0.7, tinker: 0.2 },
    why: "סגורה עם תא מחומם אקטיבית (65°C) ושתי דיזות — חומר תמיכה נפרד או שני צבעים בלי בזבוז של החלפות. בנויה לחומרים הנדסיים.",
    watch: "לפי Bambu עצמה הדיזה השנייה איטית יותר ובאיכות מעט נמוכה. בקומבו ה-AMS מזין רק דיזה אחת. בארץ נמכרת כרגע רק כקומבו. דגם חדש.",
    zap: null, prices: [
      { store: "Bug", label: "קומבו AMS 2 Pro", ils: 4890, url: BUG + "bambulab/x2d/combo" },
      { store: "Copytech", label: "קומבו AMS 2 Pro", ils: 5080, url: "https://www.copytech.co.il/items/9107683" },
      { store: "3DbotX", label: "קומבו AMS 2 Pro", ils: 5090, url: BOTX + "bambu-lab-x2d-combo-3d-printer" },
      { store: "Yazamco", label: "קומבו", ils: 5310, url: "https://3dny.co.il/product/%d7%9e%d7%93%d7%a4%d7%a1%d7%aa-%d7%aa%d7%9c%d7%aa-%d7%9e%d7%99%d7%9e%d7%93-bambu-lab-x2d-combo/" },
      { store: "ProMaker", label: "קומבו AMS 2 Pro", ils: 4990, url: "https://promaker.co.il/product/bambu-lab-x2d-%D7%A9%D7%AA%D7%99-%D7%93%D7%99%D7%96%D7%95%D7%AA-%D7%AA%D7%9E%D7%99%D7%9B%D7%95%D7%AA-%D7%A0%D7%A7%D7%99%D7%95%D7%AA-%D7%99%D7%95%D7%AA%D7%A8-%D7%95%D7%94%D7%A8%D7%91%D7%94-%D7%A4/" },
      { store: "Spider3D", label: "קומבו AMS 2 Pro", ils: 5200, url: "https://www.spider3d.co.il/bambu-lab-x2d-%D7%94%D7%93%D7%A4%D7%A1%D7%94-%D7%9B%D7%A4%D7%95%D7%9C%D7%94-%D7%97%D7%9B%D7%9E%D7%94-%D7%95%D7%90%D7%99%D7%9B%D7%95%D7%AA-%D7%A4%D7%A8%D7%99%D7%9E%D7%99%D7%95%D7%9D-%D7%9E/" }] },
  { id: "u1", colorBuiltIn: true, name: "Snapmaker U1", build: "270×270×270", tags: ["color", "nowaste", "easy"],
    g: { enclosed: 0.4, eng: 0.3, color: 0.9, nowaste: 1, big: 0.25, easy: 0.7, quiet: 0.4, tinker: 0.6 },
    why: "מחליף ראשים: 4 דיזות נפרדות, אחת לכל חומר. רב-צבעי כמעט בלי בזבוז ובלי \"מגדל ניקוי\" ענק — ומהיר בהרבה מ-AMS בהדפסות עם הרבה החלפות צבע. כיול אוטומטי, מבוסס Klipper, נתמכת ישירות ב-OrcaSlicer.",
    watch: "מגיעה עם דפנות צד ודלת, אבל המכסה העליון נמכר בנפרד — לא מדפסת סגורה במלואה ולא לחומרים הנדסיים. 4 ראשים = יותר חלקים לתחזק. יצרן חדש יחסית בארץ.",
    zap: null, prices: [
      { store: "KSP", ils: 4390, url: "https://ksp.co.il/web/item/491473" },
      { store: "Yazamco", ils: 4390, url: "https://3dny.co.il/?p=28934" },
      { store: "ProMaker", label: "כולל 4 גלילים מתנה", ils: 4590, url: "https://promaker.co.il/product/snapmaker-u1-%D7%9E%D7%93%D7%A4%D7%A1%D7%AA-%D7%AA%D7%9C%D7%AA-%D7%94%D7%9E%D7%99%D7%9E%D7%93-%D7%94%D7%97%D7%93%D7%A9%D7%94-%D7%A9%D7%A2%D7%95%D7%A9%D7%94-%D7%9E%D7%94%D7%A4%D7%9B%D7%94-%D7%91%D7%94/" }] },
  { id: "core-one", colorAddon: null, colorNote: "MMU3 (לא כלול)", name: "Prusa CORE One+", build: "250×220×270", tags: ["enclosed", "eng", "easy", "tinker", "quiet"],
    g: { enclosed: 0.9, eng: 0.75, color: 0.4, nowaste: 0, big: 0.05, easy: 0.8, quiet: 0.9, tinker: 1 },
    why: "קוד פתוח, שירות מוערך, עובדת מלאה בלי ענן. חלקי הפלסטיק שלה מודפסים — אפשר להדפיס חלפים ושדרוגים לבד. למי שרוצה לשלוט במכונה.",
    watch: "יקרה ביחס למפרט. רב-צבעי (MMU3) נמכר בנפרד ודורש סבלנות.",
    zap: null, prices: [
      { store: "Copytech", label: "מורכבת", ils: 6440, url: "https://www.copytech.co.il/items/8350644" },] },
  { id: "k2-plus", name: "Creality K2 Plus", build: "350×350×350", tags: ["enclosed", "color", "big", "eng", "tinker"],
    g: { enclosed: 1, eng: 0.9, color: 0.85, nowaste: 0, big: 1, easy: 0.5, quiet: 0.4, tinker: 0.9 },
    why: "משטח ענק סגור עם רב-צבעי. Klipper מתחת למכסה.",
    watch: "גדולה וכבדה. בקרת איכות פחות עקבית — לקנות ממשווק עם אחריות בארץ.",
    zap: null, prices: [
      { store: "KSP", ils: 5990, url: "https://ksp.co.il/web/item/468670" },
      { store: "KSP", label: "קומבו CFS", ils: 6979, url: "https://ksp.co.il/web/item/409012" },
      { store: "Spider3D", label: "קומבו CFS", ils: 6990, url: "https://www.spider3d.co.il/creality-k2-plus-cfs-combo/" }] },
  { id: "h2s", name: "Bambu Lab H2S", build: "340×320×340", tags: ["enclosed", "color", "big", "eng", "easy", "quiet"],
    g: { enclosed: 1, eng: 0.95, color: 0.85, nowaste: 0, big: 1, easy: 1, quiet: 0.8, tinker: 0.2 },
    why: "משטח גדול, סגורה, אמינות של Bambu. למי שיודע שיצטרך גודל.",
    watch: "מחיר. בארץ נמכרת רק כקומבו. למתחיל שלא בטוח — A1 או P2S קודם. בגרסת הלייזר: עשן ולכלוך בכל המדפסת — ניקוי תכוף ואוורור חובה.",
    zap: "https://www.zap.co.il/model.aspx?modelid=1263757", prices: [
      { store: "Copytech", label: "קומבו AMS 2 Pro", ils: 6950, url: "https://www.copytech.co.il/items/8484289" },
      { store: "3DbotX", label: "קומבו AMS 2 Pro", ils: 6990, url: BOTX + "bambu-lab-h2s-ams-2-pro-combo" },
      { store: "Bug", label: "קומבו AMS 2 Pro", ils: 6990, url: BUG + "bambulab/h2s/ams/combo" },
      { store: "Yazamco", label: "קומבו AMS 2 Pro + לייזר 10W", ils: 11449, url: "https://3dny.co.il/product/%d7%9e%d7%93%d7%a4%d7%a1%d7%aa-%d7%aa%d7%9c%d7%aa-%d7%9e%d7%99%d7%9e%d7%93-bambu-lab-h2s-laser-10w-full-combo/" },
      { store: "ProMaker", label: "קומבו AMS 2", ils: 6990, url: "https://promaker.co.il/product/bambu-lab-h2s-%D7%A2%D7%95%D7%A6%D7%9E%D7%AA-%D7%A1%D7%A8%D7%95%D7%95-%D7%93%D7%99%D7%95%D7%A7-%D7%9E%D7%95%D7%A9%D7%9C%D7%9D-%D7%95%D7%A0%D7%A4%D7%97-%D7%94%D7%93%D7%A4%D7%A1%D7%94-%D7%94%D7%92/" },
      { store: "Spider3D", label: "קומבו AMS 2 Pro, הזמנה מוקדמת", ils: 7490, url: "https://www.spider3d.co.il/bambu-lab-h2s-%D7%9E%D7%93%D7%A4%D7%A1%D7%AA-%D7%AA%D7%9C%D7%AA%D7%9E%D7%9E%D7%93-%D7%9E%D7%A7%D7%A6%D7%95%D7%A2%D7%99%D7%AA-%D7%9E%D7%94%D7%99%D7%A8%D7%94-%D7%95%D7%9E%D7%93%D7%95/" }] },
  { id: "h2d", name: "Bambu Lab H2D", build: "325×320×325", tags: ["enclosed", "color", "big", "eng", "easy", "quiet"],
    g: { enclosed: 1, eng: 1, color: 0.9, nowaste: 0.5, big: 1, easy: 0.9, quiet: 0.8, tinker: 0.2 },
    why: "שתי דיזות, תא מחומם ו-350°C: שני חומרים או צבעים בלי בזבוז בהחלפה ביניהם, וחומרים הנדסיים. הדגל של Bambu לבית ולסדנה.",
    watch: "מעל 2 צבעים — עדיין החלפות עם AMS ופסולת. מחיר. בגרסת הלייזר: עשן ולכלוך בכל המדפסת — ניקוי תכוף ואוורור חובה.",
    zap: null, prices: [
      { store: "Copytech", label: "קומבו", ils: 9790, url: "https://www.copytech.co.il/items/8112656" },
      { store: "Bug", label: "קומבו", ils: 10390, url: "https://www.bug.co.il/brand/bambulab/h2d/ams/2/pro/combo" },
      { store: "ProMaker", label: "קומבו", ils: 10390, url: "https://promaker.co.il/product/bambu-lab-h2d-combo-%D7%94%D7%A9%D7%99%D7%9C%D7%95%D7%91-%D7%94%D7%9E%D7%95%D7%A9%D7%9C%D7%9D-%D7%9E%D7%93%D7%A4%D7%A1%D7%AA-h2d-%D7%97%D7%96%D7%A7%D7%94-%D7%9E%D7%A2%D7%A8%D7%9B%D7%AA-ams-%D7%90/" },
      { store: "Beyond3D", label: "לא צוין אם כולל AMS", ils: 10600, url: "https://beyond3d.co.il/product/h2d-bambulab/" },
      { store: "Spider3D", label: "קומבו, הזמנה מוקדמת", ils: 11290, url: "https://www.spider3d.co.il/bambu-lab-h2d-%D7%9E%D7%A8%D7%9B%D7%96-%D7%99%D7%99%D7%A6%D7%95%D7%A8-%D7%90%D7%99%D7%A9%D7%99-%D7%9E%D7%A9%D7%95%D7%9C%D7%91-%D7%94%D7%93%D7%A4%D7%A1%D7%AA-%D7%AA%D7%9C%D7%AA-%D7%9E%D7%99%D7%9E/" },
      { store: "Yazamco", label: "קומבו", ils: 11499, url: "https://3dny.co.il/product/%d7%9e%d7%93%d7%a4%d7%a1%d7%aa-%d7%aa%d7%9c%d7%aa-%d7%9e%d7%99%d7%9e%d7%93-bambu-lab-h2d-combo/" }] },
  { id: "h2c", name: "Bambu Lab H2C", build: "330×320×325", tags: ["enclosed", "color", "nowaste", "big", "eng", "easy", "quiet"],
    g: { enclosed: 1, eng: 1, color: 1, nowaste: 0.8, big: 1, easy: 0.8, quiet: 0.8, tinker: 0.2 },
    why: "H2D עם מחליף דיזות Vortek: כמה ראשים חמים שמתחלפים אוטומטית — רב-צבעי עם הרבה פחות פסולת וזמן החלפה.",
    watch: "מהיקרות בשאלון. דגם חדש — מעט ניסיון מצטבר. למתחיל זה הרבה כסף; H2S או P2S מספיקות לרוב האנשים.",
    zap: null, prices: [
      { store: "Copytech", label: "קומבו", ils: 10890, url: "https://www.copytech.co.il/items/8717428" },
      { store: "3DbotX", label: "קומבו", ils: 11790, url: "https://www.3dbotx.co.il/product-page/bambu-lab-h2c-ams-2-pro-combo" },
      { store: "Bug", label: "קומבו", ils: 11790, url: "https://www.bug.co.il/brand/bambulab/h2c/ams2/pro/combo" },
      { store: "ProMaker", label: "קומבו", ils: 11790, url: "https://promaker.co.il/product/bambu-lab-h2c-%D7%9E%D7%A7%D7%A6%D7%95%D7%A2%D7%99%D7%AA-%D7%9E%D7%93%D7%95%D7%99%D7%99%D7%A7%D7%AA-%D7%AA%D7%90-%D7%9E%D7%97%D7%95%D7%9E%D7%9D-%D7%A2%D7%93-6-%D7%A8%D7%90%D7%A9%D7%99-%D7%94%D7%93/" },
      { store: "Yazamco", label: "קומבו", ils: 12490, url: "https://3dny.co.il/product/%d7%9e%d7%93%d7%a4%d7%a1%d7%aa-%d7%aa%d7%9c%d7%aa-%d7%9e%d7%99%d7%9e%d7%93-bambu-lab-h2c-combo/" }] },
  { id: "p1s", name: "Bambu Lab P1S", build: "256×256×256", tags: ["enclosed", "eng", "color", "easy"],
    g: { enclosed: 0.8, eng: 0.7, color: 0.8, nowaste: 0, big: 0.15, easy: 1, quiet: 0.6, tinker: 0.2 },
    note: "CoreXY, דור קודם", colorNote: "AMS",
    why: "הדור הקודם של P2S: סגורה, AMS, אמינה ומוכחת — הרבה מדפסת למחיר.",
    watch: "דור קודם: בלי השיפורים של P2S (מצלמה, מסך, קירור). שווה רק במחיר נמוך משמעותית.",
    zap: null, prices: [
      { store: "Bug", label: "קומבו", ils: 2990, url: "https://www.bug.co.il/brand/bambulab/p1s/combo" }] },
  { id: "x1e", name: "Bambu Lab X1E", build: "256×256×256", tags: ["enclosed", "eng", "color", "easy"],
    g: { enclosed: 1, eng: 1, color: 0.8, nowaste: 0, big: 0.15, easy: 0.9, quiet: 0.6, tinker: 0.2 },
    note: "גרסת Enterprise, תא מחומם, Ethernet", colorNote: "AMS",
    why: "גרסת Enterprise של X1: תא מחומם אקטיבית, Ethernet וסינון אוויר. בנויה לסדנאות ולחומרים הנדסיים.",
    watch: "יקרה מאוד לבית. H2S חדשה יותר, עם משטח גדול יותר, בפחות כסף.",
    zap: null, prices: [
      { store: "Copytech", label: "קומבו", ils: 8490, url: "https://www.copytech.co.il/items/6869356" }] },
  { id: "k1", colorNote: "ערכת CFS (לא כלולה)", colorAddon: null, name: "Creality K1", build: "220×220×250", tags: ["enclosed", "eng", "tinker"],
    g: { enclosed: 0.8, eng: 0.7, color: 0.4, nowaste: 0, big: 0.05, easy: 0.5, quiet: 0.3, tinker: 0.9 },
    note: "CoreXY, מבוסס Klipper",
    why: "CoreXY סגורה ומהירה מבוססת Klipper — מגרש משחקים למי שאוהב לכוונן.",
    watch: "דור קודם. רב-צבעי רק עם ערכת שדרוג CFS שנמכרת בנפרד. דורשת יותר כיוונים ותחזוקה מ-Bambu. משטח 22 ס\"מ.",
    zap: null, prices: [
      { store: "Ronby (דרך Zap)", ils: 3290, url: "https://www.zap.co.il/model.aspx?modelid=1221104" },
      { store: "KSP", ils: 3642, url: "https://ksp.co.il/web/item/286221" }] },
  { id: "k1-max", colorNote: "ערכת CFS (לא כלולה)", colorAddon: null, name: "Creality K1 Max", build: "300×300×300", tags: ["enclosed", "eng", "big", "tinker"],
    g: { enclosed: 0.8, eng: 0.7, color: 0.4, nowaste: 0, big: 0.7, easy: 0.5, quiet: 0.3, tinker: 0.9 },
    note: "CoreXY גדולה",
    why: "גרסה גדולה של K1: משטח 30 ס\"מ, סגורה ומהירה, Klipper.",
    watch: "דור קודם. רב-צבעי רק עם ערכת שדרוג CFS שנמכרת בנפרד. רועשת יחסית ודורשת כיוונים.",
    zap: null, prices: [
      { store: "Gamestorm (דרך Zap)", ils: 3979, url: "https://www.zap.co.il/model.aspx?modelid=1235936" },
      { store: "Spider3D", label: "הזמנה מוקדמת", ils: 4590, url: "https://www.spider3d.co.il/?p=57284" }] },
  { id: "k2", name: "Creality K2", build: "260×260×260", tags: ["enclosed", "eng", "color", "tinker"],
    g: { enclosed: 0.8, eng: 0.75, color: 0.8, nowaste: 0, big: 0.2, easy: 0.6, quiet: 0.4, tinker: 0.8 },
    note: "CoreXY", colorNote: "CFS",
    why: "CoreXY סגורה עם CFS לרב-צבעי, מהדור החדש של Creality.",
    watch: "משטח 26 ס\"מ. פחות \"פשוט עובד\" מ-Bambu, וקהילה בארץ קטנה יותר.",
    zap: null, prices: [
      { store: "Bar-Gal", label: "קומבו", ils: 3790, url: "https://bar-gal.co.il/?p=14029" },
      { store: "SaleCity (דרך Zap)", label: "קומבו", ils: 3879, url: "https://www.zap.co.il/model.aspx?modelid=1265193" },
      { store: "KSP", label: "קומבו", ils: 4490, url: "https://ksp.co.il/web/item/468105" }] },
  { id: "k2-pro", name: "Creality K2 Pro", build: "300×300×300", tags: ["enclosed", "eng", "color", "big", "tinker"],
    g: { enclosed: 1, eng: 0.9, color: 0.8, nowaste: 0, big: 0.7, easy: 0.6, quiet: 0.4, tinker: 0.8 },
    note: "CoreXY", colorNote: "CFS",
    why: "K2 עם משטח 30 ס\"מ: סגורה, רב-צבעי עם CFS, לחומרים הנדסיים.",
    watch: "דורשת יותר כיוונים מ-Bambu. קהילה בארץ קטנה יותר.",
    zap: null, prices: [
      { store: "Bar-Gal", label: "קומבו", ils: 4990, url: "https://bar-gal.co.il/?p=14055" },
      { store: "KSP", label: "קומבו", ils: 5490, url: "https://ksp.co.il/web/item/468618" }] },
  { id: "sparkx-i7", name: "Creality SPARKX i7", build: "260×260×255", tags: ["open", "color", "easy"],
    g: { enclosed: 0, eng: 0.1, color: 0.75, nowaste: 0, big: 0.2, easy: 0.8, quiet: 0.5, tinker: 0.3 },
    note: "משטח נע, 500 מ\"מ/ש", colorNote: "CFS Lite",
    why: "פתוחה ופשוטה עם CFS Lite לרב-צבעי, במחיר נמוך.",
    watch: "משטח נע ופתוחה — PLA/PETG בלבד. דגם חדש, מעט ניסיון מצטבר.",
    zap: null, prices: [
      { store: "Bar-Gal", label: "קומבו", ils: 2090, url: "https://bar-gal.co.il/?p=13955" }] },
  { id: "ender3-v3-ke", name: "Creality Ender-3 V3 KE", build: "220×220×240", tags: ["open", "tinker"],
    g: { enclosed: 0, eng: 0.2, color: 0, nowaste: 0, big: 0.05, easy: 0.5, quiet: 0.3, tinker: 0.9 },
    note: "משטח נע, מבוסס Klipper",
    why: "זולה, מבוססת Klipper, פתוחה לשדרוגים — טובה ללמוד איך מדפסת עובדת.",
    watch: "דורשת כיוונים ותחזוקה. בלי רב-צבעי. משטח 22 ס\"מ.",
    zap: null, prices: [
      { store: "Bug", ils: 1199, url: "https://www.bug.co.il/brand/creality/3d/printer/ender/3/v3/ke" }] },
  { id: "ender3-v3-se", name: "Creality Ender-3 V3 SE", build: "220×220×250", tags: ["open", "tinker"],
    g: { enclosed: 0, eng: 0.1, color: 0, nowaste: 0, big: 0.05, easy: 0.5, quiet: 0.3, tinker: 0.8 },
    note: "משטח נע בסיסי",
    why: "בסיסית: משטח נע פשוט, קושחה פתוחה (Marlin).",
    watch: "דורשת כיוונים וסבלנות. איטית יחסית, בלי רב-צבעי.",
    zap: null, prices: [
      { store: "Spider3D", label: "הזמנה מוקדמת", ils: 1490, url: "https://www.spider3d.co.il/?p=61667" }] },
  { id: "cr10-se", name: "Creality CR-10 SE", build: "220×220×265", tags: ["open", "tinker"],
    g: { enclosed: 0, eng: 0.2, color: 0, nowaste: 0, big: 0.05, easy: 0.5, quiet: 0.3, tinker: 0.8 },
    note: "משטח נע",
    why: "משטח נע עם Klipper ומהירות גבוהה.",
    watch: "דגם ותיק, מחיר גבוה ביחס למה שיש היום בשוק. בלי רב-צבעי.",
    zap: null, prices: [
      { store: "Hashmal Neto (דרך Zap)", ils: 2820, url: "https://www.zap.co.il/model.aspx?modelid=1213262" }] },
  { id: "ad5x", colorBuiltIn: true, name: "Flashforge Adventurer 5X (AD5X)", build: "220×220×220", tags: ["open", "color", "easy"],
    g: { enclosed: 0, eng: 0.1, color: 0.8, nowaste: 0, big: 0.05, easy: 0.8, quiet: 0.5, tinker: 0.3 },
    note: "CoreXY", colorNote: "IFS — 4 צבעים מובנה",
    why: "רב-צבעי של 4 גלילים מובנה בלי תוסף — המדפסת והרב-צבעי באותו מחיר.",
    watch: "פתוחה, משטח 22 ס\"מ. קהילה ותמיכה בארץ קטנות.",
    zap: null, prices: [
      { store: "KSP", ils: 2090, url: "https://ksp.co.il/web/item/415738" },
      { store: "Yazamco", ils: 2290, url: "https://3dny.co.il/product/flashforge-adventurer-5x/" }] },
  { id: "ad5m-pro", name: "Flashforge Adventurer 5M Pro", build: "220×220×220", tags: ["enclosed", "easy"],
    g: { enclosed: 0.8, eng: 0.6, color: 0, nowaste: 0, big: 0.05, easy: 0.8, quiet: 0.6, tinker: 0.3 },
    note: "CoreXY, תא סגור עם סינון",
    why: "סגורה עם סינון אוויר, פשוטה להפעלה.",
    watch: "משטח 22 ס\"מ, בלי רב-צבעי. קהילה ותמיכה בארץ קטנות.",
    zap: null, prices: [
      { store: "KSP", ils: 2490, url: "https://ksp.co.il/web/item/415609" },
      { store: "Copytech", ils: 2969, url: "https://www.copytech.co.il/items/6486526" },
      { store: "Yazamco", ils: 2990, url: "https://3dny.co.il/?p=12299" }] },
  { id: "kobra-s1", name: "Anycubic Kobra S1", build: "250×250×250", tags: ["enclosed", "eng", "easy"], colorAddon: null,
    g: { enclosed: 0.8, eng: 0.7, color: 0.4, nowaste: 0, big: 0.15, easy: 0.7, quiet: 0.5, tinker: 0.4 },
    note: "CoreXY", colorNote: "ACE Pro (לא כלול)",
    why: "סגורה ומהירה (CoreXY), עם אפשרות לרב-צבעי.",
    watch: "רב-צבעי (ACE Pro) נמכר בנפרד ולא מצאתי לו מחיר בארץ. קהילה בארץ קטנה.",
    zap: null, prices: [
      { store: "Bar-Gal", ils: 2250, url: "https://bar-gal.co.il/?p=12399" }] },
  { id: "kobra3-v2", name: "Anycubic Kobra 3 V2", build: "255×255×260", tags: ["open"], colorAddon: null,
    g: { enclosed: 0, eng: 0.1, color: 0.4, nowaste: 0, big: 0.15, easy: 0.6, quiet: 0.4, tinker: 0.5 },
    note: "משטח נע", colorNote: "ACE Pro (לא כלול)",
    why: "משטח נע זול עם אפשרות לרב-צבעי.",
    watch: "רב-צבעי (ACE Pro) נמכר בנפרד ולא מצאתי לו מחיר בארץ. פתוחה.",
    zap: null, prices: [
      { store: "Bar-Gal", ils: 1770, url: "https://bar-gal.co.il/?p=12417" }] },
  { id: "kobra3-max", name: "Anycubic Kobra 3 Max", build: "420×420×500", tags: ["open", "big"], colorAddon: null,
    g: { enclosed: 0, eng: 0.1, color: 0.4, nowaste: 0, big: 1, easy: 0.5, quiet: 0.3, tinker: 0.5 },
    note: "משטח נע ענק", colorNote: "ACE Pro (לא כלול)",
    why: "משטח ענק (42 ס\"מ) במחיר נמוך מאוד — לקסדות ולחפצים גדולים.",
    watch: "משטח נע ענק: צריך מקום, והדפסות גדולות איטיות. רב-צבעי נמכר בנפרד.",
    zap: null, prices: [
      { store: "Bar-Gal", ils: 2599, url: "https://bar-gal.co.il/?p=12736" }] },
  { id: "kobra2-pro", name: "Anycubic Kobra 2 Pro", build: "220×220×250", tags: ["open"],
    g: { enclosed: 0, eng: 0.1, color: 0, nowaste: 0, big: 0.05, easy: 0.5, quiet: 0.3, tinker: 0.6 },
    note: "דגם ישן יותר",
    why: "משטח נע בסיסי וזול.",
    watch: "דגם ישן יותר. בלי רב-צבעי.",
    zap: null, prices: [
      { store: "Bar-Gal", ils: 1299, url: "https://bar-gal.co.il/?p=13007" }] },
  { id: "sk1", name: "Two Trees SK1", build: "256×256×256", tags: ["open", "tinker"],
    g: { enclosed: 0, eng: 0.3, color: 0, nowaste: 0, big: 0.15, easy: 0.4, quiet: 0.3, tinker: 0.9 },
    note: "CoreXY, Klipper",
    why: "CoreXY מהירה מבוססת Klipper — למי שאוהב לכוונן.",
    watch: "פתוחה (תא סגירה נמכר בנפרד). מותג קטן, קהילה ותמיכה מעטות בארץ. בלי רב-צבעי.",
    zap: null, prices: [
      { store: "Bar-Gal", ils: 1900, url: "https://bar-gal.co.il/?p=11822" }] },
  { id: "neptune4-pro", name: "Elegoo Neptune 4 Pro", build: "225×225×265", tags: ["open", "tinker"],
    g: { enclosed: 0, eng: 0.2, color: 0, nowaste: 0, big: 0.05, easy: 0.5, quiet: 0.3, tinker: 0.8 },
    note: "משטח נע, Klipper",
    why: "משטח נע מהיר עם Klipper, מחיר נמוך.",
    watch: "דורשת כיוונים. בלי רב-צבעי. משטח 22 ס\"מ.",
    zap: null, prices: [
      { store: "Piitel", ils: 1400, url: "https://piitel.co.il/?p=92769" }] },
  { id: "neptune4-plus", name: "Elegoo Neptune 4 Plus", build: "320×320×385", tags: ["open", "big", "tinker"],
    g: { enclosed: 0, eng: 0.2, color: 0, nowaste: 0, big: 1, easy: 0.5, quiet: 0.3, tinker: 0.8 },
    note: "משטח נע גדול, Klipper",
    why: "משטח 32 ס\"מ במחיר נמוך מאוד — הדרך הזולה להדפסות גדולות.",
    watch: "משטח נע גדול: צריך שולחן יציב ועמוק. דורשת כיוונים.",
    zap: null, prices: [
      { store: "Piitel", ils: 1680, url: "https://piitel.co.il/shop/neptune-4-plus-3d-printer/" }] },
  { id: "qidi-q2", name: "QIDI Q2", build: "270×270×256", tags: ["enclosed", "eng", "color", "easy", "tinker"],
    g: { enclosed: 1, eng: 0.95, color: 0.8, nowaste: 0, big: 0.25, easy: 0.7, quiet: 0.5, tinker: 0.7 },
    note: "CoreXY, תא מחומם 65°C", colorNote: "QIDI Box",
    why: "סגורה עם תא מחומם אקטיבית, ובקומבו רב-צבעי — לחומרים הנדסיים במחיר בינוני.",
    watch: "קהילה בארץ קטנה יותר. משטח 27 ס\"מ.",
    zap: null, prices: [
      { store: "Panda3D", label: "קומבו", ils: 4499, url: "https://panda3d.co.il/products/qidi-q2-combo" }] },
  { id: "qidi-xmax3", name: "QIDI X-Max 3", build: "325×325×315", tags: ["enclosed", "eng", "big", "tinker"],
    g: { enclosed: 1, eng: 0.95, color: 0, nowaste: 0, big: 1, easy: 0.6, quiet: 0.4, tinker: 0.7 },
    note: "דור קודם, תא מחומם",
    why: "משטח גדול ותא מחומם — חלקים הנדסיים גדולים.",
    watch: "דור קודם, יקרה ביחס לחדשות, בלי רב-צבעי.",
    zap: null, prices: [
      { store: "Spider3D", ils: 9600, url: "https://www.spider3d.co.il/?p=61233" }] },
  { id: "mk4s", name: "Prusa MK4S", build: "250×210×220", tags: ["open", "easy", "quiet", "tinker"], colorAddon: null,
    g: { enclosed: 0, eng: 0.3, color: 0.4, nowaste: 0, big: 0.05, easy: 0.8, quiet: 0.8, tinker: 1 },
    note: "משטח נע, מורכבת", colorNote: "MMU3 (לא כלול)",
    why: "אמינות Prusa, קוד פתוח, שירות מוערך. חלקי הפלסטיק שלה מודפסים — קל לתקן ולשדרג.",
    watch: "פתוחה. רב-צבעי (MMU3) נמכר בנפרד. יקרה ביחס למפרט.",
    zap: null, prices: [
      { store: "Caliber", label: "מורכבת", ils: 5370, url: "https://shop.caliber.co.il/items/6977897-Prusa-MK4S" }] },
  { id: "mini-plus", name: "Prusa MINI+", build: "180×180×180", tags: ["open", "tinker"],
    g: { enclosed: 0, eng: 0.1, color: 0, nowaste: 0, big: 0, easy: 0.6, quiet: 0.6, tinker: 1 },
    note: "קומפקטית",
    why: "קטנה, אמינה וקוד פתוח.",
    watch: "משטח 18 ס\"מ, דגם ותיק, ויקרה לגודלה.",
    zap: null, prices: [
      { store: "Caliber", ils: 2985, url: "https://shop.caliber.co.il/items/6979463" }] },
  { id: "core-one-l", colorNote: "MMU3 / INDX (לא כלול)", name: "Prusa CORE One L", build: "300×300×330", tags: ["enclosed", "eng", "big", "easy", "quiet", "tinker"], colorAddon: null,
    g: { enclosed: 0.9, eng: 0.8, color: 0.4, nowaste: 0, big: 0.7, easy: 0.8, quiet: 0.9, tinker: 1 },
    note: "CoreXY, מורכבת",
    why: "CORE One עם משטח 30 ס\"מ: סגורה, שקטה, קוד פתוח.",
    watch: "יקרה. רב-צבעי נמכר בנפרד.",
    zap: null, prices: [
      { store: "Caliber", label: "מורכבת", ils: 8460, url: "https://shop.caliber.co.il/items/8587870" },
      { store: "Yazamco", label: "מורכבת", ils: 8649, url: "https://3dny.co.il/?p=25605" }] },
  { id: "xl", name: "Prusa XL", build: "360×360×360", tags: ["open", "color", "nowaste", "big", "easy", "quiet", "tinker"],
    g: { enclosed: 0, eng: 0.5, color: 1, nowaste: 1, big: 1, easy: 0.7, quiet: 0.8, tinker: 1 },
    note: "CoreXY", colorNote: "toolchanger — 1/2/5 ראשים",
    why: "מחליף ראשים אמיתי (עד 5), משטח 36 ס\"מ — רב-צבעי ורב-חומרי כמעט בלי פסולת.",
    watch: "מאוד יקרה, פתוחה (תא סגירה נמכר בנפרד), ומכונה גדולה. למקצוענים.",
    zap: null, prices: [
      { store: "Yazamco", label: "ראש אחד", ils: 10949, url: "https://3dny.co.il/?p=25702" },
      { store: "Yazamco", label: "2 ראשים", ils: 13889, url: "https://3dny.co.il/product/%d7%9e%d7%93%d7%a4%d7%a1%d7%aa-%d7%aa%d7%9c%d7%aa-%d7%9e%d7%99%d7%9e%d7%93-prusa-xl-%d7%a9%d7%a0%d7%99-%d7%a8%d7%90%d7%a9%d7%99%d7%9d-%d7%9e%d7%95%d7%a8%d7%9b%d7%91%d7%aa/", mc: true },
      { store: "Yazamco", label: "5 ראשים", ils: 17899, url: "https://3dny.co.il/product/%d7%9e%d7%93%d7%a4%d7%a1%d7%aa-%d7%aa%d7%9c%d7%aa-%d7%9e%d7%99%d7%9e%d7%93-prusa-xl-%d7%97%d7%9e%d7%99%d7%a9%d7%94-%d7%a8%d7%90%d7%a9%d7%99%d7%9d-%d7%9e%d7%95%d7%a8%d7%9b%d7%91%d7%aa/", mc: true },
      { store: "Caliber", label: "2 ראשים", ils: 13830, url: "https://shop.caliber.co.il/items/7077148", mc: true }] },];

// התקציב מסנן לפי המחיר הזול ביותר בארץ (prices). דגם בלי מחיר לא מופיע בהמלצות.
const QUESTIONS = [
  { id: "budget", q: "מה התקציב למדפסת עצמה?", a: [
    // min = רצפה רכה (~75% מתחתית הטווח): מי שהקצה ₪5,000 לא צריך מדפסת של ₪900. בטווח העליון הרצפה קשיחה —
    // מי שבחר "מעל ₪8,000" מצפה למדפסות מעל ₪8,000; הזולות מופיעות רק כ"זולה מהתקציב"
    ["עד ₪1,200", { min: 0, max: 1200 }], ["₪1,200 עד ₪2,500", { min: 900, max: 2500 }],
    ["₪2,500 עד ₪5,000", { min: 1875, max: 5000 }], ["₪5,000 עד ₪8,000", { min: 3750, max: 8000 }], ["מעל ₪8,000", { min: 8000, max: Infinity }]] },
  { id: "use", q: "מה בעיקר תדפיסו?", a: [
    ["צעצועים, קישוטים, גאדג'טים לבית", { want: ["easy"] }],
    // שמש ישראלית + רכב = ABS/ASA, שדורשים סגורה — מגבלה פיזית, משקל כפול
    ["חלקים פונקציונליים — לרכב, לכלים, לחוץ", { want: ["enclosed", "enclosed", "eng", "eng"] }],
    // גודל משטח הוא מגבלה פיזית, לא העדפה — משקל גבוה כדי שלא יפסיד לנוחות (test/quiz.test.js)
    ["דברים גדולים — קסדות, קוספליי, ארגוניות", { want: ["big", "big", "big", "big"] }],
    ["מיניאטורות ופרטים זעירים", { want: ["easy"], resin: true }]] },
  { id: "color", q: "כמה חשוב לכם רב-צבעי?", a: [
    // nowaste = מחליף ראשים / דיזות נפרדות: בלי ניקוי חומר בכל החלפה — יתרון אמיתי למי שמדפיס הרבה ברב-צבעי
    ["חובה", { want: ["color", "color", "nowaste"], combo: true }], ["נחמד שיהיה בעתיד", { want: ["color"] }], ["לא מעניין", {}]] },
  { id: "place", q: "איפה המדפסת תעמוד?", a: [
    // ליד ילדים סגורה היא בטיחות (חם, חלקים נעים, אדים) — משקל כפול, שלא תפסיד לנוחות בהפרש של עשיריות
    ["חדר מגורים / חדר ילדים", { want: ["enclosed", "enclosed", "quiet"] }],
    ["חדר עבודה", { want: ["quiet"] }], ["מחסן / מרפסת / סדנה", {}]] },
  { id: "style", q: "מה מתאר אתכם יותר?", a: [
    ["רוצה שזה פשוט יעבוד", { want: ["easy", "easy"] }],
    ["נהנה לפרק, לשדרג ולכוונן", { want: ["tinker", "tinker"] }]] },
];

// חנויות שעומרי ממליץ עליהן מניסיון אישי — בלי קשר מסחרי. רק עובדות שאומתו באתר החנות.
const STORES = [
  { name: "ProMaker", where: "עתיר ידע 21, כפר סבא · א׳–ה׳ 10:00–17:00", url: "https://promaker.co.il/",
    tags: ["חנות פרטית", "Bambu · Prusa · Creality · Elegoo · Snapmaker", "eSUN · ProFilament"],
    why: "חנות פרטית עם שירות אישי ומחירים ברמת הרשתות הגדולות (ראו את המחירים ליד כל דגם). מביאה בעצמה את פילמנט ProFilament (ב-<a href=\"filaments.html\">דף הפילמנטים</a>) וגם eSUN. כמה גולשים המליצו עליה.",
    watch: "ההגעה לחנות בתיאום מראש. חלק מהדגמים באתר שלהם מסומנים \"במלאי\" גם כשהם ישנים — כדאי לוודא בטלפון." },
  { name: "Spider3D", where: "יבנה · איסוף מלוקר 24/7 בחינם · 03-6051212", url: "https://www.spider3d.co.il/",
    tags: ["חנות פרטית", "Bambu · Creality", "פילמנט במותג החנות", "משלוח באותו יום"],
    why: "אני לקוח קבוע ומרוצה מאוד מהשירות. יש להם פילמנט במותג החנות (PLA+ ב-₪89, ב-<a href=\"filaments.html\">דף הפילמנטים</a>), משלוח באותו יום מבאר שבע עד נהריה בהזמנה עד 11:00 (₪45), ו-30 יום להחזרה.",
    watch: "מועדון לקוחות ב-₪19.90 לחודש: מחירים נמוכים יותר (PLA+ ב-₪69 במקום ₪89) ומשלוח ב-₪29. משתלם למי שקונה פילמנט באופן קבוע. אין חנות פיזית — איסוף מלוקר או בתיאום." },
];

const SLICERS = [
  { brand: "Bambu Lab", name: "Bambu Studio", url: "https://bambulab.com/en/download/studio" },
  { brand: "Creality / Elegoo / כללי", name: "OrcaSlicer", url: "https://github.com/OrcaSlicer/OrcaSlicer/releases" },
  { brand: "Prusa", name: "PrusaSlicer", url: "https://www.prusa3d.com/p/prusaslicer/" },
  { brand: "Creality", name: "Creality Print", url: "https://www.creality.com/download" },
];
if (typeof module !== "undefined") module.exports = { SITE, PRINTERS, QUESTIONS, SLICERS, STORES };

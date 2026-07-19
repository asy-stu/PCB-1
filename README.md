# Ahmed Saad — PCB Design Portfolio

موقع بورتفوليو احترافي لمهندس تصميم PCB، مبني بـ **React + Vite + Tailwind CSS v4**، يدعم 3 لغات (عربي / إنجليزي / تركي) مع اتجاه RTL تلقائي، ولوحة تحكم كاملة لإدارة المحتوى والألوان والخطوط والإحصائيات — كل ذلك بدون الحاجة لسيرفر (يعمل بـ localStorage حالياً).

## التشغيل محلياً

```bash
npm install
npm run dev
```

يفتح على `http://localhost:5173`

## البناء للنشر (Production Build)

```bash
npm run build
npm run preview   # لمعاينة النسخة المبنية
```

الملفات النهائية هتلاقيها في مجلد `dist/`.

## لوحة التحكم (Admin Dashboard)

- الرابط: `/admin/login`
- كلمة المرور الافتراضية: `admin123` (غيّرها فوراً من تبويب "الإعدادات")
- التبويبات المتاحة:
  - **نظرة عامة**: إحصائيات الزيارات، رسائل التواصل، توزيع اللغات (رسوم بيانية).
  - **المحتوى والنصوص**: تعديل نصوص كل لغة — حقول سريعة للعناصر الأساسية، أو محرر JSON متقدم للتحكم الكامل في كل قسم (الخدمات، الأسئلة الشائعة، آراء العملاء...).
  - **الألوان والخطوط**: تغيير لون الموقع الأساسي/الثانوي، الخلفيات، وخطوط العناوين/النصوص/الليبلز من مكتبة Google Fonts.
  - **الإعدادات**: تغيير كلمة المرور، تصدير/استيراد كل الإعدادات كملف JSON، إعادة الضبط الكامل.

> ⚠️ **ملاحظة مهمة**: التخزين حالياً محلي بالكامل في متصفح المستخدم (localStorage) لعدم وجود Backend بعد. أي تعديل تعمله من لوحة التحكم هيظهر بس على نفس الجهاز/المتصفح اللي عملته منه، ومش هيظهر للزوار الآخرين. للحصول على لوحة تحكم حقيقية تُطبَّق على كل الزوار، لازم نربط الموقع بقاعدة بيانات وAPI (المرحلة الجاية).

## هيكل المشروع

```
src/
  components/       كل أقسام الموقع (Hero, About, Services, Gallery, Skills...)
  pages/            الصفحة الرئيسية + صفحات لوحة التحكم
  pages/admin/       Dashboard, Login, وكل تبويب على حدة
  context/          SiteContext (الثيم + اللغة)
  lib/              أدوات التخزين: themeStore, contentStore, statsStore, pathUtils
  locales/          ملفات الترجمة الأساسية (en.json, ar.json, tr.json)
  i18n.js           إعداد react-i18next
```

## رفع المشروع على GitHub

```bash
git init
git add .
git commit -m "Initial commit - Ahmed Saad PCB portfolio"
git branch -M main
git remote add origin <رابط-الريبو-بتاعك>
git push -u origin main
```

## النشر (Deployment)

المشروع Static بالكامل بعد الـ build، يمكن نشره مباشرة على:
- **Vercel** / **Netlify**: اربط الريبو، Build command: `npm run build`, Output: `dist`
- **GitHub Pages**: شوف القسم التالي بالتفصيل

### النشر على GitHub Pages (خطوة بخطوة)

1. افتح `vite.config.js` وغيّر السطر:
   ```js
   base: '/ahmed-saad-portfolio/',
   ```
   ليطابق **اسم الريبو بتاعك بالظبط** (لو الريبو اسمه `my-site` مثلاً، يبقى `base: '/my-site/'`).

2. من جوه مجلد المشروع نفّذ:
   ```bash
   npm run deploy
   ```
   الأمر ده بيعمل build تلقائي وبعدين يرفع محتوى `dist/` على branch اسمه `gh-pages`.

3. روح لإعدادات الريبو على GitHub → **Settings → Pages** → في "Build and deployment" اختار:
   - Source: `Deploy from a branch`
   - Branch: `gh-pages` / `root`
   - Save

4. استنى دقيقة أو اتنين، والرابط هيكون:
   ```
   https://<username>.github.io/<repo-name>/
   ```

> ملحوظة: الموقع بيستخدم `HashRouter` (يعني الروابط هتكون فيها `#` زي `/#/admin/login`) عشان يشتغل صح على GitHub Pages بدون أخطاء 404 عند تحديث الصفحة أو فتح رابط مباشر لصفحة الأدمن.


## الخطوة الجاية (Backend)

لما نجهز الـ Backend، هنربط:
- تسجيل دخول حقيقي للوحة التحكم (بدل localStorage)
- قاعدة بيانات لحفظ المحتوى/الثيم بحيث تنعكس على كل الزوار
- استقبال طلبات نموذج التواصل فعلياً (إرسال إيميل / حفظ في قاعدة بيانات)
- رفع الصور الحقيقية لمعرض الأعمال بدل الـ placeholders

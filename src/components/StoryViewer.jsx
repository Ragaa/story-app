import React, { useState, useRef } from "react";
// قائمة قصص وهمية يمكن تطويرها لاحقاً
const storyList = [
  { id: 1, title: "قصة الراعي الكذاب", active: true, coverImage: "/images/cover1.png" }
 
];
export default function StoryViewer() {
  const title = "قصة الراعي الكذاب";
  const audioSrc = "/audio/audio.mp3";

  const sections = [
    {
      
      id: 1,
      text: `يُروى أنه في أحد الأزمنة كان راعٍ يسكن في قرية يتصف سكانها بالكرم والصدق والأمانة وحب مساعدة الآخرين، ولكن الراعي لم يتصف بهذه الأخلاق الكريمة، بل كان مخادعًا ويحب افتعال المشاكل من أجل التسلية، وفي أحد الأيام في الصباح الباكر وهو جالس في المرعى ويشعر بالضجر.`,
      image: "/images/11.png"
    },
    {
      id: 2,
      text: `جاءته فكرة، فقام يصيح بأعلى صوته أنجدوني الذئب يأكل أغنامي، وظل يكرر حتى استيقظ كل من في القرية وجاء ليساعده، ولما وصلوا للمرعى، وجدوا الراعي جالسًا بين أغنامه ويضحك ويقول لقد خدعتكم. استنكر أهل القرية فعله، وأخبروه أن خداع الناس وإفزاعهم ليس مضحكاً.`,
      image: "/images/22.png",
    },
    {
      id: 3,
     text: "لم يلقِ الراعي بالًا لكلام أهل القرية، وكرر فعلته في اليومين التاليين، حتى ضجر الناس من فعله وقرروا أن لا يستجيبوا له مرة أخرى، وفي اليوم الرابع وبينما كان الراعي جالسًا في المرعى، وإذا بذئب قد انقض على أغنامه وبدأ بذبحها واحدة تلو الأخرى، فصاح الراعي يطلب النجدة من أهل القرية، ولكن دون جدوى فقد خدعهم ثلاث مرات، ولم يصدقوه اليوم عندما جاء الذئب.",

      image: "/images/33.png",
    },
  ];

  const localDict = {
  الراعي: "الشخص الذي يعتني بالأغنام ويرعاها.",
  مرعى: "المكان الذي ترعى فيه الأغنام وتأكل العشب.",
  أغنام: "جمع غنمة، وهي المواشي من الخراف والماعز.",
  الكرم: "السخاء والعطاء دون مقابل.",
  الصدق: "قول الحقيقة وعدم الكذب.",
  الأمانة: "الوفاء بالعهود وحفظ الحقوق.",
  مخادعًا: "يُظهر شيئًا ويُخفي خلافه بقصد الكذب أو الإيذاء.",
  افتعال: "صنع شيء بطريقة غير حقيقية؛ ادّعاء أو اختلاق.",
  الضجر: "الملل الشديد وعدم الرغبة في فعل شيء.",
  أنجدوني: "اطلب منكم النجدة والمساعدة.",
  الذئب: "حيوان مفترس يعيش في البراري.",
  يأكل: "يتغذّى على الطعام أو يفترس.",
  استيقظ: "نهض من النوم وأصبح منتبهاً.",
  المرعى: "الأرض التي تأكل فيها المواشي الأعشاب.",
  خدعتكم: "أوهمتكم بأمر غير حقيقي.",
  استنكر: "رفض الفعل واستقبحه.",
  إفزاعهم: "تخويفهم وإرعابهم.",
  ضجر: "تعب من تكرار الأمر وملّ منه.",
  استجاب: "لبّى النداء وقام بالمساعدة.",
  انقض: "هاجم بسرعة وقوة.",
  النجدة: "طلب المساعدة العاجلة.",
  دون: "من غير أو بدون.",
  جدوى: "فائدة أو نفع.",
  اليوم: "الوقت الحالي أو هذا النهار.",
  الكذاب: "من يكرر الكذب ولا يقول الحقيقة."
};

  const [selected, setSelected] = useState(null);
  const audioRef = useRef(null);

  function handleWordClick(event, word) {
    const rect = event.target.getBoundingClientRect();
    setSelected({
      word,
      meaning: localDict[word] || "لا يوجد معنى في القاموس المحلي.",
      x: rect.left,
      y: rect.top + window.scrollY + 30,
    });
  }

 function renderText(text) {
    // تم تصحيح Regex: استخدام (\s+) بدلاً من (\\s+)
    return text.split(/(\s+)/).map((token, i) => {
      // تم تصحيح Regex: استخدام /^\s+$/ بدلاً من /^\\s+$/
      if (/^\s+$/.test(token)) return token;
      
      const clean = token.replace(/[.,،?!؟]/g, "");
      return (
        <span
          key={i}
          onClick={(e) => handleWordClick(e, clean)}
          className="cursor-pointer hover:bg-yellow-200 px-1 rounded"
        >
          {token}
        </span>
      );
    });
  }

 return (
    <div className="min-h-screen bg-white" dir="rtl">
      
      {/* 1. قائمة القصص الأفقية الجديدة (Horizontal Story List) */}
      <div className="bg-gray-50 border-b border-gray-200 p-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg font-bold mb-3">📚 اختر قصة:</h2>
         <ul className="flex overflow-x-auto space-x-reverse space-x-4 list-none p-0 m-0 pb-2">
  {storyList.map((story) => (
    // استخدام inline-block لضمان الترتيب الأفقي القسري
    <li key={story.id} className="flex-shrink-0 inline-block">
                
                {/* تم تعديل الـ button ليصبح flex items-center */}
               <button
        className={`flex items-center gap-2 p-2 rounded-lg transition-colors border ${
          story.active
            ? "bg-blue-600 text-white font-semibold border-blue-600 shadow"
            : "hover:bg-gray-200 text-gray-800 bg-white border-gray-300"
        }`}
        onClick={() => console.log(`تحميل قصة: ${story.title}`)}
      >
        <img
          src={story.coverImage}
          alt={`غلاف قصة ${story.title}`}
          className="w-8 h-8 object-cover rounded-sm"
        />
        <span className="text-sm">{story.title}</span>
      </button>
    </li>
  ))}
</ul>
        </div>
      </div>
      
      {/* 2. محتوى القصة الرئيسية (Main Content) - تم إزالة حاوية الـ Flex الجانبية */}
      <div className="max-w-4xl mx-auto p-6">
        
        {/* العناوين والتحكم بالصوت (كما هي) */}
        <h1 className="text-3xl font-bold mb-4 text-center">{title}</h1>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => audioRef.current?.play()}
            className="px-4 py-2 bg-blue-600 text-white rounded shadow"
          >
            تشغيل السرد
          </button>
          <button
            onClick={() => audioRef.current?.pause()}
            className="px-4 py-2 bg-gray-300 rounded shadow"
          >
            إيقاف
          </button>
          <audio ref={audioRef} src={audioSrc} controls className="hidden" />
        </div>

        {/* ----------- أقسام القصة ----------- */}
        {sections.map((sec) => (
          <div
            key={sec.id}
            className="bg-white shadow p-4 rounded-lg mb-6"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: "20px",
            }}
            dir="rtl"
          >
            {/* صندوق النص */}
            <div
              className="flex-1 bg-gray-50 p-4 rounded-lg border text-right font-[Tajawal] font-bold whitespace-normal"
              style={{ fontSize: "30px" }}
            >
              {renderText(sec.text)}
            </div>

            {/* صندوق الصورة */}
            <div className="shrink-0 flex justify-center items-center bg-gray-100 rounded-lg border p-1">
              <img
                src={sec.image}
                alt=""
                className="w-[140px] h-[140px] object-cover rounded-md shadow"
              />
            </div>
          </div>
        ))}
      </div>

      {/* البالون الخاص بالمعنى (كما هو) */}
      {selected && (
        <div
          className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-white shadow-xl border rounded-lg p-5 w-[300px] text-right z-[999999]"
        >
          <strong className="text-xl font-bold">{selected.word}</strong>
          <p className="mt-3">{selected.meaning}</p>
          <a
            href={`https://www.almaany.com/ar/dict/ar-ar/${selected.word}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline mt-4 block text-left"
          >
            ▶ المزيد من المعاني على موقع المعاني
          </a>
          <button
            onClick={() => setSelected(null)}
            className="mt-4 px-4 py-2 bg-gray-200 rounded block w-full text-center"
          >
            إغلاق
          </button>
        </div>
      )}
    </div>
  );
}
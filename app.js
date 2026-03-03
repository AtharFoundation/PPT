
const lessons = [

  //الدرس الأول ------------------------------------------------------------------------------------

  {
    id: '1', type: 'reading', title: ' الدرس الأوّل - مقدمة عن الباوربوينت',
    desc: 'مقدمة عن برنامح الباوربوينت، ولماذا هو أداة لا غنى عنها في عالم الأعمال والتعليم.',
    vid: '',
    content: `
        <p>يعد الباوربوينت أداة أساسية في عالم الأعمال والتعليم، حيث يُستخدم لعرض المعلومات بطريقة بصرية جذابة وسهلة الفهم.</p>
        <p>في هذه الدورة سنستعرض أساسيات الباوربوينت وكيفية استخدامه لإنشاء عروض تقديمية فعالة.</p>
                <p>برنامج البوربوينت هو من سلسلة برامج اوفس</p>

        <ul>
      `
  },
  //الدرس الثاني ------------------------------------------------------------------------------------
  {
    id: '2', type: 'video', title: 'الدرس الثاني - إنشاء مشروع ',
    desc: 'خطوة بخطوة لإنشاء عرض تقديمي من الصفر، مع نصائح حول تنظيم المحتوى واختيار التصميم المناسب.',
    vid: '1PtNXwyQ0k1Op5UT8t1f-phq9aX4WaRYN',
    content: ''
  },


  //الدرس الثالث ------------------------------------------------------------------------------------
  {
    id: '3', type: 'video', title: 'الدرس الثالث - اضافة العناصر ',
    desc: 'كيفية إضافة النصوص، الصور، الأشكال، والوسائط المتعددة إلى شرائحك لجعلها أكثر تفاعلية وجاذبية.',
    vid: '1ndl6jY9kPmQu2StKagompVItnGNFzkeR',
    content: ''
  },


  //الدرس الرابع ------------------------------------------------------------------------------------

  {
    id: '4', type: 'video', title: 'الدرس الرابع -  اختصارات الكيبورد',
    desc: 'تعلم أهم اختصارات لوحة المفاتيح في الباوربوينت لتسريع عملك وزيادة إنتاجيتك.',
    vid: '1iDF4-Un6q7aXrWQWP3-ny9XRmv0YAavn',
    content: ''
  },


  //الدرس الخامس ------------------------------------------------------------------------------------

  {
    id: '5', type: 'video', title: 'الدرس الخامس -  التلوين ',
    desc: 'كيفية تخصيص مظهر العرض بحسب احتياجاتك، مع نصائح حول اختيار الألوان والخطوط المناسبة.',
    vid: '1xj5kk-4rQCdqGO_oIuzB-DTK4K-jS05t',
    content: ''
  },


  //الدرس السادس ------------------------------------------------------------------------------------

  {
    id: '6', type: 'video', title: 'الدرس السادس -  الطبقات والتنسيق',
    desc: 'تعلم كيفية تنظيم العناصر في شرائحك باستخدام الطبقات والتنسيق لضمان عرض مرتب وجذاب.',
    vid: '1LZlqJIQwiattHppVJ5nwanKvx7AD5FUw',
    content: ''
  },



];

function render() {
  const grid = document.getElementById('mainGrid');
  const watchedCount = lessons.filter(l => localStorage.getItem('lesson_' + l.id)).length;

  document.getElementById('stats').innerText = `تم إنجاز ${watchedCount} من أصل ${lessons.length}`;

  grid.innerHTML = lessons.map(l => {
    const isWatched = localStorage.getItem('lesson_' + l.id);
    return `
        <div class="glass-card ${isWatched ? 'completed' : ''}">
          <div>
            <span class="type-badge">${l.type === 'video' ? '📺 فيديو تدريبي' : '📖 مقال تعليمي'}</span>
            <h3>${l.title}</h3>
            <p>${l.desc}</p>
          </div>
          <button class="btn-action" onclick="openLesson('${l.id}')">
            ${isWatched ? 'مشاهدة مرة أخرى' : 'ابدأ الدرس الآن'}
          </button>
        </div>
      `;
  }).join('');

  updateProgress(watchedCount);
}

function openLesson(id) {
  const lesson = lessons.find(l => l.id === id);
  const section = document.getElementById('contentSection');
  const vBox = document.getElementById('videoBox');
  const rBox = document.getElementById('readingBox');

  section.style.display = 'block';
  document.body.style.overflow = 'hidden'; // منع التمرير في الخلفية

  if (lesson.type === 'video') {
    vBox.classList.remove('hidden');
    rBox.classList.add('hidden');
    document.getElementById('vFrame').src = `https://drive.google.com/file/d/${lesson.vid}/preview`;
  } else {
    vBox.classList.add('hidden');
    rBox.classList.remove('hidden');
    document.getElementById('lTitle').innerText = lesson.title;
    document.getElementById('lBody').innerHTML = lesson.content;
  }

  localStorage.setItem('lesson_' + id, 'true');
  render();
}

function closeContent() {
  document.getElementById('contentSection').style.display = 'none';
  document.body.style.overflow = 'auto';
  document.getElementById('vFrame').src = ''; // إيقاف الفيديو عند الإغلاق
}

function updateProgress(count) {
  const percent = (count / lessons.length) * 100;
  document.getElementById('progressBar').style.width = percent + '%';
}

// تشغيل أولي
render();

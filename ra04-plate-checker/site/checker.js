(() => {
  'use strict';

  const OFFICIAL_GAZETTE = 'https://www.sgg.gov.ma/BO/AR/3111/2026/BO_7531_Ar.pdf';
  const NARSA_CLARIFICATION = 'https://snrtnews.com/fr/article/est-ce-vrai-que-toutes-les-plaques-doivent-etre-changees-avant-le-31-decembre-2026-158007';
  const DECISION_PUBLISHED = new Date('2026-08-03T00:00:00');
  const INTERNATIONAL_DEADLINE = new Date('2026-12-31T23:59:59');
  const LIGHT_EFFECTIVE = new Date('2027-01-01T00:00:00');

  const copy = {
    ar: {
      incompleteTitle: 'كمّل الأسئلة أولاً',
      incompleteBody: 'هذه الأداة لا تخمّن. اختر جواباً لكل سؤال ظاهر ثم أعد المحاولة.',
      verifyTitle: 'حالـتك تحتاج تحققاً رسمياً',
      verifyBody: 'المعطيات المختارة لا تسمح بنتيجة آمنة من المقتضيات الانتقالية وحدها. راجع نارسا أو مصلحة تسجيل المركبات قبل أي إجراء أو أداء.',
      alreadyNewTitle: 'لوحتك من النموذج الموحّد الجديد',
      alreadyNewBody: 'لا يظهر من مقتضيات الانتقال في القرار 640.26 أنك مطالب بتغييرها مرة أخرى بسبب إصلاح 2026 وحده.',
      transferTitle: 'النموذج الجديد يرتبط بالعملية الحالية',
      transferBody: 'إذا كانت العملية الحالية أول تحويل ملكية لمركبة من السلسلة العادية بلوحة قديمة، فالمقتضيات الانتقالية تنهي صلاحية اللوحة القديمة عند أول تحويل للملكية. أكمل العملية لدى الجهة المختصة بالنموذج المعمول به.',
      newRegTitle: 'التسجيل الجديد/المستورَد يستعمل النموذج الموحّد',
      newRegBody: 'بحسب توضيح نارسا المنشور بعد القرار 640.26، يُعتمد النموذج الموحّد للعمليات المتعلقة بتسجيل مركبة مقتناة بالمغرب أو مستوردة، جديدة أو مستعملة، منذ نشر القرار.',
      intlBeforeTitle: 'المهلة المحددة: 31 دجنبر 2026',
      intlBeforeBody: 'إذا كانت هذه هي اللوحة القديمة المخصصة للجولان الدولي (حروف لاتينية وعلامة MA منفصلة)، فهي تبقى صالحة إلى 31 دجنبر 2026. لا تعمّم هذه المهلة على كل السيارات.',
      intlAfterTitle: 'مهلة اللوحة الدولية القديمة انتهت',
      intlAfterBody: 'القرار جعل 31 دجنبر 2026 نهاية صلاحية اللوحة القديمة المستعملة للجولان الدولي. تحقق من وضعيتك لدى الجهة المختصة قبل الجولان الدولي.',
      domesticTitle: 'لا يوجد أجل عام في 31 دجنبر لسيارتك',
      domesticBody: 'بالنسبة للسلسلة العادية بلوحة قديمة دون حروف لاتينية للاستعمال داخل المغرب، يمكن الاستمرار بها إلى أول عملية تحويل للملكية.',
      normalReplaceTitle: 'طلب النظير/الاستبدال يحتاج تحققاً خاصاً',
      normalReplaceBody: 'المقتضى الانتقالي الواضح للسلسلة العادية يربط نهاية صلاحية اللوحة القديمة بأول تحويل ملكية، لكن طلبات النظير أو الاستبدال قد تخضع لإجراءات إدارية أخرى. لا تستنتج النتيجة من هذه الأداة وحدها.',
      lightBeforeTitle: 'أحكام هذه الفئة تبدأ في 1 يناير 2027',
      lightBeforeBody: 'المادة الانتقالية تجعل مقتضيات الدراجات بمحرك والدراجات الخفيفة ثلاثية/رباعية العجلات نافذة ابتداءً من 1 يناير 2027. إذا لديك معاملة جارية قبل ذلك، تحقق من الإجراء الحالي لدى الجهة المختصة.',
      lightKeepTitle: 'يمكن أن تستمر الوثائق/اللوحات الحالية حتى أول مُشغّل للتغيير',
      lightKeepBody: 'ابتداءً من 1 يناير 2027 تبقى سندات الملكية واللوحات الحالية لهذه الفئات سارية إلى أول تحويل ملكية أو أول طلب لنظير سند الملكية أو استبداله.',
      lightActionTitle: 'العملية الحالية تُشغّل الانتقال بعد 1 يناير 2027',
      lightActionBody: 'لهذه الفئات، أول تحويل ملكية أو أول طلب لنظير سند الملكية أو استبداله بعد دخول الأحكام حيز التنفيذ يفعّل الانتقال. أكمل الإجراء لدى المصلحة المختصة.',
      sourceLabel: 'المصدر الرسمي',
      lastVerified: 'آخر تحقق من القاعدة: 25 شتنبر 2026',
      caution: 'معلومة إرشادية مبنية على القرار المنشور؛ ليست جهة حكومية ولا بديلاً عن قرار المصلحة المختصة في الحالات الخاصة.'
    },
    fr: {
      incompleteTitle: 'Répondez d’abord à toutes les questions',
      incompleteBody: 'Cet outil ne devine pas. Sélectionnez une réponse pour chaque question visible puis réessayez.',
      verifyTitle: 'Votre cas nécessite une vérification officielle',
      verifyBody: 'Les éléments sélectionnés ne permettent pas une conclusion sûre à partir des seules dispositions transitoires. Vérifiez auprès de la NARSA ou du service d’immatriculation avant toute démarche ou paiement.',
      alreadyNewTitle: 'Votre plaque est déjà au nouveau modèle unifié',
      alreadyNewBody: 'Les dispositions transitoires de la décision 640.26 ne montrent pas qu’un nouveau remplacement soit requis du seul fait de la réforme 2026.',
      transferTitle: 'Le nouveau modèle s’applique à l’opération en cours',
      transferBody: 'Pour un véhicule de la série normale avec ancienne plaque, les dispositions transitoires mettent fin à l’usage de cette plaque lors du premier transfert de propriété. Finalisez l’opération selon le modèle en vigueur auprès du service compétent.',
      newRegTitle: 'Nouvelle immatriculation/importation : modèle unifié',
      newRegBody: 'Selon la clarification NARSA publiée après la décision 640.26, le modèle unifié est utilisé pour les opérations d’immatriculation de véhicules acquis au Maroc ou importés, neufs ou d’occasion, depuis la publication de la décision.',
      intlBeforeTitle: 'Échéance spécifique : 31 décembre 2026',
      intlBeforeBody: 'Si vous avez l’ancienne plaque destinée à la circulation internationale (caractères latins et signe MA séparé), elle reste valable jusqu’au 31 décembre 2026. Cette date ne s’applique pas à tous les véhicules.',
      intlAfterTitle: 'L’échéance de l’ancienne plaque internationale est dépassée',
      intlAfterBody: 'La décision fixe au 31 décembre 2026 la fin de validité de l’ancienne plaque utilisée en circulation internationale. Vérifiez votre situation avant de circuler à l’international.',
      domesticTitle: 'Pas d’échéance générale au 31 décembre pour ce cas',
      domesticBody: 'Pour la série normale avec ancienne plaque sans caractères latins utilisée au Maroc, l’usage peut continuer jusqu’au premier transfert de propriété.',
      normalReplaceTitle: 'Duplicata/remplacement : vérification spécifique requise',
      normalReplaceBody: 'La règle transitoire explicite pour la série normale vise le premier transfert de propriété. Un duplicata ou remplacement peut relever d’autres formalités administratives ; ne concluez pas sur ce seul outil.',
      lightBeforeTitle: 'Ces dispositions entrent en vigueur le 1er janvier 2027',
      lightBeforeBody: 'Les dispositions concernant les cyclomoteurs et certains tricycles/quadricycles légers entrent en vigueur le 1er janvier 2027. Pour une opération en cours avant cette date, vérifiez la procédure applicable auprès du service compétent.',
      lightKeepTitle: 'Les documents/plaques existants peuvent rester valables jusqu’au premier événement déclencheur',
      lightKeepBody: 'À partir du 1er janvier 2027, les titres de propriété et plaques existants de ces catégories restent valables jusqu’au premier transfert de propriété, à la première demande de duplicata du titre ou à son remplacement.',
      lightActionTitle: 'L’opération actuelle déclenche la transition après le 1er janvier 2027',
      lightActionBody: 'Pour ces catégories, le premier transfert de propriété ou la première demande de duplicata/remplacement du titre après l’entrée en vigueur déclenche la transition. Finalisez la démarche auprès du service compétent.',
      sourceLabel: 'Source officielle',
      lastVerified: 'Règle vérifiée le 25 septembre 2026',
      caution: 'Information d’orientation fondée sur le texte publié ; ce site n’est pas un service gouvernemental et ne remplace pas la décision du service compétent pour les cas particuliers.'
    }
  };

  function evaluate(input, now = new Date()) {
    const lang = input.lang === 'fr' ? 'fr' : 'ar';
    const t = copy[lang];
    const required = ['category', 'plateType', 'operation'];
    if (input.category === 'normal') required.push('internationalUse');
    for (const k of required) {
      if (!input[k]) return result('incomplete', t.incompleteTitle, t.incompleteBody, lang);
    }

    if (input.category === 'other' || input.plateType === 'unsure') {
      return result('verify', t.verifyTitle, t.verifyBody, lang);
    }

    if (input.plateType === 'new_unified') {
      return result('ok', t.alreadyNewTitle, t.alreadyNewBody, lang);
    }

    if (input.category === 'light') {
      if (now < LIGHT_EFFECTIVE) {
        return result('notice', t.lightBeforeTitle, t.lightBeforeBody, lang);
      }
      if (['transfer', 'duplicate_replace', 'new_imported'].includes(input.operation)) {
        return result('action', t.lightActionTitle, t.lightActionBody, lang);
      }
      return result('ok', t.lightKeepTitle, t.lightKeepBody, lang);
    }

    if (input.operation === 'new_imported' && now >= DECISION_PUBLISHED) {
      return result('action', t.newRegTitle, t.newRegBody, lang);
    }

    if (input.operation === 'transfer' && now >= DECISION_PUBLISHED) {
      return result('action', t.transferTitle, t.transferBody, lang);
    }

    if (input.operation === 'duplicate_replace') {
      return result('verify', t.normalReplaceTitle, t.normalReplaceBody, lang);
    }

    if (input.plateType === 'old_international') {
      if (now <= INTERNATIONAL_DEADLINE) {
        return result('deadline', t.intlBeforeTitle, t.intlBeforeBody, lang);
      }
      return result('action', t.intlAfterTitle, t.intlAfterBody, lang);
    }

    if (input.plateType === 'old_domestic') {
      return result('ok', t.domesticTitle, t.domesticBody, lang);
    }

    return result('verify', t.verifyTitle, t.verifyBody, lang);
  }

  function result(kind, title, body, lang) {
    return {
      kind,
      title,
      body,
      source: OFFICIAL_GAZETTE,
      clarification: NARSA_CLARIFICATION,
      sourceLabel: copy[lang].sourceLabel,
      lastVerified: copy[lang].lastVerified,
      caution: copy[lang].caution
    };
  }

  function initUI() {
    const form = document.getElementById('checker-form');
    if (!form) return;
    const resultBox = document.getElementById('result-box');
    const langButtons = document.querySelectorAll('[data-lang-switch]');
    const translatables = document.querySelectorAll('[data-ar][data-fr]');
    let lang = document.documentElement.lang === 'fr' ? 'fr' : 'ar';

    function setLang(next) {
      lang = next;
      document.documentElement.lang = next;
      document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
      translatables.forEach(el => {
        const value = el.dataset[next];
        if (value != null) el.textContent = value;
      });
      langButtons.forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.langSwitch === next)));
      resultBox.hidden = true;
    }

    langButtons.forEach(btn => btn.addEventListener('click', () => setLang(btn.dataset.langSwitch)));

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const input = {
        lang,
        category: data.get('category'),
        plateType: data.get('plateType'),
        operation: data.get('operation'),
        internationalUse: data.get('internationalUse')
      };
      const out = evaluate(input, new Date());
      resultBox.dataset.kind = out.kind;
      resultBox.innerHTML = `
        <div class="result-kicker">${escapeHtml(out.lastVerified)}</div>
        <h3>${escapeHtml(out.title)}</h3>
        <p>${escapeHtml(out.body)}</p>
        <div class="source-row">
          <a href="${out.source}" target="_blank" rel="noopener">${escapeHtml(out.sourceLabel)} — BO 7531 / décision 640.26</a>
          <a href="${out.clarification}" target="_blank" rel="noopener">NARSA / clarification 31-12-2026</a>
        </div>
        <p class="caution">${escapeHtml(out.caution)}</p>
      `;
      resultBox.hidden = false;
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    setLang(lang);
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { evaluate, DECISION_PUBLISHED, INTERNATIONAL_DEADLINE, LIGHT_EFFECTIVE };
  }
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initUI);
  }
})();
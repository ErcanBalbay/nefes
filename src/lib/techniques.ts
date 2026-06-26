export type PhaseName = "inhale" | "hold" | "exhale" | "holdAfterExhale";

export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export type Phase = {
  name: PhaseName;
  seconds: number;
  label: string;
};

export type Technique = {
  id: string;
  name: string;
  description: string;
  story: string;
  phases: Phase[];
  cycles: number;
  recommendedFor: TimeOfDay[];
  color: string;
};

export const techniques: Technique[] = [
  {
    id: "box",
    name: "Box Breathing",
    description: "4-4-4-4 ritmiyle zihni dengeleyen klasik teknik.",
    story:
      "Kutu nefesi, ABD Deniz Kuvvetleri'nin SEAL ekipleri tarafından yoğun stres altında sakinliği korumak için popülerleştirilen bir tekniktir. 4-4-4-4 eşit ritmi, otonom sinir sistemini dengeler: sempatik 'savaş-kaç' tepkisini yavaşlatırken parasempatik 'dinlen-sindir' modunu aktive eder. Düzenli pratikle dikkat dağınıklığı ve kaygı belirgin şekilde azalır. Toplantı öncesi, zor bir görüşme sonrası ya da günün herhangi bir anlık yoğun stres anında idealdir.",
    phases: [
      { name: "inhale", seconds: 4, label: "Nefes Al" },
      { name: "hold", seconds: 4, label: "Tut" },
      { name: "exhale", seconds: 4, label: "Nefes Ver" },
      { name: "holdAfterExhale", seconds: 4, label: "Tut" },
    ],
    cycles: 6,
    recommendedFor: ["afternoon"],
    color: "#7c9eff",
  },
  {
    id: "4-7-8",
    name: "4-7-8 Tekniği",
    description: "Sakinleşmek ve uykuya geçişi kolaylaştırmak için idealdir.",
    story:
      "Dr. Andrew Weil tarafından Hindistan'ın kadim pranayama geleneğinden uyarlanan bu teknik, otonom sinir sistemini hızla yatıştırır. 7 saniyelik nefes tutma, karbondioksit birikimini artırarak kalp atışını yavaşlatır; 8 saniyelik uzun nefes verme ise stres hormonlarını düşürür. Uyku öncesi düzenli yapıldığında birkaç hafta içinde uykuya dalma süresini kısalttığı gözlemlenir. Kaygı veya panik anlarında da hızlı bir 'reset' etkisi yaratır.",
    phases: [
      { name: "inhale", seconds: 4, label: "Nefes Al" },
      { name: "hold", seconds: 7, label: "Tut" },
      { name: "exhale", seconds: 8, label: "Nefes Ver" },
    ],
    cycles: 5,
    recommendedFor: ["night"],
    color: "#9c7cff",
  },
  {
    id: "wim-hof",
    name: "Wim Hof Nefesi",
    description: "Enerji veren derin nefesler ve ardından uzun bir tutma.",
    story:
      "Hollandalı atlet Wim Hof'un aşırı soğuk koşullarda geliştirdiği bu yöntem, vücudun adrenalin salgısını kontrollü biçimde artırır. Hızlı derin nefesler kanın pH dengesini geçici olarak değiştirerek enerji patlaması ve hafif uyuşma hissi yaratır; ardından gelen uzun tutma aşaması ise zihni odaklar ve stres dayanıklılığını artırır. Bağışıklık sistemi üzerinde olumlu etkileri araştırmalarla desteklenmektedir. Sabah uyanışında soğuk duş öncesi yapıldığında güne güçlü başlatır.",
    phases: [
      { name: "inhale", seconds: 2, label: "Derin Al" },
      { name: "exhale", seconds: 1, label: "Bırak" },
      { name: "holdAfterExhale", seconds: 15, label: "Tut" },
    ],
    cycles: 3,
    recommendedFor: ["morning"],
    color: "#ff8c69",
  },
  {
    id: "diaphragm",
    name: "Diyafram Nefesi",
    description: "Karından alınan yavaş ve derin nefeslerle gevşeme.",
    story:
      "Bebeklerin doğal soluma şekli olan diyafram nefesi, erişkinlerin büyük çoğunluğunun zamanla yitirdiği bir beceridir. Göğüs yerine karından nefes almak, akciğerlerin alt loblarını tam doldurar ve vagus sinirini uyararak 'rest and digest' modunu tetikler. Kan basıncını düşürür, kalp atış hızını yavaşlatır ve kronik kas gerginliğini çözer. Gün içinde kısa molalarda ya da akşam iş sonrası zihinsel yorgunluğu atmak için mükemmeldir.",
    phases: [
      { name: "inhale", seconds: 4, label: "Karından Al" },
      { name: "exhale", seconds: 6, label: "Yavaşça Ver" },
    ],
    cycles: 6,
    recommendedFor: ["afternoon", "evening"],
    color: "#5ed6c0",
  },
  {
    id: "morning-energy",
    name: "Sabah Enerjisi",
    description: "2-1-4 ritmiyle güne canlı ve uyanık başla.",
    story:
      "Bu teknik, sabahın uyku ataletini (sleep inertia) kırmak için tasarlanmış kısa ve ritmik bir nefes protokolüdür. Hızlı alım-kısa tutma-kontrollü verme döngüsü, sempatik sinir sistemini nazikçe uyararak vücut sıcaklığını ve uyanıklık düzeyini yükseltir. Kafein ihtiyacını azalttığı deneyimleyen kullanıcılar tarafından sık rapor edilir. Yataktan kalkar kalkmaz veya sabah rutininin başında, güneş ışığına maruz kalarak yapmak etkisini artırır.",
    phases: [
      { name: "inhale", seconds: 2, label: "Nefes Al" },
      { name: "hold", seconds: 1, label: "Tut" },
      { name: "exhale", seconds: 4, label: "Nefes Ver" },
    ],
    cycles: 8,
    recommendedFor: ["morning"],
    color: "#ffd166",
  },
  {
    id: "night-calm",
    name: "Gece Sakinleşme",
    description: "4-6 ritmiyle vücudu uykuya hazırlayan yavaş tempo.",
    story:
      "Nefes verme süresinin alma süresinden uzun olması, kalp atış değişkenliğini (HRV) artırarak parasempatik sistemi güçlü biçimde aktive eder. Bu 4-6 oranı, yogada 'anuloma viloma'nın temeline dayanan bir ritimdir ve kortizol düzeyini hızla düşürür. Uyku araştırmacıları, yatmadan 20 dakika önce yapılan benzer egzersizlerin uyku kalitesini ölçülebilir düzeyde iyileştirdiğini göstermektedir. Karanlık ve serin bir ortamda, gözler kapalı ve rahat bir pozisyonda uygulanması önerilir.",
    phases: [
      { name: "inhale", seconds: 4, label: "Nefes Al" },
      { name: "exhale", seconds: 6, label: "Nefes Ver" },
    ],
    cycles: 6,
    recommendedFor: ["evening", "night"],
    color: "#6a7fdb",
  },
];

export function getTechniqueById(id: string): Technique | undefined {
  return techniques.find((t) => t.id === id);
}

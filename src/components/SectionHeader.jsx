export default function SectionHeader({ icon: Icon, eyebrow, title, right = null, center = false }) {
  return (
    <div className={`mb-14 flex items-end justify-between flex-wrap gap-4 ${center ? "flex-col items-center text-center" : ""}`}>
      <div>
        <div className="eyebrow mb-3">
          {Icon && <Icon className="w-3.5 h-3.5" />}
          {eyebrow}
        </div>
        <h2 className="section-title">{title}</h2>
        <div className={`underline-bar ${center ? "mx-auto" : ""}`} />
      </div>
      {right}
    </div>
  );
}

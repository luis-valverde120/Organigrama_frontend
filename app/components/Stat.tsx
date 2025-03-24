export default function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-title">{title}</div>
        <div className="stat-desc">{value}</div>
      </div>
    </div>
  );
}
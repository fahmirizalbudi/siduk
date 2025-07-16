import "./OverviewCard.css";

const OverviewCard = ({ value, label, children }) => {
  return (
    <div className="overview-card">
      {children}
      <div className="overview-content">
        <div className="content-value">{value}</div>
        <div className="content-label">{label}</div>
      </div>
    </div>
  );
};

OverviewCard.Icon = ({ children, bgColor }) => (
  <div className="overview-icon" style={{ backgroundColor: `${bgColor}` }}>{children}</div>
);

export default OverviewCard;

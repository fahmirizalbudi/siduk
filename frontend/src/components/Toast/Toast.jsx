import "./Toast.css";

const Toast = ({ type, content }) => {
  let toastIcon;

  if (type === "success") {
    toastIcon = <i className="fas fa-check-circle"></i>;
  } else if (type === "error") {
    toastIcon = <i className="fas fa-times-circle"></i>;
  } else {
    toastIcon = <i className="fas fa-spinner"></i>;
  }

  return (
    <div className={`toast ${type}`}>
      <div className="toast-icon">{toastIcon}</div>
      <div className="toast-content">{content}</div>
      <button className="toast-close">
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default Toast;

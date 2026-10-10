import "./OperationDetailsModal.css";

function OperationDetailsModal({ operation, onClose }) {
  if (!operation) return null;

  const details = [
    ["Product", operation.product],
    ["Operation Type", operation.operationType],
    ["Quantity", `${operation.quantity} ${operation.unit}`],
    ["Origin", operation.origin],
    ["Destination", operation.destination],
    ["Supplier", operation.supplier],
    ["Client", operation.client],
    ["Via / Referred By", operation.via || "Direct"],
    ["Incoterm", operation.incoterm],
    ["Status", operation.status],
  ];

  return (
    <div className="details-overlay" onClick={onClose}>
      <div
        className="details-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="details-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="details-title">Operation Details</h2>
        <p>Complete information about this trade operation.</p>

        <div className="details-grid">
          {details.map(([label, value]) => (
            <div className="details-field" key={label}>
              <span>{label}</span>
              <strong>{value || "Not specified"}</strong>
            </div>
          ))}
        </div>

        <div className="details-notes">
          <span>Notes</span>
          <p>{operation.notes || "No additional notes."}</p>
        </div>

        <button type="button" className="details-close" onClick={onClose}>
          Close Details
        </button>
      </div>
    </div>
  );
}

export default OperationDetailsModal;

import "./EditOperationModal.css";
import { useEffect, useState } from "react";

function EditOperationModal({ operation, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...operation });

  useEffect(() => {
    setFormData({ ...operation });
  }, [operation]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <div className="edit-modal-overlay">
      <div
        className="edit-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-operation-title"
      >
        <h2 id="edit-operation-title">Edit Operation</h2>
        <p>Update the information of this trade operation.</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="edit-product">Product</label>
            <input
              id="edit-product"
              name="product"
              value={formData.product ?? ""}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="edit-quantity">Quantity</label>
            <input
              id="edit-quantity"
              type="number"
              min="0.01"
              step="any"
              name="quantity"
              value={formData.quantity ?? ""}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="edit-via">Via / Referred By</label>
            <input
              id="edit-via"
              name="via"
              value={formData.via ?? ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="edit-status">Status</label>
            <select
              id="edit-status"
              name="status"
              value={formData.status ?? "Negotiation"}
              onChange={handleChange}
            >
              <option value="Negotiation">Negotiation</option>
              <option value="Confirmed">Confirmed</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <div>
            <label htmlFor="edit-notes">Notes</label>
            <textarea
              id="edit-notes"
              name="notes"
              rows="4"
              value={formData.notes ?? ""}
              onChange={handleChange}
            />
          </div>

          <div className="edit-modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditOperationModal;

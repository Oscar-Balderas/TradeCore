import { useState } from "react";
import "./OperationForm.css";

function OperationForm({ onOperationCreated }) {
  const [formData, setFormData] = useState({
    product: "",
    operationType: "",
    quantity: "",
    unit: "",
    origin: "",
    destination: "",
    supplier: "",
    client: "",
    via: "",
    incoterm: "",
    status: "Negotiation",
    notes: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/operations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          quantity: Number(formData.quantity),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create operation");
      }

      const data = await response.json();

      console.log("Operation created:", data);
      onOperationCreated();
    } catch (error) {
      console.error("Error creating operation:", error);
    }
  };

  return (
    <section className="operation-form-section">
      <h2>Register New Operation</h2>
      <p>Create a new import or export operation.</p>

      <form className="operation-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="product">Product</label>
          <input
            type="text"
            id="product"
            name="product"
            placeholder="e.g. Gold Doré"
            value={formData.product}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="operationType">Operation Type</label>
          <select
            id="operationType"
            name="operationType"
            value={formData.operationType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select operation type
            </option>
            <option value="Import">Import</option>
            <option value="Export">Export</option>
          </select>
        </div>

        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="0.01"
            step="any"
            placeholder="e.g. 500"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="unit">Unit</label>
          <select
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select unit
            </option>
            <option value="kg">Kilograms (kg)</option>
            <option value="MT">Metric Tons (MT)</option>
            <option value="g">Grams (g)</option>
          </select>
        </div>

        <div>
          <label htmlFor="origin">Origin</label>
          <input
            type="text"
            id="origin"
            name="origin"
            placeholder="e.g. Ghana"
            value={formData.origin}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="destination">Destination</label>
          <input
            type="text"
            id="destination"
            name="destination"
            placeholder="e.g. USA"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="supplier">Supplier</label>
          <input
            type="text"
            id="supplier"
            name="supplier"
            placeholder="e.g. Gold Mining Company"
            value={formData.supplier}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="client">Client</label>
          <input
            type="text"
            id="client"
            name="client"
            placeholder="e.g. International Buyer LLC"
            value={formData.client}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="via">Via / Referred By</label>
          <input
            type="text"
            id="via"
            name="via"
            placeholder="e.g. John Smith"
            value={formData.via}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="incoterm">Incoterm</label>
          <select
            id="incoterm"
            name="incoterm"
            value={formData.incoterm}
            onChange={handleChange}
          >
            <option value="">Select Incoterm</option>
            <option value="EXW">EXW</option>
            <option value="FOB">FOB</option>
            <option value="CIF">CIF</option>
            <option value="CFR">CFR</option>
            <option value="DAP">DAP</option>
            <option value="DDP">DDP</option>
          </select>
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Negotiation">Negotiation</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div>
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            rows="4"
            placeholder="Additional information about this operation..."
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register Operation</button>
      </form>
    </section>
  );
}

export default OperationForm;

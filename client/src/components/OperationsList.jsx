import { useEffect, useState } from "react";
import "../components/OperationsList.css";
import DashboardStats from "./DashboardStats";
import EditOperationModal from "./EditOperationModal";
import OperationDetailsModal from "./OperationDetailsModal";

function OperationsList({ refreshKey }) {
  const [operations, setOperations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editingOperation, setEditingOperation] = useState(null);
  const [operationToDelete, setOperationToDelete] = useState(null);
  const [operationToEdit, setOperationToEdit] = useState(null);
  const [selectedOperation, setSelectedOperation] = useState(null);

  useEffect(() => {
    const getOperations = async () => {
      try {
        const response = await fetch("/api/operations");

        if (!response.ok) {
          throw new Error("Failed to load operations");
        }

        const data = await response.json();
        setOperations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getOperations();
  }, [refreshKey]);

  const filteredOperations = operations.filter((operation) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      operation.product?.toLowerCase().includes(search) ||
      operation.origin?.toLowerCase().includes(search) ||
      operation.destination?.toLowerCase().includes(search) ||
      operation.supplier?.toLowerCase().includes(search) ||
      operation.client?.toLowerCase().includes(search) ||
      operation.via?.toLowerCase().includes(search);

    const matchesType =
      typeFilter === "All" || operation.operationType === typeFilter;

    const matchesStatus =
      statusFilter === "All" || operation.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleEdit = (operation) => {
    setEditingOperation(operation);
  };

  const handleSaveEdit = async (updatedData) => {
    try {
      const { product, quantity, via, status, notes } = updatedData;

      const response = await fetch(`/api/operations/${editingOperation._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product,
          quantity: Number(quantity),
          via,
          status,
          notes,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update operation");
      }

      const updatedOperation = await response.json();

      setOperations((previousOperations) =>
        previousOperations.map((operation) =>
          operation._id === updatedOperation._id ? updatedOperation : operation,
        ),
      );

      setEditingOperation(null);
    } catch (error) {
      console.error("Error updating operation:", error);
      window.alert("Failed to update operation.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/operations/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete operation");
      }

      setOperations((previousOperations) =>
        previousOperations.filter((operation) => operation._id !== id),
      );

      setOperationToDelete(null);
    } catch (error) {
      console.error("Error deleting operation:", error);
      window.alert("Failed to delete operation.");
    }
  };

  return (
    <section>
      <h2>Trade Operations</h2>
      <div className="operations-search">
        <input
          type="search"
          placeholder="Search by product, country, supplier, client or intermediary..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <div className="operations-filters">
        <div>
          <label htmlFor="typeFilter">Operation Type</label>
          <select
            id="typeFilter"
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Import">Import</option>
            <option value="Export">Export</option>
          </select>
        </div>

        <div>
          <label htmlFor="statusFilter">Status</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>
      {!loading && !error && <DashboardStats operations={operations} />}

      {loading && <p>Loading operations...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && operations.length === 0 && (
        <p>No operations registered yet.</p>
      )}

      {!loading &&
        !error &&
        operations.length > 0 &&
        filteredOperations.length === 0 && <p>No matching operations found.</p>}

      {!loading && !error && operations.length > 0 && (
        <div className="table-container">
          <table className="operations-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Via</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOperations.map((operation) => (
                <tr key={operation._id}>
                  <td>{operation.product}</td>
                  <td>{operation.operationType}</td>
                  <td>
                    {operation.quantity} {operation.unit}
                  </td>
                  <td>{operation.origin}</td>
                  <td>{operation.destination}</td>
                  <td>{operation.via || "Direct"}</td>
                  <td>{operation.status}</td>
                  <td>
                    <div className="operation-actions">
                      <button
                        type="button"
                        className="view-button"
                        onClick={() => setSelectedOperation(operation)}
                      >
                        View Details
                      </button>
                      <button
                        type="button"
                        className="edit-button"
                        onClick={() => handleEdit(operation)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => setOperationToDelete(operation._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {operationToDelete !== null && (
        <div className="modal-overlay">
          <div
            className="delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
          >
            <div className="modal-icon">!</div>

            <h3 id="delete-modal-title">Delete Operation?</h3>

            <p>
              Are you sure you want to delete this operation? This action cannot
              be undone.
            </p>

            <div className="modal-actions">
              <button
                type="button"
                className="modal-cancel"
                onClick={() => setOperationToDelete(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="modal-confirm"
                onClick={() => handleDelete(operationToDelete)}
              >
                Delete Operation
              </button>
            </div>
          </div>
        </div>
      )}
      {editingOperation && (
        <EditOperationModal
          operation={editingOperation}
          onClose={() => setEditingOperation(null)}
          onSave={handleSaveEdit}
        />
      )}
      {selectedOperation && (
        <OperationDetailsModal
          operation={selectedOperation}
          onClose={() => setSelectedOperation(null)}
        />
      )}
    </section>
  );
}

export default OperationsList;

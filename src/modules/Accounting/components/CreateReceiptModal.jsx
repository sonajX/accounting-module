import React from "react";
import "./ModalInput.css";
import Button from "./Button";
import Forms from "./Forms";

const CreateReceiptModal = ({ isModalOpen, closeModal, reportForm, handleInputChange, handleSubmit }) => {
  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="text-lg font-semibold">Create Receipt</h2>
          <img
            className="cursor-pointer hover:scale-110"
            src="/accounting/Close.svg"
            alt="Close"
            onClick={closeModal}
          />
        </div>

        {/* Modal Body */}
        <div className="modal-body mt-4">
          <div className="form-group">
            <label>Created at..*</label>
            <input
              type="date"
              value={reportForm.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
            />
          </div>

          <Forms
            type="text"
            formName="Sales Invoice ID*"
            placeholder="Enter sales invoice ID"
            value={reportForm.salesInvoiceId}
            onChange={(e) => handleInputChange("salesInvoiceId", e.target.value)}
          />
          <Forms
            type="number"
            formName="Amount Paid*"
            placeholder="Enter Amount paid"
            value={reportForm.amountPaid}
            onChange={(e) => handleInputChange("amountPaid", e.target.value)}
          />
          <Forms
            type="text"
            formName="Created By*"
            placeholder="Created by..."
            value={reportForm.createdBy}
            onChange={(e) => handleInputChange("createdBy", e.target.value)}
          />
        </div>

        {/* Modal Footer */}
        <div className="modal-footer mt-5 flex justify-end space-x-3">
          <Button name="Cancel" variant="standard1" onclick={closeModal} />
          <Button name="Add" variant="standard2" onclick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CreateReceiptModal;
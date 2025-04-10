import React, { useState, useEffect } from "react";
import "./ModalInput.css";
import Button from "./Button";
import Dropdown from "./Dropdown";

const AddAccountModal = ({ isModalOpen, closeModal, handleSubmit }) => {
  const [allAccounts, setAllAccounts] = useState([]);
  const [mainAccounts, setMainAccounts] = useState([]);
  const [subAccounts, setSubAccounts] = useState([]);
  const [selectedMainAccount, setSelectedMainAccount] = useState("");
  const [selectedSubAccount, setSelectedSubAccount] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/general-ledger-accounts/");
        const result = await response.json();
        setAllAccounts(result);

        // Extract unique GL account IDs for main accounts
        const mains = [...new Set(result.map(a => a.gl_account_id))];
        setMainAccounts(mains);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    if (isModalOpen) fetchAccounts();
  }, [isModalOpen]);

  useEffect(() => {
    if (!selectedMainAccount) {
      setSubAccounts([]);
      setSelectedSubAccount("");
      return;
    }

    // Filter sub-accounts based on selected GL account ID
    const filteredSubAccounts = allAccounts
      .filter(a => a.gl_account_id === selectedMainAccount)
      .map(a => ({
        gl_account_id: a.gl_account_id,
        name: a.account_name
      }));
    setSubAccounts(filteredSubAccounts);
    setSelectedSubAccount("");
  }, [selectedMainAccount, allAccounts]);

  const onAddAccount = () => {
    if (!selectedMainAccount || !selectedSubAccount) {
      alert("Please select both an account and a sub-account.");
      return;
    }

    const selectedAccount = subAccounts.find(a => a.gl_account_id === selectedSubAccount);
    const accountData = {
      glAccountId: selectedAccount.gl_account_id, // Use the actual gl_account_id
      accountName: selectedAccount.name // Display purposes
    };

    handleSubmit(accountData);
    closeModal();
  };

  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="text-lg font-semibold">Select Account</h2>
          <img
            className="cursor-pointer hover:scale-110"
            src="/accounting/Close.svg"
            alt="Close"
            onClick={closeModal}
          />
        </div>

        <div className="modal-body mt-4">
          <div className="flex gap-x-5 max-sm:flex-col max-sm:gap-3">
            <div className="-mt-2">
              <Dropdown
                options={mainAccounts}
                style="selection"
                defaultOption="Select GL Account ID..."
                value={selectedMainAccount}
                onChange={(value) => setSelectedMainAccount(value)}
              />
            </div>

            <div className="-mt-2">
              <Dropdown
                options={subAccounts.map(a => a.name)}
                style="selection"
                defaultOption="Select Account Name..."
                value={subAccounts.find(a => a.gl_account_id === selectedSubAccount)?.name || ""}
                onChange={(value) => {
                  const sub = subAccounts.find(a => a.name === value);
                  setSelectedSubAccount(sub?.gl_account_id || "");
                }}
              />
            </div>
          </div>
        </div>

        <div className="modal-footer mt-5 flex justify-end space-x-3">
          <Button name="Cancel" variant="standard1" onclick={closeModal} />
          <Button name="Add" variant="standard2" onclick={onAddAccount} />
        </div>
      </div>
    </div>
  );
};

export default AddAccountModal;
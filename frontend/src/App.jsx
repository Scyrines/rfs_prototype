import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    client_code: 'TEST',
    cost_centre: '',
    job_order: '',
    work_order: '',
    service_order: '',
    refurbishment_order: '',
    rfs_reference_no: '',
    rfs_type: 'Service',
    job_scope: '',
    justification: '',
    designated_site: '',
    planned_start_date: '',
    estimated_completion_date: '',
    estimated_budget: '',
    notify_info_to: '',
    remarks: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/api/tickets/', formData)
      alert("RFS Submitted!")
    } catch (error) {
      console.error("Error submitting ticket", error)
      alert("Error submitting request.")
    }
  }

  return (
    <div className="app-container">
      <div className="header-section">
        <h1 className="main-title">Online Request for Service</h1>
        <h2 className="sub-title">Maintenance, Repair &amp; Overhaul (oRFS-MRO)</h2>
      </div>

      <form onSubmit={handleSubmit} className="rfs-form">
        {/* CLIENT INFORMATION */}
        <div className="section">
          <h3 className="section-title">Client Information</h3>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="label">Client Code</label>
              <input type="text" name="client_code" value={formData.client_code} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="label">Client Name</label>
              <div className="text-value">TEST Station Name</div>
            </div>
            <div className="form-group">
              <label className="label">Client Category</label>
              <div className="text-value">GENCO</div>
            </div>
            <div className="form-group">
              <label className="label">Client PIC</label>
              <div className="text-value">Mohd Fahmi b. Mohd Amin</div>
            </div>
            <div className="form-group">
              <label className="label">Client Head</label>
              <div className="text-value">Arif Ibrahim Bin Arasmen</div>
            </div>
            <div className="form-group">
              <label className="label">Client MP</label>
              <div className="text-value">Arif Ibrahim Bin Arasmen</div>
            </div>
          </div>
        </div>

        {/* JOB SCOPE */}
        <div className="section">
          <h3 className="section-title">Job Scope</h3>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="label">Cost Centre <span className="req">*</span></label>
              <input type="text" name="cost_centre" value={formData.cost_centre} onChange={handleChange} required placeholder="Enter Cost Centre" />
            </div>
            <div className="form-group">
              <label className="label">Job Order / WBS (GP No.) <span className="req">*</span></label>
              <input type="text" name="job_order" value={formData.job_order} onChange={handleChange} required placeholder="Enter Job Order" />
            </div>

            <div className="form-group">
              <label className="label">Work Order <span className="req">*</span></label>
              <input type="text" name="work_order" value={formData.work_order} onChange={handleChange} required placeholder="Enter Work Order" />
            </div>
            <div className="form-group">
              <label className="label">Service Order <span className="req">*</span></label>
              <input type="text" name="service_order" value={formData.service_order} onChange={handleChange} required placeholder="Enter Service Order" />
            </div>

            <div className="form-group">
              <label className="label">Refurbishment Order <span className="req">*</span></label>
              <input type="text" name="refurbishment_order" value={formData.refurbishment_order} onChange={handleChange} required placeholder="Enter Refurbishment Order" />
            </div>
            <div className="form-group">
              <label className="label">RFS Reference No <span className="req">*</span></label>
              <input type="text" name="rfs_reference_no" value={formData.rfs_reference_no} onChange={handleChange} required placeholder="Enter RFS Reference No" />
            </div>

            <div className="form-group">
              <label className="label">RFS Type</label>
              <select name="rfs_type" value={formData.rfs_type} onChange={handleChange}>
                <option value="Service">Service</option>
                <option value="Material">Material</option>
              </select>
            </div>
            <div></div>

            <div className="form-group full-width">
              <label className="label">Jobs Scope <span className="req">*</span></label>
              <textarea name="job_scope" value={formData.job_scope} onChange={handleChange} required placeholder="Describe the job scope in detail..."></textarea>
            </div>

            <div className="form-group full-width">
              <label className="label">Justification</label>
              <textarea name="justification" value={formData.justification} onChange={handleChange} placeholder="Provide justification..."></textarea>
            </div>

            <div className="form-group full-width">
              <label className="label">Designated Site <span className="req">*</span></label>
              <input type="text" name="designated_site" value={formData.designated_site} onChange={handleChange} required placeholder="Enter Designated Site" />
            </div>

            <div className="form-group">
              <label className="label">Planned Start Date <span className="req">*</span></label>
              <div className="input-with-icon">
                <input type="date" name="planned_start_date" value={formData.planned_start_date} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label className="label">Estimated Completion Date <span className="req">*</span></label>
              <div className="input-with-icon">
                <input type="date" name="estimated_completion_date" value={formData.estimated_completion_date} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label className="label">Estimated Budget</label>
              <input type="text" name="estimated_budget" value={formData.estimated_budget} onChange={handleChange} placeholder="e.g. 5000" />
            </div>
          </div>
        </div>

        {/* REMARKS */}
        <div className="section">
          <h3 className="section-title">Remarks &amp; Attachments</h3>
          
          <div className="form-grid-1col">
            <div className="form-group">
              <label className="label">Notify Info To</label>
              <input type="text" name="notify_info_to" value={formData.notify_info_to} onChange={handleChange} placeholder="Search names..." />
              <div className="notify-icons">
                <span className="icon" title="Add Contact">👤</span>
                <span className="icon" title="Address Book">📖</span>
              </div>
            </div>

            <div className="form-group">
              <label className="label">Remarks</label>
              <textarea name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Any additional remarks..."></textarea>
            </div>

            <div className="form-group">
              <label className="label">Attachments</label>
              <button type="button" className="btn btn-outline">
                <span>📎 Click here to attach files or drag and drop</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button type="button" className="btn btn-secondary">Exit</button>
          <button type="submit" className="btn btn-primary">Submit Request</button>
        </div>

        {/* Footer */}
        <div className="footer">
          <span className="req">*</span> Indicates a compulsory field
        </div>
      </form>
    </div>
  )
}

export default App
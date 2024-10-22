import React, { useEffect, useState } from 'react';

const EntityForm = ({ isOpen, onClose, entity, onSave, title, fields }) => {
    const [formData, setFormData] = useState(entity || {});

    useEffect(() => {
        setFormData(entity || {});
    }, [entity]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            {fields.map((field, index) => (
                                <div className="mb-3" key={index}>
                                    <label className="form-label">{field.label}</label>
                                    <input
                                        type={field.type}
                                        className="form-control"
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        required={field.required}
                                    />
                                </div>
                            ))}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                                <button type="submit" className="btn btn-primary">{title.includes('Add') ? `Add ${title}` : 'Save changes'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EntityForm;
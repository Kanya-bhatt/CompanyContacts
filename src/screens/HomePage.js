import React, { useState, useEffect } from 'react';

function HomePage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/companies')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h1>Company and Contact Details</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Company Address</th>
                        <th>Company Phone</th>
                        <th>Company Email</th>
                        <th>Company Website</th>
                        <th>Number of Employees</th>
                        <th>Founded</th>
                        <th>Industry</th>
                        <th>Contact Name</th>
                        <th>Contact Phone</th>
                        <th>Contact Email</th>
                        <th>Contact Website</th>
                        <th>Contact DOB</th>
                        <th>Contact Type</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(company => (
                        <React.Fragment key={company._id}>
                            {company.contacts.map(contact => (
                                <tr key={contact._id}>
                                    <td>{company.name}</td>
                                    <td>{company.address}</td>
                                    <td>{company.phone}</td>
                                    <td>{company.email}</td>
                                    <td>{company.website}</td>
                                    <td>{company.numberEmp}</td>
                                    <td>{new Date(company.founded).toLocaleDateString()}</td>
                                    <td>{company.industry}</td>
                                    <td>{contact.name}</td>
                                    <td>{contact.phone}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.website}</td>
                                    <td>{new Date(contact.dob).toLocaleDateString()}</td>
                                    <td>{contact.type}</td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HomePage;